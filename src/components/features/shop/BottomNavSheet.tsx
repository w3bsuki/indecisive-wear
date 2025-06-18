"use client"

import React, { useState, useEffect, useRef } from "react"
import { Filter, ShoppingCart, User, Search } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useLocale } from "@/hooks/i18n/useLocale"
import { useRouter } from "next/navigation"

interface BottomNavSheetProps {
  activeFilterCount: number
  cartCount?: number
  showFilters: boolean
  onToggleFilters: () => void
  className?: string
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  badge?: number
  onClick: () => void
  active?: boolean
}

function NavItem({ icon, label, badge, onClick, active }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex-1 flex flex-col items-center justify-center",
        "py-2 px-3 min-h-[56px]",
        "transition-colors duration-200",
        "hover:bg-pink-50/50 active:bg-pink-100/50",
        "focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-inset"
      )}
      aria-label={label}
    >
      <div className="relative">
        <div className={cn(
          "w-6 h-6 transition-colors duration-200",
          active ? "text-pink-600" : "text-gray-600"
        )}>
          {icon}
        </div>
        {badge !== undefined && badge > 0 && (
          <Badge className={cn(
            "absolute -top-2 -right-2",
            "min-w-[18px] h-[18px] p-0",
            "flex items-center justify-center",
            "bg-pink-500 text-white border-0",
            "text-[10px] font-bold"
          )}>
            {badge > 99 ? '99+' : badge}
          </Badge>
        )}
      </div>
      <span className={cn(
        "text-[10px] font-medium mt-1",
        active ? "text-pink-600" : "text-gray-600"
      )}>
        {label}
      </span>
    </button>
  )
}

export function BottomNavSheet({ 
  activeFilterCount, 
  cartCount = 0, 
  showFilters,
  onToggleFilters,
  className 
}: BottomNavSheetProps) {
  const { locale } = useLocale()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Handle scroll to show/hide bottom nav
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollY
      const scrollThreshold = 5
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      // Determine visibility based on scroll direction
      if (Math.abs(scrollDelta) > scrollThreshold) {
        if (scrollDelta > 0 && currentScrollY > 100) {
          // Scrolling down & not at top
          setIsVisible(false)
        } else {
          // Scrolling up or at top
          setIsVisible(true)
        }
      }
      
      // Always show at very top or bottom
      const isAtTop = currentScrollY < 50
      const isAtBottom = window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 50
      
      if (isAtTop || isAtBottom) {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
      
      // Set timeout to show nav after scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [lastScrollY])
  
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-30 lg:hidden",
      "transition-transform duration-300 ease-in-out",
      isVisible ? "translate-y-0" : "translate-y-full",
      className
    )}>
      {/* Glass morphism container */}
      <div className={cn(
        "bg-white/90 backdrop-blur-xl",
        "border-t border-pink-200/30",
        "shadow-[0_-4px_20px_rgba(236,72,153,0.08)]",
        "rounded-t-2xl"
      )}>
        {/* Safe area padding for iPhone */}
        <div className="pb-safe">
          <nav className="flex items-stretch">
            <NavItem
              icon={<Filter className="w-5 h-5" />}
              label={locale === 'bg' ? 'Филтри' : 'Filters'}
              badge={activeFilterCount}
              onClick={onToggleFilters}
              active={showFilters}
            />
            
            <NavItem
              icon={<Search className="w-5 h-5" />}
              label={locale === 'bg' ? 'Търсене' : 'Search'}
              onClick={() => {
                // Focus search input in filters bar
                const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement
                searchInput?.focus()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            />
            
            <NavItem
              icon={<ShoppingCart className="w-5 h-5" />}
              label={locale === 'bg' ? 'Количка' : 'Cart'}
              badge={cartCount}
              onClick={() => router.push(`/${locale}/cart`)}
            />
            
            <NavItem
              icon={<User className="w-5 h-5" />}
              label={locale === 'bg' ? 'Профил' : 'Account'}
              onClick={() => router.push(`/${locale}/account`)}
            />
          </nav>
        </div>
      </div>
      
      {/* Add CSS for safe area */}
      <style jsx global>{`
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  )
}