"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"

type ProductCard = {
  id: number
  name: string
  slogan: string
  price: string
  image: string
  color: string
  isNew?: boolean
  isBestSeller?: boolean
}

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: ProductCard
    index: number
    hovered: number | null
    setHovered: React.Dispatch<React.SetStateAction<number | null>>
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className="rounded-lg relative bg-white overflow-hidden h-60 md:h-96 w-full shadow-md"
    >
      {/* Static container - No transitions applied to this element or its children */}
      <div className="absolute inset-0 z-0">
        {/* Product Image - Completely isolated from any animations */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-4">
          <img
            src={card.image || "/placeholder.svg"}
            alt={card.name}
            className="object-contain max-w-full max-h-full"
          />
        </div>

        {/* Coming Soon Badge - Fixed position, no transitions */}
        <div className="absolute top-4 right-4">
          <div className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            COMING SOON
          </div>
        </div>
      </div>

      {/* All animated elements are in a separate layer */}
      <div
        className={cn(
          "absolute inset-0 z-10 transition-all duration-300 ease-out pointer-events-none",
          hovered !== null && hovered !== index && "blur-sm",
        )}
      >
        {/* Card border and shadow - only these transform on hover */}
        <div 
          className={cn(
            "absolute inset-0 rounded-lg transition-all duration-300 ease-out border border-transparent",
            hovered === index && "border-pink-200 shadow-xl"
          )}
        />

        {/* Overlay - Fades in/out on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-white/90 via-white/60 to-transparent transition-opacity duration-300 ease-in-out",
            hovered === index ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Product Info - Fades in/out on hover */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-start justify-end py-8 px-6 transition-opacity duration-300",
            hovered === index ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            {card.isNew && <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">NEW</span>}
            {card.isBestSeller && (
              <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">BEST SELLER</span>
            )}
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{card.name}</div>
          <div className="text-gray-600 text-sm mb-3">{card.slogan}</div>
          <div className="flex items-center justify-between w-full">
            <span className="text-gray-900 font-bold">{card.price}</span>
            <span className="text-gray-500 text-sm">{card.color}</span>
          </div>
        </div>
      </div>

      {/* Non-hovered cards scale down slightly */}
      <div 
        className={cn(
          "absolute inset-0 z-0 transition-transform duration-300 ease-out",
          hovered !== null && hovered !== index && "scale-[0.98]"
        )}
      />
    </div>
  ),
)

Card.displayName = "Card"

export function FocusCards({ cards }: { cards: ProductCard[] }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
      {cards.map((card, index) => (
        <Card key={card.id} card={card} index={index} hovered={hovered} setHovered={setHovered} />
      ))}
    </div>
  )
}
