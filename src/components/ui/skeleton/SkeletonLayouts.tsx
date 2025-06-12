/**
 * Layout Skeleton Components
 * 
 * Complex layout skeletons for cards, grids, lists, tables
 * Extracted from the monolithic skeleton.tsx for better organization
 */

import { cn } from "@/lib/utils"
import { Skeleton, type SkeletonProps } from "./SkeletonBase"
import { SkeletonAvatar } from "./SkeletonComponents"

interface SkeletonVariantProps {
  className?: string;
}

/**
 * Card skeleton with image and text
 */
export function SkeletonCard({ className, ...props }: SkeletonVariantProps) {
  return (
    <div className={cn("space-y-3", className)} role="status" aria-label="Loading card content" {...props}>
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

/**
 * Grid Skeleton - creates consistent grid layouts
 */
export function GridSkeleton({ 
  className,
  columns = 4,
  rows = 3,
  itemClassName,
  ...props 
}: SkeletonProps & { 
  columns?: number
  rows?: number
  itemClassName?: string
}) {
  const items = Array.from({ length: columns * rows }, (_, i) => i)
  
  return (
    <div 
      className={cn(
        "grid gap-4",
        `grid-cols-1 xs:grid-cols-2 sm:grid-cols-${Math.min(columns, 3)} md:grid-cols-${Math.min(columns, 4)} lg:grid-cols-${columns}`,
        className
      )} 
      {...props}
    >
      {items.map((i) => (
        <Skeleton key={i} className={cn("h-48 w-full rounded-md", itemClassName)} />
      ))}
    </div>
  )
}

/**
 * List skeleton
 */
export function SkeletonList({ 
  className,
  items = 3,
  itemHeight = "h-12",
  showAvatar = false,
  ...props 
}: SkeletonVariantProps & { 
  items?: number; 
  itemHeight?: string;
  showAvatar?: boolean;
}) {
  return (
    <div className={cn("space-y-2", className)} role="status" aria-label={`Loading list with ${items} items`} {...props}>
      {Array.from({ length: items }, (_, i) => (
        <div key={i} className={cn("flex items-center space-x-3 p-2", itemHeight)}>
          {showAvatar && <SkeletonAvatar size="sm" />}
          <div className="flex-1 space-y-1">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Table skeleton
 */
export function SkeletonTable({ 
  className,
  rows = 5,
  columns = 4,
  showHeader = true,
  ...props 
}: SkeletonVariantProps & { 
  rows?: number; 
  columns?: number;
  showHeader?: boolean;
}) {
  return (
    <div className={cn("space-y-2", className)} role="status" aria-label={`Loading table with ${rows} rows`} {...props}>
      {showHeader && (
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }, (_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      )}
      <div className="space-y-2">
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }, (_, colIndex) => (
              <Skeleton key={colIndex} className="h-8 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Navigation skeleton
 */
export function SkeletonNavigation({ 
  className,
  items = 5,
  orientation = "horizontal",
  ...props 
}: SkeletonVariantProps & { 
  items?: number;
  orientation?: "horizontal" | "vertical";
}) {
  const containerClass = orientation === "horizontal" 
    ? "flex space-x-6" 
    : "space-y-2";

  return (
    <div className={cn(containerClass, className)} role="status" aria-label="Loading navigation" {...props}>
      {Array.from({ length: items }, (_, i) => (
        <Skeleton 
          key={i} 
          className={orientation === "horizontal" ? "h-6 w-16" : "h-8 w-full"}
        />
      ))}
    </div>
  );
}