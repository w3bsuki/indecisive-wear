"use client"

import * as React from 'react'
import { cn } from "@/lib/utils"

export const availableSizes = [
  { id: "xs", name: "XS", description: "Extra Small" },
  { id: "s", name: "S", description: "Small" },
  { id: "m", name: "M", description: "Medium" },
  { id: "l", name: "L", description: "Large" },
  { id: "xl", name: "XL", description: "Extra Large" },
  { id: "xxl", name: "XXL", description: "2X Large" },
]

interface SizeFilterProps {
  selectedSizes: string[]
  onSizeToggle: (sizeId: string) => void
}

export const SizeFilter = React.memo(function SizeFilter({ selectedSizes, onSizeToggle }: SizeFilterProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-pink-600" />
        Sizes
      </h3>
      <div className="rounded-2xl bg-gray-50 p-6">
        <div className="grid grid-cols-3 gap-3">
          {availableSizes.map((size) => {
            const isSelected = selectedSizes.includes(size.id)
            return (
              <button
                key={size.id}
                onClick={() => onSizeToggle(size.id)}
                aria-label={`${isSelected ? 'Remove' : 'Select'} size ${size.name} (${size.description})`}
                aria-pressed={isSelected}
                role="button"
                className={cn(
                  "relative p-4 rounded-xl border-2 font-bold text-center transition-all duration-200",
                  "min-h-[72px] touch-manipulation",
                  "focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2",
                  isSelected
                    ? "bg-gradient-to-br from-pink-500 to-pink-600 text-white border-pink-600 shadow-lg scale-105"
                    : "bg-white border-gray-200 text-gray-700 hover:border-pink-300 hover:bg-pink-50 hover:scale-105 active:scale-95"
                )}
              >
            
              <div className="text-lg leading-tight">{size.name}</div>
              <div className={cn(
                "text-xs mt-1 transition-opacity duration-200",
                isSelected ? "opacity-90" : "opacity-60"
              )}>{size.description}</div>
            </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}, (prevProps, nextProps) => {
  return (
    prevProps.selectedSizes.length === nextProps.selectedSizes.length &&
    prevProps.selectedSizes.every(size => nextProps.selectedSizes.includes(size))
  )
})