"use client"

import React, { useState, memo, useMemo, ReactNode } from "react"
import { Heart } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { cn } from "@/lib/utils"
import { useSimpleI18n } from "@/hooks"
import { LazyQuickViewDialog } from "@/components/features/shop/LazyQuickViewDialog"
import { cardVariants2025, buttonVariants2025 } from "@/lib/design-system/component-variants-2025"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  tags: string[]
  inStock: boolean
}

interface SharedProductCardProps {
  product: Product
  className?: string
  variant: 'desktop' | 'mobile'
}

interface ProductCardHookReturn {
  isWishlisted: boolean
  setIsWishlisted: (value: boolean) => void
  showQuickView: boolean
  setShowQuickView: (value: boolean) => void
  rating: number
  reviewCount: number
  formatPrice: (price: number) => string
  t: (key: string) => string
}

// Shared hook for product card logic
function useProductCard(product: Product): ProductCardHookReturn {
  const { t, formatPrice } = useSimpleI18n()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)
  
  // Memoize expensive calculations
  const { reviewCount, rating } = useMemo(() => ({
    reviewCount: Math.floor(Math.random() * 150) + 10,
    rating: 4.5 + Math.random() * 0.5
  }), [product.id])
  
  return {
    isWishlisted,
    setIsWishlisted,
    showQuickView,
    setShowQuickView,
    rating,
    reviewCount,
    formatPrice,
    t
  }
}

// Shared components for common elements
const ProductBadges = memo(({ tags, t }: { tags: string[], t: (key: string) => string }) => {
  const badgeCount = tags.filter(tag => ['new', 'bestseller', 'sale'].includes(tag)).length
  
  if (badgeCount === 0) return null
  
  return (
    <div 
      className="absolute top-3 left-3 flex flex-col gap-2 z-10"
      role="group"
      aria-label={`Product badges: ${badgeCount} ${badgeCount === 1 ? 'badge' : 'badges'}`}
    >
      {tags.includes("new") && (
        <Badge 
          variant="secondary" 
          className="bg-success text-success-foreground text-xs px-3 py-1 rounded-full shadow-sm backdrop-blur-sm"
          role="status"
          aria-label="New product"
        >
          {t('shop.new')}
        </Badge>
      )}
      {tags.includes("bestseller") && (
        <Badge 
          variant="secondary" 
          className="bg-warning text-warning-foreground text-xs px-3 py-1 rounded-full shadow-sm backdrop-blur-sm"
          role="status"
          aria-label="Bestseller product"
        >
          {t('shop.bestseller')}
        </Badge>
      )}
      {tags.includes("sale") && (
        <Badge 
          variant="secondary" 
          className="bg-destructive text-destructive-foreground text-xs px-3 py-1 rounded-full shadow-sm backdrop-blur-sm"
          role="status"
          aria-label="Sale product"
        >
          {t('shop.sale')}
        </Badge>
      )}
    </div>
  )
})

ProductBadges.displayName = "ProductBadges"

