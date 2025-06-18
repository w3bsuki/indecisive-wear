import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/account(.*)',
  '/checkout(.*)',
  '/api/orders(.*)',
  '/api/user(.*)',
  '/admin(.*)',
  '/(en|bg)/account(.*)',
  '/(en|bg)/checkout(.*)',
])

const isPublicRoute = createRouteMatcher([
  '/',
  '/shop(.*)',
  '/products(.*)',
  '/api/waitlist',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/terms',
  '/privacy',
  '/returns',
  '/coming-soon',
  '/(en|bg)(.*)',
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const pathname = req.nextUrl.pathname

  // Handle locale redirects for non-API, non-static routes
  if (
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/images') &&
    !pathname.startsWith('/favicon') &&
    !pathname.includes('.') &&
    !pathname.startsWith('/sign-in') &&
    !pathname.startsWith('/sign-up')
  ) {
    // Check if pathname already has locale
    const hasLocale = pathname.startsWith('/bg') || pathname.startsWith('/en')

    if (!hasLocale) {
      // Default to Bulgarian for new visitors
      const locale = 'bg'
      const url = new URL(`/${locale}${pathname}`, req.url)
      return NextResponse.redirect(url)
    }
  }

  // Check authentication for protected routes
  if (isProtectedRoute(req)) {
    await auth.protect()
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
} 