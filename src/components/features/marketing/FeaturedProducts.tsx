// Featured Products Section - Premium Horizontal Scroll Design
"use client"

import React, { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/hooks/i18n/useLocale"
import { ShoppingBag } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { Star } from 'lucide-react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import type { Product } from "@/lib/constants/product-data"
import { LazyQuickViewDialog } from '@/components/features/shop/LazyQuickViewDialog'

interface FeaturedProductsProps {
  className?: string;
}

const FeaturedProductsComponent = ({ className }: FeaturedProductsProps) => {
  const { locale } = useLocale()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showQuickView, setShowQuickView] = useState(false)
  
  // Featured hats - more selection for horizontal scroll
  const featuredHats: Product[] = [
    {
      id: 1,
      name: "Indecisive №1",
      slogan: "Indecisive Club. За тези, които променят мнението си постоянно.",
      price: "25 лв",
      image: "/products/the indecisive club - red.jpg",
      color: "Red",
      category: "hats",
      isNew: true,
    },
    {
      id: 2,
      name: "Indecisive №2", 
      slogan: "Indecisive Club. За тези, които не могат да изберат.",
      price: "25 лв",
      image: "/products/the indecisive club purple - black font.jpg",
      color: "Purple",
      category: "hats",
      isBestSeller: true,
    },
    {
      id: 12,
      name: "Хулиганка №1",
      slogan: "За момичета извън рамките, следващи своя собствен път.",
      price: "25 лв",
      image: "/products/Хулиганка.jpg",
      color: "White",
      category: "hats",
      isBestSeller: true,
    },
    {
      id: 5,
      name: "No Money №1",
      slogan: "No Money No Honey. Истината, казана с чувство за хумор.",
      price: "25 лв",
      image: "/products/No Money No honey white.jpg",
      color: "White",
      category: "hats",
      isBestSeller: true,
    },
    {
      id: 7,
      name: "MAMA №1",
      slogan: "Не просто дума, а суперсила. Символ на безусловна любов.",
      price: "25 лв",
      image: "/products/MAMA-red.jpg",
      color: "Red",
      category: "hats",
    },
    {
      id: 16,
      name: "Dirty Cash",
      slogan: "Пари със стил (и малко драма). Знаеш как да получиш каквото искаш.",
      price: "25 лв",
      image: "/products/Dirty Cash.jpg",
      color: "Pink",
      category: "hats",
      isNew: true,
    }
  ]

  const handleViewProduct = (productId: number) => {
    const product = featuredHats.find(p => p.id === productId)
    if (product) {
      setSelectedProduct(product)
      setShowQuickView(true)
    }
  }

  const handleViewCollection = () => {
    window.location.href = '/shop'
  }

  return (
    <div className={cn("w-full", className)}>
      {/* All-in-one Container - stable height */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-pink-500/5 rounded-2xl" />
        <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-pink-200/30 shadow-[0_0_20px_rgba(236,72,153,0.08)] min-h-[400px]"> {/* 48px - PERFECT_SPACING.scale[6] */}
          
          {/* Header inside container with marquee headline */}
          <div className="mb-4 space-y-3">
            {/* Animated Section Headline Marquee */}
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-pink-500/5 via-pink-400/10 to-pink-500/5 border border-pink-200/30">
              <SectionMarquee 
                primaryText={locale === 'bg' ? 'НАШАТА КОЛЕКЦИЯ' : 'OUR COLLECTION'}
                secondaryText={locale === 'bg' ? 'ИЗБРАНИ ШАПКИ, ГОТОВИ ЗА ПРАЩАНЕ ДНЕС' : 'SELECTED HATS READY TO SHIP TODAY'}
                speed={35}
              />
            </div>
            
            {/* In Stock Badge */}
            <div className="flex justify-center">
              <Badge className="bg-green-500 text-white border-0 text-xs px-2 py-1 whitespace-nowrap">
                <Star className="h-3 w-3 mr-1 flex-shrink-0" />
                {locale === 'bg' ? 'Налични' : 'In Stock'}
              </Badge>
            </div>
          </div>
            
            {/* Scrollable Products */}
            <div className="overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex gap-4 pb-2" style={{ width: 'max-content' }}> {/* 16px gap - PERFECT_SPACING.scale[2] */}
                {featuredHats.map((product) => (
                  <div
                    key={product.id}
                    className="group relative flex-none w-56 sm:w-64 cursor-pointer"
                    onClick={() => handleViewProduct(product.id)}
                  >
                    {/* Product Card with Navbar-style Design */}
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-pink-500/10 blur-md rounded-2xl" />
                      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-pink-200/50 shadow-[0_0_15px_rgba(236,72,153,0.1)] group-hover:shadow-[0_0_25px_rgba(236,72,153,0.2)] transition-all duration-300">
                        
                        {/* Image Section with Aspect Ratio */}
                        <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-pink-50/50 to-white">
                          <AspectRatio ratio={4/3}>
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="(max-width: 640px) 256px, 288px"
                              className="object-contain group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          
                          {/* Floating Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-1"> {/* 12px positioning, 8px gap - PERFECT_SPACING */}
                            {product.isNew && (
                              <div className="relative">
                                <div className="absolute inset-0 bg-pink-500/20 blur-sm rounded-full" />
                                <Badge className="relative bg-pink-500 text-white border-0 text-xs px-2 py-1 shadow-sm whitespace-nowrap">
                                  {locale === 'bg' ? 'Ново' : 'New'}
                                </Badge>
                              </div>
                            )}
                            {product.isBestSeller && (
                              <div className="relative">
                                <div className="absolute inset-0 bg-orange-500/20 blur-sm rounded-full" />
                                <Badge className="relative bg-orange-500 text-white border-0 text-xs px-2 py-1 shadow-sm whitespace-nowrap">
                                  {locale === 'bg' ? 'Хит' : 'Hit'}
                                </Badge>
                              </div>
                            )}
                          </div>

                          {/* Quick Action Button */}
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewProduct(product.id)
                              }}
                              size="sm"
                              aria-label={`Quick view ${product.name}`}
                              className="w-12 h-12 rounded-full bg-white/90 text-pink-500 hover:bg-pink-500 hover:text-white border border-pink-500/50 shadow-lg" // 48px - minimum touch target
                            >
                              <ShoppingBag className="h-3 w-3" />
                            </Button>
                          </div>
                          </AspectRatio>
                        </div>

                        {/* Content Section */}
                        <div className="p-4"> {/* 16px - PERFECT_SPACING.scale[2] */}
                          <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors truncate"> {/* 8px - PERFECT_SPACING.scale[1] */}
                            {product.name}
                          </h3>
                          <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed"> {/* 24px - PERFECT_SPACING.scale[3] */}
                            {product.slogan}
                          </p>
                          
                          {/* Price and Action */}
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-pink-600">
                              {product.price}
                            </span>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewProduct(product.id)
                              }}
                              size="sm"
                              aria-label={`Quick view ${product.name}`}
                              className="h-10 px-4 text-xs bg-transparent text-pink-500 hover:text-white hover:bg-pink-500/90 border border-pink-500/50 hover:border-pink-500 transition-all duration-200" // 40px height, 16px padding
                            >
                              {locale === 'bg' ? 'Бърз преглед' : 'Quick View'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          
          {/* CTA inside container - centered, no unnecessary text */}
          <div className="flex justify-center mt-4 pt-4 border-t border-pink-200/30">
            <button 
              onClick={handleViewCollection}
              aria-label={locale === 'bg' ? 'Виж всички продукти в магазина' : 'View all products in shop'}
              className="h-12 px-6 bg-pink-500 hover:bg-pink-600 border-2 border-white/30 hover:border-white/50 text-white text-sm rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-semibold transition-all duration-200 min-h-[44px]"
            >
              {locale === 'bg' ? 'Виж всички' : 'View All'}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Global scrollbar styles */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Quick View Dialog */}
      {selectedProduct && (
        <LazyQuickViewDialog 
          product={{
            id: selectedProduct.id.toString(),
            name: selectedProduct.name,
            price: selectedProduct.price,
            image: selectedProduct.image,
            color: selectedProduct.color,
            category: selectedProduct.category,
            description: selectedProduct.slogan,
            tags: [
              ...(selectedProduct.isNew ? ['new'] : []),
              ...(selectedProduct.isBestSeller ? ['bestseller'] : [])
            ],
            availability: 'in-stock',
            rating: 4.5,
            reviewCount: 42
          }}
          open={showQuickView}
          onOpenChange={setShowQuickView}
        />
      )}
    </div>
  )
}

