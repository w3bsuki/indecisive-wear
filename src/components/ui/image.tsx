"use client"

import Image from 'next/image'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { Skeleton } from '../ui/skeleton'

interface OptimizedImageProps extends Omit<React.ComponentProps<typeof Image>, 'onLoad' | 'onError'> {
  containerClassName?: string;
  aspectRatio?: number;
  showSkeleton?: boolean;
  priority?: boolean;
  quality?: number;
  onLoadComplete?: () => void;
  onError?: () => void;
}

/**
 * Optimized Image component for Core Web Vitals
 * 
 * Features:
 * - Prevents Cumulative Layout Shift (CLS)
 * - Progressive loading with skeleton
 * - Aspect ratio preservation
 * - WebP/AVIF format optimization
 * - Lazy loading by default
 */
export function OptimizedImage({
  src,
  alt,
  containerClassName,
  className,
  aspectRatio,
  showSkeleton = true,
  priority = false,
  quality = 85,
  onLoadComplete,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoadComplete?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  // Calculate aspect ratio for container
  const aspectRatioStyle = aspectRatio 
    ? { '--aspect-ratio': `${(1 / aspectRatio) * 100}%` } as React.CSSProperties
    : undefined;

  return (
    <div 
      className={cn(
        "image-container relative overflow-hidden",
        containerClassName
      )}
      style={aspectRatioStyle}
    >
      {/* Skeleton loading state */}
      {isLoading && showSkeleton && (
        <div className="absolute inset-0 z-10">
          <Skeleton className="w-full h-full" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <div className="text-center">
            <div className="text-sm">Failed to load image</div>
            <div className="text-xs mt-1">{alt}</div>
          </div>
        </div>
      )}

      {/* Optimized Next.js Image */}
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          className={cn(
            "transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
          fill
          priority={priority}
          quality={quality}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </div>
  );
}

// Product image variant with specific optimizations
export function ProductImage({
  src,
  alt,
  aspectRatio = 1, // Square by default for products
  priority = false,
  ...props
}: OptimizedImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      aspectRatio={aspectRatio}
      priority={priority}
      quality={90} // Higher quality for product images
      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
      {...props}
    />
  );
}

// Hero image variant with maximum optimization
export function HeroImage({
  src,
  alt,
  aspectRatio = 16/9,
  priority = true, // Heroes are usually above the fold
  ...props
}: OptimizedImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      aspectRatio={aspectRatio}
      priority={priority}
      quality={95} // Highest quality for hero images
      sizes="100vw" // Full width
      {...props}
    />
  );
}

// Avatar image variant
export function AvatarImage({
  src,
  alt,
  size = 40,
  ...props
}: Omit<OptimizedImageProps, 'aspectRatio'> & { size?: number }) {
  return (
    <div className={`relative w-${size} h-${size} rounded-full overflow-hidden`}>
      <OptimizedImage
        src={src}
        alt={alt}
        aspectRatio={1} // Always square
        quality={80}
        sizes={`${size}px`}
        {...props}
      />
    </div>
  );
}

export { OptimizedImage as Image } 