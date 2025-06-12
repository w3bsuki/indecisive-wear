"use client"

import React, { useMemo } from "react"
import { cn } from "@/lib/utils"
import { useResponsiveCard } from "@/hooks"
import { ProductCard } from "./cards/ProductCard"
import { VirtualizedProductGrid, useVirtualizedGrid } from "./VirtualizedProductGrid"

interface Product {
  id: number | string
  name: string | { en: string; bg: string }
  price: number
  originalPrice?: number
  image: string
  category: string
  tags: string[]
  inStock: boolean
  slogan?: string | { en: string; bg: string }
}

type GridLayout = "2" | "3" | "4"

interface ProductGridProps {
  products: Product[]
  layout?: GridLayout
  className?: string
  virtualizeThreshold?: number
}

function ProductGridComponent({ 
  products, 
  layout = "3", 
  className,
  virtualizeThreshold = 50 
}: ProductGridProps) {
  const { isMobile, isLoaded } = useResponsiveCard()
  const shouldVirtualize = useVirtualizedGrid(products.length, virtualizeThreshold)
  
  const getGridCols = () => {
    switch (layout) {
      case "2":
        return "grid-cols-2 sm:grid-cols-2"  // ✅ 2x2 on all screens
      case "3":
        return "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"  // ✅ 2x mobile, 3x desktop
      case "4":
        return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"  // ✅ 2x mobile, 4x desktop
      default:
        return "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"  // ✅ Default to 2x mobile
    }
  }

  const getGap = () => {
    // Responsive gap sizing for better mobile UX
    switch (layout) {
      case "2":
        return "gap-4 sm:gap-6 lg:gap-8" // More space on larger screens
      case "3":
        return "gap-3 sm:gap-4 lg:gap-6" // Balanced spacing
      case "4":
        return "gap-2 sm:gap-3 lg:gap-4" // Tighter for more columns
      default:
        return "gap-3 sm:gap-4 lg:gap-6"
    }
  }
  
  // Normalize products to match VirtualizedProductGrid expectations
  const normalizedProducts = useMemo(() => {
    return products.map(product => ({
      ...product,
      id: String(product.id),
      name: typeof product.name === 'string' 
        ? { en: product.name, bg: product.name } 
        : product.name,
      slogan: typeof product.slogan === 'string' 
        ? { en: product.slogan || '', bg: product.slogan || '' } 
        : product.slogan || { en: '', bg: '' }
    }))
  }, [products])

  // Prevent hydration mismatch by showing loading state until client-side detection is complete
  if (!isLoaded) {
    return (
      <div className={cn("w-full", className)}>
        <div aria-live="polite" className="sr-only">Loading products...</div>
        <div className={cn("grid", getGridCols(), getGap())}>
          {products.slice(0, 6).map((product) => (
            <div key={product.id} className="animate-pulse" aria-hidden="true">
              <div className="aspect-square bg-gray-200 rounded-lg mb-3" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  // Use virtualized grid for large product lists
  if (shouldVirtualize) {
    return (
      <VirtualizedProductGrid
        products={normalizedProducts}
        columns={parseInt(layout)}
        className={className}
        loading={!isLoaded}
      />
    )
  }

  // Standard grid for smaller product lists
  return (
    <div className={cn("w-full", className)}>
      <div className={cn("grid", getGridCols(), getGap())}>
        {products.map((product, index) => (
          <div key={product.id}>
            <ProductCard 
              product={product} 
              variant={isMobile ? 'mobile' : 'desktop'}
              priority={index < 6} // Priority load first 6 products
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// Add custom comparison function to prevent unnecessary re-renders
// Only re-render if products or layout changes
export const ProductGrid = React.memo(ProductGridComponent, (prevProps, nextProps) => {
  return (
    prevProps.layout === nextProps.layout &&
    prevProps.className === nextProps.className &&
    prevProps.virtualizeThreshold === nextProps.virtualizeThreshold &&
    prevProps.products.length === nextProps.products.length &&
    prevProps.products.every((product, index) => 
      product.id === nextProps.products[index]?.id &&
      product.inStock === nextProps.products[index]?.inStock
    )
  )
})