/**
 * Location Footer Component
 * Footer section for LocationPopup with continue button and security badges
 */

"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Country } from './CountryData'

interface LocationFooterProps {
  selectedCountry: Country | null
  onConfirm: () => void
  className?: string
  disabled?: boolean
  showSecurityBadges?: boolean
}

export function LocationFooter({
  selectedCountry,
  onConfirm,
  className,
  disabled = false,
  showSecurityBadges = true
}: LocationFooterProps) {
  const canContinue = selectedCountry?.available && !disabled

  return (
    <div className={cn("p-6 border-t border-gray-100 bg-gray-50", className)}>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {selectedCountry && (
            <span>
              Shopping from <strong>{selectedCountry.name}</strong> with prices in <strong>{selectedCountry.currency}</strong>
            </span>
          )}
        </div>
        
        <Button
          onClick={onConfirm}
          disabled={!canContinue}
          className={cn(
            "px-8 py-2.5 rounded-xl font-semibold transition-all duration-200",
            canContinue 
              ? "bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-gray-400" 
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          )}
        >
          Continue Shopping
        </Button>
      </div>
      
      {/* Security and Info Badges */}
      {showSecurityBadges && (
        <SecurityBadges className="mt-4" />
      )}
    </div>
  )
}

/**
 * Security Badges Component
 * Displays security and compliance information
 */
interface SecurityBadgesProps {
  className?: string
}

export function SecurityBadges({ className }: SecurityBadgesProps) {
  return (
    <div className={cn("flex items-center justify-center gap-4 text-xs text-gray-500", className)}>
      <SecurityBadge 
        color="green" 
        label="SSL Secure" 
        description="Your data is encrypted and secure"
      />
      <span>•</span>
      <SecurityBadge 
        color="blue" 
        label="GDPR Compliant" 
        description="We respect your privacy rights"
      />
      <span>•</span>
      <span>Change anytime in settings</span>
    </div>
  )
}

/**
 * Individual Security Badge Component
 */
interface SecurityBadgeProps {
  color: 'green' | 'blue' | 'red' | 'yellow'
  label: string
  description?: string
}

export function SecurityBadge({ color, label, description }: SecurityBadgeProps) {
  const colorClasses = {
    green: 'bg-green-500',
    blue: 'bg-blue-500', 
    red: 'bg-red-500',
    yellow: 'bg-yellow-500'
  }

  return (
    <span 
      className="flex items-center gap-1"
      title={description}
    >
      <span className={cn("w-2 h-2 rounded-full", colorClasses[color])}></span>
      {label}
    </span>
  )
}

/**
 * Continue Button Component
 * Standalone continue button with loading and disabled states
 */
interface ContinueButtonProps {
  onClick: () => void
  disabled?: boolean
  loading?: boolean
  children?: React.ReactNode
  className?: string
}

export function ContinueButton({
  onClick,
  disabled = false,
  loading = false,
  children = "Continue Shopping",
  className
}: ContinueButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "px-8 py-2.5 rounded-xl font-semibold transition-all duration-200",
        "bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-gray-400",
        "disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed",
        className
      )}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-white rounded-full animate-spin" />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  )
}

/**
 * Location Summary Component
 * Shows selected country and currency information
 */
interface LocationSummaryProps {
  country: Country | null
  className?: string
  showCurrency?: boolean
  showShipping?: boolean
}

export function LocationSummary({
  country,
  className,
  showCurrency = true,
  showShipping = false
}: LocationSummaryProps) {
  if (!country) {
    return (
      <div className={cn("text-sm text-gray-500", className)}>
        Please select your location
      </div>
    )
  }

  return (
    <div className={cn("text-sm text-gray-600", className)}>
      <span>
        Shopping from <strong>{country.name}</strong>
        {showCurrency && (
          <> with prices in <strong>{country.currency}</strong></>
        )}
        {showShipping && country.available && (
          <> • Free shipping available</>
        )}
      </span>
    </div>
  )
}