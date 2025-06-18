/**
 * Modern Error Boundary Component
 * Enhanced error handling with recovery and reporting
 * 
 * Phase 9.2: Data Fetching Modernization
 */

'use client'

import React, { Component, ReactNode, ErrorInfo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { RefreshCw } from 'lucide-react'
import { ChevronDown } from 'lucide-react'
import { ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  showDetails: boolean
  retryCount: number
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  maxRetries?: number
  className?: string
  showErrorDetails?: boolean
  resetKeys?: Array<string | number>
  resetOnPropsChange?: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null

  constructor(props: ErrorBoundaryProps) {
    super(props)
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
      retryCount: 0,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })

    // Call the onError callback if provided
    this.props.onError?.(error, errorInfo)

    // Report error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      this.reportError(error, errorInfo)
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys, resetOnPropsChange } = this.props
    const { hasError } = this.state

    // Reset error state if resetKeys change
    if (hasError && resetKeys && prevProps.resetKeys !== resetKeys) {
      if (resetKeys.some((key, idx) => prevProps.resetKeys?.[idx] !== key)) {
        this.resetErrorBoundary()
      }
    }

    // Reset on any prop change if enabled
    if (hasError && resetOnPropsChange && prevProps !== this.props) {
      this.resetErrorBoundary()
    }
  }

  private reportError = (_error: Error, _errorInfo: ErrorInfo) => {
    // Integrate with error reporting service in production
    // e.g., Sentry, LogRocket, etc.
    try {
      // Example: Sentry.captureException(error, { extra: errorInfo })
      // Example: window.gtag?.('event', 'exception', { description: error.message })
    } catch (reportingError) {
      // Silently fail if error reporting fails
    }
  }

  private resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      window.clearTimeout(this.resetTimeoutId)
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
      retryCount: 0,
    })
  }

  private handleRetry = () => {
    const { maxRetries = 3 } = this.props
    const { retryCount } = this.state

    if (retryCount < maxRetries) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: retryCount + 1,
      })

      // Auto-reset after a delay to prevent infinite retry loops
      this.resetTimeoutId = window.setTimeout(() => {
        this.setState({ retryCount: 0 })
      }, 30000) // Reset retry count after 30 seconds
    }
  }

  private toggleDetails = () => {
    this.setState({ showDetails: !this.state.showDetails })
  }

  private getErrorMessage = (error: Error): string => {
    if (error.message.includes('ChunkLoadError')) {
      return 'Failed to load application resources. This might be due to a network issue or a recent update.'
    }
    
    if (error.message.includes('Loading chunk')) {
      return 'Failed to load a part of the application. Please refresh the page.'
    }
    
    if (error.message.includes('hydrat')) {
      return 'There was a hydration mismatch. The page will be reloaded automatically.'
    }
    
    return 'An unexpected error occurred. Please try again.'
  }

  render() {
    const { hasError, error, errorInfo, showDetails, retryCount } = this.state
    const { children, fallback, maxRetries = 3, className, showErrorDetails = false } = this.props

    if (hasError && error) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback
      }

      const userMessage = this.getErrorMessage(error)
      const canRetry = retryCount < maxRetries

      return (
        <div className={cn('flex items-center justify-center min-h-[400px] p-4', className)}>
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-5 h-5" />
                Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{userMessage}</p>
              
              <div className="flex gap-2">
                {canRetry && (
                  <Button 
                    onClick={this.handleRetry}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </Button>
              </div>

              {retryCount > 0 && (
                <p className="text-sm text-gray-500">
                  Retry attempts: {retryCount}/{maxRetries}
                </p>
              )}

              {/* Error details for development or when explicitly enabled */}
              {(process.env.NODE_ENV === 'development' || showErrorDetails) && (
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={this.toggleDetails}
                    className="flex items-center gap-2 text-gray-500"
                  >
                    {showDetails ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Show Details
                      </>
                    )}
                  </Button>
                  
                  {showDetails && (
                    <div className="p-3 bg-gray-50 rounded-md text-sm space-y-2">
                      <div>
                        <strong>Error:</strong>
                        <pre className="mt-1 text-xs bg-white p-2 rounded border overflow-auto">
                          {error.name}: {error.message}
                        </pre>
                      </div>
                      
                      {error.stack && (
                        <div>
                          <strong>Stack Trace:</strong>
                          <pre className="mt-1 text-xs bg-white p-2 rounded border overflow-auto max-h-32">
                            {error.stack}
                          </pre>
                        </div>
                      )}
                      
                      {errorInfo && (
                        <div>
                          <strong>Component Stack:</strong>
                          <pre className="mt-1 text-xs bg-white p-2 rounded border overflow-auto max-h-32">
                            {errorInfo.componentStack}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )
    }

    return children
  }
}

// Higher-order component for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  
  return WrappedComponent
}

// Hook for handling async errors (for use with React Query, etc.)
export function useAsyncError() {
  const [_, setError] = React.useState()
  
  return React.useCallback(
    (error: Error) => {
      setError(() => {
        throw error
      })
    },
    [setError]
  )
} 