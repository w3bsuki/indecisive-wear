"use client"

import React from "react"
import { X, Search, User, ShoppingBag, Heart, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SocialIcons } from "@/components/shared/social-icons"
import { LanguageToggle } from "@/components/locale/LanguageToggle"
import { useLocale } from "@/hooks"
import { cn } from "@/lib/utils"

interface CleanMobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onMenuClick: (section: string) => void
  query: string
  onQueryChange: (query: string) => void
  cartCount: number
  wishlistCount: number
  onCartOpen: () => void
}

export function CleanMobileMenu({ 
  isOpen, 
  onClose, 
  onMenuClick, 
  query, 
  onQueryChange, 
  cartCount, 
  wishlistCount, 
  onCartOpen 
}: CleanMobileMenuProps) {
  const { locale } = useLocale()
  
  // Translations
  const t = {
    searchPlaceholder: locale === 'bg' ? 'Търси продукти...' : 'Search products...',
    new: locale === 'bg' ? 'НОВО' : 'NEW',
    hot: locale === 'bg' ? 'ТОП' : 'HOT', 
    sale: locale === 'bg' ? 'НАМАЛЕНИЕ' : 'SALE',
    shop: locale === 'bg' ? 'МАГАЗИН' : 'SHOP',
    cart: locale === 'bg' ? 'Количка' : 'Cart',
    wishlist: locale === 'bg' ? 'Желани' : 'Wishlist',
    items: locale === 'bg' ? 'артикула' : 'items',
    signOut: locale === 'bg' ? 'Изход' : 'Sign Out'
  }
  
  if (!isOpen) return null
  
  return (
    <>
      {/* Backdrop */}
      <div
        className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-4 top-20",
          "max-h-[calc(100vh-6rem)]",
          "bg-white/90 backdrop-blur-xl",
          "border border-pink-200/30",
          "shadow-[0_0_30px_rgba(236,72,153,0.12)]",
          "rounded-2xl z-50 overflow-auto"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-xl border-b border-pink-200/30 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-pink-100 rounded-xl flex items-center justify-center">
                <User className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">John Doe</h3>
                <p className="text-xs text-gray-500">john.doe@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageToggle variant="compact" />
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-pink-50 text-gray-600 hover:text-pink-600 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-pink-200/30">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="search"
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-4 h-10 bg-white/80 border border-pink-200/50 focus:border-pink-500 focus:ring-pink-500/20 rounded-xl text-sm outline-none"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="p-4 space-y-3">
          {/* Main Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => onMenuClick('NEW')}
              className={cn(
                "h-12 rounded-xl font-medium",
                "bg-white hover:bg-pink-50",
                "border-2 border-pink-200/50 hover:border-pink-300",
                "text-gray-700 hover:text-pink-600",
                "shadow-sm hover:shadow-md",
                "transition-all duration-200"
              )}
            >
              {t.new}
            </Button>
            
            <Button
              onClick={() => onMenuClick('HOT')}
              className={cn(
                "h-12 rounded-xl font-medium",
                "bg-white hover:bg-pink-50",
                "border-2 border-pink-200/50 hover:border-pink-300",
                "text-gray-700 hover:text-pink-600",
                "shadow-sm hover:shadow-md",
                "transition-all duration-200"
              )}
            >
              {t.hot}
            </Button>
            
            <Button
              onClick={() => onMenuClick('SALE')}
              className={cn(
                "h-12 rounded-xl font-medium",
                "bg-white hover:bg-pink-50",
                "border-2 border-pink-200/50 hover:border-pink-300",
                "text-gray-700 hover:text-pink-600",
                "shadow-sm hover:shadow-md",
                "transition-all duration-200"
              )}
            >
              {t.sale}
            </Button>
            
            <Button
              onClick={() => window.location.href = `/${locale}/shop`}
              className={cn(
                "h-12 rounded-xl font-medium",
                "bg-pink-500 hover:bg-pink-600",
                "border-2 border-white/30 hover:border-white/50",
                "text-white",
                "shadow-sm hover:shadow-md",
                "transition-all duration-200"
              )}
            >
              {t.shop}
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <button
              onClick={onCartOpen}
              className={cn(
                "relative p-4 rounded-xl",
                "bg-white hover:bg-pink-50",
                "border-2 border-pink-200/50 hover:border-pink-300",
                "transition-all duration-200",
                "group"
              )}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <ShoppingBag className="h-6 w-6 text-pink-600" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 min-w-[20px] h-[20px] p-0 flex items-center justify-center bg-pink-500 text-white text-[10px]">
                      {cartCount}
                    </Badge>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.cart}</p>
                  <p className="text-xs text-gray-500">{cartCount} {t.items}</p>
                </div>
              </div>
            </button>
            
            <button
              className={cn(
                "relative p-4 rounded-xl",
                "bg-white hover:bg-pink-50",
                "border-2 border-pink-200/50 hover:border-pink-300",
                "transition-all duration-200",
                "group"
              )}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <Heart className="h-6 w-6 text-pink-600" />
                  {wishlistCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 min-w-[20px] h-[20px] p-0 flex items-center justify-center bg-pink-500 text-white text-[10px]">
                      {wishlistCount}
                    </Badge>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.wishlist}</p>
                  <p className="text-xs text-gray-500">{wishlistCount} {t.items}</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-pink-50/50 border-t border-pink-200/30">
          {/* Social Icons */}
          <div className="flex justify-center mb-4">
            <div className="bg-white/80 px-6 py-2.5 rounded-full border border-pink-200/50">
              <SocialIcons size="small" />
            </div>
          </div>
          
          {/* Sign Out */}
          <Button 
            variant="ghost"
            className={cn(
              "w-full h-10 rounded-xl",
              "text-red-600 hover:text-white hover:bg-red-500",
              "border-2 border-red-200 hover:border-red-500",
              "transition-all duration-200"
            )}
          >
            <LogOut className="h-4 w-4 mr-2" />
            {t.signOut}
          </Button>
        </div>
      </div>
    </>
  )
}