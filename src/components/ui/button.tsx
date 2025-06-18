import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Button Component
 * 
 * Pink-themed button following our design system
 * Optimized for mobile with proper touch targets and animations
 */

const buttonVariants = cva(
  cn(
    // Base styles
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    // Mobile optimization
    "touch-manipulation transform-gpu will-change-transform",
    // Icon handling
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
  ),
  {
    variants: {
      variant: {
        default: cn(
          "bg-pink-500 text-white shadow-md",
          "hover:bg-pink-600 hover:shadow-lg",
          "active:bg-pink-700"
        ),
        secondary: cn(
          "bg-pink-100 text-pink-700",
          "hover:bg-pink-200 hover:shadow-md",
          "active:bg-pink-300"
        ),
        outline: cn(
          "border-2 border-pink-200 bg-white text-pink-600",
          "hover:bg-pink-50 hover:border-pink-300",
          "active:bg-pink-100"
        ),
        ghost: cn(
          "text-pink-600",
          "hover:bg-pink-50 hover:text-pink-700",
          "active:bg-pink-100"
        ),
        link: cn(
          "text-pink-600 underline-offset-4",
          "hover:underline hover:text-pink-700",
          "active:text-pink-800"
        ),
        destructive: cn(
          "bg-red-500 text-white shadow-sm",
          "hover:bg-red-600 hover:shadow-md",
          "active:bg-red-700"
        ),
      },
      size: {
        sm: "h-11 rounded-lg px-3 text-sm", // Updated to 44px min for mobile
        default: "h-11 rounded-xl px-4 text-base",
        lg: "h-12 rounded-xl px-6 text-lg",
        xl: "h-14 rounded-xl px-8 text-lg",
        icon: "h-11 w-11 rounded-xl",
        "icon-sm": "h-11 w-11 rounded-lg", // Updated to 44px min for mobile
        "icon-lg": "h-12 w-12 rounded-xl",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp 
        className={cn(buttonVariants({ variant, size, fullWidth, className }))} 
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </Comp>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }