"use client"

import React, { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface NativeCarouselProps {
  children: React.ReactNode[]
  className?: string
  autoplay?: boolean
  autoplayDelay?: number
  showIndicators?: boolean
}

export function NativeCarousel({ 
  children, 
  className, 
  autoplay = false, 
  autoplayDelay = 3000,
  showIndicators = false 
}: NativeCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoplayActive, setIsAutoplayActive] = useState(autoplay)

  useEffect(() => {
    if (!isAutoplayActive || !scrollRef.current) return

    const interval = setInterval(() => {
      const container = scrollRef.current
      if (!container) return

      const itemWidth = container.scrollWidth / children.length
      const nextIndex = (currentIndex + 1) % children.length
      
      container.scrollTo({
        left: nextIndex * itemWidth,
        behavior: 'smooth'
      })
      
      setCurrentIndex(nextIndex)
    }, autoplayDelay)

    return () => clearInterval(interval)
  }, [currentIndex, isAutoplayActive, children.length, autoplayDelay])

  const handleScroll = () => {
    if (!scrollRef.current) return
    
    const container = scrollRef.current
    const itemWidth = container.scrollWidth / children.length
    const newIndex = Math.round(container.scrollLeft / itemWidth)
    setCurrentIndex(newIndex)
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-2"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
        onScroll={handleScroll}
        onMouseEnter={() => setIsAutoplayActive(false)}
        onMouseLeave={() => setIsAutoplayActive(autoplay)}
        onTouchStart={() => setIsAutoplayActive(false)}
        onTouchEnd={() => setTimeout(() => setIsAutoplayActive(autoplay), 2000)}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="flex-shrink-0 snap-center"
            style={{ transform: 'translateZ(0)' }} // Force GPU acceleration
          >
            {child}
          </div>
        ))}
      </div>
      
      {showIndicators && (
        <div className="flex justify-center mt-6 sm:mt-8">
          {/* Professional indicator container */}
          <div className="flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/30 shadow-lg">
            {children.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "relative transition-all duration-300 rounded-full",
                  index === currentIndex 
                    ? "w-8 h-2.5 bg-gradient-to-r from-pink-500 to-purple-500 shadow-md" 
                    : "w-2.5 h-2.5 bg-gray-300/80 hover:bg-gray-400/80 hover:scale-110"
                )}
                onClick={() => {
                  const container = scrollRef.current
                  if (container) {
                    const itemWidth = container.scrollWidth / children.length
                    container.scrollTo({
                      left: index * itemWidth,
                      behavior: 'smooth'
                    })
                    setCurrentIndex(index)
                  }
                }}
                aria-label={`Go to slide ${index + 1}`}
              >
                {/* Active indicator glow effect */}
                {index === currentIndex && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400/50 to-purple-400/50 blur-sm scale-150" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}