/**
 * Basic Skeleton Components
 * 
 * Common skeleton variants for text, avatars, buttons, images
 * Extracted from the monolithic skeleton.tsx for better organization
 */

import { cn } from "@/lib/utils"
import { Skeleton, type SkeletonProps } from "./SkeletonBase"

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
  }[spacing];

  if (lines === 1) {
    return <Skeleton className={cn("h-4 w-full", className)} {...props} />;
  }

  return (
    <div className={cn("space-y-2", spacingClass)} role="status" aria-label={`Loading ${lines} lines of text`}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 ? "w-3/4" : "w-full", // Last line shorter
            className
          )}
        />
      ))}
    </div>
  );
}

/**
 * Avatar skeleton
 */
export function SkeletonAvatar({ 
  className,
  size = "md",
  ...props 
}: SkeletonVariantProps & { size?: "sm" | "md" | "lg" | "xl" }) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10", 
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  return (
    <Skeleton 
      className={cn("rounded-full", sizeClasses[size], className)} 
      role="status"
      aria-label="Loading avatar"
      {...props} 
    />
  );
}

/**
 * Button skeleton
 */
export function SkeletonButton({ 
  className,
  size = "md",
  variant = "default",
  ...props 
}: SkeletonVariantProps & { 
  size?: "sm" | "md" | "lg"; 
  variant?: "default" | "outline" | "ghost";
}) {
  const sizeClasses = {
    sm: "h-8 px-3",
    md: "h-10 px-4",
    lg: "h-12 px-6"
  };

  return (
    <Skeleton 
      className={cn(
        "rounded-md",
        sizeClasses[size],
        variant === "outline" && "border border-muted-foreground/20",
        className
      )}
      role="status"
      aria-label="Loading button"
      {...props} 
    />
  );
}

/**
 * Button Skeleton - matches button dimensions exactly (legacy support)
 */
export function ButtonSkeleton({ className, size = "default", ...props }: SkeletonProps & { size?: "default" | "sm" | "lg" | "icon" }) {
  const sizeClasses = {
    default: "h-11 w-20",
    sm: "h-10 w-16", 
    lg: "h-12 w-24",
    icon: "h-11 w-11"
  }
  
  return (
    <Skeleton 
      className={cn(
        "rounded-md",
        sizeClasses[size],
        className
      )} 
      {...props} 
    />
  )
}

/**
 * Image Skeleton - prevents layout shift during image loading
 */
export function ImageSkeleton({ 
  className, 
  aspectRatio = "square",
  ...props 
}: SkeletonProps & { 
  aspectRatio?: "square" | "video" | "card" | "portrait" | "landscape" 
}) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video", 
    card: "aspect-card",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]"
  }
  
  return (
    <div className={cn("relative overflow-hidden", aspectClasses[aspectRatio], className)} {...props}>
      <Skeleton className="h-full w-full" />
    </div>
  )
}