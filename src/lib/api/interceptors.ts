/**
 * API Request/Response Interceptors
 * Adds middleware functionality to API calls for:
 * - Authentication headers
 * - Request/response logging
 * - Error transformation
 * - Performance tracking
 */

import { ApiError, createApiError, createNetworkError } from './errors'

// Types
export interface RequestInterceptor {
  onRequest?: (config: RequestInit) => RequestInit | Promise<RequestInit>
  onRequestError?: (error: Error) => Promise<never>
}

export interface ResponseInterceptor {
  onResponse?: (response: Response) => Response | Promise<Response>
  onResponseError?: (error: Error) => Promise<never>
}

export interface InterceptorManager {
  request: RequestInterceptor[]
  response: ResponseInterceptor[]
}

// Global interceptor registry
const interceptors: InterceptorManager = {
  request: [],
  response: []
}

/**
 * Add a request interceptor
 */
export function addRequestInterceptor(interceptor: RequestInterceptor) {
  interceptors.request.push(interceptor)
  return () => {
    const index = interceptors.request.indexOf(interceptor)
    if (index > -1) {
      interceptors.request.splice(index, 1)
    }
  }
}

/**
 * Add a response interceptor
 */
export function addResponseInterceptor(interceptor: ResponseInterceptor) {
  interceptors.response.push(interceptor)
  return () => {
    const index = interceptors.response.indexOf(interceptor)
    if (index > -1) {
      interceptors.response.splice(index, 1)
    }
  }
}

/**
 * Enhanced fetch with interceptors
 */
export async function fetchWithInterceptors(
  url: string,
  config: RequestInit = {}
): Promise<Response> {
  const traceId = generateTraceId()
  let finalConfig = { ...config }
  
  // Apply request interceptors
  for (const interceptor of interceptors.request) {
    if (interceptor.onRequest) {
      try {
        finalConfig = await interceptor.onRequest(finalConfig)
      } catch (error) {
        if (interceptor.onRequestError) {
          await interceptor.onRequestError(error as Error)
        }
        throw error
      }
    }
  }
  
  // Add default headers
  finalConfig.headers = {
    'Content-Type': 'application/json',
    'X-Trace-Id': traceId,
    ...finalConfig.headers,
  }
  
  // Performance tracking
  const startTime = performance.now()
  
  try {
    // Make the request
    const response = await fetch(url, finalConfig)
    
    // Track request duration
    const duration = performance.now() - startTime
    
    // Add custom headers to response
    const enhancedResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: new Headers({
        ...Object.fromEntries(response.headers.entries()),
        'X-Response-Time': duration.toFixed(2),
        'X-Trace-Id': traceId,
      }),
    })
    
    // Apply response interceptors
    let finalResponse = enhancedResponse
    for (const interceptor of interceptors.response) {
      if (interceptor.onResponse) {
        try {
          finalResponse = await interceptor.onResponse(finalResponse)
        } catch (error) {
          if (interceptor.onResponseError) {
            await interceptor.onResponseError(error as Error)
          }
          throw error
        }
      }
    }
    
    // Check for error status codes
    if (!finalResponse.ok) {
      throw await createApiError(finalResponse, traceId)
    }
    
    return finalResponse
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw createNetworkError(error, traceId)
    }
    
    // Apply error interceptors
    for (const interceptor of interceptors.response) {
      if (interceptor.onResponseError) {
        try {
          await interceptor.onResponseError(error as Error)
        } catch (interceptorError) {
          // Log but don't throw interceptor errors
          console.error('Response interceptor error:', interceptorError)
        }
      }
    }
    
    throw error
  }
}

/**
 * Default interceptors
 */

// Authentication interceptor
export const authInterceptor: RequestInterceptor = {
  onRequest: (config) => {
    // Get auth token from storage or state
    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('auth_token') 
      : null
    
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      }
    }
    
    return config
  }
}

// Logging interceptor
export const loggingInterceptor: ResponseInterceptor = {
  onResponse: (response) => {
    if (process.env.NODE_ENV === 'development') {
      const duration = response.headers.get('X-Response-Time')
      const traceId = response.headers.get('X-Trace-Id')
      
      console.log(`[API] ${response.status} ${response.url}`, {
        duration: duration ? `${duration}ms` : 'unknown',
        traceId,
        status: response.status,
      })
    }
    
    return response
  },
  onResponseError: async (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('[API Error]', error)
    }
    throw error
  }
}

// CSRF token interceptor
export const csrfInterceptor: RequestInterceptor = {
  onRequest: (config) => {
    // Get CSRF token from meta tag or cookie
    const csrfToken = typeof document !== 'undefined'
      ? document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content
      : null
    
    if (csrfToken && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(config.method?.toUpperCase() || '')) {
      config.headers = {
        ...config.headers,
        'X-CSRF-Token': csrfToken,
      }
    }
    
    return config
  }
}

// Analytics interceptor
export const analyticsInterceptor: ResponseInterceptor = {
  onResponse: (response) => {
    // Track API performance metrics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const duration = response.headers.get('X-Response-Time')
      const parsedDuration = duration ? parseFloat(duration) : 0
      
      ;(window as any).gtag('event', 'timing_complete', {
        name: 'api_request',
        value: parsedDuration,
        event_category: 'API',
        event_label: new URL(response.url).pathname,
      })
    }
    
    return response
  }
}

/**
 * Initialize default interceptors
 */
export function initializeInterceptors() {
  // Add default interceptors
  addRequestInterceptor(authInterceptor)
  addRequestInterceptor(csrfInterceptor)
  addResponseInterceptor(loggingInterceptor)
  addResponseInterceptor(analyticsInterceptor)
}

/**
 * Generate unique trace ID for request tracking
 */
function generateTraceId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}