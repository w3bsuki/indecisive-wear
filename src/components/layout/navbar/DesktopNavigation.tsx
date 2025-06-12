"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ShopDropdown } from './ShopDropdown'

interface DesktopNavigationProps {
  onMenuClick: (section: string) => void
}

export function DesktopNavigation({ onMenuClick }: DesktopNavigationProps) {
  return (
    <motion.nav 
      className="flex items-center justify-center"
      aria-label="Main navigation"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      role="navigation"
    >
      <ShopDropdown onMenuClick={onMenuClick} />
    </motion.nav>
  )
} 