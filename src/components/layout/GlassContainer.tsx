/**
 * Glass Container Primitive
 * 🎀 Standardized container with glass morphism effect
 * Based on the excellent pattern from FeaturedProducts
 */

import React from 'react'
import { cn } from '@/lib/utils'
import { designTokens } from '@/lib/design-system/tokens-2025'

interface GlassContainerProps {
  children: React.ReactNode
  className?: string
  contentClassName?: string
  withBackground?: boolean
  variant?: 'default' | 'compact' | 'large'
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  className,
  contentClassName,
  withBackground = true,
  variant = 'default'
}) => {
  const paddingMap = {
    default: 'p-6',
    compact: 'p-4',
    large: 'p-8'
  }

  return (
    <div className={cn('relative', className)}>
      {withBackground && (
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-pink-50/20 pointer-events-none rounded-2xl" />
      )}
      <div className={cn(
        'glass-morphism',
        paddingMap[variant],
        contentClassName
      )}>
        {children}
      </div>
    </div>
  )
}

export default GlassContainer