const WishlistButton = memo(({ 
  isWishlisted, 
  onToggle, 
  productName, 
  variant 
}: { 
  isWishlisted: boolean
  onToggle: () => void
  productName: string
  variant: 'desktop' | 'mobile'
}) => {
  const iconSize = variant === 'desktop' ? 'w-5 h-5' : 'w-4 h-4'
  const buttonSize = variant === 'desktop' ? 'icon' : 'sm'
  
  return (
    <button 
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          e.stopPropagation()
          onToggle()
        }
      }}
      aria-label={isWishlisted ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`}
      aria-pressed={isWishlisted}
      role="button"
      tabIndex={0}
      className={cn(
        buttonVariants2025({ 
          variant: isWishlisted ? 'brand' : 'ghost',
          size: buttonSize
        }),
        "absolute top-3 right-3 z-10 rounded-full shadow-lg backdrop-blur-sm",
        "focus:outline-none focus:ring-2 focus:ring-barbie-pink focus:ring-offset-2",
        isWishlisted 
          ? "bg-gradient-to-r from-barbie-pink to-barbie-pink/80 text-barbie-pink-foreground hover:scale-110" 
          : "bg-white/90 text-muted-foreground hover:bg-white hover:text-barbie-pink border-0"
      )}
    >
      <Heart 
        className={cn(iconSize, isWishlisted && "fill-current")} 
        aria-hidden="true"
      />
    </button>
  )
})

WishlistButton.displayName = "WishlistButton"

const OutOfStockOverlay = memo(({ t, variant }: { t: (key: string) => string, variant: 'desktop' | 'mobile' }) => (
  <div className={cn(
    "absolute inset-0 flex items-center justify-center z-20",
    variant === 'desktop' ? "bg-black/60 backdrop-blur-md" : "bg-black/50 backdrop-blur-sm"
  )}>
    <div className={cn(
      cardVariants2025({ variant: 'glass', size: 'sm' }),
      "shadow-xl border border-white/20",
      variant === 'desktop' ? "px-6 py-3" : "px-4 py-2"
    )}>
      <span className={cn(
        "font-semibold text-foreground",
        variant === 'desktop' ? "text-sm" : "text-xs"
      )}>
        {t('shop.outOfStock')}
      </span>
    </div>
  </div>
))

OutOfStockOverlay.displayName = "OutOfStockOverlay"

const StarRating = memo(({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <svg 
        key={i} 
        className={cn(
          "w-4 h-4 transition-colors",
          i < Math.floor(rating) 
            ? "text-warning fill-current" 
            : "text-muted-foreground/30"
        )} 
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
))

StarRating.displayName = "StarRating"

const AddToCartButton = memo(({ 
  inStock, 
  productName, 
  t, 
  variant,
  onClick 
}: { 
  inStock: boolean
  productName: string
  t: (key: string) => string
  variant: 'desktop' | 'mobile'
  onClick?: (e: React.MouseEvent) => void
}) => {
  // Ensure minimum touch targets for mobile (44px minimum)
  const buttonSize = variant === 'desktop' ? 'lg' : 'lg' // lg = 44px minimum touch target
  
  return (
    <button
      disabled={!inStock}
      aria-label={inStock ? `Add ${productName} to cart` : `${productName} is out of stock`}
      aria-describedby={inStock ? undefined : `product-${productName.replace(/\s+/g, '-').toLowerCase()}-status`}
      tabIndex={0}
      className={cn(
        buttonVariants2025({ 
          variant: inStock ? 'brand' : 'secondary',
          size: buttonSize
        }),
        "w-full font-semibold transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-barbie-pink focus:ring-offset-2",
        inStock
          ? "bg-gradient-to-r from-barbie-pink to-barbie-pink/90 hover:scale-105 hover:shadow-lg shadow-barbie-pink/25"
          : "opacity-50 cursor-not-allowed focus:ring-muted"
      )}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.(e)
      }}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && inStock) {
          e.preventDefault()
          e.stopPropagation()
          onClick?.({} as React.MouseEvent<HTMLButtonElement>)
        }
      }}
    >
      {inStock ? t('shop.addToCart') : t('shop.outOfStock')}
    </button>
  )
})

AddToCartButton.displayName = "AddToCartButton"

function SharedProductCardComponent({ product, className, variant }: SharedProductCardProps) {
  const {
    isWishlisted,
    setIsWishlisted,
    showQuickView,
    setShowQuickView,
    rating,
    reviewCount,
    formatPrice,
    t
  } = useProductCard(product)
  
  const isDesktop = variant === 'desktop'
  const isMobile = variant === 'mobile'
  
  const containerClasses = cn(
    cardVariants2025({ 
      variant: isDesktop ? 'brand' : 'glass',
      size: isDesktop ? 'lg' : 'md'
    }),
    "group relative overflow-hidden transition-all duration-300 cursor-pointer",
    "border border-border/50 shadow-md",
    isDesktop && "hover:shadow-xl hover:scale-[1.02] hover:border-barbie-pink/30",
    isMobile && "hover:shadow-lg hover:border-barbie-pink/20",
    !product.inStock && "opacity-75 grayscale-[0.3]",
    className
  )
  
  const handleCardClick = () => {
    if (isMobile && product.inStock) {
      setShowQuickView(true)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleCardClick()
    }
  }
  
  return (
    <>
      <article 
        className={containerClasses} 
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        role="group" 
        aria-label={`Product: ${product.name}. Price: ${formatPrice(product.price)}. ${product.inStock ? 'In stock' : 'Out of stock'}`}
        tabIndex={isMobile ? 0 : -1}
        aria-describedby={`product-${product.id}-details`}
      >
        {/* Product Image */}
        <div className={cn(
          "aspect-square relative overflow-hidden",
          "bg-gradient-to-br from-muted/30 to-muted/60", // Semantic background
          "transition-all duration-300",
          isDesktop && "group-hover:bg-gradient-to-br group-hover:from-barbie-pink/5 group-hover:to-muted/40"
        )}>
          <OptimizedImage
            src={product.image}
            alt={product.name}
            fill
            sizes={isDesktop 
              ? "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              : "(max-width: 640px) 50vw, 33vw"
            }
            className={cn(
              "object-contain transition-all duration-300",
              isDesktop 
                ? "p-4 group-hover:scale-105 group-hover:rotate-1" 
                : "p-3"
            )}
            loading="lazy"
            optimizationLevel={isDesktop ? "high" : "medium"}
            fallbackSrc="/placeholder.jpg"
            showLoader={true}
          />
          
          <ProductBadges tags={product.tags} t={t} />
          
          <WishlistButton
            isWishlisted={isWishlisted}
            onToggle={() => setIsWishlisted(!isWishlisted)}
            productName={product.name}
            variant={variant}
          />
          
          {!product.inStock && <OutOfStockOverlay t={t} variant={variant} />}
        </div>

        {/* Product Info */}
        <div 
          id={`product-${product.id}-details`}
          className={cn(
            "space-y-2 transition-all duration-200", // Mobile-first: consistent spacing
            isDesktop 
              ? "px-5 py-4 space-y-3" // Desktop: generous spacing
              : "px-3 py-3 space-y-2" // Mobile: optimized padding for small screens
          )}
        >
          {/* Product Name */}
          <h3 
            className={cn(
              "font-semibold text-foreground line-clamp-2 leading-tight",
              "text-sm font-medium mb-1", // Mobile-first: smaller, tighter
              isDesktop && "text-lg mb-2" // Desktop: larger, more space
            )}
            id={`product-${product.id}-name`}
            aria-level={3}
          >
            {product.name}
          </h3>

          {/* Desktop-only elements */}
          {isDesktop && (
            <>
              {/* Reviews */}
              <div className="flex items-center gap-2 mb-3" role="group" aria-label={`Rating: ${rating.toFixed(1)} out of 5 stars, ${reviewCount} reviews`}>
                <StarRating rating={rating} />
                <span className="text-sm text-muted-foreground font-medium" aria-hidden="true">{rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground" aria-hidden="true">({reviewCount})</span>
              </div>

              {/* Tags */}
              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-muted-foreground bg-secondary hover:bg-secondary/80 px-2 py-1 rounded-full capitalize transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Price */}
          <div className={cn(
            "flex items-center justify-between mb-2", // Mobile-first: compact spacing
            isDesktop && "mb-3" // Desktop: more space
          )}>
            <span 
              className={cn(
                "font-bold text-foreground",
                "text-base", // Mobile-first: readable size
                isDesktop && "text-xl" // Desktop: larger display
              )}
              aria-label={`Current price: ${formatPrice(product.price)}`}
              role="text"
              id={`product-${product.id}-price`}
            >
              {formatPrice(product.price)}
            </span>
            {/* Mobile-only: Show stock status inline with price */}
            {isMobile && product.inStock && (
              <span 
                className="text-xs text-success font-medium"
                aria-label="Product is in stock"
                role="status"
              >
                In Stock
              </span>
            )}
          </div>

          {/* Stock Status - Desktop only (mobile shows inline with price) */}
          {product.inStock && isDesktop && (
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-success rounded-full w-2 h-2"></div>
              <span className="text-success font-medium text-sm">
                {t('shop.inStock')}
              </span>
              <span className="text-xs text-muted-foreground">• {t('shop.readyToShip')}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className={cn(
            "w-full", // Mobile-first: full width
            isDesktop 
              ? "space-y-2" // Desktop: stacked buttons
              : "pt-2" // Mobile: better spacing for touch targets
          )}>
            <AddToCartButton
              inStock={product.inStock}
              productName={product.name}
              t={t}
              variant={variant}
            />
            
            {isDesktop && product.inStock && (
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setShowQuickView(true)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    e.stopPropagation()
                    setShowQuickView(true)
                  }
                }}
                aria-label={`Quick view details for ${product.name}`}
                tabIndex={0}
                className={cn(
                  buttonVariants2025({ variant: 'ghost', size: 'md' }),
                  "w-full font-medium text-muted-foreground hover:text-barbie-pink border border-border hover:border-barbie-pink/50 hover:bg-barbie-pink/5",
                  "focus:outline-none focus:ring-2 focus:ring-barbie-pink focus:ring-offset-2"
                )}
              >
                {t('shop.quickView')}
              </button>
            )}
          </div>

          {/* Desktop-only trust signals */}
          {isDesktop && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('shop.freeShippingTrust')}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('shop.returnsPolicy')}
                </span>
              </div>
            </div>
          )}
        </div>
      </article>
      
      {/* Quick View Dialog */}
      <LazyQuickViewDialog 
        product={{
          ...product,
          id: product.id.toString(),
          price: product.price.toString(),
          color: product.tags?.[0] || 'default'
        }}
        open={showQuickView}
        onOpenChange={setShowQuickView}
      />
    </>
  )
}

// Memoize component with custom comparison
export const SharedProductCard = memo(SharedProductCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.inStock === nextProps.product.inStock &&
    prevProps.product.price === nextProps.product.price &&
    prevProps.variant === nextProps.variant &&
    prevProps.className === nextProps.className &&
    JSON.stringify(prevProps.product.tags) === JSON.stringify(nextProps.product.tags)
  )
})

// Export convenience components
export const DesktopProductCard = memo((props: Omit<SharedProductCardProps, 'variant'>) => (
  <SharedProductCard {...props} variant="desktop" />
))

DesktopProductCard.displayName = "DesktopProductCard"

export const MobileProductCard = memo((props: Omit<SharedProductCardProps, 'variant'>) => (
  <SharedProductCard {...props} variant="mobile" />
))

MobileProductCard.displayName = "MobileProductCard"