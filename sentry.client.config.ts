import * as Sentry from '@sentry/nextjs'

// Only initialize Sentry if DSN is provided
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    // Your Sentry DSN - set this in environment variables
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Integration settings
  integrations: [
    Sentry.browserTracingIntegration({
      // Capture interactions like clicks, navigations, and page loads
      enableInp: true,
      
      // Web Vitals integration
      enableLongTask: true,
      enableLongAnimationFrame: true,
      
      // Automatic instrumentation
      instrumentNavigation: true,
      instrumentPageLoad: true,
    }),
    
    Sentry.replayIntegration({
      // Session replay for error reproduction
      maskAllText: true,
      blockAllMedia: true,
      maskAllInputs: true,
    }),
  ],

  // Performance monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Replay settings
  replaysSessionSampleRate: 0.1, // 10% of sessions
  replaysOnErrorSampleRate: 1.0, // 100% of error sessions
  
  // Release tracking
  release: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  
  // Environment
  environment: process.env.NODE_ENV,
  
  // Error filtering
  beforeSend(event, _hint) {
    // Filter out known development issues
    if (process.env.NODE_ENV === 'development') {
      // Don't send hydration mismatches in development
      if (event.message?.includes('Hydration')) {
        return null
      }
      
      // Don't send Next.js development warnings
      if (event.message?.includes('Warning:')) {
        return null
      }
    }
    
    // Filter out network errors that aren't actionable
    if (event.exception?.values?.[0]?.type === 'NetworkError') {
      return null
    }
    
    // Filter out browser extension errors
    if (event.exception?.values?.[0]?.stacktrace?.frames?.some(
      frame => frame.filename?.includes('extension://')
    )) {
      return null
    }
    
    return event
  },
  
  // Performance event filtering
  beforeSendTransaction(event) {
    // Sample transactions in production
    if (process.env.NODE_ENV === 'production' && Math.random() > 0.1) {
      return null
    }
    
    return event
  },
  
  // User context
  initialScope: {
    tags: {
      component: 'client'
    }
  },
  
    // Additional options
    debug: process.env.NODE_ENV === 'development'
  })
} 