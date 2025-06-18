/**
 * Locale Components Index
 * Centralized exports for all locale-related components and utilities
 */

// Core data and types
export type { Country } from './CountryData'
export { 
  COUNTRIES, 
  getCountryByCode, 
  getAvailableCountries, 
  getComingSoonCountries 
} from './CountryData'

// Location detection utilities
export { 
  LocationDetector, 
  detectUserCountry, 
  useLocationDetector 
} from './LocationDetector'
export type { LocationDetectorOptions } from './LocationDetector'

// UI Components
export { LocationPopup, useLocationPopup } from './LocationPopup'
export { CountrySelector, CountryItem } from './CountrySelector'
export { 
  LocationFooter, 
  SecurityBadges, 
  SecurityBadge, 
  ContinueButton, 
  LocationSummary 
} from './LocationFooter'

// Note: LocaleProvider removed - using simple i18n system instead
// Note: LanguageSelector removed - using simple i18n system instead