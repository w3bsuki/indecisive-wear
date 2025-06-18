/**
 * Loading State Hook
 * 
 * Provides consistent loading states throughout the application
 * Integrates with our pink design system
 */

import { useState, useEffect, useCallback } from 'react'
import { shouldReduceMotion } from '@/lib/design-system'

export interface LoadingState {
  isLoading: boolean
  error: string | null
  progress?: number
}

export interface UseLoadingStateOptions {
  initialState?: boolean
  timeout?: number
  showProgress?: boolean
}

export function useLoadingState(options: UseLoadingStateOptions = {}) {
  const {
    initialState = false,
    timeout = 30000, // 30 seconds default timeout
    showProgress = false
  } = options

  const [state, setState] = useState<LoadingState>({
    isLoading: initialState,
    error: null,
    progress: showProgress ? 0 : undefined
  })

  const isReducedMotion = shouldReduceMotion()

  // Auto-timeout for loading states
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (state.isLoading && timeout > 0) {
      timeoutId = setTimeout(() => {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Operation timed out. Please try again.'
        }))
      }, timeout)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [state.isLoading, timeout])

  const startLoading = useCallback((withProgress = false) => {
    setState({
      isLoading: true,
      error: null,
      progress: withProgress ? 0 : undefined
    })
  }, [])

  const stopLoading = useCallback(() => {
    setState(prev => ({
      ...prev,
      isLoading: false,
      progress: prev.progress !== undefined ? 100 : undefined
    }))
  }, [])

  const setError = useCallback((error: string) => {
    setState(prev => ({
      ...prev,
      isLoading: false,
      error
    }))
  }, [])

  const setProgress = useCallback((progress: number) => {
    setState(prev => ({
      ...prev,
      progress: Math.min(100, Math.max(0, progress))
    }))
  }, [])

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      progress: showProgress ? 0 : undefined
    })
  }, [showProgress])

  return {
    ...state,
    startLoading,
    stopLoading,
    setError,
    setProgress,
    reset,
    isReducedMotion
  }
}

// Async operation wrapper with loading state
export function useAsyncOperation<T extends any[], R>(
  operation: (...args: T) => Promise<R>,
  options: UseLoadingStateOptions = {}
) {
  const loadingState = useLoadingState(options)

  const execute = useCallback(async (...args: T): Promise<R | null> => {
    try {
      loadingState.startLoading(options.showProgress)
      const result = await operation(...args)
      loadingState.stopLoading()
      return result
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred'
      loadingState.setError(message)
      return null
    }
  }, [operation, loadingState, options.showProgress])

  return {
    ...loadingState,
    execute
  }
}

// Predefined loading messages for different operations
export const loadingMessages = {
  auth: {
    login: 'Signing you in...',
    logout: 'Signing you out...',
    register: 'Creating your account...',
    verify: 'Verifying your email...'
  },
  data: {
    fetching: 'Loading data...',
    saving: 'Saving changes...',
    deleting: 'Deleting item...',
    uploading: 'Uploading file...'
  },
  ecommerce: {
    addToCart: 'Adding to cart...',
    checkout: 'Processing your order...',
    payment: 'Processing payment...',
    shipping: 'Calculating shipping...'
  },
  general: {
    loading: 'Loading...',
    processing: 'Processing...',
    submitting: 'Submitting...',
    searching: 'Searching...'
  }
} as const

export type LoadingMessage = typeof loadingMessages