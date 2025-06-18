/**
 * Location Detection Utility
 * Handles country detection and geolocation logic
 */

import { getCountryByCode } from './CountryData'
import type { Country } from './CountryData'

export interface LocationDetectorOptions {
  fallbackCountry?: string
  enableIPDetection?: boolean
  enableBrowserDetection?: boolean
}

export class LocationDetector {
  private options: Required<LocationDetectorOptions>

  constructor(options: LocationDetectorOptions = {}) {
    this.options = {
      fallbackCountry: 'US',
      enableIPDetection: false, // Disabled for privacy/demo
      enableBrowserDetection: true,
      ...options
    }
  }

  /**
   * Detect user's country using available methods
   */
  async detectCountry(): Promise<Country | null> {
    try {
      // Try IP-based detection first (if enabled)
      if (this.options.enableIPDetection) {
        const ipCountry = await this.detectFromIP()
        if (ipCountry) return ipCountry
      }

      // Fallback to browser locale detection
      if (this.options.enableBrowserDetection) {
        const browserCountry = this.detectFromBrowser()
        if (browserCountry) return browserCountry
      }

      // Final fallback
      return getCountryByCode(this.options.fallbackCountry) || null
    } catch (error) {
      // In development, log the error for debugging
      if (process.env.NODE_ENV === 'development') {
        console.warn('Location detection failed:', error)
      }
      
      // Always return fallback country
      return getCountryByCode(this.options.fallbackCountry) || null
    }
  }

  /**
   * Detect country from IP address (using external service)
   * Note: Disabled by default for privacy reasons
   */
  private async detectFromIP(): Promise<Country | null> {
    try {
      // Example implementation - replace with your preferred service
      // const response = await fetch('https://ipapi.co/json/')
      // const data = await response.json()
      // return getCountryByCode(data.country_code)
      
      // For demo purposes, always return null
      return null
    } catch (error) {
      // In development, log the error for debugging
      if (process.env.NODE_ENV === 'development') {
        console.warn('IP detection failed:', error)
      }
      return null
    }
  }

  /**
   * Detect country from browser locale
   */
  private detectFromBrowser(): Country | null {
    if (typeof navigator === 'undefined') return null

    const locale = navigator.language.toLowerCase()
    
    // Map browser locales to countries
    const localeMap: Record<string, string> = {
      'bg': 'BG',
      'bg-bg': 'BG',
      'es': 'ES',
      'es-es': 'ES',
      'fr': 'FR',
      'fr-fr': 'FR',
      'de': 'DE',
      'de-de': 'DE',
      'it': 'IT',
      'it-it': 'IT',
      'en-gb': 'GB',
      'en-ca': 'CA',
      'en-au': 'AU',
      'en': 'US',
      'en-us': 'US'
    }

    // Check exact match first
    const exactMatch = localeMap[locale]
    if (exactMatch) {
      return getCountryByCode(exactMatch) || null
    }

    // Check language prefix
    const languagePrefix = locale.split('-')[0]
    if (languagePrefix) {
      const prefixMatch = localeMap[languagePrefix]
      if (prefixMatch) {
        return getCountryByCode(prefixMatch) || null
      }
    }

    return null
  }

  /**
   * Get user's timezone-based country guess
   */
  getTimezoneCountry(): Country | null {
    if (typeof Intl === 'undefined') return null

    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      
      // Basic timezone to country mapping
      const timezoneMap: Record<string, string> = {
        'Europe/Sofia': 'BG',
        'Europe/Madrid': 'ES',
        'Europe/Paris': 'FR',
        'Europe/Berlin': 'DE',
        'Europe/Rome': 'IT',
        'Europe/London': 'GB',
        'America/New_York': 'US',
        'America/Los_Angeles': 'US',
        'America/Chicago': 'US',
        'America/Toronto': 'CA',
        'Australia/Sydney': 'AU'
      }

      const countryCode = timezoneMap[timezone]
      return countryCode ? (getCountryByCode(countryCode) || null) : null
    } catch (error) {
      return null
    }
  }

  /**
   * Validate detected country and provide suggestions
   */
  validateDetection(detectedCountry: Country | null): {
    isValid: boolean
    isAvailable: boolean
    suggestions: Country[]
    confidence: 'high' | 'medium' | 'low'
  } {
    if (!detectedCountry) {
      return {
        isValid: false,
        isAvailable: false,
        suggestions: [],
        confidence: 'low'
      }
    }

    return {
      isValid: true,
      isAvailable: detectedCountry.available,
      suggestions: detectedCountry.available ? [] : this.getNearbyCountries(detectedCountry),
      confidence: detectedCountry.available ? 'high' : 'medium'
    }
  }

  /**
   * Get nearby countries if detected country is not available
   */
  private getNearbyCountries(country: Country): Country[] {
    const regionMap: Record<string, string[]> = {
      'europe': ['ES', 'FR', 'DE', 'IT'],
      'north-america': ['US'],
      'oceania': ['US'] // Fallback to US for now
    }

    const nearbyCountryCodes = regionMap[country.shippingRegion] || ['US']
    return nearbyCountryCodes
      .map(code => getCountryByCode(code))
      .filter((c): c is Country => c !== undefined && c.available)
  }
}

/**
 * Hook for using location detector
 */
export function useLocationDetector(options?: LocationDetectorOptions) {
  const detector = new LocationDetector(options)
  
  return {
    detectCountry: () => detector.detectCountry(),
    getTimezoneCountry: () => detector.getTimezoneCountry(),
    validateDetection: (country: Country | null) => detector.validateDetection(country)
  }
}

/**
 * Simple function for quick country detection
 */
export async function detectUserCountry(options?: LocationDetectorOptions): Promise<Country | null> {
  const detector = new LocationDetector(options)
  return detector.detectCountry()
}