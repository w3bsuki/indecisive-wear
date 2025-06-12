"use client"

import React from "react"
import { Filter, Search, Grid3X3, Grid2X2, LayoutGrid } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type GridLayout = "2" | "3" | "4"
type SortOption = "featured" | "price-low" | "price-high" | "newest" | "name"

interface ShopFiltersBarProps {
  totalProducts: number
  filteredProducts: number
  searchQuery: string
  sortBy: SortOption
  gridLayout: GridLayout
  showFilters: boolean
  onSearchChange: (query: string) => void
  onSortChange: (sort: SortOption) => void
  onGridLayoutChange: (layout: GridLayout) => void
  onToggleFilters: () => void
}

const ShopFiltersBarComponent = ({
  totalProducts,
  filteredProducts,
  searchQuery,
  sortBy,
  gridLayout,
  showFilters,
  onSearchChange,
  onSortChange,
  onGridLayoutChange,
  onToggleFilters
}: ShopFiltersBarProps) => {
  return (
    <section className="sticky top-16 z-10">
      <div className="bg-white/90 backdrop-blur-xl border-y border-pink-200/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Search & Filter */}
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9 h-10 bg-white/80 border-pink-200/50 focus:border-pink-500 focus:ring-pink-500/20 rounded-xl"
              />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleFilters}
              className={cn(
                "flex items-center gap-2 h-10 rounded-xl border-2",
                showFilters 
                  ? "bg-pink-500 border-white/30 text-white hover:bg-pink-600" 
                  : "bg-white border-pink-200/50 text-gray-700 hover:border-pink-300"
              )}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Center: Results Count */}
          <div className="hidden md:block">
            <span className="text-sm font-medium text-gray-600">
              {filteredProducts} of {totalProducts} products
            </span>
          </div>

          {/* Right: Sort & Layout */}
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              aria-label="Sort products by"
              className="h-10 px-3 border-2 border-pink-200/50 rounded-xl bg-white/80 text-sm focus:border-pink-500 focus:ring-pink-500/20 outline-none hover:border-pink-300 transition-colors duration-200"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
            
            <div className="hidden sm:flex items-center border-2 border-pink-200/50 rounded-xl bg-white/80">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onGridLayoutChange("2")}
                aria-label="Switch to 2 column grid"
                className={cn(
                  "h-8 w-8 p-0 rounded-l-xl rounded-r-none",
                  gridLayout === "2" && "bg-pink-500 text-white"
                )}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onGridLayoutChange("3")}
                aria-label="Switch to 3 column grid"
                className={cn(
                  "h-8 w-8 p-0 rounded-none",
                  gridLayout === "3" && "bg-pink-500 text-white"
                )}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onGridLayoutChange("4")}
                aria-label="Switch to 4 column grid"
                className={cn(
                  "h-8 w-8 p-0 rounded-r-xl rounded-l-none",
                  gridLayout === "4" && "bg-pink-500 text-white"
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

// Memoize with custom comparison function
export const ShopFiltersBar = React.memo(ShopFiltersBarComponent, (prevProps, nextProps) => {
  return (
    prevProps.totalProducts === nextProps.totalProducts &&
    prevProps.filteredProducts === nextProps.filteredProducts &&
    prevProps.searchQuery === nextProps.searchQuery &&
    prevProps.sortBy === nextProps.sortBy &&
    prevProps.gridLayout === nextProps.gridLayout &&
    prevProps.showFilters === nextProps.showFilters
  )
})