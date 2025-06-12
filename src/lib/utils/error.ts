/**
 * Error Handling Utilities
 * 
 * Standardizes error handling patterns across the application:
 * - Error classification and categorization
 * - User-friendly error messages
 * - Error logging and reporting
 * - Retry logic helpers
 */

import { ApiError } from '@/lib/api/errors';

// Error types for classification
export type ErrorType = 
  | 'network'
  | 'validation'
  | 'authentication'
  | 'authorization' 
  | 'not_found'
  | 'server'
  | 'client'
  | 'unknown';

export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

// Standardized error interface
export interface StandardError {
  type: ErrorType;
  severity: ErrorSeverity;
  message: string;
  userMessage: string;
  code?: string;
  details?: Record<string, unknown>;
  timestamp: string;
  retryable: boolean;
}

// Error classification
export function classifyError(error: unknown): StandardError {
  const timestamp = new Date().toISOString();
  
  // Handle ApiError instances
  if (error instanceof ApiError) {
    return {
      type: getErrorTypeFromStatus(error.statusCode),
      severity: getSeverityFromStatus(error.statusCode),
      message: error.message,
      userMessage: getUserFriendlyMessage(error),
      code: error.code,
      details: error.details,
      timestamp,
      retryable: error.retryable,
    };
  }
  
  // Handle standard Error instances
  if (error instanceof Error) {
    const type = getErrorTypeFromMessage(error.message);
    return {
      type,
      severity: getSeverityFromType(type),
      message: error.message,
      userMessage: getUserFriendlyMessage(error),
      timestamp,
      retryable: isRetryableError(error),
    };
  }
  
  // Handle unknown errors
  return {
    type: 'unknown',
    severity: 'medium',
    message: String(error),
    userMessage: 'An unexpected error occurred. Please try again.',
    timestamp,
    retryable: false,
  };
}

// Map HTTP status codes to error types
function getErrorTypeFromStatus(status: number): ErrorType {
  if (status >= 400 && status < 500) {
    switch (status) {
      case 400: return 'validation';
      case 401: return 'authentication';
      case 403: return 'authorization';
      case 404: return 'not_found';
      default: return 'client';
    }
  }
  
  if (status >= 500) {
    return 'server';
  }
  
  if (status === 0) {
    return 'network';
  }
  
  return 'unknown';
}

// Map error types to severity
function getSeverityFromType(type: ErrorType): ErrorSeverity {
  switch (type) {
    case 'network':
    case 'server':
      return 'high';
    case 'authentication':
    case 'authorization':
      return 'medium';
    case 'validation':
    case 'not_found':
      return 'low';
    default:
      return 'medium';
  }
}

// Map status codes to severity
function getSeverityFromStatus(status: number): ErrorSeverity {
  if (status >= 500) return 'critical';
  if (status === 401 || status === 403) return 'high';
  if (status >= 400) return 'medium';
  return 'low';
}

// Classify error from message content
function getErrorTypeFromMessage(message: string): ErrorType {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('network') || lowerMessage.includes('fetch')) {
    return 'network';
  }
  
  if (lowerMessage.includes('validation') || lowerMessage.includes('invalid')) {
    return 'validation';
  }
  
  if (lowerMessage.includes('unauthorized') || lowerMessage.includes('authentication')) {
    return 'authentication';
  }
  
  if (lowerMessage.includes('forbidden') || lowerMessage.includes('permission')) {
    return 'authorization';
  }
  
  if (lowerMessage.includes('not found')) {
    return 'not_found';
  }
  
  return 'unknown';
}

// Generate user-friendly error messages
function getUserFriendlyMessage(error: Error | ApiError): string {
  if (error instanceof ApiError) {
    // Use existing ApiError user-friendly messages
    return error.message;
  }
  
  const message = error.message.toLowerCase();
  
  if (message.includes('network') || message.includes('fetch')) {
    return 'Please check your internet connection and try again.';
  }
  
  if (message.includes('timeout')) {
    return 'The request timed out. Please try again.';
  }
  
  if (message.includes('validation')) {
    return 'Please check your input and try again.';
  }
  
  if (message.includes('unauthorized')) {
    return 'Please sign in to continue.';
  }
  
  if (message.includes('forbidden')) {
    return 'You don\'t have permission to perform this action.';
  }
  
  if (message.includes('not found')) {
    return 'The requested item could not be found.';
  }
  
  // Default fallback
  return 'Something went wrong. Please try again.';
}

// Determine if error is retryable
function isRetryableError(error: Error): boolean {
  const message = error.message.toLowerCase();
  
  // Network errors are generally retryable
  if (message.includes('network') || message.includes('fetch')) {
    return true;
  }
  
  // Timeout errors are retryable
  if (message.includes('timeout')) {
    return true;
  }
  
  // Connection errors are retryable
  if (message.includes('connection')) {
    return true;
  }
  
  return false;
}

// Error logging utility
export function logError(
  error: StandardError,
  context?: Record<string, unknown>
): void {
  const logData = {
    ...error,
    context,
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
  };
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    // Error logged
  }
  
  // In production, you would send to your error reporting service
  // Example: Sentry, LogRocket, Rollbar, etc.
  if (process.env.NODE_ENV === 'production') {
    // sendToErrorService(logData);
  }
}

// Toast notification helper for errors
export function createErrorToast(error: StandardError): {
  title: string;
  description: string;
  variant: 'destructive';
  duration: number;
} {
  return {
    title: getErrorTitle(error.type),
    description: error.userMessage,
    variant: 'destructive',
    duration: getToastDuration(error.severity),
  };
}

// Get error title based on type
function getErrorTitle(type: ErrorType): string {
  switch (type) {
    case 'network':
      return 'Connection Error';
    case 'validation':
      return 'Invalid Input';
    case 'authentication':
      return 'Authentication Required';
    case 'authorization':
      return 'Access Denied';
    case 'not_found':
      return 'Not Found';
    case 'server':
      return 'Server Error';
    default:
      return 'Error';
  }
}

// Get toast duration based on severity
function getToastDuration(severity: ErrorSeverity): number {
  switch (severity) {
    case 'low':
      return 3000;
    case 'medium':
      return 5000;
    case 'high':
      return 7000;
    case 'critical':
      return 10000;
    default:
      return 5000;
  }
}

// Retry helper
export function createRetryFunction<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 1000
) {
  return async (): Promise<T> => {
    let lastError: unknown;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        
        const standardError = classifyError(error);
        
        // Don't retry if error is not retryable
        if (!standardError.retryable) {
          throw error;
        }
        
        // Don't retry on last attempt
        if (attempt === maxAttempts) {
          throw error;
        }
        
        // Exponential backoff with jitter
        const delay = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError;
  };
}

// Global error handler for unhandled errors
export function setupGlobalErrorHandler(): void {
  if (typeof window === 'undefined') return;
  
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = classifyError(event.reason);
    logError(error, { type: 'unhandledRejection' });
    
    // Prevent the default browser behavior
    event.preventDefault();
  });
  
  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    const error = classifyError(event.error);
    logError(error, { 
      type: 'uncaughtError',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });
} 