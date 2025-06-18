/**
 * App Store - Global Application State
 * Manages app-wide state including feature flags, device detection, and performance metrics
 */

import { createStore } from '@/lib/stores/utils'
import type { AppState, FeatureFlags, PerformanceMetrics } from '@/lib/types/stores'

const defaultFeatureFlags: FeatureFlags = {
  enableSearch: true,
  enableCart: true,
  enableWaitlist: true,
  enableSocialLogin: false, // Disabled by default
  enablePWA: true,
  enableAnalytics: true,
}

const defaultMetrics: PerformanceMetrics = {
  loadTime: 0,
  firstContentfulPaint: 0,
  largestContentfulPaint: 0,
  cumulativeLayoutShift: 0,
  firstInputDelay: 0,
  interactionToNextPaint: 0,
  score: 0,
}

const initialState: Omit<AppState, 'setOnlineStatus' | 'setDeviceType' | 'updateFeatureFlags' | 'updateMetrics'> = {
  version: '1.0.0',
  isOnline: true,
  deviceType: 'desktop' as const,
  features: defaultFeatureFlags,
  metrics: defaultMetrics,
}

export const useAppStore = createStore<AppState>(
  (set, _get) => ({
    ...initialState,
    
    setOnlineStatus: (online: boolean) => {
      set(() => ({
        isOnline: online
      }))
    },
    
    setDeviceType: (type: 'mobile' | 'tablet' | 'desktop') => {
      set(() => ({
        deviceType: type
      }))
    },
    
    updateFeatureFlags: (flags: Partial<FeatureFlags>) => {
      set((state) => ({
        features: {
          ...state.features,
          ...flags
        }
      }))
    },
    
    updateMetrics: (metrics: Partial<PerformanceMetrics>) => {
      set((state) => ({
        metrics: {
          ...state.metrics,
          ...metrics
        }
      }))
    },
  }),
  {
    persist: true,
    persistKey: 'indecisive-wear-app',
    devtools: true
  }
)

// Initialize app state with environment checks (client-side only)
if (typeof window !== 'undefined') {
  // Delay initialization to avoid SSR issues
  setTimeout(() => {
    // Set initial online status
    useAppStore.getState().setOnlineStatus(navigator.onLine)
    
    // Listen for online/offline events
    window.addEventListener('online', () => {
      useAppStore.getState().setOnlineStatus(true)
    })
    
    window.addEventListener('offline', () => {
      useAppStore.getState().setOnlineStatus(false)
    })
    
    // Detect device type based on screen size and user agent
    const detectDeviceType = () => {
      const width = window.innerWidth
      const userAgent = navigator.userAgent.toLowerCase()
      
      if (width < 768 || /mobile|android|iphone|ipad|phone/i.test(userAgent)) {
        return 'mobile'
      } else if (width < 1024) {
        return 'tablet'
      } else {
        return 'desktop'
      }
    }
    
    // Set initial device type
    useAppStore.getState().setDeviceType(detectDeviceType())
    
    // Listen for resize events to update device type
    let resizeTimeout: NodeJS.Timeout
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        useAppStore.getState().setDeviceType(detectDeviceType())
      }, 150)
    })
    
    // Measure initial performance metrics
    if ('performance' in window && 'getEntriesByType' in performance) {
      const measurePerformance = () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        const paint = performance.getEntriesByType('paint')
        
        if (navigation) {
          const metrics: Partial<PerformanceMetrics> = {
            loadTime: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
          }
          
          // First Contentful Paint
          const fcp = paint.find(entry => entry.name === 'first-contentful-paint')
          if (fcp) {
            metrics.firstContentfulPaint = Math.round(fcp.startTime)
          }
          
          useAppStore.getState().updateMetrics(metrics)
        }
      }
      
      // Measure after page load
      if (document.readyState === 'complete') {
        measurePerformance()
      } else {
        window.addEventListener('load', measurePerformance)
      }
    }
  }, 0)
}

// Selectors for app state
export const useAppVersion = () => useAppStore(state => state.version)
export const useIsOnline = () => useAppStore(state => state.isOnline)
export const useDeviceType = () => useAppStore(state => state.deviceType)
export const useFeatureFlags = () => useAppStore(state => state.features)
export const usePerformanceMetrics = () => useAppStore(state => state.metrics)

// Individual feature flag selectors
export const useIsSearchEnabled = () => useAppStore(state => state.features.enableSearch)
export const useIsCartEnabled = () => useAppStore(state => state.features.enableCart)
export const useIsWaitlistEnabled = () => useAppStore(state => state.features.enableWaitlist)
export const useIsSocialLoginEnabled = () => useAppStore(state => state.features.enableSocialLogin)
export const useIsPWAEnabled = () => useAppStore(state => state.features.enablePWA)
export const useIsAnalyticsEnabled = () => useAppStore(state => state.features.enableAnalytics)

// Device type checks
export const useIsMobile = () => useAppStore(state => state.deviceType === 'mobile')
export const useIsTablet = () => useAppStore(state => state.deviceType === 'tablet')
export const useIsDesktop = () => useAppStore(state => state.deviceType === 'desktop')
export const useIsMobileOrTablet = () => useAppStore(state => 
  state.deviceType === 'mobile' || state.deviceType === 'tablet'
)

// Performance checks
export const useIsGoodPerformance = () => useAppStore(state => {
  const { firstContentfulPaint, largestContentfulPaint, cumulativeLayoutShift, interactionToNextPaint } = state.metrics
  return (
    firstContentfulPaint < 2500 && // Good FCP is < 2.5s
    largestContentfulPaint < 4000 && // Good LCP is < 4s  
    cumulativeLayoutShift < 0.1 && // Good CLS is < 0.1
    interactionToNextPaint < 200 // Good INP is < 200ms (NEW for 2025)
  )
})

// New performance grade calculator
export const usePerformanceGrade = () => useAppStore(state => {
  const { score } = state.metrics
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
})

// Core Web Vitals status
export const useCoreWebVitalsStatus = () => useAppStore(state => {
  const { largestContentfulPaint, firstInputDelay, cumulativeLayoutShift, interactionToNextPaint } = state.metrics
  return {
    lcp: largestContentfulPaint < 2500 ? 'good' : largestContentfulPaint < 4000 ? 'needs-improvement' : 'poor',
    fid: firstInputDelay < 100 ? 'good' : firstInputDelay < 300 ? 'needs-improvement' : 'poor',
    cls: cumulativeLayoutShift < 0.1 ? 'good' : cumulativeLayoutShift < 0.25 ? 'needs-improvement' : 'poor',
    inp: interactionToNextPaint < 200 ? 'good' : interactionToNextPaint < 500 ? 'needs-improvement' : 'poor',
  }
})

// Action selectors
export const useAppActions = () => useAppStore(state => ({
  setOnlineStatus: state.setOnlineStatus,
  setDeviceType: state.setDeviceType,
  updateFeatureFlags: state.updateFeatureFlags,
  updateMetrics: state.updateMetrics,
}))

// Utility functions for feature flag management
export const useFeatureFlag = (flag: keyof FeatureFlags) => {
  return useAppStore(state => state.features[flag])
}

export const useConditionalRender = (flag: keyof FeatureFlags) => {
  const isEnabled = useFeatureFlag(flag)
  return (children: React.ReactNode) => isEnabled ? children : null
} 