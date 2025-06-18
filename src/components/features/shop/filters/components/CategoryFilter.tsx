"use client"

import * as React from 'react'
import { Check, Sparkles, Crown, Shirt, Star } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export const categories = [
  { id: "all", name: "All Products", icon: Sparkles, count: 19 },
  { id: "hats", name: "Hats & Caps", icon: Crown, count: 19 },
  { id: "tshirts", name: "T-Shirts", icon: Shirt, count: 12 },
  { id: "accessories", name: "Accessories", icon: Star, count: 8 },
]

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (categoryId: string) => void
}

export const CategoryFilter = React.memo(function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-pink-600" />
        Categories
      </h3>
      <div className="rounded-2xl bg-gray-50 p-6">
        <div className="space-y-3">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-xl",
                  selectedCategory === category.id
                    ? "bg-pink-600 text-white"
                    : "bg-white hover:bg-pink-50 text-gray-700"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "text-xs",
                      selectedCategory === category.id 
                        ? "bg-white/20 text-white" 
                        : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {category.count}
                  </Badge>
                  {selectedCategory === category.id && (
                    <Check className="h-4 w-4" />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
})