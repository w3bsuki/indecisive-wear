import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * 2025 Component Variant System
 * Using CSS variables and semantic tokens
 */

// Button variants (2025 style)
export const buttonVariants2025 = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-[44px] min-w-[44px]",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        brand: "bg-gradient-to-r from-barbie-pink to-barbie-pink/80 text-barbie-pink-foreground hover:scale-105 shadow-lg shadow-barbie-pink/25",
        glass: "glass-morphism text-foreground hover:backdrop-blur-3xl",
      },
      size: {
        sm: "h-11 px-3 text-sm rounded-md", // 44px minimum touch target
        md: "h-11 px-4 py-2 rounded-md", // 44px minimum touch target
        lg: "h-11 px-8 rounded-md", // 44px minimum touch target
        xl: "h-12 px-10 rounded-lg", // 48px comfortable touch target
        icon: "h-11 w-11 rounded-md", // 44px minimum touch target
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

// Card variants (glass morphism focused)
export const cardVariants2025 = cva(
  "overflow-hidden transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-card border border-border shadow-sm",
        glass: "glass-morphism",
        elevated: "bg-card shadow-lg border-0",
        brand: "bg-gradient-to-br from-card via-barbie-pink/5 to-card border border-barbie-pink/20 shadow-lg shadow-barbie-pink/10",
      },
      size: {
        sm: "p-4 rounded-md",
        md: "p-6 rounded-lg", 
        lg: "p-8 rounded-xl",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-1 hover:shadow-xl",
        scale: "hover:scale-[1.02]",
        glow: "hover:shadow-barbie-pink/20 hover:shadow-2xl",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      hover: "none",
    },
  }
)

// Input variants (with better touch targets)
export const inputVariants2025 = cva(
  "flex w-full bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      size: {
        sm: "h-11 rounded-sm text-xs px-3", // 44px minimum touch target
        md: "h-11 rounded-md px-3", // 44px minimum touch target
        lg: "h-12 rounded-lg text-base px-4", // 48px for comfortable touch
      },
      variant: {
        default: "border border-input",
        ghost: "border-0 bg-transparent",
        filled: "border-0 bg-muted",
        glass: "glass-morphism border-0",
      },
      state: {
        default: "",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-green-500 focus-visible:ring-green-500",
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default", 
      state: "default",
    },
  }
)

// Section variants (with proper spacing)
export const sectionVariants2025 = cva(
  "w-full",
  {
    variants: {
      spacing: {
        none: "py-0",
        sm: "py-8 sm:py-12",
        md: "py-12 sm:py-16 md:py-20", 
        lg: "py-16 sm:py-20 md:py-24",
        xl: "py-20 sm:py-24 md:py-32",
      },
      container: {
        none: "",
        default: "container mx-auto px-4 sm:px-6 lg:px-8",
        wide: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        narrow: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
      },
      background: {
        none: "",
        subtle: "bg-muted/30",
        strong: "bg-muted",
        gradient: "bg-gradient-to-br from-background via-muted/10 to-background",
        barbie: "bg-gradient-to-br from-barbie-pink/5 via-background to-background",
      }
    },
    defaultVariants: {
      spacing: "md",
      container: "default", 
      background: "none",
    },
  }
)

// Export types
export type ButtonVariants2025 = VariantProps<typeof buttonVariants2025>
export type CardVariants2025 = VariantProps<typeof cardVariants2025>
export type InputVariants2025 = VariantProps<typeof inputVariants2025>
export type SectionVariants2025 = VariantProps<typeof sectionVariants2025>