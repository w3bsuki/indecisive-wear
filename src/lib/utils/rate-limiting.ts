/**
 * Rate Limiting Utility
 * Provides in-memory rate limiting for API endpoints
 */

interface RateLimitEntry {
  count: number
  resetTime: number
  firstRequest: number
}

class InMemoryRateLimit {
  private cache = new Map<string, RateLimitEntry>()
  private cleanupInterval: NodeJS.Timeout

  constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup()
    }, 5 * 60 * 1000)
  }

  private cleanup() {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.resetTime) {
        this.cache.delete(key)
      }
    }
  }

  public check(
    identifier: string,
    limit: number,
    windowMs: number
  ): { success: boolean; limit: number; remaining: number; resetTime: number } {
    const now = Date.now()
    const entry = this.cache.get(identifier)

    if (!entry || now > entry.resetTime) {
      // First request or window expired
      const newEntry: RateLimitEntry = {
        count: 1,
        resetTime: now + windowMs,
        firstRequest: now,
      }
      this.cache.set(identifier, newEntry)
      return {
        success: true,
        limit,
        remaining: limit - 1,
        resetTime: newEntry.resetTime,
      }
    }

    if (entry.count >= limit) {
      // Rate limit exceeded
      return {
        success: false,
        limit,
        remaining: 0,
        resetTime: entry.resetTime,
      }
    }

    // Increment count
    entry.count++
    this.cache.set(identifier, entry)

    return {
      success: true,
      limit,
      remaining: limit - entry.count,
      resetTime: entry.resetTime,
    }
  }

  public destroy() {
    clearInterval(this.cleanupInterval)
    this.cache.clear()
  }
}

// Global rate limiter instance
const rateLimiter = new InMemoryRateLimit()

// Rate limiting configurations
export const RATE_LIMITS = {
  // Waitlist API: 5 requests per minute per IP
  WAITLIST: {
    limit: 5,
    windowMs: 60 * 1000, // 1 minute
  },
  // General API: 100 requests per hour per IP
  GENERAL: {
    limit: 100,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  // Strict API: 10 requests per minute per IP
  STRICT: {
    limit: 10,
    windowMs: 60 * 1000, // 1 minute
  },
} as const

export type RateLimitConfig = typeof RATE_LIMITS[keyof typeof RATE_LIMITS]

/**
 * Get client IP address from request headers
 */
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown'
  }
  
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}

/**
 * Apply rate limiting to a request
 * @param request - The incoming request
 * @param config - Rate limiting configuration
 * @param identifier - Optional custom identifier (defaults to IP address)
 * @returns Rate limiting result
 */
export function applyRateLimit(
  request: Request,
  config: RateLimitConfig,
  identifier?: string
) {
  const id = identifier || getClientIP(request)
  return rateLimiter.check(id, config.limit, config.windowMs)
}

/**
 * Create rate limit headers for responses
 */
export function createRateLimitHeaders(result: {
  limit: number
  remaining: number
  resetTime: number
}) {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
  }
}

/**
 * Higher-order function to wrap API handlers with rate limiting
 */
export function withRateLimit(
  config: RateLimitConfig,
  handler: (request: Request, context?: any) => Promise<Response>
) {
  return async (request: Request, context?: any): Promise<Response> => {
    const result = applyRateLimit(request, config)
    
    if (!result.success) {
      const retryAfter = Math.ceil((result.resetTime - Date.now()) / 1000)
      return new Response(
        JSON.stringify({
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': retryAfter.toString(),
            ...createRateLimitHeaders(result),
          },
        }
      )
    }

    // Add rate limit headers to successful responses
    const response = await handler(request, context)
    const headers = new Headers(response.headers)
    
    Object.entries(createRateLimitHeaders(result)).forEach(([key, value]) => {
      headers.set(key, value)
    })

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  }
}

export default rateLimiter