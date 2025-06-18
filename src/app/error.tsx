'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to error reporting service (Sentry is configured globally)
    if (process.env.NODE_ENV === 'development') {
      // Only log in development mode
      // eslint-disable-next-line no-console
      console.error('Application error:', error)
    }
    // Production error reporting is handled by Sentry automatically
  }, [error])

  const handleHomeClick = () => {
    window.location.href = '/'
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-pink-50/30">
      <div className="mx-auto max-w-xl px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-black/90 sm:text-5xl">Something went wrong!</h1>
        <p className="mb-8 text-lg text-black/60">
          We apologize for the inconvenience. Please try again.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-black text-white hover:bg-black/90"
            size="lg"
          >
            Try again
          </Button>
          <Button
            onClick={handleHomeClick}
            variant="outline"
            className="inline-flex items-center gap-2"
            size="lg"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
} 