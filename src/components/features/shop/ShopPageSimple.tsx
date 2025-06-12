"use client"

import { useState, useMemo } from "react"
import { ProductGrid } from "./ProductGrid"
import { CleanProductFilters } from "./CleanProductFilters"
import { CleanFilterDrawer } from "./filters/CleanFilterDrawer"
import { ShopHero } from "./components/ShopHero"
import { CleanShopFiltersBar } from "./components/CleanShopFiltersBar"
import { BottomNavSheet } from "./BottomNavSheet"
import { EmptyProductState } from "./components/EmptyProductState"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import { useNavigationState } from "@/hooks/ui/useNavigationState"
import { useSimpleI18n } from "@/hooks"
import { hatsList } from "@/lib/constants/product-data"

// Convert our product data to shop format
const SHOP_PRODUCTS = hatsList.map(hat => ({
  id: hat.id,
  name: hat.name,
  price: 17, // Fixed price in base currency
  // originalPrice removed - no fake discounts
  image: hat.image,
  category: "Hats",
  tags: [
    ...(hat.isNew ? ["new"] : []),
    ...(hat.isBestSeller ? ["bestseller"] : []),
    "in-stock"
  ],
  inStock: true,
  slogan: hat.slogan,
  color: hat.color
}))


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

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = SHOP_PRODUCTS.filter((product) => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Category filter
      if (filters.category !== "all" && product.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false
      }

      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // Tags filter
      if (filters.tags.length > 0 && !filters.tags.some(tag => product.tags.includes(tag))) {
        return false
      }

      // Color filter
      if (filters.colors.length > 0 && !filters.colors.includes(product.color.toLowerCase())) {
        return false
      }

      // Size filter - all hats are "One Size" for now
      if (filters.sizes.length > 0 && !filters.sizes.includes("One Size")) {
        return false
      }

      // Stock filter
      if (filters.inStock && !product.inStock) {
        return false
      }

      return true
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "newest":
          return b.id - a.id // Assuming higher ID = newer
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0 // featured - keep original order
      }
    })

    return filtered
  }, [searchQuery, sortBy, filters])

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
      <CleanShopFiltersBar
        totalProducts={SHOP_PRODUCTS.length}
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
              <CleanProductFilters 
                filters={filters}
                onFiltersChange={setFilters} 
              />
            </aside>
          )}

          {/* Product Grid */}
          <main className="flex-1">
            <section aria-labelledby="products-heading">
              <h2 id="products-heading" className="sr-only">Products</h2>
              {filteredProducts.length > 0 ? (
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
        <CleanFilterDrawer
          open={showFilters}
          onOpenChange={setShowFilters}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>
      
      {/* Bottom Navigation Sheet - Mobile only */}
      <BottomNavSheet
        activeFilterCount={activeFilterCount}
        cartCount={0} // TODO: Connect to cart store
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />
    </div>
  )
}