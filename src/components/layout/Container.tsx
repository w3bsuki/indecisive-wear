/**
 * Container Component - CVA Standardized
 * 
 * Standardizes responsive container patterns with CVA variants
 * Provides consistent max-width, centering, and padding patterns
 */

import React from 'react'
import { cn } from '@/lib/utils'
import { containerVariants, type ContainerVariants } from '@/lib/design-system/layout-variants'

interface ContainerProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    ContainerVariants {
  /** HTML element to render as */
  as?: React.ElementType
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ 
    children,
    size = 'lg',
    center = true,
    padding = 'md',
    className,
    as: Component = 'div',
    ...props 
  }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          containerVariants({ size, center, padding }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Container.displayName = 'Container' 