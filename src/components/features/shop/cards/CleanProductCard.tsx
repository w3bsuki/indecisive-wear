"use client"

import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSimpleI18n } from "@/hooks"
import { useLocale } from "@/hooks/i18n/useLocale"
import { ShoppingCart } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  tags: string[]
  inStock: boolean
  slogan?: string
  color?: string
}

interface CleanProductCardProps {
  product: Product
  variant?: 'desktop' | 'mobile'
}

export function CleanProductCard({ product, variant = 'desktop' }: CleanProductCardProps) {
  const { formatPrice } = useSimpleI18n()
  const { locale } = useLocale()
  
  const isNew = product.tags.includes('new')
  const isBestSeller = product.tags.includes('bestseller')
  
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
          alt={product.name}
          fill
          sizes={variant === 'desktop' 
            ? "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            : "(max-width: 640px) 50vw, 33vw"
          }
          className="object-contain p-4"
          loading="lazy"
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
          {product.name}
        </h3>
        
        {/* Product Slogan - optional */}
        {product.slogan && variant === 'desktop' && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-3">
            {product.slogan}
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
              disabled={!product.inStock}
              size="icon"
              className={cn(
                "h-9 w-9 rounded-xl",
                product.inStock ? [
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
                if (product.inStock) {
                  // Add to cart logic here
                }
              }}
              aria-label={product.inStock ? `Add ${product.name} to cart` : `${product.name} is out of stock`}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          ) : (
            // Desktop: Text button
            <Button
              disabled={!product.inStock}
              size="sm"
              className={cn(
                "min-h-[36px] px-4 text-xs font-semibold rounded-xl",
                product.inStock ? [
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
                if (product.inStock) {
                  // Add to cart logic here
                }
              }}
            >
              {product.inStock 
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