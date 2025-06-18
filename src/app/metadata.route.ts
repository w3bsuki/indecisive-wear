import type { Metadata, Viewport } from 'next'

// Add viewport configuration for mobile optimization
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  themeColor: '#EC4899',
  viewportFit: 'cover',
}

// Add metadata configuration
export const metadata: Metadata = {
  title: 'INDECISIVEWEAR | Coming Soon - Join the Waitlist',
  description: 'Be the first to know when we launch! Join our waitlist for exclusive early access to unique fashion & accessories.',
  generator: 'Next.js',
  manifest: '/manifest.json',
  icons: {
    apple: [
      { url: '/icons/icon-192x192.png' },
    ],
    other: [
      { url: '/icons/safari-pinned-tab.svg', rel: 'mask-icon', color: '#ec4899' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'INDECISIVEWEAR',
  },
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'INDECISIVEWEAR',
    title: 'INDECISIVEWEAR | Coming Soon - Join the Waitlist',
    description: 'Be the first to know when we launch! Join our waitlist for exclusive early access to unique fashion & accessories.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INDECISIVEWEAR | Coming Soon - Join the Waitlist',
    description: 'Be the first to know when we launch! Join our waitlist for exclusive early access to unique fashion & accessories.',
  },
  applicationName: 'INDECISIVEWEAR',
  referrer: 'origin-when-cross-origin',
  keywords: ['fashion', 'clothing', 'accessories', 'streetwear', 'luxury', 'designer', 'waitlist'],
  authors: [{ name: 'INDECISIVEWEAR Team' }],
  colorScheme: 'light',
  creator: 'INDECISIVEWEAR',
  publisher: 'INDECISIVEWEAR',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification_token',
  },
} 