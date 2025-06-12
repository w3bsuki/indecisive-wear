/**
 * API Response Caching
 * 
 * Simple in-memory cache for API responses to reduce duplicate requests
 */

import type { ApiResponse, CacheConfig } from './types';

interface CacheEntry<T = unknown> {
  data: ApiResponse<T>;
  timestamp: number;
  ttl: number;
}

class ApiCache {
  private cache = new Map<string, CacheEntry>();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes

  /**
   * Generates a cache key from request parameters
   */
  private generateKey(url: string, method: string, data?: unknown): string {
    const dataHash = data ? JSON.stringify(data) : '';
    return `${method}:${url}:${dataHash}`;
  }

  /**
   * Gets cached response if available and not expired
   */
  get<T = unknown>(
    url: string,
    method: string,
    data?: unknown,
    config?: CacheConfig
  ): ApiResponse<T> | null {
    if (!config?.enabled) return null;

    const key = config.key || this.generateKey(url, method, data);
    const entry = this.cache.get(key);

    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as ApiResponse<T>;
  }

  /**
   * Stores a response in the cache
   */
  set<T = unknown>(
    url: string,
    method: string,
    response: ApiResponse<T>,
    data?: unknown,
    config?: CacheConfig
  ): void {
    if (!config?.enabled) return;

    const key = config.key || this.generateKey(url, method, data);
    const ttl = config.ttl || this.defaultTTL;

    this.cache.set(key, {
      data: response,
      timestamp: Date.now(),
      ttl,
    });
  }

  /**
   * Invalidates cached responses
   */
  invalidate(pattern?: string): void {
    if (!pattern) {
      this.cache.clear();
      return;
    }

    // Simple pattern matching - starts with
    for (const [key] of this.cache) {
      if (key.startsWith(pattern)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Invalidates a specific cache entry
   */
  invalidateKey(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Cleans up expired entries
   */
  cleanup(): void {
    const now = Date.now();
    
    for (const [key, entry] of this.cache) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Gets cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Export singleton instance
export const apiCache = new ApiCache();

// Auto-cleanup every 10 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    apiCache.cleanup();
  }, 10 * 60 * 1000);
} 