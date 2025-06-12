"use client"

import React from 'react'
import Link from "next/link"
import { SocialIcons } from "@/components/shared/social-icons"

interface NavbarBrandProps {
  className?: string
}

export const NavbarBrand = React.memo(function NavbarBrand({ className: _className }: NavbarBrandProps) {
  return (
    <div className="flex items-center gap-3 sm:gap-6">
      {/* Brand Link */}
      <div className="flex items-center relative">
        <Link href="/" className="flex-shrink-0">
          <span className="text-base sm:text-2xl font-bold tracking-tighter">
            <span className="relative inline-block px-2 sm:px-4 py-1 sm:py-1 bg-gradient-to-r from-pink-600 to-pink-400 rounded-lg text-white transform -skew-x-6 shadow-[0_0_10px_rgba(236,72,153,0.4)]">
              INDECISIVE
            </span>
            <span className="ml-1 text-black hidden sm:inline">WEAR</span>
          </span>
        </Link>
      </div>
      
      <div className="hidden sm:block h-8 w-px bg-pink-500/20" />
      <div className="relative hidden sm:block">
        <div className="absolute inset-0 bg-pink-500/10 blur-md rounded-full" />
        <div className="relative bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.15)]">
          <SocialIcons size="sm" />
        </div>
      </div>
    </div>
  )
}) 