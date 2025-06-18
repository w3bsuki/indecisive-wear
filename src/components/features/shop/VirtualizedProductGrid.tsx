"use client"

import React, { useRef, useMemo } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { cn } from '@/lib/utils'
import { ProductCard } from '@/components/features/shop/cards/ProductCard'
import { useWindowSize } from '@/hooks/ui/useWindowSize'

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
  color?: string
}

interface VirtualizedProductGridProps {
  products: Product[]
  columns?: number
  className?: string
  loading?: boolean
}

export function VirtualizedProductGrid({ 
  products, 
  columns = 3,
  className,
  loading = false
}: VirtualizedProductGridProps) {
  const parentRef = useRef<HTMLDivElement>(null)
  const { width = 1200 } = useWindowSize()
  
  // Responsive columns based on screen size
  const responsiveColumns = useMemo(() => {
    if (width < 640) return 1 // Mobile
    if (width < 1024) return 2 // Tablet
    return columns // Desktop
  }, [width, columns])
  
  // Calculate rows from products
  const rows = useMemo(() => {
    const rowCount = Math.ceil(products.length / responsiveColumns)
    return Array.from({ length: rowCount }, (_, i) => 
      products.slice(i * responsiveColumns, (i + 1) * responsiveColumns)
    )
  }, [products, responsiveColumns])
  
  // Initialize virtualizer
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 400, // Estimated height of product card
    overscan: 2, // Render 2 rows outside of viewport
  })
  
  if (loading) {
    return (
      <div className={cn("grid gap-4", className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[400px] bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found</p>
      </div>
    )
  }
  
  return (
    <div
      ref={parentRef}
      className={cn("w-full overflow-auto", className)}
      style={{
        height: '100vh',
        contain: 'strict',
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index]
          
          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div 
                className={cn(
                  "grid gap-4",
                  responsiveColumns === 1 && "grid-cols-1",
                  responsiveColumns === 2 && "grid-cols-2",
                  responsiveColumns === 3 && "grid-cols-3",
                  responsiveColumns === 4 && "grid-cols-4"
                )}
              >
                {row.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={virtualRow.index < 2} // Priority load first 2 rows
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Hook to conditionally use virtualized grid based on product count
export function useVirtualizedGrid(productCount: number, threshold = 50) {
  return productCount > threshold
}