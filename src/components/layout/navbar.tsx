"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { useSearch } from "@/hooks"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks"
import { CSS_CLASSES } from "@/lib/constants"
import { useToggle } from "@/hooks"
import { NavbarBrand } from "./navbar/NavbarBrand"
import { DesktopNavigation } from "./navbar/DesktopNavigation"
import { UserActions } from "./navbar/UserActions"
import { MobileActions } from "./navbar/MobileActions"
import { MobileMenu } from "./navbar/MobileMenu"
import { SearchDialog } from "./navbar/SearchDialog"
import { semanticColors, componentTokens } from "@/lib/design-system/tokens-2025"
import { motion } from "framer-motion"

const Navbar = React.memo(function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const mobileMenu = useToggle(false)
  const cart = useToggle(false)
  
  // Memoize static mock data to prevent unnecessary re-renders
  const cartItems = useMemo(() => [
    { id: 1, name: "Classic Black Cap", price: 29.99, quantity: 2, image: "/images/products/black-cap.jpg" },
    { id: 2, name: "Pink Summer Hat", price: 34.99, quantity: 1, image: "/images/products/pink-hat.jpg" }
  ], [])
  
  const notificationsList = useMemo(() => [
    { id: 1, type: "order", message: "Your order #1234 has been shipped!", time: "2 hours ago" },
    { id: 2, type: "sale", message: "Flash Sale! 50% off on all summer collection", time: "5 hours ago" }
  ], [])
  
  const {
    isOpen: isSearchOpen,
    setIsOpen: setIsSearchOpen,
    query,
    setQuery,
    isLoading,
  } = useSearch({
    onClose: () => setIsSearchOpen(false)
  })

  const { toast } = useToast()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && (mobileMenu.isOpen || isSearchOpen)) {
        mobileMenu.close()
        setIsSearchOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [mobileMenu.isOpen, isSearchOpen, setIsSearchOpen, mobileMenu])

  const handleMenuClick = (section: string) => {
    toast({
      title: "✨ Coming Soon!",
      description: `The ${section} section is coming soon. Stay tuned for updates!`,
      className: "bg-black/90 border-pink-500/30 text-white",
      variant: "default",
      duration: 3000,
    })
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-30 transition-all duration-300",
          isScrolled 
            ? "py-2" // 16px - increased from 12px
            : "py-3"   // 24px - increased from 16px for better mobile presence
        )}
        aria-label="Site header"
        role="banner"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-12">
          {/* Main navbar content */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Enhanced glass morphism background */}
            <div className={cn(
              "absolute inset-0",
              "bg-white/90 backdrop-blur-xl",
              "border-2 border-pink-200/40",
              "rounded-2xl",
              "shadow-[0_8px_32px_rgba(236,72,153,0.08)]",
              isScrolled && "shadow-[0_12px_40px_rgba(236,72,153,0.12)] border-pink-200/60"
            )} />
            <div className={cn(
              "relative",
              "bg-gradient-to-r from-pink-50/30 via-white/50 to-pink-50/30",
              "rounded-2xl overflow-hidden"
            )}>
              <div className={cn(
                "h-16 sm:h-18 lg:h-[72px]", // Increased mobile height from h-14 to h-16
                "px-3 sm:px-6 md:px-10",
                "flex items-center justify-between", // Simple flex on mobile, grid on desktop
                "lg:grid lg:grid-cols-[auto_1fr_auto]",
                "transition-all duration-300 ease-out"
              )}>
                {/* Logo - Always Left */}
                <NavbarBrand />

                {/* Desktop Navigation - Center (desktop only) */}
                <div className="hidden lg:flex justify-center">
                  <DesktopNavigation onMenuClick={handleMenuClick} />
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center">
                  {/* Desktop Icons */}
                  <UserActions 
                    onSearchOpen={() => setIsSearchOpen(true)}
                    notificationCount={notificationsList.length}
                    wishlistCount={2}
                    cartCount={cartItems.length}
                  />

                  {/* Mobile Menu and Cart Icons */}
                  <MobileActions 
                    cartCount={cartItems.length}
                    onCartOpen={cart.open}
                    onMenuToggle={mobileMenu.toggle}
                    isMenuOpen={mobileMenu.isOpen}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>
      
      {/* Navigation accessibility skip link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-pink-600 text-white px-4 py-2 rounded-md font-medium transition-all"
      >
        Skip to main content
      </a>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenu.isOpen}
        onClose={mobileMenu.close}
        onMenuClick={handleMenuClick}
        query={query}
        onQueryChange={setQuery}
        cartCount={cartItems.length}
        wishlistCount={2}
        onCartOpen={cart.open}
      />

      {/* Search Dialog */}
      <SearchDialog 
        isOpen={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        query={query}
        onQueryChange={setQuery}
        isLoading={isLoading}
      />
    </>
  )
})

export default Navbar
