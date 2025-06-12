/**
 * Waitlist Store - Waitlist Management
 * Manages waitlist entries, submissions, and analytics
 */

import { createStore } from '@/lib/stores/utils'
import type { WaitlistState, WaitlistEntry } from '@/lib/types/stores'

const initialState: Omit<WaitlistState, 'addEntry' | 'setStatus' | 'setError' | 'incrementSubmissions'> = {
  entries: [],
  status: 'idle' as const,
  error: null,
  submissionCount: 0,
}

export const useWaitlistStore = createStore<WaitlistState>(
  (set, _get) => ({
    ...initialState,
    
    // Add entry to waitlist
    addEntry: async (entry: WaitlistEntry) => {
      set(() => ({
        status: 'loading' as const,
        error: null
      }))
      
      try {
        // Call the waitlist API
        const response = await fetch('/api/waitlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(entry),
        })
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to join waitlist')
        }
        
        const result = await response.json()
        
        set((state) => ({
          entries: [...state.entries, {
            ...entry,
            // Add any additional data from the API response
          }],
          status: 'success' as const,
          error: null,
          submissionCount: state.submissionCount + 1
        }))
        
        return result
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred'
        
        set(() => ({
          status: 'error' as const,
          error: errorMessage
        }))
        
        throw error
      }
    },
    
    setStatus: (status) => {
      set(() => ({
        status
      }))
    },
    
    setError: (error) => {
      set(() => ({
        error,
        status: error ? 'error' as const : 'idle' as const
      }))
    },
    
    incrementSubmissions: () => {
      set((state) => ({
        submissionCount: state.submissionCount + 1
      }))
    },
  }),
  {
    persist: true,
    persistKey: 'indecisive-wear-waitlist',
    devtools: true
  }
)

// Selectors for waitlist state
export const useWaitlistEntries = () => useWaitlistStore(state => state.entries)
export const useWaitlistStatus = () => useWaitlistStore(state => state.status)
export const useWaitlistError = () => useWaitlistStore(state => state.error)
export const useWaitlistSubmissionCount = () => useWaitlistStore(state => state.submissionCount)

// Computed selectors
export const useIsWaitlistLoading = () => useWaitlistStore(state => state.status === 'loading')
export const useIsWaitlistSuccess = () => useWaitlistStore(state => state.status === 'success')
export const useIsWaitlistError = () => useWaitlistStore(state => state.status === 'error')

export const useHasJoinedWaitlist = (email?: string) => useWaitlistStore(state => {
  if (!email) return false
  return state.entries.some(entry => entry.email.toLowerCase() === email.toLowerCase())
})

// Analytics selectors
export const useWaitlistAnalytics = () => useWaitlistStore(state => {
  const entries = state.entries
  
  return {
    totalEntries: entries.length,
    submissionCount: state.submissionCount,
    sourcesBreakdown: entries.reduce((acc, entry) => {
      acc[entry.source] = (acc[entry.source] || 0) + 1
      return acc
    }, {} as Record<string, number>),
    stylePreferencesBreakdown: entries.reduce((acc, entry) => {
      acc[entry.stylePreference] = (acc[entry.stylePreference] || 0) + 1
      return acc
    }, {} as Record<string, number>),
    marketingConsentRate: entries.length > 0 
      ? (entries.filter(entry => entry.marketingConsent).length / entries.length) * 100
      : 0,
    socialHandlesProvided: entries.filter(entry => 
      entry.socialHandles.instagram || entry.socialHandles.tiktok
    ).length,
  }
})

// Action selectors
export const useWaitlistActions = () => useWaitlistStore(state => ({
  addEntry: state.addEntry,
  setStatus: state.setStatus,
  setError: state.setError,
  incrementSubmissions: state.incrementSubmissions,
}))

// Integration helpers for existing waitlist form
export const useWaitlistIntegration = () => {
  const actions = useWaitlistActions()
  const status = useWaitlistStatus()
  const error = useWaitlistError()
  
  return {
    submitEntry: actions.addEntry,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
    error,
    resetStatus: () => actions.setStatus('idle'),
    clearError: () => actions.setError(null),
  }
} 