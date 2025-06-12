import { onCLS, onFCP, onLCP, onTTFB, onINP, type Metric } from 'web-vitals'
import { track } from '@vercel/analytics'

interface VitalsConfig {
  debug?: boolean
  endpoint?: string
  sampleRate?: number
}

interface VitalsMetric extends Metric {
  label: 'web-vital'
  context?: {
    pathname: string
    referrer: string
    connection?: any
    deviceMemory?: number
  }
}

/**
 * Enhanced Web Vitals tracking with analytics integration
 * Monitors Core Web Vitals and sends data to analytics services
 */
export class VitalsTracker {
  private config: VitalsConfig
  private metrics: Map<string, VitalsMetric> = new Map()
  private isTracking = false

  constructor(config: VitalsConfig = {}) {
    this.config = {
      debug: process.env.NODE_ENV === 'development',
      endpoint: '/api/vitals',
      sampleRate: 0.1, // 10% sampling
      ...config
    }
  }

  /**
   * Initialize tracking for all Core Web Vitals
   */
  public init(): void {
    if (this.isTracking || typeof window === 'undefined') return

    this.isTracking = true

    // Track Core Web Vitals
    onCLS(this.handleMetric.bind(this))
    onFCP(this.handleMetric.bind(this))
    onLCP(this.handleMetric.bind(this))
    onTTFB(this.handleMetric.bind(this))
    onINP(this.handleMetric.bind(this))

    if (this.config.debug) {
      // Web Vitals tracking initialized
    }
  }

  /**
   * Handle individual metric collection
   */
  private handleMetric(metric: Metric): void {
    const enhancedMetric: VitalsMetric = {
      ...metric,
      label: 'web-vital',
      context: this.getContext()
    }

    this.metrics.set(metric.name, enhancedMetric)
    
    // Sample and send to analytics
    if (Math.random() < (this.config.sampleRate || 0.1)) {
      this.sendToAnalytics(enhancedMetric)
    }

    if (this.config.debug) {
      // Metric tracked: {metric.name}
    }
  }

  /**
   * Get current page context
   */
  private getContext() {
    if (typeof window === 'undefined') return undefined

    return {
      pathname: window.location.pathname,
      referrer: document.referrer,
      connection: (navigator as any).connection,
      deviceMemory: (navigator as any).deviceMemory
    }
  }

  /**
   * Send metrics to analytics services
   */
  private sendToAnalytics(metric: VitalsMetric): void {
    // Send to Vercel Analytics
    track('Web Vital', {
      name: metric.name,
      value: metric.value,
      rating: this.getRating(metric.name, metric.value),
      pathname: metric.context?.pathname || window.location.pathname
    })

    // Send to custom endpoint if configured
    if (this.config.endpoint) {
      fetch(this.config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric)
      }).catch(error => {
        if (this.config.debug) {
          // Failed to send vitals
        }
      })
    }
  }

  /**
   * Get performance rating based on thresholds
   */
  public getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      CLS: [0.1, 0.25],
      FCP: [1800, 3000],
      LCP: [2500, 4000],
      TTFB: [800, 1800],
      INP: [200, 500]
    }

    const thresholdValues = thresholds[name as keyof typeof thresholds] || [0, 0]
    const [good, poor] = thresholdValues
    
    if (value <= (good || 0)) return 'good'
    if (value <= (poor || 0)) return 'needs-improvement'
    return 'poor'
  }

  /**
   * Get current metrics snapshot
   */
  public getMetrics(): Record<string, VitalsMetric> {
    return Object.fromEntries(this.metrics)
  }

  /**
   * Calculate overall performance score
   */
  public getScore(): number {
    const metrics = this.getMetrics()
    const scores = Object.values(metrics).map(metric => {
      const rating = this.getRating(metric.name, metric.value)
      return rating === 'good' ? 100 : rating === 'needs-improvement' ? 50 : 0
    })

    return scores.length > 0 ? Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length) : 0
  }
}

/**
 * Calculate overall performance score
 */
export function getVitalsScore(): { score: number; breakdown: Record<string, { value: number; rating: string }> } {
  const metrics = vitalsTracker.getMetrics()
  const breakdown: Record<string, { value: number; rating: string }> = {}
  
  Object.entries(metrics).forEach(([name, metric]) => {
    breakdown[name] = {
      value: metric.value,
      rating: vitalsTracker.getRating(metric.name, metric.value)
    }
  })
  
  return {
    score: vitalsTracker.getScore(),
    breakdown
  }
}

// Export singleton instance
export const vitalsTracker = new VitalsTracker()

// Auto-initialize in browser
if (typeof window !== 'undefined') {
  vitalsTracker.init()
}

/**
 * Manual metric tracking for custom events
 */
export function trackCustomMetric(name: string, value: number, unit = 'ms'): void {
  track('custom-metric', {
    name,
    value,
    unit,
    pathname: typeof window !== 'undefined' ? window.location.pathname : 'unknown'
  })
} 