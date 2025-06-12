/**
 * Professional Cookie Management System
 * GDPR compliant with proper categorization
 */

// @ts-nocheck

export interface CookieDef {
  name: string
  description: string
  domain?: string
  duration: string
  purpose: string
}

export interface CookieCategory {
  id: string
  name: string
  description: string
  required: boolean
  cookies: CookieDef[]
}

export interface CookiePreferences {
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
  timestamp: string
}

// Cookie Categories Definition
export const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Strictly Necessary',
    description: 'Essential for website functionality and security',
    required: true,
    cookies: [
      {
        name: 'session_id',
        description: 'Maintains your session while browsing',
        duration: 'Session',
        purpose: 'Authentication and security'
      },
      {
        name: 'cart_data',
        description: 'Stores your shopping cart items',
        duration: '30 days',
        purpose: 'E-commerce functionality'
      },
      {
        name: 'csrf_token',
        description: 'Prevents cross-site request forgery attacks',
        duration: 'Session',
        purpose: 'Security protection'
      },
      {
        name: 'cookie_consent',
        description: 'Remembers your cookie preferences',
        duration: '1 year',
        purpose: 'Consent management'
      }
    ]
  },
  {
    id: 'functional',
    name: 'Functional',
    description: 'Enhance your experience with personalized features',
    required: false,
    cookies: [
      {
        name: 'language_preference',
        description: 'Remembers your selected language',
        duration: '1 year',
        purpose: 'Localization'
      },
      {
        name: 'currency_preference',
        description: 'Remembers your selected currency',
        duration: '1 year',
        purpose: 'Pricing display'
      },
      {
        name: 'location_preference',
        description: 'Remembers your selected country/region',
        duration: '1 year',
        purpose: 'Localization and shipping'
      },
      {
        name: 'recently_viewed',
        description: 'Shows products you recently looked at',
        duration: '7 days',
        purpose: 'Product recommendations'
      }
    ]
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'Help us understand how you use our website',
    required: false,
    cookies: [
      {
        name: '_ga',
        description: 'Google Analytics main tracking cookie',
        domain: '.indecisivewear.com',
        duration: '2 years',
        purpose: 'Website analytics and performance'
      },
      {
        name: '_ga_*',
        description: 'Google Analytics session tracking',
        domain: '.indecisivewear.com', 
        duration: '2 years',
        purpose: 'Session and user behavior analysis'
      },
      {
        name: 'performance_metrics',
        description: 'Tracks page load times and errors',
        duration: '30 days',
        purpose: 'Website performance optimization'
      }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Used for advertising and retargeting campaigns',
    required: false,
    cookies: [
      {
        name: '_fbp',
        description: 'Facebook Pixel browser identification',
        domain: '.indecisivewear.com',
        duration: '90 days',
        purpose: 'Facebook advertising and analytics'
      },
      {
        name: '_fbc',
        description: 'Facebook click identifier',
        domain: '.indecisivewear.com',
        duration: '90 days',
        purpose: 'Facebook conversion tracking'
      },
      {
        name: '_gcl_au',
        description: 'Google Ads conversion tracking',
        domain: '.indecisivewear.com',
        duration: '90 days',
        purpose: 'Google Ads attribution'
      },
      {
        name: 'email_campaign',
        description: 'Tracks email marketing campaigns',
        duration: '30 days',
        purpose: 'Email marketing effectiveness'
      }
    ]
  }
]

// Cookie Management Functions
export class CookieManager {
  private static instance: CookieManager
  private preferences: CookiePreferences | null = null

  private constructor() {
    this.loadPreferences()
  }

  static getInstance(): CookieManager {
    if (!CookieManager.instance) {
      CookieManager.instance = new CookieManager()
    }
    return CookieManager.instance
  }

  // Load saved preferences
  private loadPreferences(): void {
    if (typeof window === 'undefined') return
    
    try {
      const saved = localStorage.getItem('cookie_preferences')
      if (saved) {
        this.preferences = JSON.parse(saved)
      }
    } catch (error) {
      // Error loading cookie preferences
    }
  }

  // Save preferences
  savePreferences(preferences: Omit<CookiePreferences, 'timestamp'>): void {
    const fullPreferences: CookiePreferences = {
      ...preferences,
      necessary: true, // Always true
      timestamp: new Date().toISOString()
    }

    this.preferences = fullPreferences
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie_preferences', JSON.stringify(fullPreferences))
      localStorage.setItem('cookie_consent_date', fullPreferences.timestamp)
    }

