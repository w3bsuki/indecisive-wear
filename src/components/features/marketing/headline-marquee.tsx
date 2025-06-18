"use client"

import { cn } from "@/lib/utils"

interface HeadlineMarqueeProps {
  text: string
  speed?: number
  className?: string
  reversed?: boolean
  repeat?: number
  separator?: React.ReactNode
  textColor?: string
  separatorColor?: string
  textShadow?: string
  containerClassName?: string
  hideSeparator?: boolean
  showBorders?: boolean
}

export default function HeadlineMarquee({
  text,
  speed = 50,
  className = "",
  reversed = false,
  repeat = 3,
  separator = "★",
  textColor = "text-black/70",
  separatorColor = "text-pink-500/70",
  textShadow = "0 1px 2px rgba(255,255,255,0.5)",
  containerClassName = "",
  hideSeparator = false,
  showBorders = true
}: HeadlineMarqueeProps) {
  
  // Create the text content
  const textContent = Array(repeat).fill(null).map((_, index) => (
    <div key={index} className="flex items-center shrink-0">
      <span 
        className={cn(
          "text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold whitespace-nowrap",
          textColor
        )}
        style={{ textShadow }}
      >
        {text}
      </span>
      {!hideSeparator && (
        <span 
          className={cn("mx-4 sm:mx-8 text-2xl sm:text-4xl", separatorColor)}
          style={{ textShadow }}
        >
          {separator}
        </span>
      )}
    </div>
  ));

  return (
    <div 
      className={cn(
        "w-full overflow-hidden py-4 sm:py-8 relative",
        className
      )}
      style={{
        boxShadow: showBorders ? 'inset 0 1px 0 0 rgba(236,72,153,0.5), inset 0 -1px 0 0 rgba(236,72,153,0.5)' : 'none',
        background: showBorders ? 'linear-gradient(to bottom, rgba(236,72,153,0.05), transparent 10%, transparent 90%, rgba(236,72,153,0.05))' : 'none'
      }}
    >
      <div className={cn("flex items-center", containerClassName)}>
        <div 
          className={cn(
            "flex items-center animate-marquee",
            reversed && "animate-marquee-reverse"
          )}
          style={{
            animationDuration: `${speed * 2}s`
          }}
        >
          {/* First set */}
          {textContent}
          {/* Duplicate set for seamless loop */}
          {textContent}
        </div>
      </div>
      
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
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