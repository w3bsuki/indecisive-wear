"use client"

import React, { memo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart } from 'lucide-react'
import { cn } from "@/lib/utils"
import { WaitlistDialog } from '@/components/features/waitlist/WaitlistDialog'
import { useSimpleI18n } from '@/hooks/i18n/useSimpleI18n'
import { useLocale } from '@/hooks/i18n/useLocale'
import { NativeCarousel } from '@/components/ui/native-carousel'
import { BrandMarquee } from '@/components/features/marketing/BrandMarquee'

interface HeroSectionProps {
  hatImages: string[];
  scrollToProducts: () => void;
  className?: string;
}

// Optimized carousel item using BARBIE design system
const CarouselItem = memo(({ image, index }: { image: string; index: number }) => (
  <div className="w-28 sm:w-56 md:w-64 lg:w-72 flex-none">
    <div className="group cursor-pointer">
      <div className={cn(
        "bg-white rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200",
        "hover:-translate-y-0.5",
        "p-0.5 sm:p-2"
      )}>
        <div className="aspect-square relative overflow-hidden rounded-lg sm:rounded-xl bg-gray-50">
          <Image
            src={image}
            alt={`Featured Hat ${index + 1}`}
            fill
            sizes="(max-width: 640px) 112px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
            className={cn(
              "object-cover",
              "transition-all duration-200 ease-out",
              "group-hover:scale-[1.02]"
            )}
            priority={index < 3}
            quality={90}
          />
        </div>
        
        <div className="absolute top-1 left-1 sm:top-3 sm:left-3 z-20">
          <div className={cn(
            "px-1 py-0.5 sm:px-2 sm:py-1 text-[9px] sm:text-xs font-medium",
            "text-pink-700 bg-pink-100/90 backdrop-blur-sm rounded",
            "opacity-0 group-hover:opacity-100",
            "transition-all duration-200 ease-out",
            "shadow-sm"
          )}>
            Featured
          </div>
        </div>
      </div>
    </div>
  </div>
))

CarouselItem.displayName = "CarouselItem"

function HeroSectionComponent({ hatImages, scrollToProducts: _scrollToProducts, className }: HeroSectionProps) {
  const { t } = useSimpleI18n()
  const { locale } = useLocale()

  // Preload critical images
  const criticalImages = hatImages.slice(0, 3)

  return (
    <section 
      id="home" 
      className={cn(
        "relative w-full min-h-screen flex flex-col overflow-hidden",
        "bg-gradient-to-br from-gray-50 via-white to-pink-50/30",
        className
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>
      
      {/* ONE unified hero container */}
      <div className={cn(
        "relative z-10 h-full flex flex-col w-full",
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        "pt-20 sm:pt-24 pb-4"
      )}>
        
        {/* Unified Hero Container */}
        <div className={cn(
          "bg-white/90 backdrop-blur-xl",
          "border border-pink-200/30", 
          "shadow-[0_0_30px_rgba(236,72,153,0.12)]",
          "rounded-3xl p-6 sm:p-8 md:p-10",
          "flex-1 flex flex-col justify-center"
        )}>
          
          {/* Countdown timer */}
          <div className="flex justify-center mb-6">
            <div className={cn(
              "bg-pink-50/80 border border-pink-200/50",
              "rounded-full px-5 py-2 sm:px-6 sm:py-2.5"
            )}>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                  <span className="text-sm sm:text-base font-medium text-gray-700">
                    {locale === 'bg' ? 'Скоро' : 'Soon'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  <span className="px-3 py-1 rounded-md bg-white text-gray-900 text-sm sm:text-base font-semibold">
                    30D
                  </span>
                  <span className="text-gray-400 font-semibold">:</span>
                  <span className="px-3 py-1 rounded-md bg-white text-gray-900 text-sm sm:text-base font-semibold">
                    12H
                  </span>
                  <span className="text-gray-400 font-semibold">:</span>
                  <span className="px-3 py-1 rounded-md bg-white text-gray-900 text-sm sm:text-base font-semibold">
                    45M
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero text */}
          <div className="text-center mb-8">
            <h1 className="font-black mb-4">
              <span className={cn(
                "inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
                "px-6 py-2 sm:px-8 sm:py-4",
                "bg-gradient-to-r from-pink-600 to-pink-400",
                "rounded-xl sm:rounded-2xl text-white transform -skew-x-3",
                "shadow-xl shadow-pink-500/20",
                "max-w-[90vw]"
              )}>
                INDECISIVE
              </span>
            </h1>
            <p className={cn(
              "text-sm sm:text-base text-gray-600",
              "max-w-md mx-auto px-4"
            )}>
              {locale === 'bg' 
                ? 'За тези, които не знаят какво да облекат' 
                : "Don't know what to wear? We've got you covered"}
            </p>
          </div>

          {/* CTA button */}
          <div className="text-center mb-8">
            <WaitlistDialog>
              <Button
                className={cn(
                  "bg-pink-500 hover:bg-pink-600 text-white",
                  "border-2 border-white/30 hover:border-white/50",
                  "min-h-[44px] min-w-[44px]",
                  "h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold",
                  "shadow-lg hover:shadow-xl transition-all duration-200"
                )}
              >
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                {t('hero.joinWaitlist')}
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
              </Button>
            </WaitlistDialog>
          </div>

          {/* Hat showcase section with marquee above and shop button below */}
          <div className={cn(
            "bg-gradient-to-r from-pink-50/50 to-purple-50/50",
            "border border-pink-200/40",
            "rounded-2xl p-4 sm:p-6",
            "space-y-4"
          )}>
            
            {/* Brand marquee above the carousel - bigger height */}
            <div className={cn(
              "bg-white/80 backdrop-blur-sm",
              "border border-pink-200/30",
              "rounded-xl overflow-hidden"
            )}>
              <BrandMarquee 
                text="INDECISIVE WEAR" 
                speed={25}
                textColor="text-pink-500"
                className="py-5 sm:py-6 text-xl sm:text-2xl md:text-3xl font-black"
              />
            </div>
            
            {/* Hat carousel */}
            <div className="relative w-full overflow-x-hidden">
              <NativeCarousel 
                autoplay={false} 
                showIndicators={false}
                className="w-full"
              >
                {hatImages.slice(0, 6).map((image, index) => (
                  <CarouselItem key={`${image}-${index}`} image={image} index={index} />
                ))}
              </NativeCarousel>
            </div>

            {/* Shop CTA button below carousel - centered with border */}
            <div className="flex justify-center">
              <Button
                onClick={() => window.location.href = '/shop'}
                className={cn(
                  "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700",
                  "border-2 border-white/30 hover:border-white/50",
                  "text-white font-semibold",
                  "min-h-[44px] h-11 px-8 text-sm sm:text-base",
                  "rounded-xl shadow-lg hover:shadow-xl",
                  "transition-all duration-200"
                )}
              >
                {locale === 'bg' ? 'Магазин' : 'Shop'}
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

// Memoize the entire component
export const HeroSection = memo(HeroSectionComponent)