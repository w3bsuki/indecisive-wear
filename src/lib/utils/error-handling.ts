/**
 * Enhanced Error Handling Utilities
 * 
 * Provides comprehensive error handling, logging, and recovery mechanisms
 * for production-ready error management
 */

// Error types for categorization
export type ErrorType = 
  | 'network'
  | 'validation'
  | 'authentication'
  | 'authorization'
  | 'not-found'
  | 'server'
  | 'unknown'

// Error severity levels
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical'

// Enhanced error interface
export interface EnhancedError {
  message: string
  type: ErrorType
  severity: ErrorSeverity
  code?: string | number
  details?: Record<string, unknown>
  timestamp: Date
  userAgent?: string
  url?: string
  userId?: string
  sessionId?: string
  recoverable: boolean
  retryable: boolean
}

/**
 * Create an enhanced error with metadata
 */
export function createEnhancedError(
  message: string,
  options: Partial<Omit<EnhancedError, 'message' | 'timestamp'>> = {}
): EnhancedError {
  return {
    message,
    type: options.type || 'unknown',
    severity: options.severity || 'medium',
    code: options.code,
    details: options.details || {},
    timestamp: new Date(),
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    userId: options.userId,
    sessionId: options.sessionId,
    recoverable: options.recoverable ?? true,
    retryable: options.retryable ?? false,
  }
}

/**
 * Categorize error by examining error message and properties
 */
export function categorizeError(error: Error | string): ErrorType {
  const message = typeof error === 'string' ? error : error.message
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('network') || lowerMessage.includes('fetch')) {
    return 'network'
  }
  
  if (lowerMessage.includes('validation') || lowerMessage.includes('invalid')) {
    return 'validation'
  }
  
  if (lowerMessage.includes('unauthorized') || lowerMessage.includes('401')) {
    return 'authentication'
  }
  
  if (lowerMessage.includes('forbidden') || lowerMessage.includes('403')) {
    return 'authorization'
  }
  
  if (lowerMessage.includes('not found') || lowerMessage.includes('404')) {
    return 'not-found'
  }
  
  if (lowerMessage.includes('server') || lowerMessage.includes('500')) {
    return 'server'
  }
  
  return 'unknown'
}

/**
 * Determine error severity based on type and context
 */
export function determineErrorSeverity(
  error: Error | string,
  context?: Record<string, unknown>
): ErrorSeverity {
  const type = categorizeError(error)
  
  switch (type) {
    case 'authentication':
    case 'authorization':
      return 'high'
    
    case 'server':
      return 'critical'
    
    case 'network':
      return context?.isRetry ? 'high' : 'medium'
    
    case 'validation':
      return 'low'
    
    case 'not-found':
      return 'medium'
    
    default:
      return 'medium'
  }
}

/**
 * Async operation wrapper with comprehensive error handling
 */
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  options: {
    fallback?: () => T | Promise<T>
    onError?: (error: EnhancedError) => void
    retries?: number
    retryDelay?: number
    errorContext?: Record<string, unknown>
  } = {}
): Promise<T> {
  const { fallback, onError, retries = 0, retryDelay = 1000, errorContext = {} } = options
  
  let lastError: EnhancedError | null = null
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await operation()
    } catch (originalError) {
      const error = originalError instanceof Error ? originalError : new Error(String(originalError))
      
      lastError = createEnhancedError(error.message, {
        type: categorizeError(error),
        severity: determineErrorSeverity(error, { ...errorContext, isRetry: attempt > 0 }),
        details: {
          ...errorContext,
          attempt: attempt + 1,
          maxAttempts: retries + 1,
          originalStack: error.stack,
        },
        retryable: attempt < retries,
      })
      
      // Call error handler
      onError?.(lastError)
      
      // If this is the last attempt or error is not retryable, throw
      if (attempt === retries || !lastError.retryable) {
        break
      }
      
      // Wait before retrying
      if (retryDelay > 0) {
        await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)))
      }
    }
  }
  
  // If we have a fallback, use it
  if (fallback) {
    try {
      return await fallback()
    } catch (fallbackError) {
      // Log fallback failure but don't throw
      if (process.env.NODE_ENV === 'development') {
        console.warn('Fallback failed:', fallbackError)
      }
    }
  }
  
  // Throw the last error if no fallback succeeded
  throw lastError || new Error('Operation failed')
}

