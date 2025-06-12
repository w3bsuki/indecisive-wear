/**
 * Marketing Layout - Layout for public marketing pages
 * 
 * This layout handles:
 * - Homepage and marketing pages
 * - Public product pages
 * - SEO optimization for marketing content
 * - Analytics and conversion tracking
 */

import { Metadata } from 'next'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: {
    template: '%s | Indecisive Wear',
    default: 'Indecisive Wear - Fashion That Adapts to You',
  },
  description: 'Discover fashion that adapts to your every mood and moment. Indecisive Wear offers unique, versatile pieces for the modern individual.',
  keywords: ['fashion', 'clothing', 'versatile', 'modern', 'style', 'indecisive wear'],
  authors: [{ name: 'Indecisive Wear' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Indecisive Wear',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@indecisivewear',
  },
}

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Marketing-specific wrapper */}
      <div className="marketing-content">
        {children}
      </div>
      
      {/* Analytics and Performance Monitoring */}
      <SpeedInsights />
      <Analytics />
    </div>
  )
}