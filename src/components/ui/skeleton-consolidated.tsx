/**
 * Skeleton Components - Consolidated
 * 
 * Core skeleton component and common variants
 * Consolidated from 6 separate files into 2 for better maintainability
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
 * Shimmer effect overlay for enhanced loading states
 */
export function SkeletonShimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 -translate-x-full animate-shimmer",
        "bg-gradient-to-r from-transparent via-white/20 to-transparent",
        className
      )}
    />
  )
}

interface SkeletonVariantProps {
  className?: string;
}

/**
 * Text skeleton with different line heights
 */
export function SkeletonText({ 
  className,
  lines = 1,
  spacing = "normal",
  ...props 
}: SkeletonVariantProps & { 
  lines?: number; 
  spacing?: "tight" | "normal" | "loose";
}) {
  const spacingClass = {
    tight: "space-y-1",
    normal: "space-y-2", 
    loose: "space-y-3"
  }[spacing]

  return (
    <div className={cn(spacingClass, className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4 w-full",
            i === lines - 1 && lines > 1 && "w-3/4"
          )}
        />
      ))}
    </div>
  )
}

/**
 * Avatar skeleton with optional indicators
 */
export function SkeletonAvatar({ 
  size = "md",
  className,
  showIndicator = false,
  ...props 
}: SkeletonVariantProps & { 
  size?: "sm" | "md" | "lg" | "xl";
  showIndicator?: boolean;
}) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  }

  return (
    <div className="relative inline-block">
      <Skeleton 
        className={cn(
          "rounded-full",
          sizeClasses[size],
          className
        )}
        {...props}
      />
      {showIndicator && (
        <Skeleton className="absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-white" />
      )}
    </div>
  )
}

/**
 * Button skeleton matching standard button sizes
 */
export function SkeletonButton({ 
  size = "default",
  variant = "default",
  className,
  ...props 
}: SkeletonVariantProps & { 
  size?: "sm" | "default" | "lg" | "icon";
  variant?: "default" | "outline" | "ghost";
}) {
  const sizeClasses = {
    sm: "h-8 px-3 text-xs",
    default: "h-10 px-4 py-2",
    lg: "h-11 px-8",
    icon: "h-10 w-10"
  }

  const variantClasses = {
    default: "",
    outline: "border border-pink-200",
    ghost: ""
  }

  return (
    <Skeleton
      className={cn(
        "rounded-md inline-flex items-center justify-center",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
}

export const ButtonSkeleton = SkeletonButton

/**
 * Image skeleton with aspect ratio support
 */
export function ImageSkeleton({ 
  aspectRatio = "square",
  className,
  ...props 
}: SkeletonVariantProps & { 
  aspectRatio?: "square" | "video" | "portrait" | "wide";
}) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]"
  }

  return (
    <Skeleton
      className={cn(
        "w-full",
        aspectClasses[aspectRatio],
        className
      )}
      {...props}
    />
  )
}

/**
 * Card skeleton for content blocks
 */
export function SkeletonCard({ 
  hasImage = true,
  className,
  ...props 
}: SkeletonVariantProps & { 
  hasImage?: boolean;
}) {
  return (
    <div 
      className={cn(
        "space-y-3 p-4 rounded-lg bg-white shadow-sm",
        className
      )}
      {...props}
    >
      {hasImage && <ImageSkeleton aspectRatio="video" className="mb-4 -m-4" />}
      <SkeletonAvatar size="sm" />
      <SkeletonText lines={3} />
      <div className="flex gap-2">
        <SkeletonButton size="sm" className="w-20" />
        <SkeletonButton size="sm" variant="outline" className="w-20" />
      </div>
    </div>
  )
}

/**
 * Grid skeleton for layout placeholders
 */
