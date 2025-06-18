/**
 * Layout Optimizer Component
 * Reduces layout shifts and improves performance with:
 * - Critical CSS inlining
 * - Font loading optimization
 * - Image aspect ratio preservation
 * - Skeleton states during hydration
 */

"use client"

import { ReactNode, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface LayoutOptimizerProps {
  children: ReactNode
  className?: string
  critical?: boolean
}

export function LayoutOptimizer({ children, className, critical }: LayoutOptimizerProps) {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    // Mark as mounted after hydration
    setIsMounted(true)
    
    // Optimize web fonts loading
    if ('fonts' in document) {
      Promise.all([
        (document as any).fonts.load('400 1em Inter'),
        (document as any).fonts.load('600 1em Inter'),
        (document as any).fonts.load('600 1em Cal Sans'),
      ]).then(() => {
        document.documentElement.classList.add('fonts-loaded')
      })
    }
    
    // Add performance marks
    if (critical && performance.mark) {
      performance.mark('critical-content-loaded')
    }
  }, [critical])
  
  return (
    <div 
      className={cn(
        'layout-optimizer',
        !isMounted && 'is-loading',
        className
      )}
      data-mounted={isMounted}
    >
      {children}
    </div>
  )
}

// Optimized image component to prevent layout shifts
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  ...props
}: {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  [key: string]: any
}) {
  const aspectRatio = (height / width) * 100
  
  return (
    <div 
      className={cn('relative overflow-hidden', className)}
      style={{ paddingBottom: `${aspectRatio}%` }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className="absolute inset-0 w-full h-full object-cover"
        {...props}
      />
    </div>
  )
}

// Layout shift prevention styles
export const layoutOptimizerStyles = `
  /* Prevent layout shifts during font loading */
  .layout-optimizer {
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Reserve space for loading content */
  .layout-optimizer.is-loading {
    min-height: 100vh;
    position: relative;
  }
  
  /* Font loading optimization */
  :root {
    --font-fallback-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
    --font-fallback-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --font-fallback-mono: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  }
  
  /* Prevent FOUC */
  html:not(.fonts-loaded) {
    font-family: var(--font-fallback-sans);
  }
  
  html.fonts-loaded {
    font-family: var(--font-inter), var(--font-fallback-sans);
  }
  
  /* Optimize image rendering */
  img {
    content-visibility: auto;
    contain-intrinsic-size: 300px;
  }
  
  /* Prevent layout shifts from lazy-loaded images */
  img[loading="lazy"] {
    background: linear-gradient(to right, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  
  /* Optimize scrollbar to prevent layout shifts */
  html {
    scrollbar-gutter: stable;
  }
  
  /* Reserve space for fixed elements */
  body {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
  
  /* Optimize rendering for above-the-fold content */
  [data-critical] {
    content-visibility: visible;
    contain: none;
  }
  
  /* Optimize rendering for below-the-fold content */
  [data-below-fold] {
    content-visibility: auto;
    contain-intrinsic-size: 0 500px;
  }
`