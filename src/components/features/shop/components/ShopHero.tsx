"use client"

import React from "react"
import { motion } from "framer-motion"

interface ShopHeroProps {
  onScrollToProducts: () => void
}

const ShopHeroComponent = ({ onScrollToProducts: _onScrollToProducts }: ShopHeroProps) => {
  return (
    <section className="relative bg-gradient-to-r from-pink-500 to-purple-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Can't Decide What to Wear? Perfect. 
          </h2>
          <p className="text-lg md:text-xl text-pink-100 mb-6 max-w-2xl mx-auto">
            Premium streetwear for beautifully indecisive moments. Express your authentic self.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free Shipping
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              30-Day Returns
            </span>
            <span>•</span>
            <span>⭐ 4.9/5 (5k+ reviews)</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export const ShopHero = React.memo(ShopHeroComponent)