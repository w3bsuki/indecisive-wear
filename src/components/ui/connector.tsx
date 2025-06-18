import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ConnectorProps {
  className?: string;
  count?: number;
  activeIndex?: number;
  color?: string;
  height?: string;
  animate?: boolean;
  spotlight?: boolean;
  variant?: "simple" | "dotted" | "dashed" | "none";
}

export function MarqueeConnector({
  className,
  count = 3,
  activeIndex = -1,
  color = "pink-500/10",
  height = "3rem",
  animate = true,
  spotlight = false,
  variant = "simple",
}: ConnectorProps) {
  return (
    <div 
      className={cn(
        "w-full flex justify-around items-center overflow-hidden relative", 
        className
      )}
    >
      {spotlight && (
        <div className="absolute inset-0 flex justify-center items-center opacity-20 z-0 pointer-events-none">
          <div className="w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full filter blur-3xl" />
        </div>
      )}
      
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={`connector-${i}-${color}`}
          className={cn(
            "relative flex flex-col items-center z-10",
            animate && "transition-all duration-500"
          )}
        >
          <div 
            className={cn(
              variant !== "none" && "border-l",
              variant === "dotted" && "border-dotted",
              variant === "dashed" && "border-dashed",
              variant !== "none" && `border-${color}`,
              animate && "transition-all duration-500",
              activeIndex === i && variant !== "none" && `border-${color.split('/')[0]}`
            )} 
            style={{ height }}
          />
          {animate && (
            <motion.div 
              animate={activeIndex === i ? 
                { scale: [1, 1.2, 1] } : 
                { scale: 1 }
              }
              transition={{ 
                repeat: activeIndex === i ? Number.POSITIVE_INFINITY : 0, 
                duration: 2 
              }}
              className={cn(
                "w-1.5 h-1.5 rounded-full bg-pink-500/20",
                activeIndex === i && "bg-pink-500/70 w-2 h-2"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function VerticalConnector({
  height = "8rem",
  color = "pink-500/20",
  dotColor = "pink-500/40",
  spotlight = false,
  className,
  noBorder = false,
}: {
  height?: string;
  color?: string;
  dotColor?: string;
  spotlight?: boolean;
  className?: string;
  noBorder?: boolean;
}) {
  return (
    <div className={cn("flex flex-col items-center relative", className)}>
      {spotlight && (
        <div className="absolute inset-0 flex justify-center items-center opacity-10">
          <div className="w-16 h-32 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full filter blur-3xl" />
        </div>
      )}
      
      <div className={cn(!noBorder && "border-l", !noBorder && `border-${color}`)} style={{ height }} />
      <div className={cn("h-2 w-2 rounded-full", `bg-${dotColor}`)} />
    </div>
  );
} 