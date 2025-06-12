import { NextRequest, NextResponse } from 'next/server'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, COUNTRY_LOCALE_MAP, isValidLocale } from '@/i18n/config'

/**
 * Locale middleware for handling internationalization routing
 * Manages URL routing, locale detection, and redirection
 */

export function localeMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip middleware for API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    // Extract locale from pathname
    const locale = pathname.split('/')[1]
    
    // Validate locale
    if (!locale || !isValidLocale(locale)) {
      return redirectToLocale(request, DEFAULT_LOCALE, pathname.slice(3))
    }
    
    // Set locale in headers for server components
    const response = NextResponse.next()
    response.headers.set('x-locale', locale)
    return response
  }

  // Determine user's preferred locale
  const detectedLocale = detectUserLocale(request)
  
  // Redirect to localized URL
  return redirectToLocale(request, detectedLocale, pathname)
}

/**
 * Detect user's preferred locale from various sources
 */
function detectUserLocale(request: NextRequest): string {
  // 1. Check URL query parameter
  const localeParam = request.nextUrl.searchParams.get('locale')
  if (localeParam && isValidLocale(localeParam)) {
    return localeParam
  }

  // 2. Check cookies
  const localeCookie = request.cookies.get('indecisive-locale')?.value
  if (localeCookie && isValidLocale(localeCookie)) {
    return localeCookie
  }

  // 3. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = parseAcceptLanguage(acceptLanguage)
    if (preferredLocale && isValidLocale(preferredLocale)) {
      return preferredLocale
    }
  }

  // 4. Check CF-IPCountry header (Cloudflare)
  const cfCountry = request.headers.get('cf-ipcountry')
  if (cfCountry && COUNTRY_LOCALE_MAP[cfCountry as keyof typeof COUNTRY_LOCALE_MAP]) {
    return COUNTRY_LOCALE_MAP[cfCountry as keyof typeof COUNTRY_LOCALE_MAP]
  }

  // 5. Check X-Vercel-IP-Country header (Vercel)
  const vercelCountry = request.headers.get('x-vercel-ip-country')
  if (vercelCountry && COUNTRY_LOCALE_MAP[vercelCountry as keyof typeof COUNTRY_LOCALE_MAP]) {
    return COUNTRY_LOCALE_MAP[vercelCountry as keyof typeof COUNTRY_LOCALE_MAP]
  }

  // 6. Default fallback
  return DEFAULT_LOCALE
}

/**
 * Parse Accept-Language header to extract preferred locale
 */
function parseAcceptLanguage(acceptLanguage: string): string | null {
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const parts = lang.trim().split(';q=')
      const code = parts[0] || ''
      const quality = parts[1] || '1'
      return {
        code: code.toLowerCase(),
        quality: parseFloat(quality)
      }
    })
    .sort((a, b) => b.quality - a.quality)

  for (const { code } of languages) {
    // Check exact match
    if (SUPPORTED_LOCALES.includes(code as any)) {
      return code
    }
    
    // Check language prefix (e.g., 'en-US' -> 'en')
    const langCode = code.split('-')[0]
    if (langCode && SUPPORTED_LOCALES.includes(langCode as any)) {
      return langCode
    }
  }

  return null
}

/**
 * Redirect to localized URL
 */
function redirectToLocale(request: NextRequest, locale: string, pathname: string): NextResponse {
  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  
  // Preserve search parameters
  newUrl.search = request.nextUrl.search
  
  // Use 307 (Temporary Redirect) to preserve request method
  const response = NextResponse.redirect(newUrl, 307)
  
  // Set locale cookie
  response.cookies.set('indecisive-locale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })
  
  return response
}

/**
 * Get locale from pathname
 */
export function getLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/')
  const maybeLocale = segments[1]
  
  if (maybeLocale && isValidLocale(maybeLocale)) {
    return maybeLocale
  }
  
  return DEFAULT_LOCALE
}

/**
 * Remove locale from pathname
 */
export function removeLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/')
  const maybeLocale = segments[1]
  
  if (maybeLocale && isValidLocale(maybeLocale)) {
    return '/' + segments.slice(2).join('/')
  }
  
  return pathname
}

/**
 * Add locale to pathname
 */
export function addLocaleToPathname(pathname: string, locale: string): string {
  const cleanPathname = removeLocaleFromPathname(pathname)
  return `/${locale}${cleanPathname === '/' ? '' : cleanPathname}`
}

/**
 * Configuration for middleware
 */
export const localeConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)'
  ]
}