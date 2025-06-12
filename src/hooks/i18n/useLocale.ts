'use client'

import { usePathname, useRouter } from 'next/navigation'
import { getCurrentLocaleFromRouter, setLocale, type Locale } from '@/lib/i18n/simple-i18n'

/**
 * Router-based locale hook
 * For URL-based locale switching (SEO friendly)
 * Use this when you need to change the URL path
 */
export function useLocale() {
  const pathname = usePathname()
  const router = useRouter()
  const locale = getCurrentLocaleFromRouter()

  const switchLocale = (newLocale?: Locale) => {
    const targetLocale = newLocale || (locale === 'bg' ? 'en' : 'bg')
    const cleanPath = pathname.replace(/^\/(bg|en|es|fr|de|it)/, '') || '/'
    
    // Update localStorage preference
    setLocale(targetLocale)
    
    // Navigate to new URL
    router.push(`/${targetLocale}${cleanPath}`)
  }

  return { 
    locale, 
    switchLocale,
    availableLocales: ['bg', 'en', 'es', 'fr', 'de', 'it'] as Locale[]
  }
}