/**
 * Form Component Variants using CVA
 * Standardized styling patterns for form inputs and components
 */

import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Base input styling with consistent variants
 */
export const inputVariants = cva(
  [
    // Base styles
    "w-full transition-all duration-200 appearance-none touch-action-manipulation",
    "focus:outline-none focus:ring-2 focus:ring-offset-0",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "placeholder:text-neutral-400"
  ],
  {
    variants: {
      variant: {
        default: [
          "border-neutral-200 bg-white/80 backdrop-blur-sm",
          "focus:border-pink-400 focus-visible:ring-pink-300 focus-visible:ring-opacity-50"
        ],
        filled: [
          "border-transparent bg-neutral-100",
          "focus:border-pink-400 focus:bg-white focus-visible:ring-pink-300"
        ],
        minimal: [
          "border-0 border-b-2 border-neutral-200 bg-transparent rounded-none",
          "focus:border-pink-400 focus-visible:ring-0"
        ]
      },
      size: {
        sm: "h-9 text-sm px-3 py-2 rounded-md",
        md: "h-11 text-base px-4 py-3 rounded-lg",
        lg: "h-14 text-lg px-4 py-4 rounded-lg"
      },
      state: {
        default: "",
        error: "border-red-300 focus:border-red-400 focus-visible:ring-red-300",
        success: "border-green-300 focus:border-green-400 focus-visible:ring-green-300",
        warning: "border-yellow-300 focus:border-yellow-400 focus-visible:ring-yellow-300"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      state: "default"
    }
  }
)

/**
 * Form field wrapper variants
 */
export const formFieldVariants = cva(
  "space-y-2",
  {
    variants: {
      variant: {
        default: "",
        inline: "flex items-center space-y-0 space-x-2",
        stacked: "space-y-1"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

/**
 * Form label variants
 */
export const formLabelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-neutral-700",
        required: "text-neutral-700 after:content-['*'] after:ml-0.5 after:text-red-500",
        optional: "text-neutral-500"
      },
      size: {
        sm: "text-xs",
        md: "text-sm", 
        lg: "text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

/**
 * Error message variants
 */
export const formErrorVariants = cva(
  "text-sm font-medium",
  {
    variants: {
      variant: {
        error: "text-red-600",
        warning: "text-yellow-600",
        info: "text-blue-600"
      }
    },
    defaultVariants: {
      variant: "error"
    }
  }
)

// Export types for component props
export type InputVariants = VariantProps<typeof inputVariants>
export type FormFieldVariants = VariantProps<typeof formFieldVariants>
export type FormLabelVariants = VariantProps<typeof formLabelVariants>
export type FormErrorVariants = VariantProps<typeof formErrorVariants>