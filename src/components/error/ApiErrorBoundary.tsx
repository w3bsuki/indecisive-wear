/**
 * API Error Boundary Component
 * Catches and handles API-related errors with user-friendly messages
 */

"use client"

import { Component, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, RefreshCw, WifiOff, ServerCrash, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ApiErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, reset: () => void) => ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  className?: string
}

interface ApiErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorType: 'network' | 'server' | 'auth' | 'validation' | 'unknown'
}

interface ErrorInfo {
  componentStack: string
}

// Error type detection
function getErrorType(error: Error): ApiErrorBoundaryState['errorType'] {
  const message = error.message.toLowerCase()
  
  if (message.includes('network') || message.includes('fetch')) {
    return 'network'
  }
  if (message.includes('401') || message.includes('403') || message.includes('unauthorized')) {
    return 'auth'
  }
  if (message.includes('400') || message.includes('validation')) {
    return 'validation'
  }
  if (message.includes('500') || message.includes('server')) {
    return 'server'
  }
  
  return 'unknown'
}

export class ApiErrorBoundary extends Component<ApiErrorBoundaryProps, ApiErrorBoundaryState> {
  constructor(props: ApiErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorType: 'unknown'
    }
  }
  
  static getDerivedStateFromError(error: Error): ApiErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorType: getErrorType(error)
    }
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to monitoring service
    console.error('API Error Boundary caught:', error, errorInfo)
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
    
    // Track error in analytics (if available)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        error_type: this.state.errorType
      })
    }
  }
  
  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorType: 'unknown'
    })
  }
  
  render() {
    if (this.state.hasError && this.state.error) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleReset)
      }
      
      // Default error UI
      return <DefaultApiError 
        error={this.state.error}
        errorType={this.state.errorType}
        onReset={this.handleReset}
        className={this.props.className}
      />
    }
    
    return this.props.children
  }
}

// Default error UI component
interface DefaultApiErrorProps {
  error: Error
  errorType: ApiErrorBoundaryState['errorType']
  onReset: () => void
  className?: string
}

function DefaultApiError({ error, errorType, onReset, className }: DefaultApiErrorProps) {
  const errorConfig = {
    network: {
      icon: WifiOff,
      title: 'Connection Error',
      description: 'Unable to connect to our servers. Please check your internet connection.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    server: {
      icon: ServerCrash,
      title: 'Server Error',
      description: 'Our servers are experiencing issues. Please try again later.',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    auth: {
      icon: Shield,
      title: 'Authentication Error',
      description: 'You need to be logged in to access this content.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    validation: {
      icon: AlertCircle,
      title: 'Validation Error',
      description: 'The data provided is invalid. Please check and try again.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    unknown: {
      icon: AlertCircle,
      title: 'Something went wrong',
      description: 'An unexpected error occurred. Please try again.',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    }
  }
  
  const config = errorConfig[errorType]
  const Icon = config.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex flex-col items-center justify-center min-h-[400px] p-6',
        className
      )}
    >
      <div className={cn(
        'w-full max-w-md mx-auto text-center space-y-6',
        'p-8 rounded-2xl border-2',
        config.bgColor,
        config.borderColor
      )}>
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="flex justify-center"
        >
          <div className={cn(
            'w-20 h-20 rounded-full flex items-center justify-center',
            'bg-white shadow-lg'
          )}>
            <Icon className={cn('w-10 h-10', config.color)} />
          </div>
        </motion.div>
        
        {/* Error message */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">
            {config.title}
          </h3>
          <p className="text-gray-600">
            {config.description}
          </p>
          
          {/* Technical details in development */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                Technical Details
              </summary>
              <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto">
                {error.stack || error.message}
              </pre>
            </details>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={onReset}
            variant="default"
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
          >
            Go Home
          </Button>
        </div>
      </div>
    </motion.div>
  )
}