/**
 * Error reporter for production monitoring
 */
export function reportError(error: EnhancedError): void {
  // In development, just log
  if (process.env.NODE_ENV === 'development') {
    console.error('Error reported:', error)
    return
  }
  
  // In production, send to monitoring service
  try {
    // Example: Send to Sentry, LogRocket, or custom service
    // Sentry.captureException(new Error(error.message), {
    //   level: error.severity,
    //   tags: {
    //     type: error.type,
    //     recoverable: error.recoverable,
    //     retryable: error.retryable,
    //   },
    //   extra: error.details,
    // })
    
    // Example: Send to custom analytics
    // analytics.track('Error Occurred', {
    //   message: error.message,
    //   type: error.type,
    //   severity: error.severity,
    //   timestamp: error.timestamp,
    // })
  } catch (reportingError) {
    // Silently fail if error reporting fails
    // Don't let error reporting break the application
  }
}

/**
 * Safe async function wrapper that never throws
 */
export async function safeAsync<T>(
  operation: () => Promise<T>,
  fallback: T,
  options: {
    onError?: (error: EnhancedError) => void
    errorContext?: Record<string, unknown>
  } = {}
): Promise<T> {
  try {
    return await withErrorHandling(operation, {
      fallback: () => fallback,
      onError: options.onError,
      errorContext: options.errorContext,
    })
  } catch {
    return fallback
  }
}

/**
 * Batch error handler for multiple operations
 */
export async function withBatchErrorHandling<T>(
  operations: Array<() => Promise<T>>,
  options: {
    failFast?: boolean
    onError?: (error: EnhancedError, index: number) => void
    errorContext?: Record<string, unknown>
  } = {}
): Promise<Array<T | null>> {
  const { failFast = false, onError, errorContext = {} } = options
  const results: Array<T | null> = []
  
  for (let i = 0; i < operations.length; i++) {
    try {
      const result = await operations[i]()
      results.push(result)
    } catch (originalError) {
      const error = originalError instanceof Error ? originalError : new Error(String(originalError))
      
      const enhancedError = createEnhancedError(error.message, {
        type: categorizeError(error),
        severity: determineErrorSeverity(error),
        details: {
          ...errorContext,
          operationIndex: i,
          totalOperations: operations.length,
        },
      })
      
      onError?.(enhancedError, i)
      results.push(null)
      
      if (failFast) {
        throw enhancedError
      }
    }
  }
  
  return results
}

/**
 * User-friendly error messages
 */
export function getUserFriendlyMessage(error: EnhancedError): string {
  switch (error.type) {
    case 'network':
      return 'Unable to connect to the server. Please check your internet connection and try again.'
    
    case 'authentication':
      return 'Please sign in to continue.'
    
    case 'authorization':
      return 'You do not have permission to perform this action.'
    
    case 'validation':
      return 'Please check your input and try again.'
    
    case 'not-found':
      return 'The requested item could not be found.'
    
    case 'server':
      return 'Our servers are experiencing issues. Please try again later.'
    
    default:
      return 'Something went wrong. Please try again.'
  }
}

/**
 * Check if error is recoverable
 */
export function isRecoverable(error: EnhancedError): boolean {
  return error.recoverable && error.type !== 'server'
}

/**
 * Check if operation should be retried
 */
export function shouldRetryOperation(error: EnhancedError): boolean {
  return error.retryable && ['network', 'server'].includes(error.type)
}