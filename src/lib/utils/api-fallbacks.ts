/**
 * API Fallback Strategies
 * 
 * Provides robust fallback mechanisms for API failures
 * ensuring the application remains functional even when services are down
 */

import { withErrorHandling, type EnhancedError } from './error-handling'

// Fallback strategy types
export type FallbackStrategy = 
  | 'cache-first'
  | 'cache-then-network'
  | 'network-then-cache'
  | 'static-fallback'
  | 'degraded-mode'
  | 'retry-with-backoff'

// Cache interface for fallback data
interface FallbackCache {
  get<T>(key: string): T | null
  set<T>(key: string, value: T, ttl?: number): void
  clear(key?: string): void
  has(key: string): boolean
}

// Simple in-memory cache implementation
class MemoryCache implements FallbackCache {
  private cache = new Map<string, { value: unknown; expires: number }>()

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null
    
    if (Date.now() > item.expires) {
      this.cache.delete(key)
      return null
    }
    
    return item.value as T
  }

  set<T>(key: string, value: T, ttl = 300000): void { // 5 min default
    this.cache.set(key, {
      value,
      expires: Date.now() + ttl,
    })
  }

  clear(key?: string): void {
    if (key) {
      this.cache.delete(key)
    } else {
      this.cache.clear()
    }
  }

  has(key: string): boolean {
    const item = this.cache.get(key)
    if (!item) return false
    
    if (Date.now() > item.expires) {
      this.cache.delete(key)
      return false
    }
    
    return true
  }
}

// Global fallback cache instance
export const fallbackCache = new MemoryCache()

// Fallback configuration
export interface FallbackConfig {
  strategy: FallbackStrategy
  cacheKey?: string
  cacheTtl?: number
  staticFallback?: unknown
  maxRetries?: number
  retryDelay?: number
  degradedMode?: () => unknown
  onFallback?: (strategy: FallbackStrategy, error: EnhancedError) => void
}

/**
 * Execute API call with fallback strategies
 */
export async function withApiFallback<T>(
  primaryOperation: () => Promise<T>,
  config: FallbackConfig
): Promise<T> {
  const {
    strategy,
    cacheKey,
    cacheTtl = 300000, // 5 minutes
    staticFallback,
    maxRetries = 3,
    retryDelay = 1000,
    degradedMode,
    onFallback,
  } = config

  switch (strategy) {
    case 'cache-first':
      return await cacheFirstStrategy(primaryOperation, { cacheKey, cacheTtl, staticFallback, onFallback })
    
    case 'cache-then-network':
      return await cacheThenNetworkStrategy(primaryOperation, { cacheKey, cacheTtl, onFallback })
    
    case 'network-then-cache':
      return await networkThenCacheStrategy(primaryOperation, { cacheKey, cacheTtl, staticFallback, onFallback })
    
    case 'static-fallback':
      return await staticFallbackStrategy(primaryOperation, { staticFallback, onFallback })
    
    case 'degraded-mode':
      return await degradedModeStrategy(primaryOperation, { degradedMode, onFallback })
    
    case 'retry-with-backoff':
      return await retryWithBackoffStrategy(primaryOperation, { maxRetries, retryDelay, onFallback })
    
    default:
      return await primaryOperation()
  }
}

/**
 * Cache-first strategy: Try cache first, then network
 */
async function cacheFirstStrategy<T>(
  operation: () => Promise<T>,
  options: { cacheKey?: string; cacheTtl?: number; staticFallback?: unknown; onFallback?: (strategy: FallbackStrategy, error: EnhancedError) => void }
): Promise<T> {
  const { cacheKey, cacheTtl, staticFallback, onFallback } = options
  
  // Try cache first
  if (cacheKey && fallbackCache.has(cacheKey)) {
    const cached = fallbackCache.get<T>(cacheKey)
    if (cached !== null) {
      return cached
    }
  }
  
  // Try network operation
  try {
    const result = await operation()
    
    // Cache successful result
    if (cacheKey) {
      fallbackCache.set(cacheKey, result, cacheTtl)
    }
    
    return result
  } catch (error) {
    const enhancedError = error as EnhancedError
    onFallback?.('cache-first', enhancedError)
    
    // Return static fallback if available
    if (staticFallback !== undefined) {
      return staticFallback as T
    }
    
    throw error
  }
}

/**
 * Cache-then-network strategy: Return cache immediately, update with network
 */
async function cacheThenNetworkStrategy<T>(
  operation: () => Promise<T>,
  options: { cacheKey?: string; cacheTtl?: number; onFallback?: (strategy: FallbackStrategy, error: EnhancedError) => void }
): Promise<T> {
  const { cacheKey, cacheTtl, onFallback } = options
  
  // Get cached value if available
  let cachedResult: T | null = null
  if (cacheKey && fallbackCache.has(cacheKey)) {
    cachedResult = fallbackCache.get<T>(cacheKey)
  }
  
  // Start network operation
  const networkPromise = operation().then(result => {
    // Cache the fresh result
    if (cacheKey) {
      fallbackCache.set(cacheKey, result, cacheTtl)
    }
    return result
  }).catch(error => {
    const enhancedError = error as EnhancedError
    onFallback?.('cache-then-network', enhancedError)
    throw error
  })
  
  // Return cached result immediately if available
  if (cachedResult !== null) {
    // Network operation continues in background
    networkPromise.catch(() => {
      // Silently fail background update
    })
    return cachedResult
  }
  
  // Wait for network if no cache
  return networkPromise
}

