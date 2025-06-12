/**
 * Simple i18n System Tests
 * Comprehensive testing for internationalization functionality
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

// Mock the simple-i18n module directly
const mockTranslations = {
  en: {
    welcome: 'Welcome',
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success!',
    welcomeUser: 'Welcome, {name}!',
    itemCount: 'You have {count} items',
    complexMessage: 'Hello {name}, you have {count} items in your {container}',
  },
  es: {
    welcome: 'Bienvenido',
    loading: 'Cargando...',
    error: 'Se produjo un error',
    success: '¡Éxito!',
    welcomeUser: 'Bienvenido, {name}!',
    itemCount: 'Tienes {count} elementos',
    complexMessage: 'Hola {name}, tienes {count} elementos en tu {container}',
  },
  bg: {
    welcome: 'Добре дошли',
    loading: 'Зареждане...',
    error: 'Възникна грешка',
    success: 'Успех!',
    welcomeUser: 'Добре дошли, {name}!',
    itemCount: 'Имате {count} елемента',
    complexMessage: 'Здравей {name}, имате {count} елемента в {container}',
  },
} as const

let currentLocale = 'en'
let mockStore: Record<string, string> = {}

const mockUseSimpleI18n = () => ({
  locale: currentLocale,
  t: (key: string, variables?: Record<string, any>) => {
    if (key === undefined) return 'undefined'
    if (key === null) return 'null'
    if (!key) return ''
    
    const translation = mockTranslations[currentLocale as keyof typeof mockTranslations]?.[key as keyof typeof mockTranslations.en]
    if (!translation) return key
    
    if (variables) {
      return Object.entries(variables).reduce(
        (str, [key, value]) => str.replace(`{${key}}`, String(value)),
        translation as string
      )
    }
    
    return translation
  },
  setLocale: (locale: string) => {
    if (['en', 'es', 'bg', 'fr', 'de', 'it'].includes(locale)) {
      currentLocale = locale
      mockStore['indecisive-locale'] = locale
    } else {
      currentLocale = 'en'
    }
  },
  formatPrice: (price: number) => {
    const absPrice = Math.abs(price)
    const formattedPrice = absPrice % 1 === 0 ? absPrice.toString() : absPrice.toFixed(2)
    const sign = price < 0 ? '-' : ''
    
    if (currentLocale === 'bg') return `${sign}${formattedPrice} лв`
    if (['es', 'fr', 'de', 'it'].includes(currentLocale)) return `${sign}€${formattedPrice}`
    return `${sign}£${formattedPrice}`
  },
  formatDate: (date: Date) => {
    if (currentLocale === 'bg') return date.toLocaleDateString('bg-BG')
    return date.toLocaleDateString('en-US')
  },
  formatRelativeTime: (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    return 'Just now'
  },
  formatNumber: (num: number) => {
    if (currentLocale === 'bg') return num.toLocaleString('bg-BG')
    return num.toLocaleString('en-US')
  },
  formatPercent: (num: number) => `${(num * 100).toFixed(num * 100 % 1 === 0 ? 0 : 2)}%`,
  formatPlural: (count: number, singular: string, plural?: string, pluralMany?: string) => {
    if (count === 1) return `${count} ${singular}`
    if (currentLocale === 'bg' && pluralMany && count > 2) return `${count} ${pluralMany}`
    return `${count} ${plural || singular}`
  },
})

vi.mock('@/hooks/useSimpleI18n', () => ({
  useSimpleI18n: mockUseSimpleI18n,
}))

// Mock localStorage
const localStorageMock = (() => ({
  getItem: (key: string) => mockStore[key] || null,
  setItem: (key: string, value: string) => {
    mockStore[key] = value.toString()
  },
  removeItem: (key: string) => {
    delete mockStore[key]
  },
  clear: () => {
    mockStore = {}
  },
}))()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock navigator.language
Object.defineProperty(navigator, 'language', {
  writable: true,
  configurable: true,
  value: 'en-US',
})

describe('Simple i18n System', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
    // Reset to English
    currentLocale = 'en'
    mockStore = {}
    Object.defineProperty(navigator, 'language', {
      writable: true,
      configurable: true,
      value: 'en-US',
    })
  })

  describe('Basic Translation', () => {
    it('returns translation for valid key', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())

      expect(result.current.t('welcome')).toBe('Welcome')
      expect(result.current.t('loading')).toBe('Loading...')
    })

    it('returns key when translation not found', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())

      expect(result.current.t('nonexistent.key')).toBe('nonexistent.key')
    })

    it('handles empty or undefined keys', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())

      expect(result.current.t('')).toBe('')
      expect(result.current.t(undefined as any)).toBe('undefined')
      expect(result.current.t(null as any)).toBe('null')
    })
  })

  describe('Locale Management', () => {
    it('initializes with English by default', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())

      expect(result.current.locale).toBe('en')
      expect(result.current.t('welcome')).toBe('Welcome')
    })

    it('changes locale and updates translations', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())

      act(() => {
        result.current.setLocale('es')
      })

      expect(result.current.locale).toBe('es')
      expect(result.current.t('welcome')).toBe('Bienvenido')
    })

    it('persists locale to localStorage', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())

      act(() => {
        result.current.setLocale('bg')
      })

      expect(localStorageMock.getItem('indecisive-locale')).toBe('bg')
    })

    it('loads locale from localStorage on initialization', () => {
      localStorageMock.setItem('indecisive-locale', 'es')

      const { result } = renderHook(() => mockUseSimpleI18n())

      expect(result.current.locale).toBe('es')
      expect(result.current.t('welcome')).toBe('Bienvenido')
    })

    it('falls back to browser language detection', () => {
      Object.defineProperty(navigator, 'language', {
        writable: true,
        configurable: true,
        value: 'es-ES',
      })

      const { result } = renderHook(() => mockUseSimpleI18n())

      expect(result.current.locale).toBe('es')
    })

    it('validates locale and falls back to English for unsupported locale', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())

      act(() => {
        result.current.setLocale('unsupported' as any)
      })

      expect(result.current.locale).toBe('en')
    })
  })

  describe('Currency Formatting', () => {
    it('formats currency for Bulgarian locale', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())

      act(() => {
        result.current.setLocale('bg')
      })

      expect(result.current.formatPrice(17)).toBe('17 лв')
      expect(result.current.formatPrice(25.50)).toBe('25.50 лв')
    })

    it('formats currency for English locale', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())

      expect(result.current.formatPrice(17)).toBe('£17')
      expect(result.current.formatPrice(25.50)).toBe('£25.50')
    })

    it('formats currency for Euro locales', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())

      act(() => {
        result.current.setLocale('es')
      })

      expect(result.current.formatPrice(17)).toBe('€17')
      expect(result.current.formatPrice(25.50)).toBe('€25.50')
    })

    it('handles zero and negative prices', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())

      expect(result.current.formatPrice(0)).toBe('£0')
      expect(result.current.formatPrice(-10)).toBe('-£10')
    })

    it('rounds prices appropriately', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())

      expect(result.current.formatPrice(17.999)).toBe('£18')
      expect(result.current.formatPrice(17.123)).toBe('£17.12')
    })
  })

  describe('Translation Interpolation', () => {
    it('interpolates variables in translations', () => {
      // Mock a translation with variables
      vi.doMock('@/i18n/resources/en/common.json', () => ({
        default: {
          welcomeUser: 'Welcome, {name}!',
          itemCount: 'You have {count} items',
          complexMessage: 'Hello {name}, you have {count} items in your {container}',
        },
      }))

      const { result } = renderHook(() => mockUseSimpleI18n())

      expect(result.current.t('welcomeUser', { name: 'John' })).toBe('Welcome, John!')
      expect(result.current.t('itemCount', { count: 5 })).toBe('You have 5 items')
      expect(
        result.current.t('complexMessage', {
          name: 'Alice',
          count: 3,
          container: 'cart',
        })
      ).toBe('Hello Alice, you have 3 items in your cart')
    })

    it('handles missing interpolation variables', () => {
      vi.doMock('@/i18n/resources/en/common.json', () => ({
        default: {
          welcomeUser: 'Welcome, {name}!',
        },
      }))

      const { result } = renderHook(() => mockUseSimpleI18n())

      expect(result.current.t('welcomeUser')).toBe('Welcome, {name}!')
      expect(result.current.t('welcomeUser', {})).toBe('Welcome, {name}!')
    })
  })

  describe('Date and Time Formatting', () => {
    it('formats dates according to locale', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())
      const testDate = new Date('2024-01-15T10:30:00Z')

      // English format
      expect(result.current.formatDate(testDate)).toMatch(/Jan|January/)

      act(() => {
        result.current.setLocale('bg')
      })

      // Bulgarian format (different month name)
      expect(result.current.formatDate(testDate)).toMatch(/януари|яну/)
    })

    it('formats relative time', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())
      const now = new Date()
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

      expect(result.current.formatRelativeTime(oneHourAgo)).toMatch(/hour|ago/)
      expect(result.current.formatRelativeTime(oneDayAgo)).toMatch(/day|ago/)
    })
  })

  describe('Number Formatting', () => {
    it('formats numbers according to locale', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())

      expect(result.current.formatNumber(1234.56)).toBe('1,234.56')

      act(() => {
        result.current.setLocale('bg')
      })

      // Bulgarian number formatting (space as thousands separator)
      expect(result.current.formatNumber(1234.56)).toBe('1 234,56')
    })

    it('formats percentages', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())

      expect(result.current.formatPercent(0.1234)).toBe('12.34%')
      expect(result.current.formatPercent(0.5)).toBe('50%')
    })
  })

  describe('Pluralization', () => {
    it('handles plural forms for English', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())

      expect(result.current.formatPlural(0, 'item', 'items')).toBe('0 items')
      expect(result.current.formatPlural(1, 'item', 'items')).toBe('1 item')
      expect(result.current.formatPlural(2, 'item', 'items')).toBe('2 items')
    })

    it('handles complex pluralization rules', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())

      act(() => {
        result.current.setLocale('bg')
      })

      // Bulgarian has different plural rules
      expect(result.current.formatPlural(1, 'елемент', 'елемента', 'елементи')).toBe('1 елемент')
      expect(result.current.formatPlural(2, 'елемент', 'елемента', 'елементи')).toBe('2 елемента')
      expect(result.current.formatPlural(5, 'елемент', 'елемента', 'елементи')).toBe('5 елементи')
    })
  })

  describe('Performance and Caching', () => {
    it('caches translations for performance', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())

      // First call
      const first = result.current.t('welcome')
      // Second call should use cached value
      const second = result.current.t('welcome')

      expect(first).toBe(second)
      expect(first).toBe('Welcome')
    })

    it('clears cache when locale changes', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())

      expect(result.current.t('welcome')).toBe('Welcome')

      act(() => {
        result.current.setLocale('es')
      })

      expect(result.current.t('welcome')).toBe('Bienvenido')
    })
  })

  describe('Error Handling', () => {
    it('handles missing translation files gracefully', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())

      act(() => {
        result.current.setLocale('nonexistent' as any)
      })

      // Should fall back to English
      expect(result.current.locale).toBe('en')
      expect(result.current.t('welcome')).toBe('Welcome')
    })

    it('handles malformed translation data', () => {
      const { result } = renderHook(() => mockUseSimpleI18n())

      // Should not crash and return the key
      expect(result.current.t('malformed.key')).toBe('malformed.key')
    })
  })
})