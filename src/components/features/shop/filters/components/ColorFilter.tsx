"use client"

import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from "@/lib/utils"

export const availableColors = [
  { id: "pink", name: "Pink", hex: "#ec4899" },
  { id: "purple", name: "Purple", hex: "#a855f7" },
  { id: "black", name: "Black", hex: "#000000" },
  { id: "white", name: "White", hex: "#ffffff" },
  { id: "red", name: "Red", hex: "#ef4444" },
  { id: "blue", name: "Blue", hex: "#3b82f6" },
  { id: "green", name: "Green", hex: "#10b981" },
  { id: "yellow", name: "Yellow", hex: "#f59e0b" },
]

interface ColorFilterProps {
  selectedColors: string[]
  onColorToggle: (colorId: string) => void
}

export const ColorFilter = React.memo(function ColorFilter({ selectedColors, onColorToggle }: ColorFilterProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-pink-600" />
        Colors
      </h3>
      <div className="rounded-2xl bg-gray-50 p-6">
        <div className="grid grid-cols-4 gap-3">
          {availableColors.map((color) => {
            const isSelected = selectedColors.includes(color.id)
            return (
              <button
                key={color.id}
                onClick={() => onColorToggle(color.id)}
                aria-label={`${isSelected ? 'Remove' : 'Select'} ${color.name} color filter`}
                aria-pressed={isSelected}
                role="button"
                className={cn(
                  "relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200",
                  "min-h-[80px] touch-manipulation",
                  "focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2",
                  isSelected
                    ? "bg-pink-100 ring-2 ring-pink-400 scale-105"
                    : "hover:bg-gray-100 hover:scale-105 active:scale-95"
                )}
              >
            
              <div 
                className={cn(
                  "h-10 w-10 rounded-full border-2 shadow-sm transition-transform duration-200",
                  color.id === 'white' ? 'border-gray-300' : 'border-transparent',
                  isSelected && "shadow-lg"
                )}
                style={{ 
                  backgroundColor: color.hex,
                  boxShadow: color.id !== 'white' ? `0 2px 8px ${color.hex}40` : undefined
                }}
              />
              {isSelected && (
                <div className="absolute -top-1 -right-1 h-6 w-6 bg-pink-600 rounded-full flex items-center justify-center animate-bounce-in">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </div>
              )}
              <span className="text-xs font-medium text-gray-700">{color.name}</span>
            </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}, (prevProps, nextProps) => {
  return (
    prevProps.selectedColors.length === nextProps.selectedColors.length &&
    prevProps.selectedColors.every(color => nextProps.selectedColors.includes(color))
  )
})