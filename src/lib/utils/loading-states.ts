/**
 * Loading State Management
 * 
 * Comprehensive loading state handling with proper UX patterns
 * and performance optimization for production applications
 */

import { useState, useCallback, useRef, useEffect } from 'react'

// Loading state types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

// Loading configuration
export interface LoadingConfig {
  minLoadingTime?: number // Minimum time to show loading (prevent flashing)
  timeout?: number // Maximum time before considering it failed
  showLoadingAfter?: number // Delay before showing loading indicator
}

// Enhanced loading state with metadata
export interface EnhancedLoadingState {
  state: LoadingState
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  isIdle: boolean
  progress?: number // For progress indicators (0-100)
  message?: string // Loading message
  error?: Error | string
  duration?: number // How long operation has been running
  startTime?: Date
}

/**
 * Enhanced loading state hook
 */
export function useLoadingState(config: LoadingConfig = {}) {
  const {
    minLoadingTime = 300,
    timeout = 30000,
    showLoadingAfter = 150,
  } = config

  const [state, setState] = useState<LoadingState>('idle')
  const [progress, setProgress] = useState<number | undefined>()
  const [message, setMessage] = useState<string | undefined>()
  const [error, setError] = useState<Error | string | undefined>()
  const [startTime, setStartTime] = useState<Date | undefined>()
  
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const minTimeRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const showLoadingRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Clear all timers
  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = undefined
    }
    if (minTimeRef.current) {
      clearTimeout(minTimeRef.current)
      minTimeRef.current = undefined
    }
    if (showLoadingRef.current) {
      clearTimeout(showLoadingRef.current)
      showLoadingRef.current = undefined
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = undefined
    }
  }, [])

  // Start loading
  const startLoading = useCallback((loadingMessage?: string) => {
    clearTimers()
    
    const now = new Date()
    setStartTime(now)
    setMessage(loadingMessage)
    setError(undefined)
    setProgress(undefined)

    // Delay showing loading indicator to prevent flashing
    showLoadingRef.current = setTimeout(() => {
      setState('loading')
    }, showLoadingAfter)

    // Set timeout for the operation
    if (timeout > 0) {
      timeoutRef.current = setTimeout(() => {
        setError('Operation timed out. Please try again.')
        setState('error')
      }, timeout)
    }

    // Start duration tracking
    intervalRef.current = setInterval(() => {
      // Update duration for progress tracking
      setStartTime(prev => prev) // Trigger re-render for duration calculation
    }, 1000)
  }, [showLoadingAfter, timeout, clearTimers])

  // Set loading progress
  const setLoadingProgress = useCallback((newProgress: number, progressMessage?: string) => {
    setProgress(Math.max(0, Math.min(100, newProgress)))
    if (progressMessage) {
      setMessage(progressMessage)
    }
  }, [])

  // Complete loading with success
  const setSuccess = useCallback((successMessage?: string) => {
    const finishSuccess = () => {
      setState('success')
      setMessage(successMessage)
      setProgress(100)
      clearTimers()
    }

    // Ensure minimum loading time has passed
    if (minTimeRef.current) {
      clearTimeout(minTimeRef.current)
    }

    const elapsed = startTime ? Date.now() - startTime.getTime() : 0
    const remaining = Math.max(0, minLoadingTime - elapsed)

    if (remaining > 0) {
      minTimeRef.current = setTimeout(finishSuccess, remaining)
    } else {
      finishSuccess()
    }
  }, [minLoadingTime, startTime, clearTimers])

  // Complete loading with error
  const setErrorState = useCallback((errorMessage: Error | string) => {
    setState('error')
    setError(errorMessage)
    setProgress(undefined)
    clearTimers()
  }, [clearTimers])

  // Reset to idle
  const reset = useCallback(() => {
    setState('idle')
    setProgress(undefined)
    setMessage(undefined)
    setError(undefined)
    setStartTime(undefined)
    clearTimers()
  }, [clearTimers])

  // Calculate duration
  const duration = startTime ? Date.now() - startTime.getTime() : undefined

  // Clean up on unmount
  useEffect(() => {
    return clearTimers
  }, [clearTimers])

  const enhancedState: EnhancedLoadingState = {
    state,
    isLoading: state === 'loading',
    isSuccess: state === 'success',
    isError: state === 'error',
    isIdle: state === 'idle',
    progress,
    message,
    error,
    duration,
    startTime,
  }

  return {
    ...enhancedState,
    startLoading,
    setProgress: setLoadingProgress,
    setSuccess,
    setError: setErrorState,
    reset,
  }
}

