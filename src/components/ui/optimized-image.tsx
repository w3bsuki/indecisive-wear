"use client"

import React, { useState, memo } from "react"
import Image, { ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string
  showLoader?: boolean
  loaderClassName?: string
  aspectRatio?: "square" | "portrait" | "landscape" | "auto"
  optimizationLevel?: "low" | "medium" | "high"
}

const OptimizedImageComponent = ({
  src,
  alt,
  fallbackSrc = "/placeholder.jpg",
  showLoader = true,
  loaderClassName,
  aspectRatio = "auto",
  optimizationLevel = "medium",
  className,
  ...props
}: OptimizedImageProps) => {
  const [imageSrc, setImageSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const getQuality = () => {
    switch (optimizationLevel) {
      case "low": return 75
      case "medium": return 85
      case "high": return 90
      default: return 85
    }
  }

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square": return "aspect-square"
      case "portrait": return "aspect-[3/4]"
      case "landscape": return "aspect-[4/3]"
      default: return ""
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc)
    }
  }

  const imageElement = (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      quality={getQuality()}
      onLoad={handleLoad}
      onError={handleError}
      className={cn(
        "transition-all duration-300",
        isLoading && "blur-sm scale-105",
        hasError && "grayscale",
        className
      )}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
    />
  )

  if (aspectRatio === "auto") {
    return (
      <div className="relative">
        {imageElement}
        {showLoader && isLoading && (
          <div className={cn(
            "absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm",
            loaderClassName
          )}>
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", getAspectRatioClass())}>
      {imageElement}
      {showLoader && isLoading && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm",
          loaderClassName
        )}>
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
        </div>
      )}
    </div>
  )
}

export const OptimizedImage = memo(OptimizedImageComponent)