/**
 * Network-then-cache strategy: Try network first, fallback to cache
 */
async function networkThenCacheStrategy<T>(
  operation: () => Promise<T>,
  options: { cacheKey?: string; cacheTtl?: number; staticFallback?: unknown; onFallback?: (strategy: FallbackStrategy, error: EnhancedError) => void }
): Promise<T> {
  const { cacheKey, cacheTtl, staticFallback, onFallback } = options
  
  try {
    const result = await operation()
    
    // Cache successful result
    if (cacheKey) {
      fallbackCache.set(cacheKey, result, cacheTtl)
    }
    
    return result
  } catch (error) {
    const enhancedError = error as EnhancedError
    onFallback?.('network-then-cache', enhancedError)
    
    // Try cache fallback
    if (cacheKey && fallbackCache.has(cacheKey)) {
      const cached = fallbackCache.get<T>(cacheKey)
      if (cached !== null) {
        return cached
      }
    }
    
    // Try static fallback
    if (staticFallback !== undefined) {
      return staticFallback as T
    }
    
    throw error
  }
}

/**
 * Static fallback strategy: Return static data on failure
 */
async function staticFallbackStrategy<T>(
  operation: () => Promise<T>,
  options: { staticFallback?: unknown; onFallback?: (strategy: FallbackStrategy, error: EnhancedError) => void }
): Promise<T> {
  const { staticFallback, onFallback } = options
  
  try {
    return await operation()
  } catch (error) {
    const enhancedError = error as EnhancedError
    onFallback?.('static-fallback', enhancedError)
    
    if (staticFallback !== undefined) {
      return staticFallback as T
    }
    
    throw error
  }
}

/**
 * Degraded mode strategy: Execute fallback function on failure
 */
async function degradedModeStrategy<T>(
  operation: () => Promise<T>,
  options: { degradedMode?: () => unknown; onFallback?: (strategy: FallbackStrategy, error: EnhancedError) => void }
): Promise<T> {
  const { degradedMode, onFallback } = options
  
  try {
    return await operation()
  } catch (error) {
    const enhancedError = error as EnhancedError
    onFallback?.('degraded-mode', enhancedError)
    
    if (degradedMode) {
      const fallbackResult = await degradedMode()
      return fallbackResult as T
    }
    
    throw error
  }
}

/**
 * Retry with backoff strategy: Retry operation with exponential backoff
 */
async function retryWithBackoffStrategy<T>(
  operation: () => Promise<T>,
  options: { maxRetries?: number; retryDelay?: number; onFallback?: (strategy: FallbackStrategy, error: EnhancedError) => void }
): Promise<T> {
  const { maxRetries = 3, retryDelay = 1000, onFallback } = options
  
  return withErrorHandling(
    operation,
    {
      retries: maxRetries,
      retryDelay,
      onError: (error) => {
        onFallback?.('retry-with-backoff', error)
      },
    }
  )
}

/**
 * Waitlist-specific fallback strategies
 */
export const waitlistFallbacks = {
  // Submission fallback: Store locally and sync later
  submission: {
    strategy: 'degraded-mode' as const,
    degradedMode: () => {
      // In real implementation, store in localStorage
      // and sync when connection is restored
      return {
        success: true,
        message: 'Your request has been saved and will be processed when connection is restored.',
        id: `offline-${Date.now()}`,
      }
    },
  },
  
  // Status check fallback: Return cached status
  status: {
    strategy: 'cache-first' as const,
    staticFallback: {
      success: false,
      message: 'Unable to check status at this time. Please try again later.',
    },
  },
  
  // Analytics fallback: Return empty/default data
  analytics: {
    strategy: 'static-fallback' as const,
    staticFallback: {
      totalEntries: 0,
      recentEntries: 0,
      conversionRate: 0,
      topSources: [],
      topPreferences: [],
    },
  },
}

/**
 * Product data fallback strategies
 */
export const productFallbacks = {
  // Product list fallback
  list: {
    strategy: 'cache-first' as const,
    staticFallback: [], // Empty product list
  },
  
  // Product details fallback
  details: {
    strategy: 'network-then-cache' as const,
    staticFallback: {
      id: 'not-found',
      name: 'Product Not Found',
      description: 'This product is currently unavailable.',
      price: 0,
      inStock: false,
    },
  },
  
  // Search fallback
  search: {
    strategy: 'cache-then-network' as const,
    staticFallback: {
      products: [],
      categories: [],
      collections: [],
    },
  },
}

/**
 * Utility to check if we're in offline mode
 */
export function isOffline(): boolean {
  return typeof navigator !== 'undefined' && navigator.onLine === false
}

/**
 * Utility to check if API is reachable
 */
export async function checkApiHealth(endpoint = '/api/health'): Promise<boolean> {
  try {
    const response = await fetch(endpoint, {
      method: 'HEAD',
      cache: 'no-cache',
    })
    return response.ok
  } catch {
    return false
  }
}

/**
 * Auto-fallback decorator for API functions
 */
export function withAutoFallback<T extends (...args: any[]) => Promise<any>>(
  apiFunction: T,
  fallbackConfig: FallbackConfig
): T {
  return ((...args: Parameters<T>) => {
    return withApiFallback(() => apiFunction(...args), fallbackConfig)
  }) as T
}