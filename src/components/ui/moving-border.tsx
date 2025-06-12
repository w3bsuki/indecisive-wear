"use client";

import type React from "react";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type ButtonComponent = React.ElementType;
type ButtonProps<C extends ButtonComponent> = {
  borderRadius?: string;
  children: React.ReactNode;
  as?: C;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
} & React.ComponentPropsWithoutRef<C>;

export function Button<C extends ButtonComponent = "button">({
  borderRadius = "1.75rem",
  children,
  as,
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: ButtonProps<C>) {
  const Component = as || "button";
  
  return (
    <Component
      className={cn(
        "group relative overflow-hidden bg-transparent p-[2px]",
        "min-h-[3.5rem] min-w-[200px]",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div 
        className="absolute inset-0 z-0" 
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-[100%] w-[100%] bg-[radial-gradient(var(--pink-500)_40%,transparent_60%)]",
              "opacity-[0.8] blur-sm",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative z-10 flex h-full w-full items-center justify-center",
          "bg-black/90 backdrop-blur-xl",
          "border border-pink-500/20",
          "px-8 py-4",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

interface MovingBorderProps extends React.SVGAttributes<SVGElement> {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: MovingBorderProps) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);
  const [pathLength, setPathLength] = useState<number>(0);
  const [isPathReady, setIsPathReady] = useState<boolean>(false);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      if (length) {
        setPathLength(length);
        setIsPathReady(true);
      }
    }
  }, []);

  useAnimationFrame((time) => {
    if (isPathReady && pathLength > 0) {
      const pxPerMillisecond = pathLength / duration;
      progress.set((time * pxPerMillisecond) % pathLength);
    }
  });

  const x = useTransform(progress, (val) => {
    if (isPathReady && pathRef.current) {
      return pathRef.current.getPointAtLength(val)?.x || 0;
    }
    return 0;
  });

  const y = useTransform(progress, (val) => {
    if (isPathReady && pathRef.current) {
      return pathRef.current.getPointAtLength(val)?.y || 0;
    }
    return 0;
  });

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        aria-hidden="true"
        {...otherProps}
      >
        <rect 
          fill="none" 
          width="100%" 
          height="100%" 
          rx={rx} 
          ry={ry} 
          ref={pathRef}
          strokeWidth="0"
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
