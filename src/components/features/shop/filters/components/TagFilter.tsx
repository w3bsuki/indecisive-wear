"use client"

import * as React from 'react'
import { Sparkles, Star, Zap, Heart } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export const availableTags = [
  { id: "new", name: "New", icon: Sparkles, count: 4 },
  { id: "bestseller", name: "Bestseller", icon: Star, count: 3 },
  { id: "trending", name: "Trending", icon: Zap, count: 5 },
  { id: "limited", name: "Limited Edition", icon: Heart, count: 2 },
]

interface TagFilterProps {
  selectedTags: string[]
  onTagToggle: (tagId: string) => void
}

export const TagFilter = React.memo(function TagFilter({ selectedTags, onTagToggle }: TagFilterProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-pink-600" />
        Special Tags
      </h3>
      <div className="rounded-2xl bg-gray-50 p-6">
        <div className="flex flex-wrap gap-3">
          {availableTags.map((tag) => {
            const Icon = tag.icon
            return (
              <button
                key={tag.id}
                onClick={() => onTagToggle(tag.id)}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-3 rounded-full font-medium border-2",
                  selectedTags.includes(tag.id)
                    ? "bg-pink-600 text-white border-pink-600"
                    : "bg-white text-gray-700 border-gray-200 hover:border-pink-300"
                )}
              >
                <Icon className="h-4 w-4" />
                {tag.name}
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "text-xs ml-1",
                    selectedTags.includes(tag.id) 
                      ? "bg-white/20 text-white" 
                      : "bg-gray-100 text-gray-600"
                  )}
                >
                  {tag.count}
                </Badge>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}, (prevProps, nextProps) => {
  return (
    prevProps.selectedTags.length === nextProps.selectedTags.length &&
    prevProps.selectedTags.every(tag => nextProps.selectedTags.includes(tag))
  )
})