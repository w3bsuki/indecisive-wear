"use client"

import React from "react"
import { X, Filter } from 'lucide-react'
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useLocale } from "@/hooks/i18n/useLocale"
import { ProductFilters } from "@/components/features/shop/ProductFilters"

interface Filters {
  category: string
  priceRange: [number, number]
  tags: string[]
  colors: string[]
  sizes: string[]
  inStock: boolean
}

interface FilterDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export function FilterDrawer({ 
  open, 
  onOpenChange, 
  filters, 
  onFiltersChange,
}: FilterDrawerProps) {
  const { locale } = useLocale()
  const isEn = locale === 'en'
  
  const activeFilterCount = [
    filters.category !== "all" ? 1 : 0,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 100 ? 1 : 0,
    filters.tags.length,
    filters.colors.length,
    filters.sizes.length,
    filters.inStock ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  const clearAllFilters = () => {
    onFiltersChange({
      category: "all",
      priceRange: [0, 100],
      tags: [],
      colors: [],
      sizes: [],
      inStock: false,
    })
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent 
        className="max-h-[92vh] bg-white/95 backdrop-blur-xl border-t-2 border-pink-200/30"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl border-b border-pink-200/30">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                <Filter className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">
                  {isEn ? 'Filters' : 'Филтри'}
                </h2>
                {activeFilterCount > 0 && (
                  <p className="text-xs text-gray-500">
                    {activeFilterCount} {isEn ? 'active' : 'активни'}
                  </p>
                )}
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-10 w-10 rounded-xl hover:bg-pink-50"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <ProductFilters 
            filters={filters}
            onFiltersChange={onFiltersChange}
          />
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-xl border-t border-pink-200/30 p-4">
          <div className="flex gap-3">
            {activeFilterCount > 0 && (
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="flex-1 h-12 rounded-xl border-2 border-pink-200/50 text-pink-600 hover:bg-pink-50 hover:border-pink-300 font-medium"
              >
                {isEn ? 'Clear All' : 'Изчисти всички'}
              </Button>
            )}
            <Button
              onClick={() => onOpenChange(false)}
              className={cn(
                "h-12 rounded-xl font-medium",
                activeFilterCount > 0 ? "flex-1" : "w-full",
                "bg-pink-500 hover:bg-pink-600 text-white",
                "border-2 border-white/30 hover:border-white/50",
                "shadow-sm hover:shadow-md"
              )}
            >
              {isEn ? 'View' : 'Виж'} {filters.category === "all" ? (isEn ? 'Products' : 'Продукти') : ''}
              {activeFilterCount > 0 && (
                <Badge className="ml-2 bg-white/20 text-white border-0">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}