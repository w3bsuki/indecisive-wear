/**
 * Performance Utilities
 * 
 * Consolidates performance-related utility functions:
 * - Timing and profiling
 * - Debouncing and throttling
 * - Memory optimization
 * - Lazy evaluation
 */

// Timing utilities
export function measureTime<T>(fn: () => T): { result: T; duration: number } {
  const start = performance.now();
  const result = fn();
  const duration = performance.now() - start;
  
  return { result, duration };
}

export async function measureAsyncTime<T>(fn: () => Promise<T>): Promise<{ result: T; duration: number }> {
  const start = performance.now();
  const result = await fn();
  const duration = performance.now() - start;
  
  return { result, duration };
}

// Debounce utility
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
}

// Throttle utility
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), wait);
    }
  };
}

// Memoization utility
export function memoize<T extends (...args: unknown[]) => unknown>(
  fn: T,
  getKey?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>) => {
    const key = getKey ? getKey(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args) as ReturnType<T>;
    cache.set(key, result);
    return result;
  }) as T;
}

// Memoization with TTL (Time To Live)
export function memoizeWithTTL<T extends (...args: unknown[]) => unknown>(
  fn: T,
  ttl: number = 5 * 60 * 1000, // 5 minutes default
  getKey?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, { value: ReturnType<T>; timestamp: number }>();
  
  return ((...args: Parameters<T>) => {
    const key = getKey ? getKey(...args) : JSON.stringify(args);
    const now = Date.now();
    
    const cached = cache.get(key);
    if (cached && (now - cached.timestamp) < ttl) {
      return cached.value;
    }
    
    const result = fn(...args) as ReturnType<T>;
    cache.set(key, { value: result, timestamp: now });
    return result;
  }) as T;
}

// Once utility - function that can only be called once
export function once<T extends (...args: unknown[]) => unknown>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;
  
  return ((...args: Parameters<T>) => {
    if (!called) {
      called = true;
      result = fn(...args) as ReturnType<T>;
    }
    return result;
  }) as T;
}

// Lazy evaluation utility
export function lazy<T>(factory: () => T): () => T {
  let cached: T;
  let computed = false;
  
  return () => {
    if (!computed) {
      cached = factory();
      computed = true;
    }
    return cached;
  };
}

// Async lazy evaluation
export function lazyAsync<T>(factory: () => Promise<T>): () => Promise<T> {
  let promise: Promise<T> | null = null;
  
  return () => {
    if (!promise) {
      promise = factory();
    }
    return promise;
  };
}

// Batch function calls
export function batch<T extends (...args: unknown[]) => unknown>(
  fn: T,
  batchSize: number = 10
): (items: Parameters<T>[]) => ReturnType<T>[] {
  return (items: Parameters<T>[]): ReturnType<T>[] => {
    const results: ReturnType<T>[] = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchResults = batch.map(args => fn(...args) as ReturnType<T>);
      results.push(...batchResults);
    }
    
    return results;
  };
}

// Queue function calls
export function createQueue<T extends (...args: unknown[]) => Promise<unknown>>(
  concurrency: number = 1
) {
  const queue: Array<() => Promise<unknown>> = [];
  let running = 0;
  
  const processQueue = async () => {
    if (running >= concurrency || queue.length === 0) {
      return;
    }
    
    running++;
    const task = queue.shift()!;
    
    try {
      await task();
    } finally {
      running--;
      processQueue();
    }
  };
  
  return {
    add: (fn: T, ...args: Parameters<T>): Promise<ReturnType<T>> => {
      return new Promise((resolve, reject) => {
        queue.push(async () => {
          try {
            const result = await fn(...args);
            resolve(result as ReturnType<T>);
          } catch (error) {
            reject(error);
          }
        });
        
        processQueue();
      });
    },
    
    size: () => queue.length,
    running: () => running,
  };
}

// Frame rate controller
export function createFrameRateController(targetFPS: number = 60) {
  const targetFrameTime = 1000 / targetFPS;
  let lastFrameTime = 0;
  
  return (callback: () => void) => {
    const now = performance.now();
    
    if (now - lastFrameTime >= targetFrameTime) {
      lastFrameTime = now;
      callback();
    }
  };
}

// Performance profiler
export class PerformanceProfiler {
  private marks: Map<string, number> = new Map();
  private measures: Map<string, number> = new Map();
  
  mark(name: string): void {
    this.marks.set(name, performance.now());
  }
  
  measure(name: string, startMark?: string, endMark?: string): number {
    const endTime = endMark ? this.marks.get(endMark) : performance.now();
    const startTime = startMark ? this.marks.get(startMark) : this.marks.get(name);
    
    if (startTime === undefined || endTime === undefined) {
      throw new Error(`Mark not found: ${startMark || name}`);
    }
    
    const duration = endTime - startTime;
    this.measures.set(name, duration);
    return duration;
  }
  
  getMeasure(name: string): number | undefined {
    return this.measures.get(name);
  }
  
  getAllMeasures(): Record<string, number> {
    return Object.fromEntries(this.measures);
  }
  
  clear(): void {
    this.marks.clear();
    this.measures.clear();
  }
}

// Memory usage tracker
export function getMemoryUsage(): {
  used: number;
  total: number;
  available: number;
} | null {
  if (typeof window === 'undefined' || !('memory' in performance)) {
    return null;
  }
  
  const memory = (performance as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
  
  if (!memory) {
    return null;
  }
  
  return {
    used: memory.usedJSHeapSize,
    total: memory.totalJSHeapSize,
    available: memory.jsHeapSizeLimit,
  };
}

// Idle callback utility
export function runWhenIdle(
  callback: () => void,
  options: { timeout?: number } = {}
): void {
  if (typeof window === 'undefined') {
    // Server-side: run immediately
    callback();
    return;
  }
  
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, options);
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(callback, 0);
  }
}

// Animation frame utility
export function nextFrame(callback: () => void): void {
  if (typeof window === 'undefined') {
    // Server-side: run immediately
    callback();
    return;
  }
  
  requestAnimationFrame(callback);
}

// Create performance-optimized event listener
export function createOptimizedEventListener(
  element: Window | Element,
  event: string,
  handler: (event: Event) => void,
  options?: {
    throttle?: number;
    debounce?: number;
    passive?: boolean;
  }
): () => void {
  let optimizedHandler = handler;
  
  if (options?.throttle) {
    optimizedHandler = throttle(handler, options.throttle);
  } else if (options?.debounce) {
    optimizedHandler = debounce(handler, options.debounce);
  }
  
  const eventOptions = {
    passive: options?.passive ?? true,
  };
  
  element.addEventListener(event, optimizedHandler as EventListener, eventOptions);
  
  return () => {
    element.removeEventListener(event, optimizedHandler as EventListener);
  };
} 