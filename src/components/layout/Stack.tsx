/**
 * Stack Component - CVA Standardized
 * 
 * Provides consistent spacing for vertical and horizontal layouts
 * Uses CVA variants for type-safe flex patterns
 */

import React from 'react'
import { cn } from '@/lib/utils'
import { stackVariants, type StackVariants } from '@/lib/design-system/layout-variants'

interface StackProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    StackVariants {
  /** HTML element to render as */
  as?: React.ElementType
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ 
    children,
    direction = 'vertical',
    spacing = 'md',
    align = 'stretch',
    justify = 'start',
    wrap = false,
    className,
    as: Component = 'div',
    ...props 
  }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          stackVariants({ direction, spacing, align, justify, wrap }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Stack.displayName = 'Stack' 