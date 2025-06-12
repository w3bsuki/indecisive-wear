"use client"

import React from "react"
import HeadlineMarquee from "@/components/features/marketing/headline-marquee"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string;
  speed?: number;
  className?: string;
  textColor?: string;
  separatorColor?: string;
  textShadow?: string;
  showBorders?: boolean;
  containerClassName?: string;
  repeat?: number;
  children?: React.ReactNode;
}

export function SectionHeader({
  title,
  speed = 35,
  className,
  textColor = "text-black/70",
  separatorColor = "text-pink-500/70",
  textShadow = "0 2px 4px rgba(255,255,255,0.5)",
  showBorders = true,
  containerClassName,
  repeat = 4,
  children
}: SectionHeaderProps) {
  return (
    <div className={cn("relative mb-6 md:mb-8 bg-gradient-to-r from-white via-white/90 to-white w-full", className)}>
      <HeadlineMarquee 
        text={title} 
        speed={speed} 
        className="py-4 md:py-6 w-full"
        textColor={textColor}
        separatorColor={separatorColor}
        textShadow={textShadow}
        repeat={repeat}
        containerClassName={cn("px-0 w-full", containerClassName)}
        showBorders={showBorders}
      />
      {children}
    </div>
  )
} 