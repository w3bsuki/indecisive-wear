"use client"

import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { Menu } from 'lucide-react'
import { NotificationBadge } from "./NotificationBadge"
import { cn } from "@/lib/utils"

interface MobileActionsProps {
  cartCount: number
  onCartOpen: () => void
  onMenuToggle: () => void
  isMenuOpen: boolean
}

export const MobileActions = React.memo(function MobileActions({ 
  cartCount, 
  onCartOpen, 
  onMenuToggle, 
  isMenuOpen 
}: MobileActionsProps) {
  return (
    <div className="flex items-center gap-2 lg:hidden">
      {/* Cart Icon */}
      <button
        type="button"
        onClick={onCartOpen}
        className={cn(
          "relative w-9 h-9 rounded-full bg-transparent",
          "border border-pink-500/60 hover:border-pink-500",
          "text-pink-500 hover:text-white hover:bg-pink-500/90",
          "transition-all duration-200 ease-mobile active:scale-95",
          "flex items-center justify-center touch-manipulation",
          "transform-gpu shadow-sm hover:shadow-md"
        )}
        aria-label="Open cart"
      >
        <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />
        <NotificationBadge count={cartCount} size="small" />
      </button>

      {/* Mobile Menu Toggle */}
      <button
        type="button"
        onClick={onMenuToggle}
        className={cn(
          "relative w-9 h-9 rounded-full bg-transparent",
          "border border-pink-500/60 hover:border-pink-500",
          "text-pink-500 hover:text-white hover:bg-pink-500/90",
          "transition-all duration-200 ease-mobile active:scale-95",
          "flex items-center justify-center touch-manipulation",
          "transform-gpu shadow-sm hover:shadow-md"
        )}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <Menu className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </div>
  )
}) 