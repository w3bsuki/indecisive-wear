import * as Sentry from '@sentry/nextjs'

// Only initialize Sentry if DSN is provided
if (process.env.SENTRY_DSN) {
  Sentry.init({
    // Your Sentry DSN - set this in environment variables
    dsn: process.env.SENTRY_DSN,

  // Integration settings
  integrations: [
    Sentry.httpIntegration(),
    
    // Node.js specific integrations
    Sentry.nodeContextIntegration(),
    Sentry.consoleIntegration(),
    
    // Next.js specific
    Sentry.prismaIntegration(), // If using Prisma
  ],

  // Performance monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Release tracking
  release: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  
  // Environment
  environment: process.env.NODE_ENV,
  
  // Server name for identification
  serverName: process.env.HOSTNAME || 'unknown',
  
  // Error filtering
  beforeSend(event, _hint) {
    // Filter out irrelevant server errors
    if (process.env.NODE_ENV === 'development') {
      // Don't send development-only errors
      if (event.message?.includes('ENOENT') && event.message?.includes('.next')) {
        return null
      }
    }
    
    // Filter out known network issues
    if (event.exception?.values?.[0]?.type === 'ECONNRESET') {
      return null
    }
    
    // Filter out client aborted requests
    if (event.message?.includes('aborted')) {
      return null
    }
    
    return event
  },
  
  // Performance event filtering
  beforeSendTransaction(event) {
    // Don't track health check endpoints
    if (event.transaction?.includes('health') || event.transaction?.includes('ping')) {
      return null
    }
    
    // Sample transactions in production
    if (process.env.NODE_ENV === 'production' && Math.random() > 0.1) {
      return null
    }
    
    return event
  },
  
  // Initial scope
  initialScope: {
    tags: {
      component: 'server',
      runtime: 'nodejs'
    }
  },
  
    // Additional options
    debug: process.env.NODE_ENV === 'development',
    
    // Transport options
    transportOptions: {
      // No specific transport options needed
    },
    
    // Capture unhandled rejections and exceptions handled automatically by Sentry
    
    // Context lines for stack traces
    beforeBreadcrumb(breadcrumb) {
      // Filter out noisy breadcrumbs
      if (breadcrumb.category === 'console' && breadcrumb.level !== 'error') {
        return null
      }
      
      return breadcrumb
    }
  })
} 