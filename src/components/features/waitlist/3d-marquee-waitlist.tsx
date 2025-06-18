"use client"

import type React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const ThreeDMarqueeWaitlist = ({
  images,
  className,
}: {
  images: string[]
  className?: string
}) => {
  // Triple the images for a fuller grid
  const doubledImages = [...images, ...images, ...images]
  
  // Split the images array into 4 equal parts for perfect grid
  const chunkSize = Math.ceil(doubledImages.length / 4)
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize
    return doubledImages.slice(start, start + chunkSize)
  })
  
  return (
    <div className={cn("w-full h-full overflow-hidden", className)}>
      <div className="w-full h-full flex items-center justify-center">
        {/* Larger size for full viewport coverage on all devices */}
        <div className="w-[200%] h-[200%] sm:w-[150%] sm:h-[150%] relative">
          {/* Responsive grid - 2 columns on mobile, 4 on larger screens */}
          <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-2 sm:p-3">
            {chunks.map((subarray, colIndex) => {
              const columnId = `marquee-col-${colIndex}`
              
              return (
                <motion.div
                  animate={{ 
                    y: colIndex % 2 === 0 ? [0, -100, 0] : [0, 100, 0] 
                  }}
                  transition={{
                    duration: 25,
                    ease: "linear",
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop"
                  }}
                  key={columnId}
                  className="flex flex-col gap-2 sm:gap-3"
                >
                  {subarray.map((image, imageIndex) => {
                    const hatId = image.split('/').pop()?.replace('.png', '') || `hat-${imageIndex}`
                    
                    return (
                      <motion.div 
                        className="aspect-square bg-white rounded-lg shadow-lg border-2 border-pink-200" 
                        key={`hat-${hatId}`}
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <div className="w-full h-full flex items-center justify-center p-2 relative">
                          <Image
                            src={image}
                            alt="Hat design"
                            className="object-contain"
                            fill
                            sizes="(max-width: 640px) 50vw, 25vw"
                            priority={imageIndex < 4}
                          />
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
} 