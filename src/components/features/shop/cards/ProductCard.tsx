"use client"

import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSimpleI18n } from "@/hooks"
import { useLocale } from "@/hooks/i18n/useLocale"
import { useAddToCart } from "@/hooks/api/useMedusaCart"
import { ShoppingCart } from "lucide-react"

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

interface ProductCardProps {
  product: Product
  variant?: 'desktop' | 'mobile'
  priority?: boolean
}

export function ProductCard({ product, variant = 'desktop', priority = false }: ProductCardProps) {
  const { formatPrice } = useSimpleI18n()
  const { locale } = useLocale()
  const addToCart = useAddToCart()
  
  // Get localized text
  const productName = typeof product.name === 'string' 
    ? product.name 
    : product.name[locale as keyof typeof product.name] || product.name.en
  
  const productSlogan = typeof product.slogan === 'string'
    ? product.slogan
    : product.slogan?.[locale as keyof typeof product.slogan] || product.slogan?.en
  
  const isNew = product.tags.includes('new')
  const isBestSeller = product.tags.includes('bestseller')
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (!product.inStock) return
    
    // Use product ID with variant prefix for Medusa
    const variantId = `variant_${product.id}`
    
    addToCart.mutate({
      variantId,
      quantity: 1,
    })
  }
  
  return (
    <article 
      className={cn(
        "group relative bg-white rounded-xl",
        "border border-pink-200/30",
        "shadow-sm hover:shadow-md",
        "hover:border-pink-300/50",
        "transition-all duration-200",
        !product.inStock && "opacity-75"
      )}
    >
      {/* Product Image */}
      <div className="aspect-square relative overflow-hidden rounded-t-xl bg-gradient-to-br from-pink-50/50 to-white">
        <Image
          src={product.image}
          alt={productName}
          fill
          sizes={variant === 'desktop' 
            ? "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            : "(max-width: 640px) 50vw, 33vw"
          }
          className="object-contain p-4"
          loading={priority ? "eager" : "lazy"}
          priority={priority}
        />
        
        {/* Single badge - prioritize new over bestseller */}
        {(isNew || isBestSeller) && (
          <div className="absolute top-3 left-3">
            {isNew ? (
              <Badge className="bg-pink-500 text-white border-0 text-xs px-2 py-1 shadow-sm">
                {locale === 'bg' ? 'Ново' : 'New'}
              </Badge>
            ) : isBestSeller ? (
              <Badge className="bg-orange-500 text-white border-0 text-xs px-2 py-1 shadow-sm">
                {locale === 'bg' ? 'Хит' : 'Hit'}
              </Badge>
            ) : null}
          </div>
        )}
        
        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200">
              {locale === 'bg' ? 'Няма наличност' : 'Out of Stock'}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={cn(
        "p-4",
        variant === 'mobile' && "p-3"
      )}>
        {/* Product Name */}
        <h3 className={cn(
          "font-semibold text-gray-900 line-clamp-1 mb-1",
          variant === 'desktop' ? "text-base" : "text-sm"
        )}>
          {productName}
        </h3>
        
        {/* Product Slogan - optional */}
        {productSlogan && variant === 'desktop' && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-3">
            {productSlogan}
          </p>
        )}

        {/* Price and Button */}
        <div className="flex items-center justify-between gap-2 mt-3">
          <span className={cn(
            "font-bold text-pink-600",
            variant === 'desktop' ? "text-lg" : "text-base"
          )}>
            {formatPrice(product.price)}
          </span>
          
          {variant === 'mobile' ? (
            // Mobile: Icon button
            <Button
              disabled={!product.inStock || addToCart.isPending}
              size="icon"
              className={cn(
                "h-9 w-9 rounded-xl",
                product.inStock && !addToCart.isPending ? [
                  "bg-pink-500 hover:bg-pink-600 text-white",
                  "border-2 border-white/30 hover:border-white/50",
                  "shadow-sm hover:shadow-md"
                ] : [
                  "bg-gray-100 text-gray-400 border-2 border-gray-200",
                  "cursor-not-allowed"
                ]
              )}
              onClick={(e) => {
                e.stopPropagation()
                handleAddToCart()
              }}
              aria-label={product.inStock ? `Add ${productName} to cart` : `${productName} is out of stock`}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          ) : (
            // Desktop: Text button
            <Button
              disabled={!product.inStock || addToCart.isPending}
              size="sm"
              className={cn(
                "min-h-[36px] px-4 text-xs font-semibold rounded-xl",
                product.inStock && !addToCart.isPending ? [
                  "bg-pink-500 hover:bg-pink-600 text-white",
                  "border-2 border-white/30 hover:border-white/50",
                  "shadow-sm hover:shadow-md"
                ] : [
                  "bg-gray-100 text-gray-400 border-2 border-gray-200",
                  "cursor-not-allowed"
                ]
              )}
              onClick={(e) => {
                e.stopPropagation()
                handleAddToCart()
              }}
            >
              {addToCart.isPending
                ? (locale === 'bg' ? 'Добавяне...' : 'Adding...')
                : product.inStock 
                  ? (locale === 'bg' ? 'Добави' : 'Add to Cart')
                  : (locale === 'bg' ? 'Изчерпан' : 'Sold Out')
              }
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}