/**
 * Waitlist Query Hooks
 * TanStack Query hooks for waitlist operations with Zustand integration
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys, handleQueryError } from '@/lib/query-client'
import { useWaitlistActions, useUIActions } from '@/stores'
import type { WaitlistEntry } from '@/lib/types/stores'
import type { WaitlistSignupRequest, WaitlistSignupResponse } from '@/lib/types/waitlist'

// Legacy type for backwards compatibility
interface LegacyWaitlistResponse {
  success: boolean
  message: string
  data?: {
    id: string
    position?: number
    totalEntries?: number
  }
}

interface WaitlistAnalytics {
  totalEntries: number
  recentEntries: number
  conversionRate: number
  topSources: Array<{ source: string; count: number }>
  topPreferences: Array<{ preference: string; count: number }>
}

// Submit waitlist entry mutation
export const useWaitlistSubmission = () => {
  const queryClient = useQueryClient()
  const { addEntry, setStatus, setError } = useWaitlistActions()
  const { addToast } = useUIActions()

  return useMutation<WaitlistSignupResponse, Error, WaitlistSignupRequest>({
    mutationFn: async (entry: WaitlistSignupRequest) => {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      })

      const data: WaitlistSignupResponse = await response.json()

      if (!data.success) {
        throw new Error(data.message || data.error || 'Failed to join waitlist')
      }

      return data
    },
    onMutate: () => {
      // Set loading state in store
      setStatus('loading')
      setError(null)
    },
    onSuccess: (data, entry) => {
      // Update store state
      setStatus('success')
      setError(null)
      
      // Show success toast
      addToast({
        type: 'success',
        title: 'Welcome to the waitlist!',
        description: data.message,
      })
      
      // Invalidate and refetch waitlist queries
      queryClient.invalidateQueries({ queryKey: queryKeys.waitlist.all })
    },
    onError: (error) => {
      const errorMessage = handleQueryError(error)
      
      // Update store state
      setStatus('error')
      setError(errorMessage)
      
      // Show error toast
      addToast({
        type: 'error',
        title: 'Failed to join waitlist',
        description: errorMessage,
      })
    },
  })
}

// Check waitlist status for a specific email
export const useWaitlistStatus = (email?: string) => {
  return useQuery({
    queryKey: queryKeys.waitlist.status(email || ''),
    queryFn: async () => {
      if (!email) throw new Error('Email is required')
      
      const response = await fetch(`/api/waitlist/status?email=${encodeURIComponent(email)}`)
      
      if (!response.ok) {
        throw new Error('Failed to check waitlist status')
      }
      
      return response.json()
    },
    enabled: !!email,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// Get waitlist analytics (admin/internal use)
export const useWaitlistAnalytics = () => {
  return useQuery<WaitlistAnalytics>({
    queryKey: queryKeys.waitlist.analytics(),
    queryFn: async () => {
      const response = await fetch('/api/waitlist/analytics')
      
      if (!response.ok) {
        throw new Error('Failed to fetch waitlist analytics')
      }
      
      return response.json()
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  })
}

// Get all waitlist entries (admin/internal use)
export const useWaitlistEntries = (page = 1, limit = 50) => {
  return useQuery({
    queryKey: [...queryKeys.waitlist.entries(), page, limit],
    queryFn: async () => {
      const response = await fetch(`/api/waitlist/entries?page=${page}&limit=${limit}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch waitlist entries')
      }
      
      return response.json()
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// Export waitlist data mutation (admin use)
export const useWaitlistExport = () => {
  const { addToast } = useUIActions()

  return useMutation<Blob, Error, { format: 'csv' | 'json' }>({
    mutationFn: async ({ format }) => {
      const response = await fetch(`/api/waitlist/export?format=${format}`)
      
      if (!response.ok) {
        throw new Error('Failed to export waitlist data')
      }
      
      return response.blob()
    },
    onSuccess: (blob, { format }) => {
      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `waitlist-export-${Date.now()}.${format}`
      link.click()
      window.URL.revokeObjectURL(url)
      
      addToast({
        type: 'success',
        title: 'Export completed',
        description: `Waitlist data exported as ${format.toUpperCase()}`,
      })
    },
    onError: (error) => {
      const errorMessage = handleQueryError(error)
      
      addToast({
        type: 'error',
        title: 'Export failed',
        description: errorMessage,
      })
    },
  })
}

// Simple hook for waitlist submission (most common use case)
export const useWaitlistSubmit = () => {
  const mutation = useWaitlistSubmission()
  
  return {
    submit: mutation.mutate,
    submitAsync: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
    isSuccess: mutation.isSuccess,
  }
}

// Combined hook for waitlist operations
export const useWaitlist = () => {
  const submission = useWaitlistSubmission()
  const analytics = useWaitlistAnalytics()
  const exportMutation = useWaitlistExport()
  
  return {
    // Mutations
    submit: submission.mutate,
    submitAsync: submission.mutateAsync,
    export: exportMutation.mutate,
    
    // States
    isSubmitting: submission.isPending,
    isExporting: exportMutation.isPending,
    isLoadingAnalytics: analytics.isLoading,
    
    // Data
    analytics: analytics.data,
    
    // Errors
    submissionError: submission.error,
    analyticsError: analytics.error,
    exportError: exportMutation.error,
    
    // Reset functions
    resetSubmission: submission.reset,
    resetExport: exportMutation.reset,
  }
} 