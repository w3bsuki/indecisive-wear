/**
 * Performance Monitoring and Optimization
 * 
 * This module provides tools for monitoring and optimizing application performance:
 * - Core Web Vitals tracking
 * - Memory usage monitoring
 * - Component render profiling
 * - Bundle size analysis utilities
 */

// export { PerformanceMonitor } from './monitor';
export { CoreWebVitalsMonitor, initCoreWebVitals } from './core-web-vitals';
// export { memoryMonitor } from './memory';
// export { renderProfiler } from './render-profiler';
export type { 
  PerformanceMetrics, 
  WebVitalsMetrics,
  MemoryUsage,
  RenderProfileData 
} from './types'; 