    // Enforce preferences
    this.enforcePreferences(fullPreferences)
  }

  // Get current preferences
  getPreferences(): CookiePreferences | null {
    return this.preferences
  }

  // Check if user has consented
  hasConsented(): boolean {
    return this.preferences !== null
  }

  // Enforce cookie preferences
  private enforcePreferences(preferences: CookiePreferences): void {
    if (typeof window === 'undefined') return

    // Analytics cookies
    if (!preferences.analytics) {
      this.deleteCookiesByCategory('analytics')
      this.disableGoogleAnalytics()
    } else {
      this.enableGoogleAnalytics()
    }

    // Marketing cookies
    if (!preferences.marketing) {
      this.deleteCookiesByCategory('marketing')
      this.disableFacebookPixel()
    } else {
      this.enableFacebookPixel()
    }

    // Functional cookies
    if (!preferences.functional) {
      this.deleteCookiesByCategory('functional')
    }
  }

  // Delete cookies by category
  private deleteCookiesByCategory(categoryId: string): void {
    const category = COOKIE_CATEGORIES.find(cat => cat.id === categoryId)
    if (!category) return

    category.cookies.forEach(cookie => {
      this.deleteCookie(cookie.name, cookie.domain)
    })
  }

  // Delete specific cookie
  private deleteCookie(name: string, domain?: string): void {
    const domainStr = domain ? `; domain=${domain}` : ''
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${domainStr}`
  }

  // Google Analytics control
  private disableGoogleAnalytics(): void {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window['ga-disable-' + (process.env.NEXT_PUBLIC_GA_ID || '')] = true
    }
  }

  private enableGoogleAnalytics(): void {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GA_ID) {
      // @ts-ignore
      window['ga-disable-' + process.env.NEXT_PUBLIC_GA_ID] = false
      
      // Initialize if not already done
      if (typeof gtag === 'undefined') {
        this.loadGoogleAnalytics()
      }
    }
  }

  private loadGoogleAnalytics(): void {
    if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_GA_ID) return

    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`
    script.async = true
    document.head.appendChild(script)

    script.onload = () => {
      // @ts-ignore
      window.dataLayer = window.dataLayer || []
      // @ts-ignore
      window.gtag = function() { dataLayer.push(arguments) }
      // @ts-ignore
      gtag('js', new Date())
      // @ts-ignore
      gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        anonymize_ip: true,
        cookie_flags: 'max-age=7200;secure;samesite=none'
      })
    }
  }

  // Facebook Pixel control
  private disableFacebookPixel(): void {
    // Remove Facebook Pixel if loaded
    if (typeof window !== 'undefined' && 'fbq' in window) {
      // @ts-ignore
      window.fbq = function() { /* Facebook Pixel disabled by user consent */ }
    }
  }

  private enableFacebookPixel(): void {
    if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_FB_PIXEL_ID) return
    
    // Load Facebook Pixel
    // @ts-ignore
    !function(f,b,e,v,n,t,s) {
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    
    // @ts-ignore
    fbq('init', process.env.NEXT_PUBLIC_FB_PIXEL_ID)
    // @ts-ignore
    fbq('track', 'PageView')
  }

  // Scan for existing cookies
  scanExistingCookies(): { [categoryId: string]: string[] } {
    if (typeof window === 'undefined') return {}

    const existingCookies = document.cookie.split(';').map(cookie => 
      cookie.trim().split('=')[0]
    )

    const categorizedCookies: { [categoryId: string]: string[] } = {}

    COOKIE_CATEGORIES.forEach(category => {
      categorizedCookies[category.id] = []
      
      category.cookies.forEach(cookieDef => {
        const cookieName = cookieDef.name
        if (cookieName.includes('*')) {
          // Handle wildcard cookies like _ga_*
          const prefix = cookieName.replace('*', '')
          const matchingCookies = existingCookies.filter(name => name.startsWith(prefix))
          categorizedCookies[category.id].push(...matchingCookies)
        } else {
          if (existingCookies.includes(cookieName)) {
            categorizedCookies[category.id].push(cookieName)
          }
        }
      })
    })

    return categorizedCookies
  }

  // Check if reconsent is needed (e.g., after 1 year)
  needsReconsent(): boolean {
    if (!this.preferences) return true

    const consentDate = new Date(this.preferences.timestamp)
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

    return consentDate < oneYearAgo
  }
}

// Export singleton instance
export const cookieManager = CookieManager.getInstance()