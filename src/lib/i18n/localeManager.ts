/**
 * Professional Localization Manager
 * Handles locale detection, URL structure, and currency conversion
 */

export type SupportedLocale = 'bg' | 'en' | 'de' | 'fr'
export type SupportedCurrency = 'BGN' | 'USD' | 'EUR'

export interface LocaleConfig {
  code: SupportedLocale
  name: string
  nativeName: string
  currency: SupportedCurrency
  currencySymbol: string
  exchangeRate: number // Rate from BGN
  flag: string
  countryCode: string
  isDefault?: boolean
}

export interface RegionConfig {
  locale: SupportedLocale
  currency: SupportedCurrency
  country: string
  countryCode: string
  shipping: {
    cost: number
    freeThreshold: number
    estimatedDays: string
  }
  vat: {
    rate: number
    included: boolean
  }
}

// Supported locales configuration
export const LOCALE_CONFIG: Record<SupportedLocale, LocaleConfig> = {
  bg: {
    code: 'bg',
    name: 'Bulgarian',
    nativeName: 'Български',
    currency: 'BGN',
    currencySymbol: 'лв',
    exchangeRate: 1.0, // Base currency
    flag: '🇧🇬',
    countryCode: 'BG',
    isDefault: true
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    currency: 'USD',
    currencySymbol: '$',
    exchangeRate: 0.55, // 1 BGN = ~0.55 USD
    flag: '🇺🇸',
    countryCode: 'US'
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    currency: 'EUR',
    currencySymbol: '€',
    exchangeRate: 0.51, // 1 BGN = ~0.51 EUR
    flag: '🇩🇪',
    countryCode: 'DE'
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    currency: 'EUR',
    currencySymbol: '€',
    exchangeRate: 0.51, // 1 BGN = ~0.51 EUR
    flag: '🇫🇷',
    countryCode: 'FR'
  }
}

// Region-specific configurations
export const REGION_CONFIG: Record<string, RegionConfig> = {
  'BG': {
    locale: 'bg',
    currency: 'BGN',
    country: 'Bulgaria',
    countryCode: 'BG',
    shipping: { cost: 5, freeThreshold: 50, estimatedDays: '1-2' },
    vat: { rate: 0.20, included: true }
  },
  'US': {
    locale: 'en',
    currency: 'USD',
    country: 'United States',
    countryCode: 'US',
    shipping: { cost: 15, freeThreshold: 50, estimatedDays: '7-14' },
    vat: { rate: 0, included: false }
  },
  'DE': {
    locale: 'de',
    currency: 'EUR',
    country: 'Germany',
    countryCode: 'DE',
    shipping: { cost: 8, freeThreshold: 40, estimatedDays: '3-5' },
    vat: { rate: 0.19, included: true }
  },
  'FR': {
    locale: 'fr',
    currency: 'EUR',
    country: 'France',
    countryCode: 'FR',
    shipping: { cost: 8, freeThreshold: 40, estimatedDays: '3-5' },
    vat: { rate: 0.20, included: true }
  }
}

export class LocaleManager {
  private static instance: LocaleManager
  private currentLocale: SupportedLocale = 'bg'
  private currentRegion: string = 'BG'
  private exchangeRates: Record<SupportedCurrency, number> = {
    BGN: 1.0,
    USD: 0.55,
    EUR: 0.51
  }

  private constructor() {
    this.initialize()
  }

  static getInstance(): LocaleManager {
    if (!LocaleManager.instance) {
      LocaleManager.instance = new LocaleManager()
    }
    return LocaleManager.instance
  }

  private initialize(): void {
    if (typeof window === 'undefined') return

    // Load saved preferences
    const savedLocale = localStorage.getItem('indecisive-locale') as SupportedLocale
    const savedRegion = localStorage.getItem('user_region')

    if (savedLocale && this.isValidLocale(savedLocale)) {
      this.currentLocale = savedLocale
    } else {
      // Auto-detect locale
      this.currentLocale = this.detectBrowserLocale()
    }

    if (savedRegion) {
      this.currentRegion = savedRegion
    } else {
      // Try to detect region from locale
      this.currentRegion = LOCALE_CONFIG[this.currentLocale].countryCode
    }

    // Fetch live exchange rates
    this.updateExchangeRates()
  }

  // Detect user's browser locale
  private detectBrowserLocale(): SupportedLocale {
    if (typeof window === 'undefined') return 'bg'

    const browserLang = navigator.language.toLowerCase()
    
    // Check for exact matches first
    if (browserLang.startsWith('bg')) return 'bg'
    if (browserLang.startsWith('de')) return 'de'
    if (browserLang.startsWith('fr')) return 'fr'
    if (browserLang.startsWith('en')) return 'en'

    // Default to Bulgarian
    return 'bg'
  }

  // Validate locale
  private isValidLocale(locale: string): locale is SupportedLocale {
    return Object.keys(LOCALE_CONFIG).includes(locale)
  }

  // Get current locale
  getCurrentLocale(): SupportedLocale {
    return this.currentLocale
  }

  // Get current region
  getCurrentRegion(): string {
    return this.currentRegion
  }

