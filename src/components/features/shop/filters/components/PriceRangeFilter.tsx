"use client"

import * as React from 'react'
import { Slider } from "@/components/ui/slider"

interface PriceRangeFilterProps {
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
}

export const PriceRangeFilter = React.memo(function PriceRangeFilter({ priceRange, onPriceRangeChange }: PriceRangeFilterProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-pink-600" />
        Price Range
      </h3>
      <div className="rounded-2xl bg-gray-50 p-6">
        <Slider
          value={priceRange}
          onValueChange={(value) => onPriceRangeChange(value as [number, number])}
          max={100}
          min={0}
          step={5}
          className="w-full"
        />
        <div className="mt-4 flex justify-between items-center">
          <div className="bg-pink-600 text-white px-4 py-2 rounded-xl font-bold">
            ${priceRange[0]}
          </div>
          <span className="text-gray-500 font-medium">to</span>
          <div className="bg-pink-600 text-white px-4 py-2 rounded-xl font-bold">
            ${priceRange[1]}
          </div>
        </div>
      </div>
    </div>
  )
}, (prevProps, nextProps) => {
  return (
    prevProps.priceRange[0] === nextProps.priceRange[0] &&
    prevProps.priceRange[1] === nextProps.priceRange[1]
  )
})