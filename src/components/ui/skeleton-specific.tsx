/**
 * App-Specific Skeleton Components
 * 
 * Skeleton loaders that match exact component dimensions for seamless loading states
 * These are tailored to specific components in the Indecisive Wear app
 */

import { cn } from "@/lib/utils"
import { 
  Skeleton, 
  SkeletonAvatar, 
  SkeletonButton, 
  SkeletonText,
  ImageSkeleton,
  FormFieldSkeleton
} from "./skeleton-consolidated"

interface SkeletonVariantProps {
  className?: string;
}

/**
 * Product card skeleton matching exact product card dimensions
 */
export function ProductCardSkeleton({ className, ...props }: SkeletonVariantProps) {
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white shadow-sm",
        className
      )}
      {...props}
    >
      {/* Image */}
      <ImageSkeleton aspectRatio="square" className="rounded-none" />
      
      {/* Content */}
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-16" />
          <SkeletonButton size="sm" className="w-24" />
        </div>
      </div>
    </div>
  )
}

/**
 * Navigation skeleton for navbar
 */
export function NavigationSkeleton({ className, ...props }: SkeletonVariantProps) {
  return (
    <nav 
      className={cn(
        "flex items-center justify-between px-4 py-3 bg-white border-b",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-32" />
        <div className="hidden md:flex items-center gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20" />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
        <SkeletonAvatar size="sm" />
      </div>
    </nav>
  )
}

/**
 * Hero section skeleton
 */
export function HeroSectionSkeleton({ className, ...props }: SkeletonVariantProps) {
  return (
    <section 
      className={cn(
        "relative min-h-[600px] bg-gradient-to-br from-pink-50 to-purple-50 p-8",
        className
      )}
      {...props}
    >
      <div className="container mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-64 mx-auto" />
          <Skeleton className="h-16 w-96 mx-auto" />
          <SkeletonText lines={2} className="max-w-2xl mx-auto" />
        </div>
        <div className="flex justify-center gap-4">
          <SkeletonButton size="lg" className="w-40" />
          <SkeletonButton size="lg" variant="outline" className="w-40" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <ImageSkeleton key={i} aspectRatio="portrait" />
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Product grid skeleton with responsive columns
 */
export function ProductGridSkeleton({ 
  columns = 3,
  items = 6,
  className,
  ...props 
}: SkeletonVariantProps & { 
  columns?: number;
  items?: number;
}) {
  return (
    <div 
      className={cn(
        "grid gap-4",
        `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns}`,
        className
      )}
      {...props}
    >
      {Array.from({ length: items }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

/**
 * Waitlist form skeleton
 */
export function WaitlistFormSkeleton({ className, ...props }: SkeletonVariantProps) {
  return (
    <div 
      className={cn(
        "max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6",
        className
      )}
      {...props}
    >
      <div className="text-center space-y-3">
        <Skeleton className="h-8 w-48 mx-auto" />
        <SkeletonText lines={2} className="max-w-sm mx-auto" />
      </div>
      <div className="space-y-4">
        <FormFieldSkeleton showLabel />
        <FormFieldSkeleton showLabel />
        <FormFieldSkeleton showLabel />
        <SkeletonButton size="lg" className="w-full" />
      </div>
    </div>
  )
}

/**
 * Filter drawer skeleton
 */
export function FilterDrawerSkeleton({ className, ...props }: SkeletonVariantProps) {
  return (
    <div className={cn("space-y-6 p-4", className)} {...props}>
      {/* Price range */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-8 w-full" />
      </div>
      
      {/* Categories */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-32" />
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 rounded-lg" />
          ))}
        </div>
      </div>
      
      {/* Colors */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-20" />
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-full" />
          ))}
        </div>
      </div>
      
      {/* Sizes */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-20" />
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Cart item skeleton
 */
export function CartItemSkeleton({ className, ...props }: SkeletonVariantProps) {
  return (
    <div 
      className={cn(
        "flex gap-4 p-4 bg-white rounded-lg border",
        className
      )}
      {...props}
    >
      <ImageSkeleton className="h-20 w-20 rounded-lg" aspectRatio="square" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  )
}

/**
 * Checkout form skeleton
 */
export function CheckoutFormSkeleton({ className, ...props }: SkeletonVariantProps) {
  return (
    <div className={cn("space-y-8", className)} {...props}>
      {/* Contact Information */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <FormFieldSkeleton showLabel />
        <FormFieldSkeleton showLabel />
      </div>
      
      {/* Shipping Address */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="grid grid-cols-2 gap-4">
          <FormFieldSkeleton showLabel />
          <FormFieldSkeleton showLabel />
        </div>
        <FormFieldSkeleton showLabel />
        <div className="grid grid-cols-2 gap-4">
          <FormFieldSkeleton showLabel />
          <FormFieldSkeleton showLabel />
        </div>
      </div>
      
      {/* Payment Method */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
      
      <SkeletonButton size="lg" className="w-full" />
    </div>
  )
}

/**
 * Order summary skeleton
 */
export function OrderSummarySkeleton({ className, ...props }: SkeletonVariantProps) {
  return (
    <div 
      className={cn(
        "bg-gray-50 rounded-lg p-6 space-y-4",
        className
      )}
      {...props}
    >
      <Skeleton className="h-6 w-32" />
      
      {/* Order items */}
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex justify-between">
            <SkeletonText lines={2} className="flex-1 mr-4" />
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex justify-between pt-2 border-t">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
    </div>
  )
}