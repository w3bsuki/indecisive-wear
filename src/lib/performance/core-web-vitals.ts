/**
 * Core Web Vitals Monitoring
 * 
 * Tracks the essential performance metrics that Google uses for ranking
 * Enhanced for 2025 with INP support and performance budgets
 */

import type { WebVitalsMetrics, PerformanceThresholds } from './types';

// Extended Performance Entry interfaces for specific metrics
interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

interface EventTimingEntry extends PerformanceEntry {
  processingEnd: number;
}

// 2025 updated thresholds for Core Web Vitals (more strict)
const THRESHOLDS: PerformanceThresholds = {
  cls: { good: 0.1, poor: 0.25 },      // Cumulative Layout Shift
  fid: { good: 100, poor: 300 },       // First Input Delay (ms)
  inp: { good: 200, poor: 500 },       // Interaction to Next Paint (ms) - NEW
  lcp: { good: 2500, poor: 4000 },     // Largest Contentful Paint (ms)
  fcp: { good: 1800, poor: 3000 },     // First Contentful Paint (ms)
  ttfb: { good: 800, poor: 1800 },     // Time to First Byte (ms)
  memory: { good: 50, poor: 80 }, // Memory usage (percentage)
};

// Performance budget thresholds
const PERFORMANCE_BUDGETS = {
  bundleSize: 200, // KB
  imageSize: 100,  // KB per image
  totalImages: 50, // Total number of images
  jsSize: 150,     // KB for JS bundles
  cssSize: 50,     // KB for CSS
} as const;

interface PerformanceOptimization {
  metric: string;
  issue: string;
  recommendation: string;
  impact: 'high' | 'medium' | 'low';
}

