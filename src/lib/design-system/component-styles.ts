/**
 * Component Style Utilities
 * 
 * Reusable style compositions following our design system
 * Ensures consistency across all components
 */

import { cva, type VariantProps } from 'class-variance-authority'
import { tokens } from './tokens'

// Button variants following our pink theme
export const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-manipulation',
  {
    variants: {
      variant: {
        default: 'bg-pink-500 text-white shadow-md hover:bg-pink-600 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]',
        secondary: 'bg-pink-100 text-pink-700 hover:bg-pink-200 hover:shadow-md',
        outline: 'border-2 border-pink-200 bg-white text-pink-600 hover:bg-pink-50 hover:border-pink-300',
        ghost: 'text-pink-600 hover:bg-pink-50 hover:text-pink-700',
        link: 'text-pink-600 underline-offset-4 hover:underline hover:text-pink-700',
      },
      size: {
        sm: 'h-9 rounded-lg px-3 text-sm',
        default: 'h-11 rounded-xl px-4',
        lg: 'h-12 rounded-xl px-6 text-lg',
        icon: 'h-11 w-11 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// Card variants with subtle pink borders
export const cardVariants = cva(
  'overflow-hidden bg-white transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'border border-pink-100/50 shadow-sm hover:shadow-md hover:border-pink-200/50',
        elevated: 'shadow-md hover:shadow-lg hover:scale-[1.01]',
        outlined: 'border-2 border-pink-200 hover:border-pink-300',
        ghost: 'hover:bg-pink-50/50',
      },
      padding: {
        none: '',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-lg',
        default: 'rounded-xl',
        lg: 'rounded-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'default',
      rounded: 'default',
    },
  }
)

// Input variants with pink focus states
export const inputVariants = cva(
  'flex w-full bg-white px-3 py-2 text-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-2 border-gray-200 focus:border-pink-400 hover:border-gray-300',
        filled: 'bg-pink-50 border-2 border-transparent focus:border-pink-400 hover:bg-pink-100',
        underline: 'border-0 border-b-2 border-gray-200 focus:border-pink-400 rounded-none px-0',
      },
      size: {
        sm: 'h-9 rounded-md text-sm',
        default: 'h-11 rounded-lg',
        lg: 'h-12 rounded-xl text-lg',
      },
      state: {
        default: '',
        error: 'border-red-300 focus:border-red-400',
        success: 'border-green-300 focus:border-green-400',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'default',
    },
  }
)

// Badge variants
export const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-pink-100 text-pink-700',
        secondary: 'bg-gray-100 text-gray-700',
        destructive: 'bg-red-100 text-red-700',
        success: 'bg-green-100 text-green-700',
        outline: 'border border-pink-200 text-pink-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

// Container styles
export const containerStyles = {
  base: 'mx-auto w-full',
  padded: 'mx-auto w-full px-4 md:px-6 lg:px-8',
  narrow: 'mx-auto w-full max-w-4xl',
  wide: 'mx-auto w-full max-w-7xl',
  full: 'w-full',
}

// Section styles
export const sectionStyles = {
  spacing: {
    sm: 'py-8 md:py-12',
    default: 'py-12 md:py-16 lg:py-24',
    lg: 'py-16 md:py-24 lg:py-32',
  },
  background: {
    white: 'bg-white',
    pink: 'bg-gradient-to-br from-pink-50 to-white',
    gray: 'bg-gray-50',
  },
}

// Flex layout utilities
export const flexStyles = {
  center: 'flex items-center justify-center',
  between: 'flex items-center justify-between',
  start: 'flex items-center justify-start',
  end: 'flex items-center justify-end',
  col: 'flex flex-col',
  colCenter: 'flex flex-col items-center',
  wrap: 'flex flex-wrap',
}

// Grid layout utilities
export const gridStyles = {
  cols: {
    1: 'grid grid-cols-1',
    2: 'grid grid-cols-1 md:grid-cols-2',
    3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  },
  gap: {
    sm: 'gap-4',
    default: 'gap-6',
    lg: 'gap-8',
  },
}

// Text styles
export const textStyles = {
  heading: {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-cal font-bold tracking-tight',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-cal font-bold tracking-tight',
    h3: 'text-2xl md:text-3xl lg:text-4xl font-cal font-semibold',
    h4: 'text-xl md:text-2xl lg:text-3xl font-semibold',
    h5: 'text-lg md:text-xl lg:text-2xl font-semibold',
    h6: 'text-base md:text-lg lg:text-xl font-semibold',
  },
  body: {
    sm: 'text-sm text-gray-600',
    default: 'text-base text-gray-700',
    lg: 'text-lg text-gray-700',
  },
  gradient: 'bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent',
}

// Animation classes
export const animationStyles = {
  fadeIn: 'animate-fade-in',
  slideIn: 'animate-slide-in',
  scaleIn: 'animate-scale-in',
  spin: 'animate-spin',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
}

// Mobile-specific styles
export const mobileStyles = {
  touchTarget: 'min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0',
  safeArea: {
    top: 'pt-safe',
    bottom: 'pb-safe',
    x: 'px-safe',
    y: 'py-safe',
  },
  hideOnMobile: 'hidden md:block',
  showOnMobile: 'block md:hidden',
}

// Focus styles
export const focusStyles = {
  ring: 'focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2',
  within: 'focus-within:ring-2 focus-within:ring-pink-400 focus-within:ring-offset-2',
  visible: 'focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2',
}

// Hover states
export const hoverStyles = {
  opacity: 'hover:opacity-80',
  scale: 'hover:scale-105',
  shadow: 'hover:shadow-lg',
  bg: 'hover:bg-pink-50',
  text: 'hover:text-pink-600',
}

// Export type helpers
export type ButtonProps = VariantProps<typeof buttonVariants>
export type CardProps = VariantProps<typeof cardVariants>
export type InputProps = VariantProps<typeof inputVariants>
export type BadgeProps = VariantProps<typeof badgeVariants>