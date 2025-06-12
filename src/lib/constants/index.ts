/**
 * Application Constants
 * Central location for all application constants
 */

// Re-export all constants
export * from './ui';
export * from './api';
export * from './validation';

// Application info
export const APP_NAME = 'Indecisive Wear';
export const APP_DESCRIPTION = 'Fashion that understands your indecisiveness';
export const APP_VERSION = '1.0.0';

// Environment
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_TEST = process.env.NODE_ENV === 'test';

// URLs and domains
export const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
export const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Time constants (in milliseconds)
export const TOAST_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 8000,
} as const;

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'indecisive-wear:user-preferences',
  CART: 'indecisive-wear:cart',
  THEME: 'indecisive-wear:theme',
  RECENT_SEARCHES: 'indecisive-wear:recent-searches',
} as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Common regex patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^\+?[\d\s-()]+$/,
  URL: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
} as const; 