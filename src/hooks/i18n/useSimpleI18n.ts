/**
 * State-based i18n hook
 * For in-place locale switching without URL changes
 * Use this for components that need locale state without router changes
 */

import { useState, useEffect } from 'react'
import { t, formatPrice, getCurrentLocale, setLocale, type Locale } from '@/lib/i18n/simple-i18n'

export function useSimpleI18n() {
  const [locale, setLocaleState] = useState<Locale>('bg')
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Set hydration flag
    setIsHydrated(true)
    
    // Set initial locale after hydration
    setLocaleState(getCurrentLocale())

    // Listen for locale changes from other components
    const handleLocaleChange = (event: CustomEvent<Locale>) => {
      setLocaleState(event.detail)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('localeChange', handleLocaleChange as EventListener)
      return () => window.removeEventListener('localeChange', handleLocaleChange as EventListener)
    }
    
    return undefined
  }, [])

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    setLocaleState(newLocale)
  }

  const translate = (key: string, params?: Record<string, string | number>) => {
    return t(key, params, locale)
  }

  const formatCurrency = (price: number) => {
    return formatPrice(price, locale)
  }

  return {
    locale,
    setLocale: changeLocale,
    t: translate,
    formatPrice: formatCurrency,
    isHydrated,
    availableLocales: ['bg', 'en', 'es', 'fr', 'de', 'it'] as Locale[]
  }
}