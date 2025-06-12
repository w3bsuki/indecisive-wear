"use client"

import React, { useState, useRef, useEffect } from "react"
import { ChevronDown, Sparkles, Flame, Tag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSimpleI18n } from '@/hooks/i18n/useSimpleI18n'
import { cn } from '@/lib/utils'

interface ShopDropdownProps {
  onMenuClick: (section: string) => void
}

export function ShopDropdown({ onMenuClick }: ShopDropdownProps) {
  const { t, locale } = useSimpleI18n()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  const menuItems = [
    { 
      key: 'NEW', 
      label: t('new'), 
      icon: Sparkles,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      action: () => {
        onMenuClick('NEW')
        setIsOpen(false)
      }
    },
    { 
      key: 'HOT', 
      label: t('hot'), 
      icon: Flame,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      action: () => {
        onMenuClick('HOT')
        setIsOpen(false)
      }
    },
    { 
      key: 'SALE', 
      label: t('sale'), 
      icon: Tag,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      action: () => {
        onMenuClick('SALE')
        setIsOpen(false)
      }
    },
  ]
  
  return (
    <div ref={dropdownRef} className="relative">
      {/* Main Shop Button */}
      <button
        onClick={() => router.push(`/${locale}/shop`)}
        onMouseEnter={() => setIsOpen(true)}
        className={cn(
          "group relative flex items-center gap-2 px-6 py-2.5",
          "rounded-xl transition-all duration-200",
          "bg-gradient-to-r from-pink-500 to-pink-600",
          "hover:from-pink-600 hover:to-pink-700",
          "text-white font-bold text-lg tracking-wide",
          "shadow-md hover:shadow-lg",
          "border-2 border-white/30 hover:border-white/50",
          "focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
        )}
        aria-label={`Navigate to ${t('shop')}`}
      >
        <span>{t('shop')}</span>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>
      
      {/* Dropdown Menu */}
      <div
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 mt-2 z-[100]",
          "transition-all duration-200 origin-top",
          isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
        )}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className={cn(
          "bg-white/95 backdrop-blur-xl",
          "border-2 border-pink-200/30",
          "shadow-[0_8px_32px_rgba(236,72,153,0.15)]",
          "rounded-2xl overflow-hidden",
          "min-w-[200px]",
          "p-2"
        )}>
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.key}
                onClick={item.action}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3",
                  "rounded-xl transition-all duration-200",
                  "hover:bg-pink-50/50",
                  "group"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  "transition-all duration-200",
                  item.bgColor,
                  "group-hover:scale-110"
                )}>
                  <Icon className={cn("h-4 w-4", item.color)} />
                </div>
                <span className="font-semibold text-gray-900 group-hover:text-pink-600">
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}