/**
 * Grid Component - CVA Standardized
 * 
 * Flexible grid system with CVA variants for consistent layouts
 * Supports responsive column counts and standardized gap spacing
 */

import React from 'react'
import { cn } from '@/lib/utils'
import { gridVariants, type GridVariants } from '@/lib/design-system/layout-variants'

// Types for responsive column configuration  
type ColsConfig = {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

interface GridProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<GridVariants, 'cols'> {
  /** Column configuration - number or responsive object */
  cols?: number | ColsConfig
  /** HTML element to render as */
  as?: React.ElementType
}

const getResponsiveColumnClasses = (cols: GridProps['cols']) => {
  if (typeof cols === 'number') {
    return undefined // Let CVA handle simple number columns
  }

  if (!cols) return undefined

  const classes = []
  
  if (cols.xs) {
    const colsMap = {
      1: 'grid-cols-1',
      2: 'grid-cols-2', 
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      12: 'grid-cols-12',
    }
    classes.push(colsMap[cols.xs as keyof typeof colsMap])
  }

  if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`)
  if (cols.md) classes.push(`md:grid-cols-${cols.md}`)
  if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`)
  if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`)

  return classes.join(' ')
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ 
    children,
    cols = 1,
    gap = 'md',
    responsive = false,
    className,
    as: Component = 'div',
    ...props 
  }, ref) => {
    // Handle responsive column configurations
    const responsiveClasses = typeof cols === 'object' ? getResponsiveColumnClasses(cols) : undefined
    const normalizedCols = (typeof cols === 'number' ? cols : 1) as 1 | 2 | 3 | 4 | 5 | 6 | 12

    return (
      <Component
        ref={ref}
        className={cn(
          gridVariants({ 
            cols: responsiveClasses ? undefined : normalizedCols, 
            gap, 
            responsive 
          }),
          responsiveClasses,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Grid.displayName = 'Grid'

/**
 * Enhanced responsive grid utilities with xs breakpoint
 */
export const gridUtils = {
  // Product grids with xs breakpoint support
  products: {
    mobile: 'grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    cards: 'grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    compact: 'grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6',
  },
  
  // Content grids
  content: {
    simple: 'grid-cols-1 md:grid-cols-2',
    triple: 'grid-cols-1 xs:grid-cols-2 lg:grid-cols-3',
    quad: 'grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  },
  
  // Navigation grids
  navigation: {
    tabs: 'grid-cols-2 xs:grid-cols-3 sm:grid-cols-4',
    actions: 'grid-cols-3 xs:grid-cols-4 sm:grid-cols-5',
  }
};

export default Grid; 