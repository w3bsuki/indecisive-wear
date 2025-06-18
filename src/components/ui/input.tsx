import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Input Component
 * 
 * Pink-themed input with focus states
 * Optimized for mobile with proper touch targets
 */

const inputVariants = cva(
  cn(
    "flex w-full bg-white text-gray-900",
    "font-normal transition-all duration-200 ease-out",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "placeholder:text-gray-400",
    "focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    // Mobile optimizations
    "touch-manipulation",
    "text-[16px]", // Prevent iOS zoom
  ),
  {
    variants: {
      variant: {
        default: cn(
          "border-2 border-gray-200",
          "hover:border-gray-300",
          "focus:border-pink-400 focus-visible:border-pink-400",
        ),
        filled: cn(
          "bg-pink-50 border-2 border-transparent",
          "hover:bg-pink-100",
          "focus:border-pink-400 focus:bg-white",
        ),
        underline: cn(
          "border-0 border-b-2 border-gray-200 rounded-none px-0",
          "hover:border-gray-300",
          "focus:border-pink-400",
        ),
        ghost: cn(
          "border-2 border-transparent",
          "hover:bg-pink-50",
          "focus:border-pink-200 focus:bg-pink-50",
        ),
      },
      size: {
        sm: "h-11 rounded-md px-3 text-sm", // Updated to 44px min for mobile
        default: "h-11 rounded-lg px-3",
        lg: "h-12 rounded-xl px-4 text-lg",
        xl: "h-14 rounded-xl px-4 text-lg",
      },
      state: {
        default: "",
        error: cn(
          "border-red-300 text-red-900",
          "hover:border-red-400",
          "focus:border-red-500 focus-visible:border-red-500",
        ),
        success: cn(
          "border-green-300 text-green-900",
          "hover:border-green-400", 
          "focus:border-green-500 focus-visible:border-green-500",
        ),
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
      fullWidth: true,
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, state, fullWidth, icon, iconPosition = "left", ...props }, ref) => {
    const inputElement = (
      <input
        type={type}
        className={cn(
          inputVariants({ variant, size, state, fullWidth }),
          icon && iconPosition === "left" && "pl-10",
          icon && iconPosition === "right" && "pr-10",
          className
        )}
        ref={ref}
        style={{ fontSize: '16px', ...props.style }} // Ensure no zoom on mobile
        {...props}
      />
    )

    if (!icon) {
      return inputElement
    }

    return (
      <div className="relative">
        {icon && (
          <div className={cn(
            "absolute top-1/2 -translate-y-1/2 text-gray-400",
            "pointer-events-none",
            "[&_svg]:h-5 [&_svg]:w-5",
            iconPosition === "left" ? "left-3" : "right-3"
          )}>
            {icon}
          </div>
        )}
        {inputElement}
      </div>
    )
  }
)
Input.displayName = "Input"

// Additional input utilities
export const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
))
InputGroup.displayName = "InputGroup"

export const InputAddon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    position?: "left" | "right"
  }
>(({ className, position = "left", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center px-3 py-2",
      "bg-pink-50 text-gray-600",
      "border-2 border-gray-200",
      "text-sm font-medium",
      position === "left" && "rounded-l-lg border-r-0",
      position === "right" && "rounded-r-lg border-l-0",
      className
    )}
    {...props}
  />
))
InputAddon.displayName = "InputAddon"

export { Input, inputVariants }