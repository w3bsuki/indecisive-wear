/**
 * Country Configuration and Types
 * Central place for all country-related data and types
 */

export interface Country {
  code: string
  name: string
  flag: string
  currency: string
  locale: string
  shippingRegion: string
  available: boolean
}

export const COUNTRIES: Country[] = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    locale: 'en',
    shippingRegion: 'north-america',
    available: true
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸', 
    currency: 'EUR',
    locale: 'es',
    shippingRegion: 'europe',
    available: true
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    currency: 'EUR',
    locale: 'fr', 
    shippingRegion: 'europe',
    available: true
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR',
    locale: 'de',
    shippingRegion: 'europe',
    available: true
  },
  {
    code: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    currency: 'EUR',
    locale: 'it',
    shippingRegion: 'europe',
    available: true
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    locale: 'en',
    shippingRegion: 'europe',
    available: false // Coming soon
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    locale: 'en',
    shippingRegion: 'north-america',
    available: false // Coming soon
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    locale: 'en',
    shippingRegion: 'oceania',
    available: false // Coming soon
  }
]

export const getCountryByCode = (code: string): Country | undefined => {
  return COUNTRIES.find(country => country.code === code)
}

export const getAvailableCountries = (): Country[] => {
  return COUNTRIES.filter(country => country.available)
}

export const getComingSoonCountries = (): Country[] => {
  return COUNTRIES.filter(country => !country.available)
}