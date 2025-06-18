"use client"

import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from "@/lib/utils"

interface StockFilterProps {
  inStock: boolean
  onStockToggle: () => void
}

export const StockFilter = React.memo(function StockFilter({ inStock, onStockToggle }: StockFilterProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-pink-600" />
        Availability
      </h3>
      <div className="rounded-2xl bg-gray-50 p-6">
        <button
          onClick={onStockToggle}
          className={cn(
            "w-full flex items-center justify-between p-4 rounded-xl",
            inStock
              ? "bg-pink-600 text-white"
              : "bg-white hover:bg-pink-50 text-gray-700"
          )}
        >
          <div className="flex items-center gap-3">
            <div className={cn(
              "h-3 w-3 rounded-full",
              inStock ? "bg-green-400" : "bg-gray-400"
            )} />
            <span className="font-medium">In stock only</span>
          </div>
          {inStock && (
            <Check className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  )
})