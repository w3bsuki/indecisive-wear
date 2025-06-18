"use client"

import { useState, useMemo } from "react"
import { ProductGrid } from "./ProductGrid"
import { ProductFilters } from "./ProductFilters"
import { FilterDrawer } from "./filters/FilterDrawer"
import { ShopHero } from "./components/ShopHero"
import { ShopFiltersBar } from "./components/ShopFiltersBar"
import { BottomNavSheet } from "./BottomNavSheet"
import { EmptyProductState } from "./components/EmptyProductState"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import { useNavigationState } from "@/hooks/ui/useNavigationState"
import { useSimpleI18n } from "@/hooks"
import { useMedusaProducts, useSearchMedusaProducts } from "@/hooks/api/useMedusaProducts"
import { useSyncCartWithStore } from "@/hooks/api/useMedusaCart"
import { useCartTotalItems } from "@/stores/cart-store"

import type { StoreProduct } from '@medusajs/types'

interface ShopProduct {
  id: string
  name: string
  price: number
  image: string
  category: string
  tags: string[]
  inStock: boolean
  slogan: string
  color: string
}

// Helper function to transform Medusa products to shop format
const transformMedusaToShop = (medusaProducts: StoreProduct[]): ShopProduct[] => {
  return medusaProducts.map(product => {
    const variant = product.variants?.[0]
    const price = variant?.calculated_price?.calculated_amount || 0
    const priceInDollars = price > 0 ? price / 100 : 0

    return {
      id: product.id.replace('prod_', ''), // Remove 'prod_' prefix for compatibility
      name: product.title,
      price: priceInDollars,
      image: product.thumbnail || product.images?.[0]?.url || '',
      category: product.categories?.[0]?.name || "Uncategorized",
      tags: [
        ...(product.tags?.some(tag => tag.value === 'new') ? ["new"] : []),
        ...(product.tags?.some(tag => tag.value === 'bestseller') ? ["bestseller"] : []),
        ...(variant && (variant.inventory_quantity > 0 || variant.allow_backorder) ? ["in-stock"] : [])
      ],
      inStock: variant ? (variant.inventory_quantity > 0 || variant.allow_backorder) : false,
      slogan: product.description || '',
      color: variant?.options?.find(opt => opt.option?.title?.toLowerCase() === 'color')?.value || ''
    }
  })
}


type GridLayout = "2" | "3" | "4"
type SortOption = "featured" | "price-low" | "price-high" | "newest" | "name"

interface Filters {
  category: string
  priceRange: [number, number]
  tags: string[]
  colors: string[]
  sizes: string[]
  inStock: boolean
}

export function ShopPageSimple() {
  const { t: _t, formatPrice: _formatPrice } = useSimpleI18n()
  
  // Sync Medusa cart with Zustand store
  useSyncCartWithStore()
  
  // Get cart count from Zustand store
  const cartCount = useCartTotalItems()
  
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [gridLayout, setGridLayout] = useState<GridLayout>("3")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    category: "all",
    priceRange: [0, 100],
    tags: [],
    colors: [],
    sizes: [],
    inStock: false,
  })

  // Fetch all products for total count
  const { data: allProductsData, isLoading: isLoadingAll, error: allProductsError } = useMedusaProducts({ limit: 100 })
  
  // Use search hook for filtered results
  const { data: searchData, isLoading: isSearching, error: searchError } = useSearchMedusaProducts({
    searchQuery: searchQuery || undefined,
    category: filters.category,
    priceRange: filters.priceRange[0] > 0 || filters.priceRange[1] < 100 ? filters.priceRange : undefined,
    tags: filters.tags.length > 0 ? filters.tags : undefined,
    colors: filters.colors.length > 0 ? filters.colors : undefined,
    sizes: filters.sizes.length > 0 ? filters.sizes : undefined,
    inStock: filters.inStock || undefined,
  })

  // Transform Medusa data to shop format
  const allProducts = useMemo(() => {
    return allProductsData?.products ? transformMedusaToShop(allProductsData.products) : []
  }, [allProductsData])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = searchData?.products ? transformMedusaToShop(searchData.products) : []

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "newest":
          return Number(b.id) - Number(a.id) // Convert to number for sorting
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0 // featured - keep original order
      }
    })

    return filtered
  }, [searchData, sortBy])

  const isLoading = isLoadingAll || isSearching

  const scrollToProducts = () => {
    document.getElementById('products-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  const clearFilters = () => {
    setSearchQuery("")
    setFilters({
      category: "all",
      priceRange: [0, 100],
      tags: [],
      colors: [],
      sizes: [],
      inStock: false,
    })
  }
  
  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.category !== "all") count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100) count++
    count += filters.tags.length
    count += filters.colors.length
    count += filters.sizes.length
    if (filters.inStock) count++
    if (searchQuery) count++
    return count
  }, [filters, searchQuery])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50/30 overflow-x-hidden">
      {/* Shop Hero */}
      <ShopHero onScrollToProducts={scrollToProducts} />

      {/* Filters Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShopFiltersBar
          totalProducts={allProducts.length}
          filteredProducts={filteredProducts.length}
          searchQuery={searchQuery}
          sortBy={sortBy}
          gridLayout={gridLayout}
          showFilters={showFilters}
          onSearchChange={setSearchQuery}
          onSortChange={setSortBy}
          onGridLayoutChange={setGridLayout}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />
      </div>

      {/* Main Content */}
      <div id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
        {/* Glass morphism container matching main page */}
        <div className="bg-white/90 backdrop-blur-xl border border-pink-200/30 shadow-[0_0_20px_rgba(236,72,153,0.08)] rounded-3xl p-6 sm:p-8 md:p-10">
          {/* Breadcrumbs */}
          <Breadcrumbs className="mb-6" showHome />
          
          <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          {showFilters && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <ProductFilters 
                filters={filters}
                onFiltersChange={setFilters} 
              />
            </aside>
          )}

          {/* Product Grid */}
          <main className="flex-1">
            <section aria-labelledby="products-heading">
              <h2 id="products-heading" className="sr-only">Products</h2>
              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} layout={gridLayout} />
              ) : (
                <EmptyProductState onClearFilters={clearFilters} />
              )}
            </section>
          </main>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Filter Drawer - Only on mobile */}
      <div className="lg:hidden">
        <FilterDrawer
          open={showFilters}
          onOpenChange={setShowFilters}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>
      
      {/* Bottom Navigation Sheet - Mobile only */}
      <BottomNavSheet
        activeFilterCount={activeFilterCount}
        cartCount={cartCount}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />
    </div>
  )
}