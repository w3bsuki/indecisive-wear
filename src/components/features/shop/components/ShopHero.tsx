"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/hooks/i18n/useLocale"

interface ShopHeroProps {
  onScrollToProducts: () => void
}

const ShopHeroComponent = ({ onScrollToProducts: _onScrollToProducts }: ShopHeroProps) => {
  const { locale } = useLocale()
  
  return (
    <section className="relative w-full pt-24 pb-8 bg-gradient-to-br from-gray-50 via-white to-pink-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glass morphism container matching main page */}
        <div className={cn(
          "relative bg-white/90 backdrop-blur-xl",
          "border border-pink-200/30", 
          "shadow-[0_0_30px_rgba(236,72,153,0.12)]",
          "rounded-3xl p-8 sm:p-10 md:p-12",
          "text-center"
        )}>
          {/* Shop badge */}
          <div className="flex justify-center mb-6">
            <Badge className="bg-pink-500 text-white border-0 text-xs px-3 py-1 whitespace-nowrap shadow-sm">
              {locale === 'bg' ? '19+ налични дизайна' : '19+ Available Designs'}
            </Badge>
          </div>
          
          {/* Title with INDECISIVE branding */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {locale === 'bg' ? (
              <>
                <span className="block mb-2">Магазин</span>
                <span className={cn(
                  "inline-block px-6 py-2 sm:px-8 sm:py-3",
                  "bg-gradient-to-r from-pink-600 to-pink-400",
                  "rounded-xl text-white transform -skew-x-3",
                  "shadow-lg shadow-pink-500/20",
                  "text-2xl sm:text-3xl md:text-4xl"
                )}>
                  INDECISIVE
                </span>
              </>
            ) : (
              <>
                <span className="block mb-2">Shop</span>
                <span className={cn(
                  "inline-block px-6 py-2 sm:px-8 sm:py-3",
                  "bg-gradient-to-r from-pink-600 to-pink-400",
                  "rounded-xl text-white transform -skew-x-3",
                  "shadow-lg shadow-pink-500/20",
                  "text-2xl sm:text-3xl md:text-4xl"
                )}>
                  INDECISIVE
                </span>
              </>
            )}
          </h1>
          
          <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {locale === 'bg' 
              ? 'Премиум шапки за красиво нерешителните моменти' 
              : 'Premium hats for beautifully indecisive moments'
            }
          </p>
          
          {/* Trust signals in clean style */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-medium">
                {locale === 'bg' ? 'Безплатна доставка' : 'Free Shipping'}
              </span>
            </span>
            
            <span className="text-pink-400">•</span>
            
            <span className="flex items-center gap-2">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-medium">
                {locale === 'bg' ? '30-дневни връщания' : '30-Day Returns'}
              </span>
            </span>
            
            <span className="text-pink-400">•</span>
            
            <span className="flex items-center gap-2">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-pink-600">⭐</span>
              </div>
              <span className="font-medium">4.9/5</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export const ShopHero = React.memo(ShopHeroComponent)