// Section Headline Marquee Component
interface SectionMarqueeProps {
  primaryText: string
  secondaryText: string
  speed?: number
}

const SectionMarquee = React.memo(({ primaryText, secondaryText, speed = 25 }: SectionMarqueeProps) => {
  // Create alternating content pattern
  const marqueeContent = Array(3).fill(null).map((_, index) => (
    <div key={index} className="flex items-center shrink-0">
      {/* Primary text (title) */}
      <span className="font-bold text-base sm:text-lg md:text-xl bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent whitespace-nowrap">
        {primaryText}
      </span>
      
      {/* Separator */}
      <span className="mx-3 sm:mx-4 text-pink-400/60 text-sm">
        ★
      </span>
      
      {/* Secondary text (description) */}
      <span className="font-medium text-sm sm:text-base text-gray-600/80 whitespace-nowrap">
        {secondaryText}
      </span>
      
      {/* Separator */}
      <span className="mx-3 sm:mx-4 text-pink-400/60 text-sm">
        ★
      </span>
    </div>
  ))

  return (
    <div className="w-full overflow-hidden py-5 sm:py-6">
      <div className="flex items-center w-full">
        <div 
          className="flex items-center animate-section-marquee will-change-transform"
          style={{
            animationDuration: `${speed}s`
          }}
        >
          {/* First set */}
          {marqueeContent}
          {/* Duplicate set for seamless loop */}
          {marqueeContent}
        </div>
      </div>
      
      {/* CSS Animation - GPU accelerated */}
      <style jsx>{`
        @keyframes section-marquee {
          0% { 
            transform: translateX(0%) translateZ(0); 
          }
          100% { 
            transform: translateX(-50%) translateZ(0); 
          }
        }
        
        .animate-section-marquee {
          animation: section-marquee linear infinite;
        }
      `}</style>
    </div>
  )
})

SectionMarquee.displayName = 'SectionMarquee'

export const FeaturedProducts = React.memo(FeaturedProductsComponent)