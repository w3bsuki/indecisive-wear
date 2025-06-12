"use client"

import { motion, AnimatePresence, Variants } from "framer-motion"
import { X } from 'lucide-react'
import { Search } from 'lucide-react'
import { User } from 'lucide-react'
import { ShoppingBag } from 'lucide-react'
import { Heart } from 'lucide-react'
import { LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { SocialIcons } from "@/components/shared/social-icons"
import { NotificationBadge } from "./NotificationBadge"
import { LanguageToggle } from "@/components/locale/LanguageToggle"
import { useLocale } from "@/hooks"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onMenuClick: (section: string) => void
  query: string
  onQueryChange: (query: string) => void
  cartCount: number
  wishlistCount: number
  onCartOpen: () => void
}

export function MobileMenu({ 
  isOpen, 
  onClose, 
  onMenuClick, 
  query, 
  onQueryChange, 
  cartCount, 
  wishlistCount, 
  onCartOpen 
}: MobileMenuProps) {
  const { locale } = useLocale()
  
  // Animation variants
  const menuVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  }
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  }
  
  // Translations for mobile menu
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
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-md z-[90]"
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Enhanced menu */}
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`
              lg:hidden fixed inset-x-3 sm:inset-x-4 top-[3.5rem] 
              max-h-[calc(100vh-5rem)] 
              bg-white/96 backdrop-blur-xl 
              border border-pink-200/50 
              shadow-[0_20px_64px_rgba(236,72,153,0.15)] 
              rounded-2xl z-[100] overflow-auto
              touch-manipulation
            `}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-pink-50/50 to-white/20 pointer-events-none rounded-2xl" />
            
            <nav className="relative">
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    e.preventDefault()
                    onClose()
                  }
                }}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-pink-50/80 text-pink-500 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>

              {/* User Profile Section */}
              <div className="px-4 py-3 border-b border-pink-100/50">
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-pink-300/10 to-pink-500/10 rounded-xl" />
                  <div className="relative p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-pink-200/50">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-pink-400 blur-md opacity-50" />
                        <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-pink-500 to-pink-400 flex items-center justify-center shadow-inner">
                          <User className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold">John Doe</h3>
                        <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                      </div>
                      <div className="flex items-center">
                        <LanguageToggle variant="compact" className="ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="px-4 py-3 border-b border-pink-100/50">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-pink-300/5 to-pink-500/5 rounded-xl" />
                  <div className="relative flex items-center">
                    <Search className="absolute left-3 h-4 w-4 text-pink-400" />
                    <input 
                      type="search"
                      placeholder={t.searchPlaceholder}
                      className="w-full pl-9 pr-4 h-10 bg-transparent border border-pink-200/50 focus:border-pink-500/50 rounded-xl text-sm outline-none placeholder:text-pink-300 focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
                      value={query}
                      onChange={(e) => onQueryChange(e.target.value)}
                      aria-label="Search products"
                      aria-describedby="mobile-search-hint"
                      role="searchbox"
                    />
                  </div>
                </div>
              </div>

              {/* Main Navigation */}
              <div className="px-4 py-3 border-b border-pink-100/50">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => onMenuClick('NEW')}
                    className="group relative px-4 py-2 h-auto text-base font-mono font-bold text-black hover:text-white hover:bg-black/90 transition-colors rounded-xl border border-black/50 hover:border-black"
                  >
                    {t.new}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={() => onMenuClick('HOT')}
                    className="group relative px-4 py-2 h-auto text-base font-mono font-bold text-black hover:text-white hover:bg-black/90 transition-colors rounded-xl border border-black/50 hover:border-black"
                  >
                    {t.hot}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={() => onMenuClick('SALE')}
                    className="group relative px-4 py-2 h-auto text-base font-mono font-bold text-black hover:text-white hover:bg-black/90 transition-colors rounded-xl border border-black/50 hover:border-black"
                  >
                    {t.sale}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={() => window.location.href = `/${locale}/shop`}
                    className="group relative px-4 py-2 h-auto text-base font-mono font-bold text-pink-500 hover:text-white hover:bg-pink-500/90 transition-colors rounded-xl border border-pink-500/50 hover:border-pink-500"
                  >
                    {t.shop}
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="px-4 py-3 border-b border-pink-100/50">
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="ghost" 
                    onClick={onCartOpen}
                    className="group relative flex flex-col items-center justify-center gap-2 h-auto py-3 hover:bg-pink-50/80 rounded-xl border border-pink-200/50 hover:border-pink-300/50 transition-colors"
                  >
                    <div className="relative">
                      <div className="relative w-10 h-10 flex items-center justify-center">
                        <div className="absolute inset-0 border border-pink-500/50 rounded-full group-hover:border-pink-500 transition-all duration-300" />
                        <ShoppingBag className="h-6 w-6 text-pink-500 group-hover:scale-110 transition-transform duration-300" />
                        <NotificationBadge count={cartCount} className="h-5 w-5 text-xs -top-2 -right-1" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-medium">{t.cart}</span>
                      <span className="text-xs text-muted-foreground">{cartCount} {t.items}</span>
                    </div>
                  </Button>
                  <Button 
                    variant="ghost"
                    className="group relative flex flex-col items-center justify-center gap-2 h-auto py-3 hover:bg-pink-50/80 rounded-xl border border-pink-200/50 hover:border-pink-300/50 transition-colors"
                  >
                    <div className="relative">
                      <div className="relative w-10 h-10 flex items-center justify-center">
                        <div className="absolute inset-0 border border-pink-500/50 rounded-full group-hover:border-pink-500 transition-all duration-300" />
                        <Heart className="h-6 w-6 text-pink-500 group-hover:scale-110 transition-transform duration-300" />
                        <NotificationBadge count={wishlistCount} className="h-5 w-5 text-xs -top-2 -right-1" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-medium">{t.wishlist}</span>
                      <span className="text-xs text-muted-foreground">{wishlistCount} {t.items}</span>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Social Icons & Sign Out */}
              <div className="px-4 py-3 bg-white/80 backdrop-blur-sm border-t border-pink-500/10">
                <div className="flex justify-center">
                  <div className="relative inline-flex">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-pink-400/20 to-pink-500/20 blur-xl rounded-full opacity-50" />
                    <div className="relative bg-white/90 backdrop-blur-sm px-6 py-2.5 rounded-full border border-pink-200/50 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
                      <SocialIcons size="small" />
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost"
                  className="w-full mt-3 flex items-center justify-center gap-2 py-2 text-red-600 hover:text-red-700 hover:bg-red-50/80 transition-colors rounded-xl border border-red-200/50 hover:border-red-300/50"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-medium">{t.signOut}</span>
                </Button>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 