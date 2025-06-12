/**
 * Monitoring Store - Production Monitoring Data
 * 
 * Manages production dashboard data, vitals, errors, and system health
 * Replaces the useDashboardData hook for better state standardization
 */

import { createStore } from '@/lib/stores/utils'
import { getVitalsScore, trackCustomMetric } from '@/lib/performance/vitals'
import type { MonitoringState, VitalsData, ErrorSummary, SystemHealth } from '@/lib/types/stores'

const defaultVitalsData: VitalsData = {
  score: 0,
  breakdown: {}
}

const defaultErrorSummary: ErrorSummary = {
  total: 12,
  lastHour: 2,
  critical: 1,
  resolved: 9
}

const defaultSystemHealth: SystemHealth = {
  apiEndpoints: 'healthy',
  database: 'healthy',
  cdn: 'healthy',
  externalApis: 'slow',
  cpuUsage: 23,
  memoryUsage: 67,
  bandwidth: 45
}

const initialState: Omit<MonitoringState, 'loadVitalsData' | 'refreshData' | 'updateVitals' | 'updateErrors' | 'updateSystemHealth' | 'startAutoRefresh' | 'stopAutoRefresh'> = {
  vitalsData: defaultVitalsData,
  errorSummary: defaultErrorSummary,
  systemHealth: defaultSystemHealth,
  isLoading: false,
  lastUpdated: new Date(),
  autoRefreshInterval: null,
  status: 'idle' as const,
}

export const useMonitoringStore = createStore<MonitoringState>(
  (set, get) => ({
    ...initialState,
    
    // Load vitals data
    loadVitalsData: async () => {
      set(() => ({ isLoading: true, status: 'loading' as const }))
      
      try {
        // Simulate loading time for better UX
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const data = getVitalsScore()
        
        set(() => ({
          vitalsData: data || defaultVitalsData,
          lastUpdated: new Date(),
          isLoading: false,
          status: 'success' as const
        }))
      } catch (error) {
        // Failed to load vitals data
        set(() => ({
          isLoading: false,
          status: 'error' as const
        }))
      }
    },
    
    // Refresh data (manual)
    refreshData: () => {
      const data = getVitalsScore()
      set(() => ({
        vitalsData: data || defaultVitalsData,
        lastUpdated: new Date(),
        status: 'success' as const
      }))
      
      // Track manual refresh for analytics
      trackCustomMetric('dashboard-refresh', 1, 'count')
    },
    
    // Update vitals data directly
    updateVitals: (vitals: Partial<VitalsData>) => {
      set((state) => ({
        vitalsData: {
          ...state.vitalsData,
          ...vitals
        },
        lastUpdated: new Date()
      }))
    },
    
    // Update error summary
    updateErrors: (errors: Partial<ErrorSummary>) => {
      set((state) => ({
        errorSummary: {
          ...state.errorSummary,
          ...errors
        },
        lastUpdated: new Date()
      }))
    },
    
    // Update system health
    updateSystemHealth: (health: Partial<SystemHealth>) => {
      set((state) => ({
        systemHealth: {
          ...state.systemHealth,
          ...health
        },
        lastUpdated: new Date()
      }))
    },
    
    // Start auto-refresh (30 seconds)
    startAutoRefresh: () => {
      const state = get()
      
      // Clear existing interval if any
      if (state.autoRefreshInterval) {
        clearInterval(state.autoRefreshInterval)
      }
      
      // Set up new interval
      const interval = setInterval(() => {
        const currentState = get()
        if (currentState.status !== 'loading') {
          currentState.loadVitalsData()
        }
      }, 30000) // 30 seconds
      
      set(() => ({ autoRefreshInterval: interval }))
    },
    
    // Stop auto-refresh
    stopAutoRefresh: () => {
      const state = get()
      if (state.autoRefreshInterval) {
        clearInterval(state.autoRefreshInterval)
        set(() => ({ autoRefreshInterval: null }))
      }
    },
  }),
  {
    persist: false, // Don't persist monitoring data as it should be fresh
    persistKey: 'indecisive-wear-monitoring',
    devtools: true
  }
)

// Selector hooks for better component integration
export const useVitalsData = () => useMonitoringStore(state => state.vitalsData)
export const useErrorSummary = () => useMonitoringStore(state => state.errorSummary)
export const useSystemHealth = () => useMonitoringStore(state => state.systemHealth)
export const useMonitoringStatus = () => useMonitoringStore(state => state.status)
export const useIsMonitoringLoading = () => useMonitoringStore(state => state.isLoading)
export const useLastUpdated = () => useMonitoringStore(state => state.lastUpdated)

// Action hooks
export const useMonitoringActions = () => {
  const store = useMonitoringStore()
  return {
    loadVitalsData: store.loadVitalsData,
    refreshData: store.refreshData,
    updateVitals: store.updateVitals,
    updateErrors: store.updateErrors,
    updateSystemHealth: store.updateSystemHealth,
    startAutoRefresh: store.startAutoRefresh,
    stopAutoRefresh: store.stopAutoRefresh,
  }
}

// Initialize monitoring when store is created (client-side only)
if (typeof window !== 'undefined') {
  setTimeout(() => {
    const store = useMonitoringStore.getState()
    store.loadVitalsData()
    store.startAutoRefresh()
  }, 100)
}