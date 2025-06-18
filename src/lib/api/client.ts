/**
 * Unified API Client
 * 
 * Consolidates all API calling patterns with:
 * - Consistent error handling
 * - Automatic retries
 * - Response caching
 * - Request/response interceptors
 */

import { 
  HTTP_METHODS, 
  CONTENT_TYPES, 
  API_HEADERS, 
  REQUEST_TIMEOUTS,
  RETRY_CONFIG 
} from '@/lib/constants/api';
import { ApiError, createApiError, createNetworkError, shouldRetry } from './errors';
import { apiCache } from './cache';
import type { 
  ApiRequestConfig, 
  ApiResponse, 
  ApiClientConfig,
  RetryConfig,
  RequestInterceptor,
  ResponseInterceptor,
  ErrorInterceptor 
} from './types';

export class ApiClient {
  private config: ApiClientConfig;

  constructor(baseUrl?: string) {
    this.config = {
      baseUrl: baseUrl || '/api',
      timeout: REQUEST_TIMEOUTS.DEFAULT,
      defaultRetry: {
        maxAttempts: RETRY_CONFIG.MAX_ATTEMPTS,
        initialDelay: RETRY_CONFIG.INITIAL_DELAY,
        backoffMultiplier: RETRY_CONFIG.BACKOFF_MULTIPLIER,
      },
      defaultCache: {
        enabled: false,
        ttl: 5 * 60 * 1000, // 5 minutes
      },
      defaultHeaders: {
        [API_HEADERS.CONTENT_TYPE]: CONTENT_TYPES.JSON,
        [API_HEADERS.ACCEPT]: CONTENT_TYPES.JSON,
      },
      requestInterceptors: [],
      responseInterceptors: [],
      errorInterceptors: [],
    };
  }

