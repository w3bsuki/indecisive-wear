/**
 * Chart Skeleton Components
 * 
 * Chart and graph skeleton components for data visualization
 * Extracted from the monolithic skeleton.tsx for better organization
 */

import { cn } from "@/lib/utils"
import { Skeleton } from "./SkeletonBase"

interface SkeletonVariantProps {
  className?: string;
}

/**
 * Chart/Graph skeleton
 */
export function SkeletonChart({ 
  className,
  type = "bar",
  ...props 
}: SkeletonVariantProps & { 
  type?: "bar" | "line" | "pie";
}) {
  if (type === "pie") {
    return (
      <div className={cn("flex items-center justify-center", className)} role="status" aria-label="Loading chart" {...props}>
        <Skeleton className="h-48 w-48 rounded-full" />
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)} role="status" aria-label="Loading chart" {...props}>
      <div className="flex items-end justify-between h-48 space-x-2">
        {Array.from({ length: 7 }, (_, i) => (
          <Skeleton 
            key={i} 
            className="w-8 rounded-t"
            style={{ height: `${Math.random() * 60 + 40}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between">
        {Array.from({ length: 7 }, (_, i) => (
          <Skeleton key={i} className="h-3 w-8" />
        ))}
      </div>
    </div>
  );
}