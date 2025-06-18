"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home } from 'lucide-react'
import { Search } from 'lucide-react'
import { SlidersHorizontal } from 'lucide-react'
import { Heart } from 'lucide-react'
import { User } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MobileBottomNavProps {
  onFilterChange: (filter: string) => void;
  onColorChange: (color: string) => void;
  onPriceChange: (range: string) => void;
  selectedFilter: string;
  selectedColor: string;
  selectedPrice: string;
  availableColors: string[];
  cartItemsCount: number;
}

export function MobileBottomNav({
  onFilterChange,
  onColorChange,
  onPriceChange,
  selectedFilter,
  selectedColor,
  selectedPrice,
  availableColors,
  cartItemsCount: _cartItemsCount,
}: MobileBottomNavProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [_activeTab, _setActiveTab] = useState("Collections")
  
  useEffect(() => {
    // Create an observer for the products section
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When products section is intersecting (visible), show the nav
        if (entry) {
          setIsVisible(entry.isIntersecting)
        }
      },
      {
        // Trigger when 10% of the products section is visible
        threshold: 0.1,
        rootMargin: "0px 0px -50% 0px" // Only trigger when we're well into the products section
      }
    )

    // Observe the products section instead of hero
    const productsSection = document.getElementById('products')
    if (productsSection) {
      observer.observe(productsSection)
    }

    return () => {
      if (productsSection) {
        observer.unobserve(productsSection)
      }
    }
  }, [])
  
  const navItems = [
    { icon: Home, label: "Home", action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { icon: Search, label: "Search", action: () => {} },
    { 
      icon: SlidersHorizontal, 
      label: "Filters", 
      action: () => setIsFilterOpen(true),
      highlight: true 
    },
    { icon: Heart, label: "Wishlist", action: () => {} },
    { icon: User, label: "Account", action: () => {} },
  ]

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
          >
            {/* Gradient blur background */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-lg border-t border-pink-500/20" />
            
            {/* Navigation items */}
            <nav className="relative grid grid-cols-5 gap-1 p-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 p-2 rounded-lg",
                    "min-h-[44px] min-w-[44px] touch-manipulation", // Mobile touch target
                    "transition-colors duration-200",
                    item.highlight 
                      ? "text-pink-500 hover:text-pink-600" 
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Safe area spacing for modern iPhones */}
            <div className="h-[env(safe-area-inset-bottom)] bg-white/80" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Sheet */}
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetContent side="bottom" className="h-[85vh] sm:hidden">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <Tabs defaultValue="type" className="w-full">
              <TabsList className="w-full grid grid-cols-3 h-12">
                <TabsTrigger value="type" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Type
                </TabsTrigger>
                <TabsTrigger value="color" className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-4 h-4">
                    <span className="w-3 h-3 rounded-full bg-gradient-to-br from-pink-500 to-amber-500" />
                  </span>
                  Color
                </TabsTrigger>
                <TabsTrigger value="price" className="flex items-center gap-2">
                  <span className="font-mono">$</span>
                  Price
                </TabsTrigger>
              </TabsList>
              <div className="mt-4">
                <TabsContent value="type">
                  <div className="flex flex-wrap gap-2 p-2">
                    {["all", "new", "hot", "sale"].map((filter) => (
                      <Button
                        key={filter}
                        variant={selectedFilter === filter ? "default" : "outline"}
                        size="default"
                        onClick={() => onFilterChange(filter)}
                        className={cn(
                          "flex-1 min-w-[80px] capitalize",
                          filter === "sale" && "bg-pink-500 hover:bg-pink-600 text-white"
                        )}
                      >
                        {filter}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="color">
                  <div className="flex flex-wrap gap-2 p-2">
                    <Button
                      variant={selectedColor === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => onColorChange("all")}
                      className="flex-1 min-w-[80px]"
                    >
                      All Colors
                    </Button>
                    {availableColors.map((color) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        size="default"
                        onClick={() => onColorChange(color)}
                        className="flex-1 min-w-[80px] capitalize"
                      >
                        <span
                          className="w-3 h-3 rounded-full mr-2"
                          style={{
                            backgroundColor: color.toLowerCase(),
                            border: color.toLowerCase() === "white" ? "1px solid #e5e7eb" : "none"
                          }}
                        />
                        {color}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="price">
                  <div className="flex flex-wrap gap-2 p-2">
                    {[
                      { label: "All Prices", value: "all" },
                      { label: "Under $30", value: "under-30" },
                      { label: "$30 - $35", value: "30-35" },
                      { label: "Over $35", value: "over-35" }
                    ].map((price) => (
                      <Button
                        key={price.value}
                        variant={selectedPrice === price.value ? "default" : "outline"}
                        size="default"
                        onClick={() => onPriceChange(price.value)}
                        className="flex-1"
                      >
                        {price.label}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
} 