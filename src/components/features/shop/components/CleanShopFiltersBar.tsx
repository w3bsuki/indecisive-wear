"use client"

import React from "react"
import { Filter, Search, Grid3X3, Grid2X2, LayoutGrid } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useLocale } from "@/hooks/i18n/useLocale"

type GridLayout = "2" | "3" | "4"
type SortOption = "featured" | "price-low" | "price-high" | "newest" | "name"

interface CleanShopFiltersBarProps {
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

const CleanShopFiltersBarComponent = ({
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
}: CleanShopFiltersBarProps) => {
  const { locale } = useLocale()
  
  return (
    <section className="sticky top-16 sm:top-20 z-20 mb-6">
      <div className="bg-white/90 backdrop-blur-xl border border-pink-200/30 shadow-sm rounded-2xl">
        <div className="p-4 sm:p-5">
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-3">
            {/* Row 1: Search and Filter */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder={locale === 'bg' ? "Търси..." : "Search..."}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-9 h-10 bg-white/80 border-pink-200/50 focus:border-pink-500 focus:ring-pink-500/20 rounded-xl text-sm"
                />
              </div>
              <Button
                onClick={onToggleFilters}
                size="sm"
                className={cn(
                  "h-10 px-4 rounded-xl border-2 font-medium",
                  showFilters 
                    ? "bg-pink-500 border-white/30 text-white hover:bg-pink-600" 
                    : "bg-white border-pink-200/50 text-gray-700 hover:border-pink-300"
                )}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Row 2: Results and Sort */}
            <div className="flex items-center justify-between gap-2">
              <Badge className="bg-pink-50 text-pink-700 border-pink-200/50 px-3 py-1">
                {filteredProducts} {locale === 'bg' ? 'продукта' : 'products'}
              </Badge>
              
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="h-8 px-3 pr-8 text-sm border-2 border-pink-200/50 rounded-xl bg-white/80 focus:border-pink-500 focus:ring-pink-500/20 outline-none"
              >
                <option value="featured">{locale === 'bg' ? 'Препоръчани' : 'Featured'}</option>
                <option value="newest">{locale === 'bg' ? 'Най-нови' : 'Newest'}</option>
                <option value="price-low">{locale === 'bg' ? 'Цена ↑' : 'Price ↑'}</option>
                <option value="price-high">{locale === 'bg' ? 'Цена ↓' : 'Price ↓'}</option>
              </select>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Left: Search with integrated filter */}
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder={locale === 'bg' ? "Търси продукти..." : "Search products..."}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-9 h-10 bg-white/80 border-pink-200/50 focus:border-pink-500 focus:ring-pink-500/20 rounded-xl"
                />
              </div>
              
              <Button
                onClick={onToggleFilters}
                className={cn(
                  "h-10 px-4 rounded-xl border-2 font-medium flex items-center gap-2",
                  showFilters 
                    ? "bg-pink-500 border-white/30 text-white hover:bg-pink-600" 
                    : "bg-white border-pink-200/50 text-gray-700 hover:border-pink-300"
                )}
              >
                <Filter className="h-4 w-4" />
                {locale === 'bg' ? 'Филтри' : 'Filters'}
              </Button>
            </div>

            {/* Center: Results count */}
            <Badge className="bg-pink-50 text-pink-700 border-pink-200/50 px-4 py-1.5 text-sm font-medium">
              {filteredProducts} {locale === 'bg' ? 'от' : 'of'} {totalProducts} {locale === 'bg' ? 'продукта' : 'products'}
            </Badge>

            {/* Right: Sort and Grid Layout */}
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="h-10 px-4 pr-10 border-2 border-pink-200/50 rounded-xl bg-white/80 text-sm focus:border-pink-500 focus:ring-pink-500/20 outline-none hover:border-pink-300 transition-colors duration-200"
              >
                <option value="featured">{locale === 'bg' ? 'Препоръчани' : 'Featured'}</option>
                <option value="newest">{locale === 'bg' ? 'Най-нови' : 'Newest'}</option>
                <option value="price-low">{locale === 'bg' ? 'Цена: Ниска към висока' : 'Price: Low to High'}</option>
                <option value="price-high">{locale === 'bg' ? 'Цена: Висока към ниска' : 'Price: High to Low'}</option>
                <option value="name">{locale === 'bg' ? 'Име' : 'Name'}</option>
              </select>
              
              {/* Grid Layout Toggle */}
              <div className="flex items-center border-2 border-pink-200/50 rounded-xl bg-white/80 p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onGridLayoutChange("2")}
                  className={cn(
                    "h-8 w-8 p-0 rounded-lg",
                    gridLayout === "2" && "bg-pink-500 text-white hover:bg-pink-500"
                  )}
                  aria-label="2 columns"
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onGridLayoutChange("3")}
                  className={cn(
                    "h-8 w-8 p-0 rounded-lg",
                    gridLayout === "3" && "bg-pink-500 text-white hover:bg-pink-500"
                  )}
                  aria-label="3 columns"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onGridLayoutChange("4")}
                  className={cn(
                    "h-8 w-8 p-0 rounded-lg",
                    gridLayout === "4" && "bg-pink-500 text-white hover:bg-pink-500"
                  )}
                  aria-label="4 columns"
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

export const CleanShopFiltersBar = React.memo(CleanShopFiltersBarComponent)