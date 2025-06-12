"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ProductGrid } from "./ProductGrid"
import { ProductFilters } from "./ProductFilters"
import { FilterDrawer } from "./filters/FilterDrawer"
import { ShopHero } from "./components/ShopHero"
import { ShopFiltersBar } from "./components/ShopFiltersBar"
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

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Shop Hero */}
      <ShopHero onScrollToProducts={scrollToProducts} />

      {/* Filters Bar */}
      <ShopFiltersBar
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
      <div id="products-section" className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-6 md:py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-6" showHome />
        
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="hidden lg:block w-64 flex-shrink-0"
            >
              <ProductFilters 
                filters={{
                  category: filters.category,
                  priceRange: filters.priceRange,
                  tags: filters.tags,
                  inStock: filters.inStock
                }} 
                onFiltersChange={(newFilters) => setFilters({
                  ...filters,
                  category: newFilters.category,
                  priceRange: newFilters.priceRange,
                  tags: newFilters.tags,
                  inStock: newFilters.inStock
                })} 
              />
            </motion.aside>
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

      {/* Enhanced Mobile Filter Drawer - Only on mobile */}
      <div className="lg:hidden">
        <FilterDrawer
          open={showFilters}
          onOpenChange={setShowFilters}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>
    </div>
  )
}