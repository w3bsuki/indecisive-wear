/**
 * Base Skeleton Component
 * 
 * Core skeleton component with shared functionality
 * Extracted from the monolithic skeleton.tsx for better organization
 */

import { cn } from "@/lib/utils"
import { tokens } from "@/lib/design-system"
import React from "react"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-pink-100/50",
        tokens.borderRadius.md,
        "transform-gpu", // Hardware acceleration
        className
      )}
      {...props}
    />
  )
}

/**
 * Advanced pulse skeleton with shimmer effect
 */
export function SkeletonShimmer({ 
  className,
  ...props 
}: SkeletonProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden bg-pink-100/50",
        tokens.borderRadius.md,
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-transparent before:via-pink-200/30 before:to-transparent",
        "before:animate-[shimmer_2s_infinite]",
        "transform-gpu", // Hardware acceleration
        className
      )}
      role="status"
      aria-label="Loading with shimmer effect"
      {...props}
    />
  )
}