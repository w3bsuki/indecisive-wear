"use client"

import * as React from 'react'
import { Button } from "@/components/ui/button"

interface FilterFooterProps {
  hasActiveFilters: boolean
  activeFilterCount: number
  onClearAll: () => void
  onClose: () => void
}

export const FilterFooter = React.memo(function FilterFooter({ 
  hasActiveFilters, 
  activeFilterCount, 
  onClearAll, 
  onClose 
}: FilterFooterProps) {
  return (
    <div className="border-t border-gray-200 bg-white p-6">
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={onClearAll}
          disabled={!hasActiveFilters}
          className="flex-1 h-12"
        >
          Clear All
        </Button>
        <Button 
          onClick={onClose}
          className="flex-2 h-12 bg-pink-600 hover:bg-pink-700 text-white"
        >
          Show Results ({activeFilterCount > 0 ? `${activeFilterCount} filters` : 'All'})
        </Button>
      </div>
    </div>
  )
})