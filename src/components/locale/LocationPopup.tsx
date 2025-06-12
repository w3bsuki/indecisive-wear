"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { X, MapPin, Globe } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { Country, COUNTRIES, getAvailableCountries, getComingSoonCountries, getCountryByCode } from './CountryData'
import { detectUserCountry } from './LocationDetector'
import { CountrySelector } from './CountrySelector'
import { LocationFooter } from './LocationFooter'

interface LocationPopupProps {
  isOpen: boolean
  onClose: () => void
  onCountrySelect: (country: Country) => void
  initialCountry?: string
  className?: string
}

export function LocationPopup({ 
  isOpen, 
  onClose, 
  onCountrySelect, 
  initialCountry,
  className 
}: LocationPopupProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null)

  // Auto-detect user's country on mount
  useEffect(() => {
    if (initialCountry) {
      setDetectedCountry(initialCountry)
      const country = getCountryByCode(initialCountry)
      if (country) {
        setSelectedCountry(country)
      }
    } else {
      // Use location detector service
      detectCountryWithFallback()
    }
  }, [initialCountry])

  const detectCountryWithFallback = async () => {
    try {
      const detectedCountry = await detectUserCountry({
        fallbackCountry: 'US',
        enableBrowserDetection: true,
        enableIPDetection: false // Disabled for privacy
      })
      
      if (detectedCountry) {
        setDetectedCountry(detectedCountry.code)
        setSelectedCountry(detectedCountry)
      } else {
        // Final fallback to US
        setDetectedCountry('US')
        const fallbackCountry = getCountryByCode('US')
        if (fallbackCountry) {
          setSelectedCountry(fallbackCountry)
        }
      }
    } catch (error) {
      // Could not detect country, defaulting to US
      setDetectedCountry('US')
      const fallbackCountry = getCountryByCode('US')
      if (fallbackCountry) {
        setSelectedCountry(fallbackCountry)
      }
    }
  }

  const handleCountrySelect = (country: Country) => {
    if (!country.available) return
    setSelectedCountry(country)
  }

  const handleConfirm = () => {
    if (selectedCountry) {
      onCountrySelect(selectedCountry)
      onClose()
    }
  }

  const availableCountries = getAvailableCountries()
  const comingSoonCountries = getComingSoonCountries()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "sm:max-w-[600px] w-[95vw] max-w-[95vw] p-0 gap-0 bg-white",
          "max-h-[90vh] overflow-hidden",
          className
        )}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={onClose}
      >
        <DialogHeader className="p-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-50 rounded-full">
                <Globe className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-900">
                  Where are you shopping from?
                </DialogTitle>
                <p className="text-sm text-gray-600 mt-1">
                  This helps us show you the right prices, shipping costs, and product availability
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Detected Location Banner */}
          {detectedCountry && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900">
                    We detected you&apos;re in {getCountryByCode(detectedCountry)?.name}
                  </p>
                  <p className="text-xs text-blue-700">
                    You can change this if it's not correct
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Country Selection */}
          <CountrySelector
            availableCountries={availableCountries}
            comingSoonCountries={comingSoonCountries}
            selectedCountry={selectedCountry}
            onCountrySelect={handleCountrySelect}
          />
        </div>

        {/* Footer with Continue Button */}
        <LocationFooter
          selectedCountry={selectedCountry}
          onConfirm={handleConfirm}
        />
      </DialogContent>
    </Dialog>
  )
}

// Hook for managing location popup state
export function useLocationPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if user has already selected a location
    const savedCountry = localStorage.getItem('indecisive-selected-country')
    const hasSeenPopup = localStorage.getItem('indecisive-location-popup-shown')
    
    if (!savedCountry && !hasSeenPopup && !hasShown) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true)
        setHasShown(true)
        localStorage.setItem('indecisive-location-popup-shown', 'true')
      }, 1500)
      
      return () => clearTimeout(timer)
    }
    return undefined
  }, [hasShown])

  const showPopup = () => setIsOpen(true)
  const hidePopup = () => setIsOpen(false)

  const handleCountrySelect = (country: Country) => {
    // Save selection to localStorage
    localStorage.setItem('indecisive-selected-country', JSON.stringify(country))
    localStorage.setItem('indecisive-locale', country.locale)
    localStorage.setItem('indecisive-currency', country.currency)
    
    // Update document language
    document.documentElement.lang = country.locale
    
    // Trigger locale change (would integrate with i18n)
    window.dispatchEvent(new CustomEvent('localeChange', { 
      detail: { country, locale: country.locale, currency: country.currency }
    }))
    
    hidePopup()
  }

  return {
    isOpen,
    showPopup,
    hidePopup,
    handleCountrySelect
  }
}