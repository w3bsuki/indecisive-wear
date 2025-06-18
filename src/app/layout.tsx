import './globals.css'
import { Inter, Roboto_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import Script from 'next/script'
import type { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { defaultMetadata, defaultViewport, structuredData } from '@/lib/seo/metadata'
import type { Metadata, Viewport } from "next"
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { StoreProvider } from '@/components/providers/StoreProvider'
import { ErrorBoundary } from '@/components/error/ErrorBoundary'
import { Toaster } from '@/components/ui/toaster'
import Navbar from '@/components/layout/navbar'
import { Footer } from '@/components/features/footer/Footer'
import { LocationPopup } from '@/components/locale/LocationPopup'
import { ProfessionalCookieConsent } from '@/components/features/cookies/ProfessionalCookieConsent'

// Cal Sans font for headings
const calSans = localFont({
  src: '../../public/fonts/CalSans-SemiBold.woff2',
  variable: '--font-cal',
  display: 'swap',
  preload: true,
})

// Initialize Inter font with all necessary weights and features
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['system-ui', 'arial'],
  weight: ['400', '500', '600', '700'],
  preload: true,
  adjustFontFallback: true,
})

// Add Roboto Mono for countdown timer and technical elements
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
  weight: ['400', '500', '700'],
})

// Enhanced metadata using our SEO system
export const metadata: Metadata = defaultMetadata

// Separate viewport export (required by Next.js 15)
export const viewport: Viewport = defaultViewport

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${calSans.variable} ${robotoMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Enhanced meta tags */}
        <meta name="application-name" content="Indecisive Wear" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Indecisive Wear" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/CalSans-SemiBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//vercel-analytics.com" />
        <link rel="dns-prefetch" href="//vercel-insights.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.organization())
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.website())
          }}
        />
        
        
        {/* Service Worker Registration */}
        <Script src="/sw-register.js" strategy="afterInteractive" />
        
        {/* Google Analytics (if enabled) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                  anonymize_ip: true,
                  cookie_flags: 'max-age=7200;secure;samesite=none',
                });
              `}
            </Script>
          </>
        )}
        
        {/* Microsoft Clarity (if enabled) */}
        {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
            `}
          </Script>
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body 
        className={cn(
          inter.className,
          "min-h-screen bg-background font-sans antialiased",
          "pt-safe pb-safe", // Safe area support for mobile notches
        )}
        suppressHydrationWarning
      >
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <StoreProvider>
              <QueryProvider>
                <ErrorBoundary>
                  {/* Skip to main content link */}
                  <a 
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded focus:underline"
                  >
                    Skip to main content
                  </a>
                  <div className="relative flex min-h-screen-safe flex-col">
                    <Navbar />
                    <main id="main-content" className="flex-1 px-safe">
                      {children}
                    </main>
                  </div>
                  {/* Toast notifications */}
                  <Toaster />
                  
                  {/* Location & Cookie popups */}
                  <ProfessionalCookieConsent />
                </ErrorBoundary>
              </QueryProvider>
            </StoreProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