export function GridSkeleton({ 
  columns = 3,
  rows = 2,
  className,
  gap = "normal",
  ...props 
}: SkeletonVariantProps & { 
  columns?: number;
  rows?: number;
  gap?: "tight" | "normal" | "loose";
}) {
  const gapClasses = {
    tight: "gap-2",
    normal: "gap-4",
    loose: "gap-6"
  }

  return (
    <div 
      className={cn(
        "grid",
        `grid-cols-${columns}`,
        gapClasses[gap],
        className
      )}
      {...props}
    >
      {Array.from({ length: columns * rows }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

/**
 * List skeleton for sequential content
 */
export function SkeletonList({ 
  items = 3,
  className,
  hasAvatar = true,
  hasActions = false,
  ...props 
}: SkeletonVariantProps & { 
  items?: number;
  hasAvatar?: boolean;
  hasActions?: boolean;
}) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100">
          {hasAvatar && <SkeletonAvatar size="sm" />}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-2/3" />
          </div>
          {hasActions && <SkeletonButton size="sm" variant="outline" />}
        </div>
      ))}
    </div>
  )
}

/**
 * Table skeleton for data grids
 */
export function SkeletonTable({ 
  rows = 5,
  columns = 4,
  className,
  hasHeaders = true,
  ...props 
}: SkeletonVariantProps & { 
  rows?: number;
  columns?: number;
  hasHeaders?: boolean;
}) {
  return (
    <div className={cn("w-full", className)} {...props}>
      {hasHeaders && (
        <div className="flex gap-4 p-3 border-b">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
      )}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 p-3 border-b">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton 
              key={colIndex} 
              className={cn(
                "h-4 flex-1",
                colIndex === 0 && "w-24 flex-none"
              )} 
            />
          ))}
        </div>
      ))}
    </div>
  )
}

/**
 * Navigation skeleton for menu structures
 */
export function SkeletonNavigation({ 
  items = 5,
  className,
  orientation = "horizontal",
  ...props 
}: SkeletonVariantProps & { 
  items?: number;
  orientation?: "horizontal" | "vertical";
}) {
  const containerClass = orientation === "horizontal" 
    ? "flex items-center gap-4" 
    : "flex flex-col gap-2"

  return (
    <nav className={cn(containerClass, className)} {...props}>
      {Array.from({ length: items }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-20 rounded-md" />
      ))}
    </nav>
  )
}

/**
 * Form field skeleton
 */
export function FormFieldSkeleton({ 
  className,
  showLabel = true,
  showHelper = false,
  ...props 
}: SkeletonVariantProps & { 
  showLabel?: boolean;
  showHelper?: boolean;
}) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {showLabel && <Skeleton className="h-4 w-24" />}
      <Skeleton className="h-10 w-full rounded-md" />
      {showHelper && <Skeleton className="h-3 w-48 mt-1" />}
    </div>
  )
}

/**
 * Form skeleton with multiple fields
 */
export function SkeletonForm({ 
  fields = 3,
  className,
  hasSubmitButton = true,
  ...props 
}: SkeletonVariantProps & { 
  fields?: number;
  hasSubmitButton?: boolean;
}) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {Array.from({ length: fields }).map((_, i) => (
        <FormFieldSkeleton key={i} showLabel showHelper={i === 0} />
      ))}
      {hasSubmitButton && (
        <SkeletonButton size="lg" className="w-full mt-6" />
      )}
    </div>
  )
}

/**
 * Chart skeleton for data visualizations
 */
export function SkeletonChart({ 
  type = "bar",
  className,
  ...props 
}: SkeletonVariantProps & { 
  type?: "bar" | "line" | "pie";
}) {
  if (type === "pie") {
    return (
      <div className={cn("relative", className)} {...props}>
        <Skeleton className="h-64 w-64 rounded-full mx-auto" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="h-32 w-32 rounded-full" />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <div className="flex items-end gap-2 h-64">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn(
              "flex-1",
              type === "bar" && `h-${Math.floor(Math.random() * 64) + 20}`,
              type === "line" && "h-2"
            )}
          />
        ))}
      </div>
      <div className="flex justify-between">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-8" />
        ))}
      </div>
    </div>
  )
}