/**
 * Async operation wrapper with loading states
 */
export async function withLoadingState<T>(
  operation: () => Promise<T>,
  loadingControls: {
    startLoading: (message?: string) => void
    setProgress?: (progress: number, message?: string) => void
    setSuccess: (message?: string) => void
    setError: (error: Error | string) => void
  },
  options: {
    loadingMessage?: string
    successMessage?: string
    onProgress?: (progress: number) => void
  } = {}
): Promise<T> {
  const { loadingMessage, successMessage, onProgress } = options
  
  loadingControls.startLoading(loadingMessage)
  
  try {
    // Execute the operation
    const result = await operation()
    
    // Report final progress if callback provided
    if (onProgress) {
      onProgress(100)
    }
    
    loadingControls.setSuccess(successMessage)
    return result
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    loadingControls.setError(errorMessage)
    throw error
  }
}

/**
 * Progress simulation for operations without real progress
 */
export function simulateProgress(
  setProgress: (progress: number, message?: string) => void,
  options: {
    duration?: number
    messages?: Array<{ progress: number; message: string }>
    curve?: 'linear' | 'fast-then-slow' | 'slow-then-fast'
  } = {}
) {
  const { duration = 3000, messages = [], curve = 'slow-then-fast' } = options
  
  const startTime = Date.now()
  const interval = 100 // Update every 100ms
  
  const updateProgress = () => {
    const elapsed = Date.now() - startTime
    const ratio = Math.min(elapsed / duration, 1)
    
    // Apply easing curve
    let progress: number
    switch (curve) {
      case 'linear':
        progress = ratio
        break
      case 'fast-then-slow':
        progress = 1 - Math.pow(1 - ratio, 2)
        break
      case 'slow-then-fast':
        progress = Math.pow(ratio, 2)
        break
    }
    
    const percentage = Math.floor(progress * 90) // Cap at 90% until real completion
    
    // Find appropriate message for current progress
    const message = messages
      .filter(m => m.progress <= percentage)
      .pop()?.message
    
    setProgress(percentage, message)
    
    if (ratio < 1) {
      setTimeout(updateProgress, interval)
    }
  }
  
  updateProgress()
}

/**
 * Multiple operation loading state manager
 */
export function useMultipleLoadingStates() {
  const [states, setStates] = useState<Record<string, EnhancedLoadingState>>({})
  
  const createLoadingState = useCallback((key: string, config?: LoadingConfig) => {
    const loadingState = useLoadingState(config)
    
    // Update the states object when this specific state changes
    useEffect(() => {
      setStates(prev => ({
        ...prev,
        [key]: {
          state: loadingState.state,
          isLoading: loadingState.isLoading,
          isSuccess: loadingState.isSuccess,
          isError: loadingState.isError,
          isIdle: loadingState.isIdle,
          progress: loadingState.progress,
          message: loadingState.message,
          error: loadingState.error,
          duration: loadingState.duration,
          startTime: loadingState.startTime,
        }
      }))
    }, [key, loadingState])
    
    return loadingState
  }, [])
  
  const getState = useCallback((key: string) => states[key], [states])
  
  const isAnyLoading = Object.values(states).some(state => state.isLoading)
  const isAllSuccess = Object.values(states).every(state => state.isSuccess)
  const hasAnyError = Object.values(states).some(state => state.isError)
  
  return {
    states,
    createLoadingState,
    getState,
    isAnyLoading,
    isAllSuccess,
    hasAnyError,
  }
}

/**
 * Loading state for specific UI patterns
 */
export const loadingPatterns = {
  // Button loading pattern
  button: {
    minLoadingTime: 500,
    showLoadingAfter: 0,
    timeout: 10000,
  },
  
  // Page loading pattern
  page: {
    minLoadingTime: 200,
    showLoadingAfter: 100,
    timeout: 30000,
  },
  
  // Form submission pattern
  form: {
    minLoadingTime: 800,
    showLoadingAfter: 0,
    timeout: 15000,
  },
  
  // Data fetching pattern
  data: {
    minLoadingTime: 0,
    showLoadingAfter: 200,
    timeout: 20000,
  },
  
  // File upload pattern
  upload: {
    minLoadingTime: 0,
    showLoadingAfter: 0,
    timeout: 60000,
  },
} as const