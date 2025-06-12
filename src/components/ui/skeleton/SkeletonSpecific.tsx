/**
 * App-Specific Skeleton Components
 * 
 * Custom skeleton components that match exact app component dimensions
 * Extracted from the monolithic skeleton.tsx for better organization
 */

import { cn } from "@/lib/utils"
import { tokens } from "@/lib/design-system"
import { Skeleton, SkeletonShimmer, type SkeletonProps } from "./SkeletonBase"

/**
 * Product Card Skeleton - matches ProductCard dimensions exactly
 */
export function ProductCardSkeleton({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn(
      "group relative overflow-hidden bg-white",
      tokens.borderRadius.xl,
      tokens.borders.card,
      tokens.shadows.sm,
      className
    )} {...props}>
      {/* Image skeleton with exact aspect ratio */}
      <div className="relative aspect-card overflow-hidden bg-gradient-to-br from-pink-50 to-white">
        <SkeletonShimmer className="h-full w-full" />
      </div>
      
      {/* Content skeleton matching ProductCard layout */}
      <div className={cn(tokens.spacing.component.md, tokens.spacing.gap.sm)}>
        {/* Title skeleton */}
        <Skeleton className="h-5 w-3/4" />
        
        {/* Description skeleton */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        
        {/* Price and button skeleton */}
        <div className={cn(
          "flex items-center justify-between pt-2",
          tokens.spacing.gap.sm
        )}>
          <Skeleton className="h-6 w-16" />
          <Skeleton className={cn("h-9 w-20", tokens.borderRadius.md)} />
        </div>
      </div>
    </div>
  )
}

/**
 * Navigation Skeleton - matches navbar dimensions
 */
export function NavigationSkeleton({ className, ...props }: SkeletonProps) {
  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)} {...props}>
      <div className="container flex h-16 items-center">
        {/* Logo skeleton */}
        <Skeleton className="h-8 w-32" />
        
        {/* Navigation links skeleton - desktop */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center md:space-x-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-18" />
          <Skeleton className="h-4 w-14" />
        </div>
        
        {/* Action buttons skeleton */}
        <div className="flex items-center space-x-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md md:hidden" />
        </div>
      </div>
    </header>
  )
}

/**
 * Hero Section Skeleton - matches HeroSection layout
 */
export function HeroSectionSkeleton({ className, ...props }: SkeletonProps) {
  return (
    <section className={cn(
      "relative w-full flex items-center justify-center overflow-hidden",
      tokens.spacing.section.mobile,
      tokens.spacing.section.tablet,
      tokens.spacing.section.desktop,
      className
    )} {...props}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/80 via-white to-pink-50/60" />
      
      <div className={cn(tokens.layout.container.wide, "relative z-10")}>
        <div className={cn(
          "flex flex-col lg:grid lg:grid-cols-2 items-center",
          tokens.spacing.gap.xl,
          "lg:gap-12"
        )}>
          {/* Left side - Content skeleton */}
          <div className={cn(
            "flex flex-col text-center lg:text-left",
            tokens.spacing.gap.lg
          )}>
            {/* Launch badge skeleton */}
            <div className="flex justify-center lg:justify-start">
              <Skeleton className={cn("h-8 w-48", tokens.borderRadius.full)} />
            </div>
            
            {/* Main heading skeleton */}
            <div className={cn(tokens.spacing.gap.sm)}>
              <Skeleton className="h-12 sm:h-16 lg:h-20 w-48 sm:w-64 lg:w-80 mx-auto lg:mx-0" />
              <Skeleton className={cn(
                "h-12 sm:h-16 lg:h-20 w-80 sm:w-96 lg:w-[28rem] mx-auto lg:mx-0",
                tokens.borderRadius.md
              )} />
            </div>
            
            {/* Subheading skeleton */}
            <Skeleton className="h-6 lg:h-8 w-full max-w-lg mx-auto lg:mx-0" />
            
            {/* CTA buttons skeleton */}
            <div className={cn(
              "flex flex-col sm:flex-row max-w-sm mx-auto lg:mx-0 lg:max-w-none",
              tokens.spacing.gap.sm
            )}>
              <Skeleton className="h-12 w-full sm:w-40" />
              <Skeleton className="h-12 w-full sm:w-48" />
            </div>
            
            {/* Social proof skeleton */}
            <Skeleton className="h-4 w-36 mx-auto lg:mx-0" />
          </div>
          
          {/* Right side - Carousel skeleton */}
          <div className="relative w-full">
            <div className={cn(
              "relative h-48 sm:h-60 lg:h-72 overflow-hidden bg-pink-50/30",
              tokens.borderRadius.xl
            )}>
              <div className="flex h-full gap-6 animate-pulse">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="flex-shrink-0 w-32 sm:w-36 lg:w-40 h-full">
                    <SkeletonShimmer className={cn(
                      "w-full aspect-[3/4]",
                      tokens.borderRadius.lg
                    )} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Product Grid Skeleton - matches ProductGrid layout
 */
export function ProductGridSkeleton({ 
  itemCount = 6, 
  className, 
  ...props 
}: SkeletonProps & { itemCount?: number }) {
  return (
    <div className={cn(
      "grid gap-6",
      "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      className
    )} {...props}>
      {Array.from({ length: itemCount }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

/**
 * Waitlist Form Skeleton - matches form layout
 */
export function WaitlistFormSkeleton({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn(
      "space-y-6 p-6 bg-white",
      tokens.borderRadius.xl,
      tokens.shadows.lg,
      className
    )} {...props}>
      {/* Title */}
      <Skeleton className="h-8 w-48 mx-auto" />
      
      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 mx-auto" />
      </div>
      
      {/* Form fields */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
      
      {/* Submit button */}
      <Skeleton className="h-12 w-full" />
    </div>
  )
}