  // Set locale and save preference
  setLocale(locale: SupportedLocale): void {
    if (!this.isValidLocale(locale)) {
      // Invalid locale
      return
    }

    this.currentLocale = locale
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('indecisive-locale', locale)
      
      // Emit event for components to react
      window.dispatchEvent(new CustomEvent('localeChange', { 
        detail: { locale, region: this.currentRegion } 
      }))
    }
  }

  // Set region and update locale accordingly
  setRegion(countryCode: string): void {
    const regionConfig = REGION_CONFIG[countryCode]
    if (!regionConfig) {
      // Invalid country code
      return
    }

    this.currentRegion = countryCode
    this.currentLocale = regionConfig.locale

    if (typeof window !== 'undefined') {
      localStorage.setItem('user_region', countryCode)
      localStorage.setItem('indecisive-locale', regionConfig.locale)
      
      // Emit event
      window.dispatchEvent(new CustomEvent('localeChange', { 
        detail: { locale: this.currentLocale, region: countryCode } 
      }))
    }
  }

  // Get locale configuration
  getLocaleConfig(locale?: SupportedLocale): LocaleConfig {
    return LOCALE_CONFIG[locale || this.currentLocale]
  }

  // Get region configuration
  getRegionConfig(countryCode?: string): RegionConfig | undefined {
    return REGION_CONFIG[countryCode || this.currentRegion]
  }

  // Format price with proper currency
  formatPrice(bgPrice: number, locale?: SupportedLocale): string {
    const config = this.getLocaleConfig(locale)
    const convertedPrice = bgPrice * config.exchangeRate
    
    return new Intl.NumberFormat(config.code, {
      style: 'currency',
      currency: config.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(convertedPrice)
  }

  // Format price with symbol only (simpler)
  formatPriceSimple(bgPrice: number, locale?: SupportedLocale): string {
    const config = this.getLocaleConfig(locale)
    const convertedPrice = bgPrice * config.exchangeRate
    
    if (config.currency === 'BGN') {
      return `${convertedPrice.toFixed(2)} ${config.currencySymbol}`
    } else {
      return `${config.currencySymbol}${convertedPrice.toFixed(2)}`
    }
  }

  // Get shipping cost for current region
  getShippingCost(): number {
    const regionConfig = this.getRegionConfig()
    return regionConfig?.shipping.cost || 0
  }

  // Get free shipping threshold
  getFreeShippingThreshold(): number {
    const regionConfig = this.getRegionConfig()
    return regionConfig?.shipping.freeThreshold || 50
  }

  // Check if order qualifies for free shipping
  qualifiesForFreeShipping(totalBgPrice: number): boolean {
    const regionConfig = this.getRegionConfig()
    if (!regionConfig) return false
    
    const convertedTotal = totalBgPrice * LOCALE_CONFIG[regionConfig.locale].exchangeRate
    return convertedTotal >= regionConfig.shipping.freeThreshold
  }

  // Update exchange rates from API
  private async updateExchangeRates(): Promise<void> {
    try {
      // In production, use a real exchange rate API
      // For now, using static rates
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/BGN')
        .catch(() => null)
      
      if (response && response.ok) {
        const data = await response.json()
        this.exchangeRates = {
          BGN: 1.0,
          USD: data.rates.USD || 0.55,
          EUR: data.rates.EUR || 0.51
        }
        
        // Update locale configs with live rates
        Object.keys(LOCALE_CONFIG).forEach(locale => {
          const config = LOCALE_CONFIG[locale as SupportedLocale]
          if (config.currency !== 'BGN') {
            config.exchangeRate = this.exchangeRates[config.currency]
          }
        })
      }
    } catch (error) {
      // Failed to update exchange rates, using static rates
    }
  }

  // Get recommended locale based on geolocation
  async getRecommendedLocale(): Promise<SupportedLocale> {
    try {
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      
      const countryCode = data.country_code
      const regionConfig = REGION_CONFIG[countryCode]
      
      if (regionConfig) {
        return regionConfig.locale
      }
      
      // Fallback to browser detection
      return this.detectBrowserLocale()
    } catch {
      return this.detectBrowserLocale()
    }
  }

  // Generate hreflang tags for SEO
  generateHrefLangTags(currentPath: string = ''): string[] {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://indecisivewear.com'
    
    return Object.values(LOCALE_CONFIG).map(config => {
      const href = `${baseUrl}/${config.code}${currentPath}`
      return `<link rel="alternate" hreflang="${config.code}" href="${href}" />`
    })
  }

  // Get URL for specific locale
  getLocalizedUrl(path: string, locale?: SupportedLocale): string {
    const targetLocale = locale || this.currentLocale
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://indecisivewear.com'
    
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    
    return `${baseUrl}/${targetLocale}/${cleanPath}`
  }

  // Parse locale from URL path
  parseLocaleFromPath(path: string): { locale: SupportedLocale; cleanPath: string } {
    const segments = path.split('/').filter(Boolean)
    const firstSegment = segments[0]
    
    if (firstSegment && this.isValidLocale(firstSegment)) {
      return {
        locale: firstSegment,
        cleanPath: '/' + segments.slice(1).join('/')
      }
    }
    
    return {
      locale: 'bg', // Default
      cleanPath: path
    }
  }
}

// Export singleton instance
export const localeManager = LocaleManager.getInstance()