"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from 'lucide-react'
import { ChevronUp } from 'lucide-react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Filters {
  category: string
  priceRange: [number, number]
  tags: string[]
  inStock: boolean
}

interface ProductFiltersProps {
  className?: string
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

function ProductFiltersComponent({ className, filters, onFiltersChange }: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    category: true,
    tags: true,
    stock: true,
  })

  const categories = [
    { id: "all", name: "All Products", count: 9 },
    { id: "hats", name: "Hats", count: 9 },
  ]

  const availableTags = [
    { id: "new", name: "New", count: 2 },
    { id: "bestseller", name: "Bestseller", count: 1 },
    { id: "popular", name: "Popular", count: 1 },
    { id: "vibrant", name: "Vibrant", count: 1 },
    { id: "bold", name: "Bold", count: 1 },
    { id: "chill", name: "Chill", count: 1 },
    { id: "funny", name: "Funny", count: 1 },
    { id: "money", name: "Money", count: 1 },
    { id: "streetwear", name: "Streetwear", count: 1 },
    { id: "philosophy", name: "Philosophy", count: 1 },
    { id: "mood", name: "Mood", count: 1 },
    { id: "reality", name: "Reality", count: 1 },
    { id: "hustle", name: "Hustle", count: 1 },
  ]

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const updateFilters = (updates: Partial<Filters>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const toggleTag = (tagId: string) => {
    const newTags = filters.tags.includes(tagId)
      ? filters.tags.filter(id => id !== tagId)
      : [...filters.tags, tagId]
    updateFilters({ tags: newTags })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      category: "all",
      priceRange: [0, 100],
      tags: [],
      inStock: false,
    })
  }

  const hasActiveFilters = 
    filters.category !== "all" ||
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 100 ||
    filters.tags.length > 0 ||
    filters.inStock

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Filters</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-pink-600 hover:text-pink-700"
            >
              Clear all
            </Button>
          )}
        </div>
        
        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 pt-2">
            {filters.category !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {categories.find(c => c.id === filters.category)?.name}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => updateFilters({ category: "all" })}
                />
              </Badge>
            )}
            {filters.tags.map(tagId => {
              const tag = availableTags.find(t => t.id === tagId)
              return tag && (
                <Badge
                  key={tagId}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tag.name}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => toggleTag(tagId)}
                  />
                </Badge>
              )
            })}
            {filters.inStock && (
              <Badge variant="secondary" className="flex items-center gap-1">
                In Stock Only
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => updateFilters({ inStock: false })}
                />
              </Badge>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <h3 className="font-medium text-gray-900">Price Range</h3>
            {expandedSections.price ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          
          {expandedSections.price && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4"
            >
              <div className="px-3">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Categories */}
        <div>
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <h3 className="font-medium text-gray-900">Category</h3>
            {expandedSections.category ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          
          {expandedSections.category && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4 space-y-3"
            >
              {categories.map(category => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={category.id}
                      checked={filters.category === category.id}
                      onCheckedChange={() => updateFilters({ category: category.id })}
                    />
                    <label
                      htmlFor={category.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {category.name}
                    </label>
                  </div>
                  <span className="text-xs text-gray-500">({category.count})</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Tags */}
        <div>
          <button
            onClick={() => toggleSection('tags')}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <h3 className="font-medium text-gray-900">Tags</h3>
            {expandedSections.tags ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          
          {expandedSections.tags && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4 space-y-3"
            >
              {availableTags.map(tag => (
                <div key={tag.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={tag.id}
                      checked={filters.tags.includes(tag.id)}
                      onCheckedChange={() => toggleTag(tag.id)}
                    />
                    <label
                      htmlFor={tag.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {tag.name}
                    </label>
                  </div>
                  <span className="text-xs text-gray-500">({tag.count})</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Stock Status */}
        <div>
          <button
            onClick={() => toggleSection('stock')}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <h3 className="font-medium text-gray-900">Availability</h3>
            {expandedSections.stock ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          
          {expandedSections.stock && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4"
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={filters.inStock}
                  onCheckedChange={(checked) => updateFilters({ inStock: !!checked })}
                />
                <label
                  htmlFor="in-stock"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  In stock only
                </label>
              </div>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Memoize component with custom comparison to prevent unnecessary re-renders
export const ProductFilters = React.memo(ProductFiltersComponent, (prevProps, nextProps) => {
  return (
    prevProps.className === nextProps.className &&
    prevProps.filters.category === nextProps.filters.category &&
    prevProps.filters.priceRange[0] === nextProps.filters.priceRange[0] &&
    prevProps.filters.priceRange[1] === nextProps.filters.priceRange[1] &&
    prevProps.filters.inStock === nextProps.filters.inStock &&
    JSON.stringify(prevProps.filters.tags) === JSON.stringify(nextProps.filters.tags)
  )
})