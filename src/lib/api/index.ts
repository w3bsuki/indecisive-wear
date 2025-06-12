/**
 * API Layer - Centralized API functionality
 * 
 * This module consolidates all API-related functionality:
 * - Unified API client with consistent error handling
 * - Request/response interceptors
 * - Retry logic and caching
 * - Type-safe API responses
 */

export { ApiClient, api } from './client';
export { ApiError, createApiError } from './errors';
export { apiCache } from './cache';
export { 
  waitlistService, 
  questionMarkService, 
  productsService, 
  analyticsService 
} from './services';
export type { 
  ApiRequestConfig, 
  ApiResponse, 
  CacheConfig,
  RetryConfig 
} from './types'; 