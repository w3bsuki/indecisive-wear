/**
 * Performance Monitoring Types
 * Enhanced for 2025 with INP support and performance budgets
 */

// Core Web Vitals metrics (updated for 2025)
export interface WebVitalsMetrics {
  // Cumulative Layout Shift
  cls: number;
  // First Input Delay
  fid: number;
  // Interaction to Next Paint (NEW for 2025)
  inp: number;
  // Largest Contentful Paint
  lcp: number;
  // First Contentful Paint
  fcp: number;
  // Time to First Byte
  ttfb: number;
}

// Memory usage tracking
export interface MemoryUsage {
  used: number;      // Used JS heap size
  total: number;     // Total JS heap size
  limit: number;     // JS heap size limit
  timestamp: number;
}

// Render profiling data
export interface RenderProfileData {
  componentName: string;
  renderTime: number;
  renderCount: number;
  lastRender: number;
  averageRenderTime: number;
}

// Performance navigation timing
export interface NavigationTiming {
  domContentLoaded: number;
  loadComplete: number;
  firstPaint: number;
  firstContentfulPaint: number;
  firstMeaningfulPaint?: number;
}

// Bundle size analysis
export interface BundleAnalysis {
  totalSize: number;
  gzippedSize: number;
  chunks: Array<{
    name: string;
    size: number;
    modules: string[];
  }>;
}

// Performance thresholds for scoring
export interface PerformanceThresholds {
  cls: { good: number; poor: number };
  fid: { good: number; poor: number };
  inp: { good: number; poor: number };
  lcp: { good: number; poor: number };
  fcp: { good: number; poor: number };
  ttfb: { good: number; poor: number };
  memory: { good: number; poor: number };
}

// Performance event types
export type PerformanceEventType = 
  | 'web-vital'
  | 'memory-warning'
  | 'slow-render'
  | 'large-bundle'
  | 'navigation-start'
  | 'navigation-end';

export interface PerformanceEvent {
  type: PerformanceEventType;
  timestamp: number;
  data: Record<string, unknown>;
  severity: 'info' | 'warning' | 'error';
}

// Performance budget monitoring
export interface ResourceBudget {
  bundleSize: number; // KB
  imageSize: number;  // KB per image
  totalImages: number; // Total number of images
  jsSize: number;     // KB for JS bundles
  cssSize: number;    // KB for CSS
}

// Performance optimization recommendation
export interface PerformanceOptimization {
  metric: string;
  issue: string;
  recommendation: string;
  impact: 'high' | 'medium' | 'low';
  timestamp?: number;
}

// Performance report
export interface PerformanceReport {
  score: number;
  metrics: Partial<WebVitalsMetrics>;
  optimizations: PerformanceOptimization[];
  budgetViolations: string[];
  timestamp: number;
}

// Store metrics for app state
export interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  interactionToNextPaint: number;
  timeToFirstByte: number;
  score: number;
}

// Navigation performance
export interface NavigationMetrics {
  domContentLoaded: number;
  domComplete: number;
  loadComplete: number;
  redirectTime: number;
  dnsTime: number;
  connectTime: number;
  requestTime: number;
  responseTime: number;
}

// Resource loading metrics
export interface ResourceMetrics {
  totalSize: number;
  jsSize: number;
  cssSize: number;
  imageSize: number;
  fontSize: number;
  resourceCount: number;
}

// Memory usage metrics
export interface MemoryMetrics {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
  percentage: number;
}

// Combined performance data
export interface PerformanceData {
  vitals: Partial<WebVitalsMetrics>;
  navigation: Partial<NavigationMetrics>;
  resources: Partial<ResourceMetrics>;
  memory: Partial<MemoryMetrics>;
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
} 