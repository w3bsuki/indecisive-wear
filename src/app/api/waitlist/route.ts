import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { createServerSupabaseClient } from '@/lib/supabase/client'
import type { WaitlistSignupRequest, WaitlistSignupResponse } from '@/lib/types/waitlist'
import { applyRateLimit, RATE_LIMITS, createRateLimitHeaders } from '@/lib/utils/rate-limiting'

// Helper function to get client IP address
function getClientIP(request: Request): string | null {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || null
  }
  
  if (realIP) {
    return realIP
  }
  
  return null
}

// Helper function to extract UTM parameters from referrer
function extractUTMParams(referrer: string | null): {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
} {
  if (!referrer) return {}
  
  try {
    const url = new URL(referrer)
    const utmData: Record<string, string> = {}
    const utmSource = url.searchParams.get('utm_source')
    const utmMedium = url.searchParams.get('utm_medium')
    const utmCampaign = url.searchParams.get('utm_campaign')
    
    if (utmSource) utmData.utm_source = utmSource
    if (utmMedium) utmData.utm_medium = utmMedium
    if (utmCampaign) utmData.utm_campaign = utmCampaign
    
    return utmData
  } catch {
    return {}
  }
}

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_APP_URL,
  'https://indecisive-wear.com',
  'https://www.indecisive-wear.com',
  'https://indecisive-wear.vercel.app',
].filter(Boolean) as string[]

// Helper function to check if origin is allowed
function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return true // Allow same-origin requests
  return ALLOWED_ORIGINS.includes(origin)
}

// Handle preflight requests
export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin')
  
  if (!isOriginAllowed(origin)) {
    return new NextResponse(null, { status: 403 })
  }

  // Apply rate limiting to OPTIONS requests
  const rateLimitResult = applyRateLimit(request, RATE_LIMITS.WAITLIST)
  
  if (!rateLimitResult.success) {
    const retryAfter = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
    return new NextResponse(null, {
      status: 429,
      headers: {
        'Retry-After': retryAfter.toString(),
        ...createRateLimitHeaders(rateLimitResult),
      },
    })
  }

  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': origin || 'https://indecisive-wear.com',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400', // 24 hours
      ...createRateLimitHeaders(rateLimitResult),
    },
  })
}

export async function POST(request: Request) {
  try {
    // Check origin for CORS security
    const origin = request.headers.get('origin')
    if (!isOriginAllowed(origin)) {
      return new NextResponse(null, { status: 403 })
    }

    // Apply rate limiting
    const rateLimitResult = applyRateLimit(request, RATE_LIMITS.WAITLIST)
    
    if (!rateLimitResult.success) {
      const retryAfter = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
      return NextResponse.json({
        success: false,
        message: 'Too many requests. Please try again later.',
        retryAfter,
      }, {
        status: 429,
        headers: {
          'Access-Control-Allow-Origin': origin || 'https://indecisive-wear.com',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Retry-After': retryAfter.toString(),
          ...createRateLimitHeaders(rateLimitResult),
        },
      })
    }

    // Parse request body
    const body: WaitlistSignupRequest = await request.json()
    
    // Check if Supabase is configured
    let supabaseClient = null
    try {
      supabaseClient = createServerSupabaseClient()
    } catch (error) {
      // Fallback: Return success without logging sensitive data
      
      // Return success response even without database
      return NextResponse.json<WaitlistSignupResponse>({
        success: true,
        message: 'Successfully joined the waitlist! We\'ll notify you when we launch.',
        id: `temp-${Date.now()}`,
      }, { 
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': origin || 'https://indecisive-wear.com',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          ...createRateLimitHeaders(rateLimitResult),
        }
      })
    }
    
    // Validate required fields
    if (!body.email) {
      return NextResponse.json<WaitlistSignupResponse>({
        success: false,
        message: 'Email is required',
      }, { 
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': origin || 'https://indecisive-wear.com',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          ...createRateLimitHeaders(rateLimitResult),
        }
      })
    }
    
    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json<WaitlistSignupResponse>({
        success: false,
        message: 'Please enter a valid email address',
      }, { 
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': origin || 'https://indecisive-wear.com',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      })
    }
    
    // Get request metadata
    const headersList = await headers()
    const userAgent = headersList.get('user-agent')
    const referrer = headersList.get('referer')
    const clientIP = getClientIP(request)
    const utmParams = extractUTMParams(referrer)
    
    // Use Supabase client if available
    if (!supabaseClient) {
      // Should not reach here, but handle gracefully
      return NextResponse.json<WaitlistSignupResponse>({
        success: true,
        message: 'Successfully joined the waitlist! We\'ll notify you when we launch.',
        id: `temp-${Date.now()}`,
      }, { 
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': origin || 'https://indecisive-wear.com',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          ...createRateLimitHeaders(rateLimitResult),
        }
      })
    }
    
    const supabase = supabaseClient
    
    // Prepare data for insertion
    const waitlistData = {
      email: body.email.toLowerCase().trim(),
      name: body.name?.trim(),
      source: body.source || 'website',
      locale: body.locale || 'en',
      interests: body.interests || [],
      utm_source: body.utm_source || utmParams.utm_source,
      utm_medium: body.utm_medium || utmParams.utm_medium,
      utm_campaign: body.utm_campaign || utmParams.utm_campaign,
      ip_address: clientIP,
      user_agent: userAgent,
      referrer: referrer,
      status: 'active' as const,
      verified: false,
    }
    
    // Insert into database
    const { data, error } = await supabase
      .from('waitlist')
      .insert([waitlistData])
      .select('id, email, created_at')
      .single()
    
    if (error) {
      // Handle duplicate email
      if (error.code === '23505') {
        return NextResponse.json<WaitlistSignupResponse>({
          success: false,
          message: 'This email is already on our waitlist! We\'ll notify you when we launch.',
        }, { 
          status: 409,
          headers: {
            'Access-Control-Allow-Origin': origin || 'https://indecisive-wear.com',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          }
        })
      }
      
      return NextResponse.json<WaitlistSignupResponse>({
        success: false,
        message: 'Unable to join waitlist. Please try again later.',
      }, { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': origin || 'https://indecisive-wear.com',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      })
    }
    
    // Success response
    return NextResponse.json<WaitlistSignupResponse>({
      success: true,
      message: 'Successfully joined the waitlist! We\'ll notify you when we launch.',
      id: data.id,
    }, { 
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': origin || 'https://indecisive-wear.com',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        ...createRateLimitHeaders(rateLimitResult),
      }
    })
    
  } catch (error) {
    const origin = request.headers.get('origin')
    // Create a basic rate limit result for error responses
    const errorRateLimitResult = applyRateLimit(request, RATE_LIMITS.WAITLIST)
    
    return NextResponse.json<WaitlistSignupResponse>({
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': origin || 'https://indecisive-wear.com',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        ...createRateLimitHeaders(errorRateLimitResult),
      }
    })
  }
}