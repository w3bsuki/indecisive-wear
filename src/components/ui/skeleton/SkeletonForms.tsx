/**
 * Form Skeleton Components
 * 
 * Form-specific skeleton components for inputs, fields, and complete forms
 * Extracted from the monolithic skeleton.tsx for better organization
 */

import { cn } from "@/lib/utils"
import { Skeleton, type SkeletonProps } from "./SkeletonBase"
import { SkeletonButton } from "./SkeletonComponents"

interface SkeletonVariantProps {
  className?: string;
}

/**
 * Form Field Skeleton - matches form input dimensions
 */
export function FormFieldSkeleton({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      <Skeleton className="h-4 w-20" /> {/* Label */}
      <Skeleton className="h-11 w-full rounded-md" /> {/* Input */}
    </div>
  )
}

/**
 * Form skeleton
 */
export function SkeletonForm({ 
  className,
  fields = 3,
  showButton = true,
  ...props 
}: SkeletonVariantProps & { 
  fields?: number;
  showButton?: boolean;
}) {
  return (
    <div className={cn("space-y-4", className)} role="status" aria-label={`Loading form with ${fields} fields`} {...props}>
      {Array.from({ length: fields }, (_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-1/4" /> {/* Label */}
          <Skeleton className="h-10 w-full" />  {/* Input */}
        </div>
      ))}
      {showButton && (
        <SkeletonButton className="w-full" />
      )}
    </div>
  );
}