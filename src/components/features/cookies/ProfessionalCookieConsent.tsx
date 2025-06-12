/**
 * Professional GDPR-compliant cookie consent with proper categorization
 */

"use client"

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Cookie } from 'lucide-react'
import { Settings } from 'lucide-react'
import { X } from 'lucide-react'
import { Check } from 'lucide-react'
import { Shield } from 'lucide-react'
import { Eye } from 'lucide-react'
import { Target } from 'lucide-react'
import { Wrench } from 'lucide-react'
import { ChevronDown } from 'lucide-react'
import { ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSimpleI18n } from '@/hooks/i18n/useSimpleI18n'
import { cookieManager, COOKIE_CATEGORIES } from '@/lib/cookies/cookieManager'
import { cn } from '@/lib/utils'

interface CookieSettings {
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
}

const DEFAULT_SETTINGS: CookieSettings = {
  necessary: true, // Always required
  functional: false,
  analytics: false,
  marketing: false,
}

export function ProfessionalCookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [settings, setSettings] = useState<CookieSettings>(DEFAULT_SETTINGS)
  const [existingCookies, setExistingCookies] = useState<{[key: string]: string[]}>({})
  const { locale } = useSimpleI18n()

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = cookieManager.hasConsented()
    const needsReconsent = cookieManager.needsReconsent()
    
    if (!hasConsented || needsReconsent) {
      // Scan existing cookies
      setExistingCookies(cookieManager.scanExistingCookies())
      
      // Show banner after location popup (to avoid overlap)
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 8000)
      return () => clearTimeout(timer)
    } else {
      const preferences = cookieManager.getPreferences()
      if (preferences) {
        setSettings({
          necessary: preferences.necessary,
          functional: preferences.functional,
          analytics: preferences.analytics,
          marketing: preferences.marketing,
        })
      }
    }
    return undefined
  }, [])

  const handleAcceptAll = () => {
    const allAccepted: CookieSettings = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    }
    
    saveCookieSettings(allAccepted)
  }

  const handleAcceptSelected = () => {
    saveCookieSettings(settings)
  }

  const handleRejectAll = () => {
    const onlyNecessary: CookieSettings = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    }
    
    saveCookieSettings(onlyNecessary)
  }

  const saveCookieSettings = (cookieSettings: CookieSettings) => {
    cookieManager.savePreferences(cookieSettings)
    setSettings(cookieSettings)
    setIsVisible(false)
    
    // Cookie preferences saved
  }

  const updateSetting = (key: keyof CookieSettings, value: boolean) => {
    if (key === 'necessary') return // Cannot disable necessary cookies
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'necessary': return Shield
      case 'functional': return Wrench
      case 'analytics': return Eye
      case 'marketing': return Target
      default: return Cookie
    }
  }

  const getCategoryColor = (categoryId: string) => {
    switch (categoryId) {
      case 'necessary': return 'text-green-600'
      case 'functional': return 'text-blue-600'
      case 'analytics': return 'text-purple-600'
      case 'marketing': return 'text-orange-600'
      default: return 'text-gray-600'
    }
  }

  const translations = {
    bg: {
      title: 'Управление на бисквитките',
      subtitle: 'Ние зачитаме вашата поверителност и ви даваме пълен контрол',
      description: 'Използваме бисквитки за подобряване на вашето изживяване, анализ на трафика и персонализирани реклами. Можете да управлявате предпочитанията си по-долу.',
      acceptAll: 'Приеми всички',
      acceptSelected: 'Запази избора',
      rejectAll: 'Само необходими',
      settings: 'Настройки',
      close: 'Затвори',
      required: 'Задължителни',
      enabled: 'Разрешени',
      disabled: 'Забранени',
      existingCookies: 'Съществуващи бисквитки',
      noCookies: 'Няма намерени бисквитки'
    },
    en: {
      title: 'Cookie Management',
      subtitle: 'We respect your privacy and give you full control',
      description: 'We use cookies to improve your experience, analyze traffic, and personalize ads. You can manage your preferences below.',
      acceptAll: 'Accept All',
      acceptSelected: 'Save Preferences',
      rejectAll: 'Only Necessary',
      settings: 'Settings',
      close: 'Close',
      required: 'Required',
      enabled: 'Enabled',
      disabled: 'Disabled',
      existingCookies: 'Existing Cookies',
      noCookies: 'No cookies found'
    }
  }

  const i18n = translations[locale]

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/10"
      >
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg border border-gray-200 max-h-[85vh] overflow-hidden"
        >
          {!showSettings ? (
            // Simple consent banner
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-pink-100 rounded-full flex-shrink-0">
                  <Cookie className="h-6 w-6 text-pink-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {i18n.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {i18n.description}
                  </p>
                  
                  {/* Quick stats */}
                  <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
                    <span>• 4 категории бисквитки</span>
                    <span>• GDPR съвместимост</span>
                    <span>• Пълен контрол</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <Button
                  variant="outline"
                  onClick={() => setShowSettings(true)}
                  className="flex items-center gap-2 border-gray-300"
                >
                  <Settings className="h-4 w-4" />
                  {i18n.settings}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleRejectAll}
                  className="border-gray-300"
                >
                  {i18n.rejectAll}
                </Button>
                
                <Button
                  onClick={handleAcceptAll}
                  className="bg-pink-500 hover:bg-pink-600 text-white sm:ml-auto"
                >
                  {i18n.acceptAll}
                </Button>
              </div>
            </div>
          ) : (
            // Detailed settings
            <div className="flex flex-col h-full max-h-[85vh]">
              {/* Header */}
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <Shield className="h-6 w-6 text-pink-500" />
                      {i18n.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{i18n.subtitle}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSettings(false)}
                    className="h-10 w-10 rounded-full hover:bg-white/50"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Categories */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {COOKIE_CATEGORIES.map((category) => {
                  const IconComponent = getCategoryIcon(category.id)
                  const iconColor = getCategoryColor(category.id)
                  const isExpanded = expandedCategory === category.id
                  const categoryKey = category.id as keyof CookieSettings
                  const existingCookiesCount = existingCookies[category.id]?.length || 0
                  
                  return (
                    <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="p-4 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <IconComponent className={cn("h-5 w-5", iconColor)} />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                {category.name}
                                {existingCookiesCount > 0 && (
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                    {existingCookiesCount} active
                                  </span>
                                )}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              {isExpanded ? 
                                <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                              }
                            </button>
                            
                            {category.required ? (
                              <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                                <Check className="h-4 w-4" />
                                {i18n.required}
                              </div>
                            ) : (
                              <button
                                onClick={() => updateSetting(categoryKey, !settings[categoryKey])}
                                className={cn(
                                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2",
                                  settings[categoryKey] ? "bg-pink-500" : "bg-gray-300"
                                )}
                              >
                                <span
                                  className={cn(
                                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                    settings[categoryKey] ? "translate-x-6" : "translate-x-1"
                                  )}
                                />
                              </button>
                            )}
                          </div>
                        </div>
                        
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-gray-200"
                          >
                            <div className="space-y-3">
                              <h5 className="font-medium text-gray-900">Cookie Details:</h5>
                              {category.cookies.map((cookie, index) => (
                                <div key={index} className="bg-white p-3 rounded border border-gray-100">
                                  <div className="flex justify-between items-start mb-1">
                                    <span className="font-mono text-sm text-gray-900">{cookie.name}</span>
                                    <span className="text-xs text-gray-500">{cookie.duration}</span>
                                  </div>
                                  <p className="text-xs text-gray-600 mb-1">{cookie.description}</p>
                                  <p className="text-xs text-gray-500">Purpose: {cookie.purpose}</p>
                                </div>
                              ))}
                              
                              {existingCookiesCount > 0 && (
                                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                                  <h6 className="text-sm font-medium text-blue-900 mb-2">{i18n.existingCookies}:</h6>
                                  <div className="flex flex-wrap gap-1">
                                    {existingCookies[category.id]?.map((cookieName, idx) => (
                                      <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                        {cookieName}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" onClick={handleRejectAll}>
                    {i18n.rejectAll}
                  </Button>
                  <Button 
                    onClick={handleAcceptSelected} 
                    className="bg-pink-500 hover:bg-pink-600 text-white sm:ml-auto"
                  >
                    {i18n.acceptSelected}
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 mt-3 text-center">
                  {locale === 'bg' 
                    ? 'Вашите настройки ще бъдат запазени за 1 година. Можете да ги промените по всяко време.'
                    : 'Your preferences will be saved for 1 year. You can change them at any time.'
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimatePresence>
  )
}