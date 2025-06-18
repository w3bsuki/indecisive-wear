/**
 * Query Provider Component
 * Provides TanStack Query functionality to the application
 */

'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client'
import { useEffect } from 'react'

interface QueryProviderProps {
  children: React.ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  // Use effect to handle online status updates after hydration
  useEffect(() => {
    const updateQueryClientOnlineStatus = () => {
      const isOnline = navigator.onLine
      
      queryClient.setDefaultOptions({
        queries: {
          ...queryClient.getDefaultOptions().queries,
          // Disable network requests when offline
          enabled: isOnline,
          // Don't retry when offline
          retry: isOnline ? 3 : 0,
        },
      })
    }

    // Set initial status
    updateQueryClientOnlineStatus()

    // Listen for online/offline events
    window.addEventListener('online', updateQueryClientOnlineStatus)
    window.addEventListener('offline', updateQueryClientOnlineStatus)

    return () => {
      window.removeEventListener('online', updateQueryClientOnlineStatus)
      window.removeEventListener('offline', updateQueryClientOnlineStatus)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* React Query Devtools removed for production build */}
    </QueryClientProvider>
  )
} 