import * as React from "react";
import { cn } from "@/lib/utils";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: number;
  mobileGap?: number;
  className?: string;
  children: React.ReactNode;
  connected?: boolean;
}

interface GridColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  span?: number;
}

export function Grid({
  columns = 1,
  gap = 4,
  mobileGap,
  className,
  children,
  connected = false,
  ...props
}: GridProps) {
  // Create a mapping of grid column configurations with enhanced mobile responsiveness
  const gridColsClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-5",
    6: "grid-cols-2 md:grid-cols-6",
  };
  
  // Get the correct grid columns class
  const gridColsClass = gridColsClasses[columns as keyof typeof gridColsClasses] || "grid-cols-1";
  
  // Enhanced gap configurations with support for fractional values
  const gapClasses = {
    0.5: "gap-0.5",
    1: "gap-1",
    1.5: "gap-1.5",
    2: "gap-2",
    2.5: "gap-2.5",
    3: "gap-3",
    3.5: "gap-3.5",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
  };
  
  // Handle mobile gap if provided, otherwise use the same gap for all screens
  const mobileGapValue = mobileGap !== undefined ? mobileGap : gap;
  
  // Get the mobile gap class
  const mobileGapClass = gapClasses[mobileGapValue as keyof typeof gapClasses] || "gap-4";
  
  // Get the desktop gap class
  const desktopGapClass = gapClasses[gap as keyof typeof gapClasses] || "gap-4";
  
  // Combine into responsive gap class
  const responsiveGapClass = mobileGap !== undefined 
    ? `${mobileGapClass} md:${desktopGapClass}`
    : desktopGapClass;

  return (
    <div
      className={cn(
        "relative grid w-full",
        gridColsClass,
        responsiveGapClass,
        connected && "grid-connected",
        className
      )}
      {...props}
    >
      {connected && columns > 1 && (
        <div className="absolute inset-0 z-0">
          {/* Mobile dividers - enhanced for clarity */}
          <div
            className="absolute top-0 bottom-0 border-r border-pink-500/10 md:hidden"
            style={{
              left: "calc(50% - 0.5px)",
              width: "1px",
            }}
          />
          
          {/* Desktop dividers based on column count */}
          {Array.from({ length: columns - 1 }).map((_, i) => (
            <div
              key={`grid-divider-column-${(i + 1)}-of-${columns}`}
              className={cn(
                "absolute top-0 bottom-0 border-r border-pink-500/10",
                columns <= 2 ? "block" : "hidden md:block" // Hide on mobile if more than 2 columns
              )}
              style={{
                left: `calc(${((i + 1) / columns) * 100}% - 0.5px)`,
                width: "1px",
              }}
            />
          ))}
        </div>
      )}
      {children}
    </div>
  );
}

export function GridColumn({
  className,
  children,
  span = 1,
  ...props
}: GridColumnProps) {
  // Enhanced span configurations for better mobile layout
  const spanClasses = {
    1: "",
    2: "col-span-2",
    3: "col-span-2 md:col-span-3",
    4: "col-span-2 md:col-span-4",
    5: "col-span-2 md:col-span-5",
    6: "col-span-2 md:col-span-6",
    full: "col-span-full",
  };
  
  // Get the correct span class
  const spanClass = span > 1 ? spanClasses[span as keyof typeof spanClasses] || "" : "";

  return (
    <div
      className={cn(
        "relative z-10",
        spanClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 