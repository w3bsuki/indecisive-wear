"use client"

import React from "react"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useLocale } from "@/hooks/i18n/useLocale"

interface Filters {
  category: string
  priceRange: [number, number]
  tags: string[]
  inStock: boolean
  colors: string[]
  sizes: string[]
}

interface CleanProductFiltersProps {
  className?: string
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

const categories = [
  { id: "all", name: { bg: "Всички", en: "All" }, count: 19 },
  { id: "hats", name: { bg: "Шапки", en: "Hats" }, count: 19 },
]

const availableColors = [
  { id: "red", name: "Red", hex: "#EF4444" },
  { id: "pink", name: "Pink", hex: "#EC4899" },
  { id: "purple", name: "Purple", hex: "#8B5CF6" },
  { id: "black", name: "Black", hex: "#000000" },
  { id: "white", name: "White", hex: "#FFFFFF" },
  { id: "green", name: "Green", hex: "#10B981" },
  { id: "orange", name: "Orange", hex: "#F97316" },
]

const availableSizes = ["One Size", "S", "M", "L", "XL"]

const availableTags = [
  { id: "new", name: { bg: "Ново", en: "New" } },
  { id: "bestseller", name: { bg: "Хит", en: "Bestseller" } },
  { id: "in-stock", name: { bg: "Налично", en: "In Stock" } },
]

function CleanProductFiltersComponent({ className, filters, onFiltersChange }: CleanProductFiltersProps) {
  const { locale } = useLocale()
  const isEn = locale === 'en'
  
  const updateFilters = (updates: Partial<Filters>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const toggleArrayFilter = (key: keyof Pick<Filters, 'tags' | 'colors' | 'sizes'>, value: string) => {
    const currentArray = filters[key] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    updateFilters({ [key]: newArray })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      category: "all",
      priceRange: [0, 100],
      tags: [],
      colors: [],
      sizes: [],
      inStock: false,
    })
  }

  const hasActiveFilters = 
    filters.category !== "all" ||
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 100 ||
    filters.tags.length > 0 ||
    filters.colors.length > 0 ||
    filters.sizes.length > 0 ||
    filters.inStock

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Header with clear button */}
      <div className="bg-white/90 backdrop-blur-xl border border-pink-200/30 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">
            {isEn ? 'Filters' : 'Филтри'}
          </h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-pink-600 hover:text-pink-700 hover:bg-pink-50 text-xs h-7 px-2"
            >
              {isEn ? 'Clear all' : 'Изчисти'}
            </Button>
          )}
        </div>
        
        {/* Active filters badges */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-1.5">
            {filters.category !== "all" && (
              <Badge className="bg-pink-50 text-pink-700 border-pink-200/50 text-xs px-2 py-0.5 pr-1">
                {categories.find(c => c.id === filters.category)?.name[locale as 'bg' | 'en']}
                <button
                  onClick={() => updateFilters({ category: "all" })}
                  className="ml-1 hover:text-pink-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.colors.map(colorId => {
              const color = availableColors.find(c => c.id === colorId)
              return color && (
                <Badge
                  key={colorId}
                  className="bg-pink-50 text-pink-700 border-pink-200/50 text-xs px-2 py-0.5 pr-1"
                >
                  <span 
                    className="w-3 h-3 rounded-full border border-gray-300 mr-1"
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.name}
                  <button
                    onClick={() => toggleArrayFilter('colors', colorId)}
                    className="ml-1 hover:text-pink-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )
            })}
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="bg-white/90 backdrop-blur-xl border border-pink-200/30 rounded-2xl p-4">
        <h4 className="font-medium text-gray-900 mb-3 text-sm">
          {isEn ? 'Category' : 'Категория'}
        </h4>
        <div className="space-y-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => updateFilters({ category: category.id })}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm",
                "transition-colors duration-200",
                filters.category === category.id
                  ? "bg-pink-500 text-white"
                  : "bg-white/60 hover:bg-pink-50 text-gray-700 border border-pink-200/30"
              )}
            >
              <span className="font-medium">
                {category.name[locale as 'bg' | 'en']}
              </span>
              <span className="text-xs opacity-80">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="bg-white/90 backdrop-blur-xl border border-pink-200/30 rounded-2xl p-4">
        <h4 className="font-medium text-gray-900 mb-3 text-sm">
          {isEn ? 'Price Range' : 'Ценови диапазон'}
        </h4>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
            max={100}
            min={0}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{isEn ? '£' : ''}{filters.priceRange[0]}{!isEn ? ' лв' : ''}</span>
            <span>{isEn ? '£' : ''}{filters.priceRange[1]}{!isEn ? ' лв' : ''}</span>
          </div>
        </div>
      </div>

      {/* Color Filter */}
      <div className="bg-white/90 backdrop-blur-xl border border-pink-200/30 rounded-2xl p-4">
        <h4 className="font-medium text-gray-900 mb-3 text-sm">
          {isEn ? 'Colors' : 'Цветове'}
        </h4>
        <div className="grid grid-cols-4 gap-2">
          {availableColors.map(color => (
            <button
              key={color.id}
              onClick={() => toggleArrayFilter('colors', color.id)}
              className={cn(
                "w-full aspect-square rounded-xl border-2 transition-all duration-200",
                "hover:scale-105 relative",
                filters.colors.includes(color.id)
                  ? "border-pink-500 shadow-md"
                  : "border-gray-200 hover:border-pink-300"
              )}
              style={{ backgroundColor: color.hex }}
              aria-label={color.name}
            >
              {filters.colors.includes(color.id) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="bg-white/90 backdrop-blur-xl border border-pink-200/30 rounded-2xl p-4">
        <h4 className="font-medium text-gray-900 mb-3 text-sm">
          {isEn ? 'Sizes' : 'Размери'}
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {availableSizes.map(size => (
            <button
              key={size}
              onClick={() => toggleArrayFilter('sizes', size)}
              className={cn(
                "px-3 py-2 rounded-xl text-sm font-medium",
                "transition-colors duration-200 border",
                filters.sizes.includes(size)
                  ? "bg-pink-500 text-white border-pink-500"
                  : "bg-white/60 text-gray-700 border-pink-200/30 hover:border-pink-300"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white/90 backdrop-blur-xl border border-pink-200/30 rounded-2xl p-4">
        <h4 className="font-medium text-gray-900 mb-3 text-sm">
          {isEn ? 'Tags' : 'Тагове'}
        </h4>
        <div className="space-y-2">
          {availableTags.map(tag => (
            <button
              key={tag.id}
              onClick={() => toggleArrayFilter('tags', tag.id)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm",
                "transition-colors duration-200",
                filters.tags.includes(tag.id)
                  ? "bg-pink-500 text-white"
                  : "bg-white/60 hover:bg-pink-50 text-gray-700 border border-pink-200/30"
              )}
            >
              <span className="font-medium">
                {tag.name[locale as 'bg' | 'en']}
              </span>
              {filters.tags.includes(tag.id) && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export const CleanProductFilters = React.memo(CleanProductFiltersComponent)