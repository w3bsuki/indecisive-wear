"use client"

import * as React from 'react'
import { Filter, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DrawerClose, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"

interface FilterHeaderProps {
  activeFilterCount: number
}

export const FilterHeader = React.memo(function FilterHeader({ activeFilterCount }: FilterHeaderProps) {
  return (
    <>
      {/* Drag Handle */}
      <div className="mx-auto mt-4 h-1.5 w-12 rounded-full bg-gray-300" />
      
      <DrawerHeader className="pb-4 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-600 text-white">
              <Filter className="h-5 w-5" />
            </div>
            <div>
              <DrawerTitle id="filter-drawer-title" className="text-xl font-bold text-gray-900">
                Filters
              </DrawerTitle>
              <p className="text-sm text-gray-600">Find your perfect style</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <Badge className="bg-pink-600 text-white">
                {activeFilterCount}
              </Badge>
            )}
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerHeader>
    </>
  )
})