/**
 * Enhanced API Types for the unified API client
 */

import type { HttpMethod } from '@/lib/types/api';

// Enhanced API request configuration
export interface ApiRequestConfig<T = unknown> {
  url: string;
  method: HttpMethod;
  data?: T;
  headers?: Record<string, string>;
  timeout?: number;
  retry?: RetryConfig;
  cache?: CacheConfig;
  signal?: AbortSignal;
}

// Enhanced API response type
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp?: string;
  statusCode?: number;
  headers?: Record<string, string>;
  traceId?: string;
}

// Retry configuration
export interface RetryConfig {
  maxAttempts?: number;
  initialDelay?: number;
  backoffMultiplier?: number;
  retryCondition?: (error: ApiError) => boolean;
}

// Cache configuration
export interface CacheConfig {
  enabled?: boolean;
  ttl?: number; // Time to live in milliseconds
  key?: string; // Custom cache key
  invalidateOnError?: boolean;
}

// Enhanced API Error
export interface ApiError extends Error {
  statusCode: number;
  code: string;
  details?: Record<string, unknown>;
  timestamp: string;
  traceId?: string;
  retryable: boolean;
  isRetryable: boolean;
  isRetryableStatus: (statusCode: number) => boolean;
  isRetryableStatusMethod: (statusCode: number) => boolean;
  toJSON(): {
    name: string;
    message: string;
    statusCode: number;
    code: string;
    details: Record<string, unknown> | undefined;
    timestamp: string;
    traceId: string | undefined;
    retryable: boolean;
  };
}

// Request/Response interceptors
export type RequestInterceptor = (config: ApiRequestConfig) => ApiRequestConfig | Promise<ApiRequestConfig>;
export type ResponseInterceptor = <T>(response: ApiResponse<T>) => ApiResponse<T> | Promise<ApiResponse<T>>;
export type ErrorInterceptor = (error: ApiError) => ApiError | Promise<ApiError>;

// API client configuration
export interface ApiClientConfig {
  baseUrl: string;
  timeout: number;
  defaultRetry: RetryConfig;
  defaultCache: CacheConfig;
  defaultHeaders: Record<string, string>;
  requestInterceptors: RequestInterceptor[];
  responseInterceptors: ResponseInterceptor[];
  errorInterceptors: ErrorInterceptor[];
} 