class CoreWebVitalsMonitor {
  private metrics: Partial<WebVitalsMetrics> = {};
  private observers: PerformanceObserver[] = [];
  private callbacks: Array<(metrics: WebVitalsMetrics) => void> = [];
  private optimizations: PerformanceOptimization[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      this.setupObservers();
      this.monitorResourceBudgets();
    }
  }

  /**
   * Set up performance observers for Core Web Vitals
   */
  private setupObservers(): void {
    // Largest Contentful Paint (LCP)
    this.observeMetric('largest-contentful-paint', (entry) => {
      this.metrics.lcp = entry.startTime;
      this.analyzeOptimizations('lcp', entry.startTime);
      this.checkAndEmitMetrics();
    });

    // First Input Delay (FID)
    this.observeMetric('first-input', (entry) => {
      const fidEntry = entry as FirstInputEntry;
      this.metrics.fid = fidEntry.processingStart - fidEntry.startTime;
      this.analyzeOptimizations('fid', this.metrics.fid);
      this.checkAndEmitMetrics();
    });

    // Interaction to Next Paint (INP) - NEW for 2025
    this.observeInteractionToNextPaint();

    // Cumulative Layout Shift (CLS)
    this.observeMetric('layout-shift', (entry) => {
      const clsEntry = entry as LayoutShiftEntry;
      if (!clsEntry.hadRecentInput) {
        this.metrics.cls = (this.metrics.cls || 0) + clsEntry.value;
        this.analyzeOptimizations('cls', this.metrics.cls);
        this.checkAndEmitMetrics();
      }
    });

    // First Contentful Paint (FCP)
    this.observeMetric('paint', (entry) => {
      if (entry.name === 'first-contentful-paint') {
        this.metrics.fcp = entry.startTime;
        this.analyzeOptimizations('fcp', entry.startTime);
        this.checkAndEmitMetrics();
      }
    });

    // Navigation timing for TTFB
    this.observeNavigation();
  }

  /**
   * Monitor Interaction to Next Paint (INP) - Critical for 2025
   */
  private observeInteractionToNextPaint(): void {
    let longestINP = 0;
    
    this.observeMetric('event', (entry) => {
      // Filter for interaction events
      if (['pointerdown', 'pointerup', 'click', 'keydown', 'keyup'].includes(entry.name)) {
        const eventEntry = entry as EventTimingEntry;
        const inp = eventEntry.processingEnd - eventEntry.startTime;
        if (inp > longestINP) {
          longestINP = inp;
          this.metrics.inp = inp;
          this.analyzeOptimizations('inp', inp);
          this.checkAndEmitMetrics();
        }
      }
    });
  }

  /**
   * Monitor resource budgets
   */
  private monitorResourceBudgets(): void {
    if ('navigation' in performance) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        let totalJSSize = 0;
        let totalCSSSize = 0;
        let totalImageSize = 0;
        let imageCount = 0;

        entries.forEach((entry) => {
          const resource = entry as PerformanceResourceTiming;
          const size = resource.transferSize || 0;
          
          if (resource.name.includes('.js')) {
            totalJSSize += size;
          } else if (resource.name.includes('.css')) {
            totalCSSSize += size;
          } else if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(resource.name)) {
            totalImageSize += size;
            imageCount++;
          }
        });

        // Check budgets and add optimizations
        if (totalJSSize > PERFORMANCE_BUDGETS.jsSize * 1024) {
          this.optimizations.push({
            metric: 'bundle-size',
            issue: `JS bundle size (${Math.round(totalJSSize / 1024)}KB) exceeds budget (${PERFORMANCE_BUDGETS.jsSize}KB)`,
            recommendation: 'Consider code splitting, tree shaking, or dynamic imports',
            impact: 'high'
          });
        }

        if (totalImageSize > PERFORMANCE_BUDGETS.imageSize * 1024 * imageCount) {
          this.optimizations.push({
            metric: 'image-optimization',
            issue: `Average image size too large`,
            recommendation: 'Use Next.js Image component with modern formats (WebP, AVIF)',
            impact: 'medium'
          });
        }
      });

      observer.observe({ type: 'resource', buffered: true });
      this.observers.push(observer);
    }
  }

  /**
   * Analyze performance and suggest optimizations
   */
  private analyzeOptimizations(metric: string, value: number): void {
    const threshold = THRESHOLDS[metric as keyof PerformanceThresholds];
    if (!threshold) return;

    if (value > threshold.poor) {
      let recommendation = '';
      
      switch (metric) {
        case 'lcp':
          recommendation = 'Optimize largest content element: use next/image, preload critical resources, reduce server response time';
          break;
        case 'fid':
          recommendation = 'Reduce JavaScript execution time: split bundles, defer non-critical JS, use web workers';
          break;
        case 'inp':
          recommendation = 'Optimize interaction handling: debounce events, use CSS transforms, avoid layout thrashing';
          break;
        case 'cls':
          recommendation = 'Prevent layout shifts: set image dimensions, avoid dynamic content insertion, reserve space for ads';
          break;
        case 'fcp':
          recommendation = 'Speed up initial render: inline critical CSS, preload fonts, optimize server response';
          break;
      }

      if (recommendation) {
        this.optimizations.push({
          metric,
          issue: `${metric.toUpperCase()} (${Math.round(value)}${metric === 'cls' ? '' : 'ms'}) exceeds threshold`,
          recommendation,
          impact: value > threshold.poor * 1.5 ? 'high' : 'medium'
        });
      }
    }
  }

  /**
   * Observe specific performance metric
   */
  private observeMetric(type: string, callback: (entry: PerformanceEntry) => void): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(callback);
      });

      observer.observe({ type, buffered: true });
      this.observers.push(observer);
    } catch (error) {
      // Failed to observe metric
    }
  }

  /**
   * Observe navigation timing for TTFB
   */
  private observeNavigation(): void {
    if ('navigation' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
        this.analyzeOptimizations('ttfb', this.metrics.ttfb);
        this.checkAndEmitMetrics();
      }
    }
  }

  /**
   * Check if we have enough metrics and emit them
   */
  private checkAndEmitMetrics(): void {
    const requiredMetrics = ['lcp', 'fcp', 'ttfb'] as const;
    const hasRequiredMetrics = requiredMetrics.every(metric => 
      this.metrics[metric] !== undefined
    );

    if (hasRequiredMetrics) {
      const completeMetrics = this.metrics as WebVitalsMetrics;
      this.callbacks.forEach(callback => callback(completeMetrics));
    }
  }

  /**
   * Subscribe to metrics updates
   */
  onMetricsUpdate(callback: (metrics: WebVitalsMetrics) => void): () => void {
    this.callbacks.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  /**
   * Get current metrics
   */
  getMetrics(): Partial<WebVitalsMetrics> {
    return { ...this.metrics };
  }

  /**
   * Get performance score (0-100) - Updated for 2025
   */
  getScore(): number {
    const scores: number[] = [];

    if (this.metrics.lcp !== undefined) {
      scores.push(this.getMetricScore('lcp', this.metrics.lcp));
    }
    if (this.metrics.fid !== undefined) {
      scores.push(this.getMetricScore('fid', this.metrics.fid));
    }
    if (this.metrics.inp !== undefined) {
      scores.push(this.getMetricScore('inp', this.metrics.inp));
    }
    if (this.metrics.cls !== undefined) {
      scores.push(this.getMetricScore('cls', this.metrics.cls));
    }
    if (this.metrics.fcp !== undefined) {
      scores.push(this.getMetricScore('fcp', this.metrics.fcp));
    }

    return scores.length > 0 
      ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
      : 0;
  }

  /**
   * Get optimization recommendations
   */
  getOptimizations(): PerformanceOptimization[] {
    return [...this.optimizations];
  }

  /**
   * Clear optimization recommendations
   */
  clearOptimizations(): void {
    this.optimizations = [];
  }

  /**
   * Get score for individual metric
   */
  private getMetricScore(metric: string, value: number): number {
    const threshold = THRESHOLDS[metric as keyof PerformanceThresholds];
    if (!threshold) return 100;

    if (value <= threshold.good) return 100;
    if (value >= threshold.poor) return 0;
    
    // Linear interpolation between good and poor
    const range = threshold.poor - threshold.good;
    const position = value - threshold.good;
    return Math.max(0, Math.round(100 - (position / range) * 100));
  }

  /**
   * Clean up observers
   */
  disconnect(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.callbacks = [];
  }
}

// Export singleton instance
export const coreWebVitalsMonitor = new CoreWebVitalsMonitor();

// Export utility functions
export function initCoreWebVitals(): void {
  // Monitor is automatically initialized
}

export function getCoreWebVitalsScore(): number {
  return coreWebVitalsMonitor.getScore();
}

export function getCoreWebVitalsOptimizations(): PerformanceOptimization[] {
  return coreWebVitalsMonitor.getOptimizations();
}

export { CoreWebVitalsMonitor, THRESHOLDS, PERFORMANCE_BUDGETS };
export type { PerformanceOptimization }; 