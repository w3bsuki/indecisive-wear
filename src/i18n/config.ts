/**
 * i18n Configuration
 * 
 * Central configuration for internationalization
 */

export const SUPPORTED_LOCALES = ['en', 'bg', 'es', 'fr', 'de', 'it'] as const
export type SupportedLocale = typeof SUPPORTED_LOCALES[number]

export const DEFAULT_LOCALE: SupportedLocale = 'en'

export const COUNTRY_LOCALE_MAP: Record<string, SupportedLocale> = {
  'US': 'en',
  'GB': 'en',
  'CA': 'en',
  'AU': 'en',
  'BG': 'bg',
  'ES': 'es',
  'MX': 'es',
  'AR': 'es',
  'FR': 'fr',
  'DE': 'de',
  'AT': 'de',
  'CH': 'de',
  'IT': 'it',
}

export function isValidLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale)
}

export function getLocaleFromCountry(countryCode: string): SupportedLocale {
  return COUNTRY_LOCALE_MAP[countryCode] || DEFAULT_LOCALE
}