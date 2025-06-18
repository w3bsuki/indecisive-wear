"use client"

import React from 'react'
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface EmptyProductStateProps {
  onClearFilters: () => void
}

const EmptyProductStateComponent = ({ onClearFilters }: EmptyProductStateProps) => {
  return (
    <div className="text-center py-16">
      <div className="text-gray-400 mb-4">
        <Search className="h-12 w-12 mx-auto" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
      <p className="text-gray-600 mb-4">
        Try adjusting your search or filters to find what you're looking for.
      </p>
      <Button
        variant="outline"
        onClick={onClearFilters}
      >
        Clear all filters
      </Button>
    </div>
  )
}

export const EmptyProductState = React.memo(EmptyProductStateComponent)