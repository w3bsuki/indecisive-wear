/**
 * Section Header Primitive
 * 🎀 Standardized section header with consistent styling
 */

import React from 'react'
import { cn } from '@/lib/utils'
import { designTokens } from '@/lib/design-system/tokens-2025'
import { Badge } from '@/components/ui/badge'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  badge?: {
    text: string
    icon?: React.ReactNode
    variant?: 'default' | 'success' | 'warning'
  }
  className?: string
  layout?: 'left' | 'center' | 'between'
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  className,
  layout = 'between'
}) => {
  const badgeVariants = {
    default: 'bg-pink-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-orange-500 text-white'
  }

  const layoutClasses = {
    left: 'text-left',
    center: 'text-center',
    between: 'flex items-center justify-between'
  }

  if (layout === 'between') {
    return (
      <div className={cn('flex items-center justify-between mb-4', className)}>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h2>
          {subtitle && (
            <p className={cn('text-base text-muted-foreground', 'mt-1')}>
              {subtitle}
            </p>
          )}
        </div>
        
        {badge && (
          <Badge className={cn(
            badgeVariants[badge.variant || 'default'],
            'border-0 text-xs px-2 py-1'
          )}>
            {badge.icon && <span className="mr-1">{badge.icon}</span>}
            {badge.text}
          </Badge>
        )}
      </div>
    )
  }

  return (
    <div className={cn(layoutClasses[layout], 'mb-4', className)}>
      <h2 className={cn(
        layout === 'center' 
          ? 'text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent'
          : 'text-2xl sm:text-3xl font-bold text-foreground'
      )}>
        {title}
      </h2>
      
      {subtitle && (
        <p className={cn(
          'text-base text-muted-foreground',
          layout === 'center' ? 'max-w-md mx-auto mt-2' : 'mt-1'
        )}>
          {subtitle}
        </p>
      )}
      
      {badge && (
        <div className={cn('mt-3', layout === 'center' && 'flex justify-center')}>
          <Badge className={cn(
            badgeVariants[badge.variant || 'default'],
            'border-0 text-xs px-2 py-1'
          )}>
            {badge.icon && <span className="mr-1">{badge.icon}</span>}
            {badge.text}
          </Badge>
        </div>
      )}
    </div>
  )
}

export default SectionHeader