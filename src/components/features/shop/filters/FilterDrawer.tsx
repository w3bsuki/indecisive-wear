"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import {
  FilterHeader,
  PriceRangeFilter,
  ColorFilter,
  SizeFilter,
  CategoryFilter,
  TagFilter,
  StockFilter,
  FilterFooter
} from "./components"

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


export const FilterDrawer = React.memo(function FilterDrawer({ 
  open, 
  onOpenChange, 
  filters, 
  onFiltersChange,
}: FilterDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  // Focus management and keyboard navigation
  useEffect(() => {
    if (open) {
      // Store the element that had focus before opening
      previousActiveElement.current = document.activeElement as HTMLElement
      
      // Focus the drawer content after a short delay to ensure it's rendered
      setTimeout(() => {
        const firstFocusableElement = drawerRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement
        
        if (firstFocusableElement) {
          firstFocusableElement.focus()
        }
      }, 100)

      // Handle Escape key to close drawer
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onOpenChange(false)
        }
        
        // Tab focus trapping
        if (event.key === 'Tab') {
          const focusableElements = drawerRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) as NodeListOf<HTMLElement>
          
          if (focusableElements && focusableElements.length > 0) {
            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]
            
            if (event.shiftKey && document.activeElement === firstElement) {
              event.preventDefault()
              lastElement.focus()
            } else if (!event.shiftKey && document.activeElement === lastElement) {
              event.preventDefault()
              firstElement.focus()
            }
          }
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    } else {
      // Return focus to the previous element when closing
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
        previousActiveElement.current = null
      }
    }
  }, [open, onOpenChange])

  const updateFilters = (updates: Partial<Filters>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const toggleArrayFilter = (key: keyof Pick<Filters, 'tags' | 'colors' | 'sizes'>, value: string) => {
    const currentArray = filters[key] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    updateFilters({ [key]: newArray })
  }

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

  const hasActiveFilters = 
    filters.category !== "all" ||
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 100 ||
    filters.tags.length > 0 ||
    filters.colors.length > 0 ||
    filters.sizes.length > 0 ||
    filters.inStock

  const activeFilterCount = [
    filters.category !== "all" ? 1 : 0,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 100 ? 1 : 0,
    filters.tags.length,
    filters.colors.length,
    filters.sizes.length,
    filters.inStock ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent 
        ref={drawerRef} 
        className="max-h-[92vh] bg-white"
        role="dialog"
        aria-labelledby="filter-drawer-title"
        aria-describedby="filter-drawer-description"
      >
        <div id="filter-drawer-description" className="sr-only">
          Filter products by price, color, size, category, and availability
        </div>
        <FilterHeader activeFilterCount={activeFilterCount} />

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-8">
            <PriceRangeFilter 
              priceRange={filters.priceRange}
              onPriceRangeChange={(range) => updateFilters({ priceRange: range })}
            />

            <ColorFilter
              selectedColors={filters.colors}
              onColorToggle={(colorId) => toggleArrayFilter('colors', colorId)}
            />

            <SizeFilter
              selectedSizes={filters.sizes}
              onSizeToggle={(sizeId) => toggleArrayFilter('sizes', sizeId)}
            />

            <CategoryFilter
              selectedCategory={filters.category}
              onCategoryChange={(categoryId) => updateFilters({ category: categoryId })}
            />

            <TagFilter
              selectedTags={filters.tags}
              onTagToggle={(tagId) => toggleArrayFilter('tags', tagId)}
            />

            <StockFilter
              inStock={filters.inStock}
              onStockToggle={() => updateFilters({ inStock: !filters.inStock })}
            />

          </div>
        </div>

        <FilterFooter
          hasActiveFilters={hasActiveFilters}
          activeFilterCount={activeFilterCount}
          onClearAll={clearAllFilters}
          onClose={() => onOpenChange(false)}
        />
      </DrawerContent>
    </Drawer>
  )
})