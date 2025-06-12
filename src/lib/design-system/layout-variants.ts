/**
 * Layout Component Variants using CVA
 * Standardized styling patterns for layout components
 */

import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Container variants for responsive layouts
 */
export const containerVariants = cva(
  "w-full",
  {
    variants: {
      size: {
        sm: "max-w-2xl",    // 672px
        md: "max-w-4xl",    // 896px
        lg: "max-w-6xl",    // 1152px
        xl: "max-w-7xl",    // 1280px
        "2xl": "max-w-[1440px]", // 1440px - better for larger screens
        full: "max-w-none"
      },
      center: {
        true: "mx-auto",
        false: ""
      },
      padding: {
        none: "",
        xs: "px-2",
        sm: "px-4",
        md: "px-6",
        lg: "px-8",
        xl: "px-12"
      }
    },
    defaultVariants: {
      size: "lg",
      center: true,
      padding: "md"
    }
  }
)

/**
 * Stack variants for flex layouts
 */
export const stackVariants = cva(
  "flex",
  {
    variants: {
      direction: {
        vertical: "flex-col",
        horizontal: "flex-row"
      },
      spacing: {
        none: "gap-0",
        xs: "gap-1",
        sm: "gap-2", 
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
        "2xl": "gap-12"
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline"
      },
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly"
      },
      wrap: {
        true: "flex-wrap",
        false: "flex-nowrap"
      }
    },
    defaultVariants: {
      direction: "vertical",
      spacing: "md",
      align: "stretch", 
      justify: "start",
      wrap: false
    }
  }
)

/**
 * Grid variants for grid layouts
 */
export const gridVariants = cva(
  "grid",
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
        12: "grid-cols-12"
      },
      gap: {
        none: "gap-0",
        xs: "gap-1",
        sm: "gap-2",
        md: "gap-4", 
        lg: "gap-6",
        xl: "gap-8"
      },
      responsive: {
        true: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        false: ""
      }
    },
    compoundVariants: [
      {
        cols: 2,
        responsive: true,
        className: "grid-cols-1 md:grid-cols-2"
      },
      {
        cols: 3,
        responsive: true,
        className: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      },
      {
        cols: 4,
        responsive: true,
        className: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      }
    ],
    defaultVariants: {
      cols: 3,
      gap: "md",
      responsive: false
    }
  }
)

// Export types for component props
export type ContainerVariants = VariantProps<typeof containerVariants>
export type StackVariants = VariantProps<typeof stackVariants>
export type GridVariants = VariantProps<typeof gridVariants>