  /**
   * Add request interceptor
   */
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.config.requestInterceptors.push(interceptor);
  }

  /**
   * Add response interceptor
   */
  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.config.responseInterceptors.push(interceptor);
  }

  /**
   * Add error interceptor
   */
  addErrorInterceptor(interceptor: ErrorInterceptor): void {
    this.config.errorInterceptors.push(interceptor);
  }

  /**
   * Make a GET request
   */
  async get<T = unknown>(
    url: string, 
    config?: Partial<ApiRequestConfig>
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: HTTP_METHODS.GET,
      ...config,
    });
  }

  /**
   * Make a POST request
   */
  async post<T = unknown, D = unknown>(
    url: string, 
    data?: D, 
    config?: Partial<ApiRequestConfig>
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: HTTP_METHODS.POST,
      data,
      ...config,
    });
  }

  /**
   * Make a PUT request
   */
  async put<T = unknown, D = unknown>(
    url: string, 
    data?: D, 
    config?: Partial<ApiRequestConfig>
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: HTTP_METHODS.PUT,
      data,
      ...config,
    });
  }

  /**
   * Make a PATCH request
   */
  async patch<T = unknown, D = unknown>(
    url: string, 
    data?: D, 
    config?: Partial<ApiRequestConfig>
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: HTTP_METHODS.PATCH,
      data,
      ...config,
    });
  }

  /**
   * Make a DELETE request
   */
  async delete<T = unknown>(
    url: string, 
    config?: Partial<ApiRequestConfig>
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: HTTP_METHODS.DELETE,
      ...config,
    });
  }

  /**
   * Main request method with retry logic and caching
   */
  private async request<T = unknown>(
    requestConfig: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    const config = await this.mergeConfig(requestConfig);
    const traceId = crypto.randomUUID();

    // Check cache first
    const cacheConfig = { ...this.config.defaultCache, ...config.cache };
    const cachedResponse = apiCache.get<T>(
      config.url, 
      config.method, 
      config.data, 
      cacheConfig
    );

    if (cachedResponse) {
      return cachedResponse;
    }

    // Execute request with retry logic
    const retryConfig = { ...this.config.defaultRetry, ...config.retry };
    let lastError: ApiError;

    for (let attempt = 1; attempt <= retryConfig.maxAttempts!; attempt++) {
      try {
        const response = await this.executeRequest<T>(config, traceId);
        
        // Cache successful responses
        if (response.success && cacheConfig.enabled) {
          apiCache.set(config.url, config.method, response, config.data, cacheConfig);
        }

        return response;
      } catch (error) {
        lastError = error instanceof ApiError ? error : createNetworkError(error as Error, traceId);
        
        // Apply error interceptors
        for (const interceptor of this.config.errorInterceptors) {
          lastError = await interceptor(lastError);
        }

        // Check if we should retry
        const shouldRetryRequest = 
          attempt < retryConfig.maxAttempts! &&
          shouldRetry(lastError) &&
          (!retryConfig.retryCondition || retryConfig.retryCondition(lastError));

        if (!shouldRetryRequest) {
          throw lastError;
        }

        // Wait before retry with exponential backoff
        const delay = retryConfig.initialDelay! * Math.pow(retryConfig.backoffMultiplier!, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }

  /**
   * Execute the actual HTTP request
   */
  private async executeRequest<T = unknown>(
    config: ApiRequestConfig,
    traceId: string
  ): Promise<ApiResponse<T>> {
    const url = config.url.startsWith('http') ? config.url : `${this.config.baseUrl}${config.url}`;
    
    const fetchOptions: RequestInit = {
      method: config.method,
      headers: config.headers,
      signal: config.signal,
    };

    // Add timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout || this.config.timeout);
    
    if (!config.signal) {
      fetchOptions.signal = controller.signal;
    }

    // Add body for non-GET requests
    if (config.data && config.method !== HTTP_METHODS.GET) {
      if (config.headers?.[API_HEADERS.CONTENT_TYPE] === CONTENT_TYPES.JSON) {
        fetchOptions.body = JSON.stringify(config.data);
      } else {
        fetchOptions.body = config.data as BodyInit;
      }
    }

    try {
      const response = await fetch(url, fetchOptions);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw await createApiError(response, traceId);
      }

      return await this.parseResponse<T>(response, traceId);
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw createNetworkError(error as Error, traceId);
    }
  }

  /**
   * Parse response and apply interceptors
   */
  private async parseResponse<T = unknown>(
    response: Response,
    traceId: string
  ): Promise<ApiResponse<T>> {
    let parsedResponse: ApiResponse<T>;

    try {
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;
      
      parsedResponse = {
        success: true,
        data,
        statusCode: response.status,
        timestamp: new Date().toISOString(),
        traceId,
        headers: Object.fromEntries(response.headers.entries()),
      };
    } catch (error) {
      throw new ApiError(
        'Failed to parse response',
        response.status,
        'PARSE_ERROR',
        { originalError: (error as Error).message },
        traceId
      );
    }

    // Apply response interceptors
    for (const interceptor of this.config.responseInterceptors) {
      parsedResponse = await interceptor(parsedResponse);
    }

    return parsedResponse;
  }

  /**
   * Merge request config with defaults and apply interceptors
   */
  private async mergeConfig(requestConfig: ApiRequestConfig): Promise<ApiRequestConfig> {
    let config: ApiRequestConfig = {
      ...requestConfig,
      headers: {
        ...this.config.defaultHeaders,
        ...requestConfig.headers,
      },
      timeout: requestConfig.timeout || this.config.timeout,
    };

    // Apply request interceptors
    for (const interceptor of this.config.requestInterceptors) {
      config = await interceptor(config);
    }

    return config;
  }

  /**
   * Clear all caches
   */
  clearCache(): void {
    apiCache.invalidate();
  }

  /**
   * Clear cache for specific pattern
   */
  clearCachePattern(pattern: string): void {
    apiCache.invalidate(pattern);
  }
}

// Export default instance
export const api = new ApiClient(); 