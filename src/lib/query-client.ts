/**
 * TanStack Query Client Configuration
 * Optimized client for server state management with caching and error handling
 */

import { QueryClient, DefaultOptions } from '@tanstack/react-query'

// Default query options
const defaultOptions: DefaultOptions = {
  queries: {
    // Cache data for 5 minutes
    staleTime: 1000 * 60 * 5,
    // Keep data in cache for 10 minutes
    gcTime: 1000 * 60 * 10,
    // Retry failed requests 3 times
    retry: 3,
    // Retry with exponential backoff
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    // Refetch on window focus for important data
    refetchOnWindowFocus: false,
    // Refetch on reconnect
    refetchOnReconnect: true,
    // Don't refetch on mount if data is fresh
    refetchOnMount: true,
  },
  mutations: {
    // Retry failed mutations once
    retry: 1,
    // Retry delay for mutations
    retryDelay: 1000,
  },
}

// Create query client instance
export const queryClient = new QueryClient({
  defaultOptions,
})

// Query keys factory for consistent key management
export const queryKeys = {
  // User queries
  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
    preferences: () => [...queryKeys.user.all, 'preferences'] as const,
  },
  
  // Waitlist queries
  waitlist: {
    all: ['waitlist'] as const,
    entries: () => [...queryKeys.waitlist.all, 'entries'] as const,
    analytics: () => [...queryKeys.waitlist.all, 'analytics'] as const,
    status: (email: string) => [...queryKeys.waitlist.all, 'status', email] as const,
  },
  
  // Product queries (for future e-commerce)
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.products.lists(), filters] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
  },
  
  // Search queries
  search: {
    all: ['search'] as const,
    results: (query: string) => [...queryKeys.search.all, 'results', query] as const,
  },
  
  // Analytics queries
  analytics: {
    all: ['analytics'] as const,
    performance: () => [...queryKeys.analytics.all, 'performance'] as const,
    usage: () => [...queryKeys.analytics.all, 'usage'] as const,
  },
} as const

// Query client error handler
export const handleQueryError = (error: Error) => {
  // You can integrate with your error tracking service here
  // e.g., Sentry, LogRocket, etc.
  
  // Show user-friendly error messages based on error type
  if (error.message.includes('Network Error')) {
    // Handle network errors
    return 'Please check your internet connection and try again.'
  } else if (error.message.includes('Unauthorized')) {
    // Handle auth errors
    return 'You need to log in to access this feature.'
  } else if (error.message.includes('Forbidden')) {
    // Handle permission errors
    return 'You do not have permission to perform this action.'
  } else if (error.message.includes('Not Found')) {
    // Handle 404 errors
    return 'The requested resource was not found.'
  } else {
    // Generic error message
    return 'Something went wrong. Please try again later.'
  }
}

// Utility functions for common query patterns
export const createInfiniteQueryOptions = <T>(
  queryKey: readonly unknown[],
  queryFn: ({ pageParam }: { pageParam: number }) => Promise<T>,
  getNextPageParam?: (lastPage: T, allPages: T[]) => number | undefined
) => ({
  queryKey,
  queryFn,
  getNextPageParam: getNextPageParam || (() => undefined),
  initialPageParam: 1,
  staleTime: 1000 * 60 * 5, // 5 minutes
  gcTime: 1000 * 60 * 10, // 10 minutes
})

// Query invalidation helpers
export const invalidateQueries = {
  user: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.all }),
  waitlist: () => queryClient.invalidateQueries({ queryKey: queryKeys.waitlist.all }),
  products: () => queryClient.invalidateQueries({ queryKey: queryKeys.products.all }),
  search: () => queryClient.invalidateQueries({ queryKey: queryKeys.search.all }),
  analytics: () => queryClient.invalidateQueries({ queryKey: queryKeys.analytics.all }),
  all: () => queryClient.invalidateQueries(),
}

// Prefetch helpers
export const prefetchQueries = {
  userProfile: () => 
    queryClient.prefetchQuery({
      queryKey: queryKeys.user.profile(),
      queryFn: () => fetch('/api/user/profile').then(res => res.json()),
      staleTime: 1000 * 60 * 5,
    }),
  
  waitlistAnalytics: () =>
    queryClient.prefetchQuery({
      queryKey: queryKeys.waitlist.analytics(),
      queryFn: () => fetch('/api/waitlist/analytics').then(res => res.json()),
      staleTime: 1000 * 60 * 10,
    }),
}

// Query client setup for development
if (process.env.NODE_ENV === 'development') {
  // Enable more detailed logging in development
  queryClient.setDefaultOptions({
    queries: {
      ...defaultOptions.queries,
      // More aggressive refetching in development
      staleTime: 1000 * 30, // 30 seconds
    },
  })
} 