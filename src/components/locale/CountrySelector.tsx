/**
 * Country Selector Component
 * Handles the UI for country selection with available and coming soon sections
 */

"use client"

import React from "react"
import { motion } from "framer-motion"
import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Country } from './CountryData'

interface CountrySelectorProps {
  availableCountries: Country[]
  comingSoonCountries: Country[]
  selectedCountry: Country | null
  onCountrySelect: (country: Country) => void
  className?: string
}

export function CountrySelector({
  availableCountries,
  comingSoonCountries,
  selectedCountry,
  onCountrySelect,
  className
}: CountrySelectorProps) {
  const handleCountrySelect = (country: Country) => {
    if (!country.available) return
    onCountrySelect(country)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Available Countries Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Available Now
        </h3>
        <div className="space-y-2">
          {availableCountries.map((country, index) => (
            <motion.button
              key={country.code}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleCountrySelect(country)}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200",
                "hover:border-pink-300 hover:bg-pink-50",
                selectedCountry?.code === country.code
                  ? "border-pink-500 bg-pink-50 ring-2 ring-pink-200"
                  : "border-gray-200 bg-white"
              )}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{country.flag}</span>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    {country.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    Currency: {country.currency} • Free shipping available
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {selectedCountry?.code === country.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="p-1 bg-pink-500 rounded-full"
                  >
                    <Check className="h-4 w-4 text-white" />
                  </motion.div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="border-pink-200 text-pink-700 hover:bg-pink-50"
                >
                  Select
                </Button>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Coming Soon Countries Section */}
      {comingSoonCountries.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Coming Soon
          </h3>
          <div className="space-y-2">
            {comingSoonCountries.map((country, index) => (
              <motion.div
                key={country.code}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (availableCountries.length + index) * 0.05 }}
                className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 bg-gray-50 opacity-60"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl grayscale">{country.flag}</span>
                  <div className="text-left">
                    <div className="font-semibold text-gray-700">
                      {country.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      We&apos;re working on bringing Indecisive Wear here
                    </div>
                  </div>
                </div>
                
                <Badge variant="secondary" className="bg-gray-200 text-gray-600">
                  Coming Soon
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Country Selection Item Component
 * Individual country item with selection state and animations
 */
interface CountryItemProps {
  country: Country
  isSelected: boolean
  onSelect: (country: Country) => void
  animationDelay?: number
  disabled?: boolean
}

export function CountryItem({
  country,
  isSelected,
  onSelect,
  animationDelay = 0,
  disabled = false
}: CountryItemProps) {
  const handleClick = () => {
    if (!disabled && country.available) {
      onSelect(country)
    }
  }

  if (!country.available) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: animationDelay }}
        className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 bg-gray-50 opacity-60"
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl grayscale">{country.flag}</span>
          <div className="text-left">
            <div className="font-semibold text-gray-700">
              {country.name}
            </div>
            <div className="text-sm text-gray-500">
              We&apos;re working on bringing Indecisive Wear here
            </div>
          </div>
        </div>
        
        <Badge variant="secondary" className="bg-gray-200 text-gray-600">
          Coming Soon
        </Badge>
      </motion.div>
    )
  }

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: animationDelay }}
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200",
        "hover:border-pink-300 hover:bg-pink-50",
        "focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2",
        isSelected
          ? "border-pink-500 bg-pink-50 ring-2 ring-pink-200"
          : "border-gray-200 bg-white",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="flex items-center gap-4">
        <span className="text-3xl">{country.flag}</span>
        <div className="text-left">
          <div className="font-semibold text-gray-900">
            {country.name}
          </div>
          <div className="text-sm text-gray-600">
            Currency: {country.currency} • Free shipping available
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="p-1 bg-pink-500 rounded-full"
          >
            <Check className="h-4 w-4 text-white" />
          </motion.div>
        )}
        <Button
          variant="outline"
          size="sm"
          className="border-pink-200 text-pink-700 hover:bg-pink-50"
          tabIndex={-1} // Prevent double focus
        >
          Select
        </Button>
      </div>
    </motion.button>
  )
}