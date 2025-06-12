"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMobileOptimizations } from "@/hooks/ui/useMobileOptimizations"

export const ThreeDMarquee = ({
  images,
  className,
}: {
  images: string[]
  className?: string
}) => {
  const { isMobile } = useMobileOptimizations();
  
  // Split the images array into 4 equal parts
  const chunkSize = Math.ceil(images.length / 4)
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize
    return images.slice(start, start + chunkSize)
  })
  
  return (
    <div
      className={cn("mx-auto flex h-full w-full items-center justify-center overflow-hidden", className)}
    >
      <div className="flex size-full items-center justify-center">
        <div className={cn(
          "size-[1600px] shrink-0",
          isMobile ? "scale-[0.5]" : "scale-50 sm:scale-75 lg:scale-90" // Better mobile scaling
        )}>
          <div
            style={{
              transform: isMobile 
                ? "rotateX(5deg) rotateY(0deg) rotateZ(0deg)" // Less rotation for mobile
                : "rotateX(10deg) rotateY(0deg) rotateZ(0deg)",
            }}
            className={cn(
              "relative mx-auto grid size-full origin-center grid-cols-4 gap-8 transform-3d",
              isMobile ? "top-24" : "top-32" // Better vertical position for mobile
            )}
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ 
                  // Use horizontal movement for mobile, vertical for desktop
                  x: isMobile ? (colIndex % 2 === 0 ? 50 : -50) : 0,
                  y: !isMobile ? (colIndex % 2 === 0 ? 40 : -40) : 0,
                }}
                initial={{ 
                  x: isMobile ? (colIndex % 2 === 0 ? -50 : 50) : 0,
                  y: !isMobile ? (colIndex % 2 === 0 ? -40 : 40) : 0 
                }}
                transition={{
                  duration: isMobile ? (colIndex % 2 === 0 ? 6 : 8) : (colIndex % 2 === 0 ? 8 : 10), // Faster animation on mobile for horizontal
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                key={`marquee-column-${colIndex}-${subarray[0]}`}
                className="flex flex-col items-center gap-6 sm:gap-8"
              >
                <GridLineVertical className="-left-4" offset="80px" />
                {subarray.map((image, imageIndex) => {
                  // Extract imageName, handling query parameters and path separators
                  const parts = image.split('?');
                  const cleanPath = parts[0] || image; // Remove query parameters
                  const pathParts = cleanPath.split('/');
                  const filename = pathParts[pathParts.length - 1] || cleanPath;
                  const imageName = filename.replace(/\.[^/.]+$/, "");
                  // Create a truly unique key using column index, image index and image name
                  const uniqueKey = `image-${imageName}-col${colIndex}-idx${imageIndex}`;
                  
                  return (
                    <div className="relative" key={uniqueKey}>
                      <GridLineHorizontal className="-top-4" offset="20px" />
                      <motion.img
                        whileHover={{
                          y: -10,
                          scale: 1.1,
                          zIndex: 50,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                        }}
                        src={image}
                        alt={`Indecisive Wear Hat - ${imageName}`}
                        className="aspect-square rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl"
                        width={400}
                        height={400}
                        loading="lazy"
                        style={{
                          transformStyle: "preserve-3d",
                          transform: "translateZ(50px)", // Brings images more forward
                        }}
                      />
                    </div>
                  )
                })}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string
  offset?: string
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    />
  )
}

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string
  offset?: string
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    />
  )
}
