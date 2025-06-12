/**
 * Section CTA Primitive
 * 🎀 Standardized call-to-action footer for sections
 */

import React from 'react'
import { cn } from '@/lib/utils'
import { designTokens } from '@/lib/design-system/tokens-2025'
import { Button } from '@/components/ui/button'

interface SectionCTAProps {
  primaryAction?: {
    text: string
    onClick: () => void
    icon?: React.ReactNode
    variant?: 'primary' | 'secondary'
  }
  secondaryText?: string
  className?: string
  layout?: 'between' | 'center'
}

export const SectionCTA: React.FC<SectionCTAProps> = ({
  primaryAction,
  secondaryText,
  className,
  layout = 'between'
}) => {
  if (layout === 'center') {
    return (
      <div className={cn('text-center mt-4 pt-4 border-t border-pink-200/30', className)}>
        {primaryAction && (
          <Button
            onClick={primaryAction.onClick}
            className={cn(
              primaryAction.variant === 'secondary' 
                ? 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                : 'bg-primary text-primary-foreground barbie-gradient',
              'h-12 px-6 text-sm rounded-lg shadow-sm hover:shadow-md flex items-center justify-center gap-2 font-semibold transition-all mx-auto'
            )}
          >
            {primaryAction.icon}
            {primaryAction.text}
          </Button>
        )}
        
        {secondaryText && (
          <p className={cn('text-sm text-muted-foreground', 'mt-2')}>
            {secondaryText}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className={cn('flex items-center justify-between mt-4 pt-4 border-t border-pink-200/30', className)}>
      <p className={cn('text-sm text-muted-foreground')}>
        {secondaryText}
      </p>
      
      {primaryAction && (
        <Button
          onClick={primaryAction.onClick}
          className={cn(
            primaryAction.variant === 'secondary' 
              ? 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              : 'bg-primary text-primary-foreground barbie-gradient',
            'h-10 px-5 text-sm rounded-lg shadow-sm hover:shadow-md flex items-center justify-center gap-2 font-semibold transition-all'
          )}
        >
          {primaryAction.text}
          {primaryAction.icon}
        </Button>
      )}
    </div>
  )
}

export default SectionCTA