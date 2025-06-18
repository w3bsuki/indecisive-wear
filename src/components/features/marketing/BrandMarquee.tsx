"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface BrandMarqueeProps {
  text?: string
  className?: string
  speed?: number
  textColor?: string
  separatorColor?: string
  showBorders?: boolean
  repeat?: number
  reverse?: boolean
}

function BrandMarqueeComponent({ 
  text = "INDECISIVE WEAR", 
  className,
  speed = 35,
  textColor = "text-pink-500/70",
  separatorColor = "text-pink-500/70",
  showBorders: _showBorders = true,
  repeat = 3,
  reverse = false
}: BrandMarqueeProps) {
  
  // Create the text content - mobile optimized
  const textContent = Array(repeat).fill(null).map((_, index) => (
    <div key={index} className="flex items-center shrink-0">
      <span 
        className={cn(
          "font-extrabold whitespace-nowrap",
          // Check if className contains text size, otherwise use default
          className && className.includes('text-') 
            ? '' 
            : "text-2xl sm:text-4xl md:text-5xl lg:text-6xl",
          textColor
        )}
      >
        {text}
      </span>
      <span 
        className={cn(
          className && className.includes('text-') 
            ? "mx-2" 
            : "mx-3 sm:mx-6 text-lg sm:text-2xl", 
          separatorColor
        )}
      >
        ★
      </span>
    </div>
  ));

  return (
    <div 
      className={cn(
        "w-full overflow-hidden py-2 sm:py-3 relative",
        className
      )}
    >
      <div className="flex items-center w-full">
        <div 
          className={cn(
            "flex items-center will-change-transform",
            reverse ? "animate-marquee-reverse" : "animate-marquee"
          )}
          style={{
            animationDuration: `${speed}s`
          }}
        >
          {/* First set */}
          {textContent}
          {/* Duplicate set for seamless loop */}
          {textContent}
        </div>
      </div>
      
      {/* CSS Animation - GPU accelerated */}
      <style jsx>{`
        @keyframes marquee {
          0% { 
            transform: translateX(0%) translateZ(0); 
          }
          100% { 
            transform: translateX(-50%) translateZ(0); 
          }
        }
        
        @keyframes marquee-reverse {
          0% { 
            transform: translateX(-50%) translateZ(0); 
          }
          100% { 
            transform: translateX(0%) translateZ(0); 
          }
        }
        
        .animate-marquee {
          animation: marquee linear infinite;
        }
        
        .animate-marquee-reverse {
          animation: marquee-reverse linear infinite;
        }
      `}</style>
    </div>
  )
}

export const BrandMarquee = React.memo(BrandMarqueeComponent)