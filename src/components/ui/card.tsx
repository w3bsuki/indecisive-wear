import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Card Components
 * 
 * Pink-themed cards with subtle borders and hover effects
 * Following our design system for consistent styling
 */

const cardVariants = cva(
  cn(
    "bg-white text-gray-900 transition-all duration-300",
    "transform-gpu will-change-transform"
  ),
  {
    variants: {
      variant: {
        default: cn(
          "border border-pink-100/50 shadow-sm",
          "hover:shadow-md hover:border-pink-200/50",
          "hover:scale-[1.01]"
        ),
        elevated: cn(
          "shadow-md",
          "hover:shadow-lg hover:scale-[1.02]"
        ),
        outlined: cn(
          "border-2 border-pink-200",
          "hover:border-pink-300 hover:shadow-sm"
        ),
        ghost: cn(
          "hover:bg-pink-50/50",
          "hover:shadow-sm"
        ),
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-lg",
        default: "rounded-xl",
        lg: "rounded-2xl",
      },
      interactive: {
        true: "cursor-pointer",
      },
    },
    defaultVariants: {
      variant: "default",
      rounded: "default",
      interactive: false,
    },
  }
)

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, rounded, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, rounded, interactive }), className)}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div"
  }
>(({ className, as: Comp = "h3", ...props }, ref) => (
  <Comp
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      "font-cal", // Use Cal Sans for headings
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-gray-600", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    noPadding?: boolean
  }
>(({ className, noPadding = false, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      !noPadding && "p-6 pt-0",
      className
    )} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 pt-0",
      "border-t border-pink-100/50", // Add subtle border
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Additional card utilities
const CardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    aspectRatio?: "square" | "video" | "portrait" | "landscape"
  }
>(({ className, aspectRatio = "video", children, ...props }, ref) => {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-gray-100",
        aspectClasses[aspectRatio],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
CardImage.displayName = "CardImage"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardImage,
  cardVariants 
}