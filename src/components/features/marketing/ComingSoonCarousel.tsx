// Coming Soon Categories - Clean Design System
"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/hooks/i18n/useLocale"
import { Bell } from 'lucide-react'
import { Sparkles } from 'lucide-react'
import { cleanDesignSystem, cleanAnimations } from "@/lib/design-system/clean-tokens"

interface ComingSoonCarouselProps {
  hatImages?: string[]
  className?: string
}

interface CategoryItem {
  id: string
  titleBg: string
  titleEn: string
  descBg: string
  descEn: string
  icon: string
  image: string
  gradient: string
}

const ComingSoonCarouselComponent = ({ className }: ComingSoonCarouselProps) => {
  const { locale } = useLocale()
  
  const categories: CategoryItem[] = [
    {
      id: "tshirts",
      titleBg: "Тениски",
      titleEn: "T-Shirts", 
      descBg: "Мека памучна тениска с дизайн",
      descEn: "Soft cotton tees with designs",
      icon: "👕",
      image: "/placeholder.jpg",
      gradient: "from-pink-100/50 to-pink-50/30"
    },
    {
      id: "shoes",
      titleBg: "Обувки", 
      titleEn: "Shoes",
      descBg: "Удобни маратонки за всеки ден",
      descEn: "Comfortable everyday sneakers",
      icon: "👟",
      image: "/placeholder.jpg",
      gradient: "from-pink-100/50 to-pink-50/30"
    },
    {
      id: "bags",
      titleBg: "Чанти",
      titleEn: "Bags",
      descBg: "Стилни чанти за ежедневието",
      descEn: "Stylish everyday bags", 
      icon: "👜",
      image: "/placeholder.jpg",
      gradient: "from-pink-100/50 to-pink-50/30"
    },
    {
      id: "accessories",
      titleBg: "Аксесоари",
      titleEn: "Accessories",
      descBg: "Подбрани аксесоари с характер",
      descEn: "Curated accessories with style",
      icon: "💍",
      image: "/placeholder.jpg", 
      gradient: "from-pink-100/50 to-pink-50/30"
    },
    {
      id: "hoodies",
      titleBg: "Суичъри",
      titleEn: "Hoodies",
      descBg: "Топли суичъри за студените дни",
      descEn: "Warm hoodies for cold days",
      icon: "🧥",
      image: "/placeholder.jpg",
      gradient: "from-pink-100/50 to-pink-50/30"
    }
  ]

  const handleNotifyMe = (categoryId: string) => {
    const categoryTitle = locale === 'bg' 
      ? categories.find(c => c.id === categoryId)?.titleBg
      : categories.find(c => c.id === categoryId)?.titleEn
    
    const message = locale === 'bg' 
      ? `Ще бъдете уведомени когато ${categoryTitle} са налични! 💜`
      : `You'll be notified when ${categoryTitle} are available! 💜`
    
    alert(message)
  }

  const handleJoinWaitlist = () => {
    const message = locale === 'bg' 
      ? 'Присъединихте се към waitlist-а! Ще получите имейл за новите продукти. 💜'
      : 'You joined the waitlist! You\'ll get an email about new products. 💜'
    
    alert(message)
  }

  return (
    <div className={cn("w-full", className)}>
      {/* All-in-one Container */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-pink-500/5 rounded-2xl" />
        <div className="relative bg-white/90 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-3xl border border-pink-200/30 shadow-[0_0_30px_rgba(236,72,153,0.12)] min-h-[500px] sm:min-h-[600px] flex flex-col justify-center">
          
          {/* Header inside container with marquee headline */}
          <div className="mb-4 space-y-3">
            {/* Animated Section Headline Marquee */}
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-pink-500/5 via-pink-400/10 to-pink-500/5 border border-pink-200/30">
              <SectionMarquee 
                primaryText={locale === 'bg' ? 'НОВИ ПРОДУКТИ' : 'NEW PRODUCTS'}
                secondaryText={locale === 'bg' ? 'НОВИ ПРОДУКТИ В РАЗРАБОТКА' : 'NEW PRODUCTS IN DEVELOPMENT'}
                speed={30}
              />
            </div>
            
            {/* Coming Soon Badge */}
            <div className="flex justify-center">
              <Badge className="bg-pink-500 text-white border-0 text-xs px-3 py-1 whitespace-nowrap shadow-sm">
                <Sparkles className="h-3 w-3 mr-1 flex-shrink-0" />
                {locale === 'bg' ? 'Скоро' : 'Coming Soon'}
              </Badge>
            </div>
          </div>
            
          {/* Scrollable Categories */}
          <div className="overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory" style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}>
            <div className="flex gap-4 pb-2" style={{ width: 'max-content' }}>
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="group relative flex-none w-56 sm:w-64 snap-start"
                  style={{ transform: 'translateZ(0)' }}
                >
                  {/* Compact Category Card */}
                  <div className="relative overflow-hidden">
                    <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200 p-0.5 sm:p-2">
                        
                      {/* Compact Icon Section */}
                      <div className="aspect-square relative overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-pink-50/50 via-white to-gray-50/30">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                            {category.icon}
                          </span>
                        </div>
                        
                        {/* Compact Coming Soon Badge */}
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-pink-500 text-white border-0 text-[10px] px-1.5 py-0.5">
                            {locale === 'bg' ? 'Скоро' : 'Soon'}
                          </Badge>
                        </div>

                        {/* Compact Notify Button */}
                        <div className="absolute top-2 right-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                          <Button
                            onClick={() => handleNotifyMe(category.id)}
                            size="sm"
                            className="w-8 h-8 rounded-full bg-white/90 text-pink-500 hover:bg-pink-500 hover:text-white border border-pink-200 hover:border-pink-500 p-0" // 32px - larger for better touch
                          >
                            <Bell className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Text Content - Below icon section */}
                      <div className="p-3 text-center">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors">
                          {locale === 'bg' ? category.titleBg : category.titleEn}
                        </h3>
                        <p className="text-xs text-gray-500 mb-3">
                          {locale === 'bg' ? category.descBg : category.descEn}
                        </p>
                        
                        {/* Compact Notify Button */}
                        <Button
                          onClick={() => handleNotifyMe(category.id)}
                          size="sm"
                          className="w-full h-8 text-xs bg-white text-pink-600 border border-pink-200 hover:bg-pink-50 hover:border-pink-300 transition-all duration-200"
                        >
                          {locale === 'bg' ? 'Уведоми ме' : 'Notify Me'}
                        </Button>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile-Optimized CTA */}
          <div className="flex flex-col items-center gap-3 mt-4 pt-4 border-t border-pink-200/30">
            <Button 
              onClick={handleJoinWaitlist}
              className="h-11 px-6 bg-pink-500 text-white text-sm rounded-lg hover:bg-pink-600 shadow-sm hover:shadow-md flex items-center justify-center gap-2 font-medium transition-all"
            >
              <Bell className="h-4 w-4" />
              {locale === 'bg' ? 'Уведоми за всички' : 'Notify for all'}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Global scrollbar styles and mobile optimizations */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Mobile touch optimization */
        @media (max-width: 768px) {
          .scrollbar-hide {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior-x: contain;
            scroll-snap-type: x mandatory;
          }
        }
        
        /* GPU acceleration for smooth scrolling */
        .scrollbar-hide,
        .scrollbar-hide > * {
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        /* Prevent horizontal viewport overflow */
        body, html {
          overflow-x: hidden;
        }
      `}</style>
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

export const ComingSoonCarousel = React.memo(ComingSoonCarouselComponent)