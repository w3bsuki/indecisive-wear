"use client"

import React from 'react'
import { Search } from 'lucide-react'
import { Bell } from 'lucide-react'
import { Heart } from 'lucide-react'
import { User } from 'lucide-react'
import { ShoppingBag } from 'lucide-react'
import { Package } from 'lucide-react'
import { Star } from 'lucide-react'
import { Plus } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import { Edit } from 'lucide-react'
import { LogOut } from 'lucide-react'
import { Settings } from 'lucide-react'
import { UserCircle } from 'lucide-react'
import { X } from 'lucide-react'
import { Minus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { NotificationBadge } from "./NotificationBadge"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { cn } from "@/lib/utils"
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'
import Link from 'next/link'

interface UserActionsProps {
  onSearchOpen: () => void
  notificationCount: number
  wishlistCount: number
  cartCount: number
}

export const UserActions = React.memo(function UserActions({ 
  onSearchOpen, 
  notificationCount, 
  wishlistCount, 
  cartCount 
}: UserActionsProps) {
  return (
    <div className="hidden sm:flex items-center gap-4">
      {/* Search */}
      <div className="relative">
        <Button 
          variant="ghost" 
          onClick={onSearchOpen}
          size="icon"
          aria-label="Open search"
          className={cn(
            "w-12 h-12 lg:w-12 lg:h-12 rounded-full bg-transparent", // 48px minimum touch target
            "text-pink-500 hover:text-white hover:bg-pink-500/90",
            "transition-all duration-200 ease-mobile active:scale-95",
            "touch-manipulation transform-gpu shadow-sm hover:shadow-md"
          )}
        >
          <Search className="h-5 w-5 lg:h-6 lg:w-6" strokeWidth={1.5} />
        </Button>
      </div>

      {/* Notifications */}
      <HoverCard openDelay={0} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            type="button"
            aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount} unread)` : ''}`}
            className={cn(
              "w-12 h-12 lg:w-12 lg:h-12 rounded-full bg-transparent", // 48px minimum touch target
              "text-pink-500 hover:text-white hover:bg-pink-500/90",
              "transition-all duration-200 ease-mobile active:scale-95",
              "touch-manipulation transform-gpu relative shadow-sm hover:shadow-md"
            )}
          >
            <Bell className="h-5 w-5 lg:h-6 lg:w-6" strokeWidth={1.5} />
            <NotificationBadge count={notificationCount} className="lg:scale-110" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent 
          className="w-80 bg-white/98 backdrop-blur-sm border border-pink-200/50 shadow-2xl rounded-2xl p-0"
          align="center"
          sideOffset={8}
        >
          <div className="px-4 py-3 text-base font-semibold text-pink-600 bg-gradient-to-r from-pink-50/60 to-pink-50/30 rounded-t-2xl border-b border-pink-100/50">
            Notifications ({notificationCount})
          </div>
          <div className="px-2 py-2 space-y-1">
            <div className="px-4 py-3 hover:bg-pink-50/50 rounded-xl cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Order #1234 has been shipped!</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 hover:bg-pink-50/50 rounded-xl cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-pink-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Flash Sale! 50% off today!</p>
                  <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-2 h-px bg-pink-100/50" />
          <div className="px-4 py-3">
            <Button variant="ghost" className="w-full text-pink-600 hover:bg-pink-50 text-sm">
              View all notifications
            </Button>
          </div>
        </HoverCardContent>
      </HoverCard>

      {/* Separator */}
      <div className="h-8 w-px bg-pink-500/20" />

      {/* Shop Icons Badge */}
      <div className="relative">
        <div className="absolute inset-0 bg-pink-500/10 blur-md rounded-full" />
        <div className="relative bg-white/80 backdrop-blur-sm px-4 py-2 lg:px-5 lg:py-2.5 rounded-full border border-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.15)] flex items-center gap-3">
          {/* Wishlist */}
          <HoverCard openDelay={0} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                type="button"
                aria-label={`Wishlist${wishlistCount > 0 ? ` (${wishlistCount} items)` : ''}`}
                className={cn(
                  "w-12 h-12 lg:w-11 lg:h-11 rounded-full bg-transparent", // 48px mobile, 44px desktop
                  "text-pink-500 hover:text-white hover:bg-pink-500/90",
                  "border border-pink-500/50 hover:border-pink-500",
                  "transition-all duration-200 ease-mobile active:scale-95",
                  "touch-manipulation transform-gpu relative"
                )}
              >
                <Heart className="h-4 w-4 lg:h-5 lg:w-5" strokeWidth={1.5} />
                <NotificationBadge count={wishlistCount} size="small" className="-top-2 -right-1 lg:scale-110" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent 
              className="w-72 bg-white/98 backdrop-blur-sm border border-pink-200/50 shadow-2xl rounded-2xl p-0"
              align="center"
              sideOffset={8}
            >
              <div className="px-4 py-3 text-base font-semibold text-pink-600 bg-gradient-to-r from-pink-50/60 to-pink-50/30 rounded-t-2xl border-b border-pink-100/50">
                Wishlist ({wishlistCount})
              </div>
              <div className="px-2 py-2 space-y-1">
                <div className="px-4 py-3 hover:bg-pink-50/50 rounded-xl cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Indecisive Club - Purple</p>
                      <p className="text-xs text-gray-500">£29.99</p>
                    </div>
                    <Button variant="ghost" size="icon" aria-label="Remove from wishlist" className="w-6 h-6 text-gray-600 hover:text-pink-500">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="px-4 py-3 hover:bg-pink-50/50 rounded-xl cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-500/20 to-black/20 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Daddy Chill - Black</p>
                      <p className="text-xs text-gray-500">£24.99</p>
                    </div>
                    <Button variant="ghost" size="icon" aria-label="Remove from wishlist" className="w-6 h-6 text-gray-600 hover:text-pink-500">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mx-2 h-px bg-pink-100/50" />
              <div className="px-4 py-3">
                <Button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white text-sm">
                  View Wishlist
                </Button>
              </div>
            </HoverCardContent>
          </HoverCard>

          <div className="h-5 lg:h-6 w-px bg-pink-500/20" />

          {/* Account */}
          <SignedIn>
            <UserButton 
              appearance={{
                elements: {
                  rootBox: "relative",
                  avatarBox: cn(
                    "w-12 h-12 lg:w-11 lg:h-11 rounded-full",
                    "ring-2 ring-pink-500/50 hover:ring-pink-500",
                    "transition-all duration-200 ease-mobile",
                    "shadow-sm hover:shadow-md"
                  ),
                  userButtonTrigger: cn(
                    "focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2",
                    "rounded-full"
                  ),
                  userButtonPopoverCard: "bg-white/98 backdrop-blur-sm border border-pink-200/50 shadow-2xl rounded-2xl",
                  userButtonPopoverMain: "px-2 py-2",
                  userButtonPopoverActionButton: "hover:bg-pink-50/50 rounded-xl",
                  userButtonPopoverActionButtonIcon: "text-pink-500",
                  userButtonPopoverFooter: "border-t border-pink-100/50",
                },
              }}
              afterSignOutUrl="/"
              userProfileMode="navigation"
              userProfileUrl="/account"
            />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="redirect" forceRedirectUrl="/shop">
              <Button 
                variant="ghost" 
                size="icon"
                type="button"
                aria-label="Sign in"
                className={cn(
                  "w-12 h-12 lg:w-11 lg:h-11 rounded-full bg-transparent",
                  "text-pink-500 hover:text-white hover:bg-pink-500/90",
                  "border border-pink-500/50 hover:border-pink-500",
                  "transition-all duration-200 ease-mobile active:scale-95",
                  "touch-manipulation transform-gpu relative"
                )}
              >
                <User className="h-4 w-4 lg:h-5 lg:w-5" strokeWidth={1.5} />
              </Button>
            </SignInButton>
          </SignedOut>

          <div className="h-5 lg:h-6 w-px bg-pink-500/20" />

          {/* Cart */}
          <HoverCard openDelay={0} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                type="button"
                aria-label={`Shopping cart${cartCount > 0 ? ` (${cartCount} items)` : ''}`}
                className={cn(
                  "w-12 h-12 lg:w-11 lg:h-11 rounded-full bg-transparent", // 48px mobile, 44px desktop
                  "text-pink-500 hover:text-white hover:bg-pink-500/90",
                  "border border-pink-500/50 hover:border-pink-500",
                  "transition-all duration-200 ease-mobile active:scale-95",
                  "touch-manipulation transform-gpu relative"
                )}
              >
                <ShoppingBag className="h-4 w-4 lg:h-5 lg:w-5" strokeWidth={1.5} />
                <NotificationBadge count={cartCount} size="small" className="-top-2 -right-1 lg:scale-110" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent 
              className="w-80 bg-white/98 backdrop-blur-sm border border-pink-200/50 shadow-2xl rounded-2xl p-0"
              align="center"
              sideOffset={8}
            >
              <div className="px-4 py-3 text-base font-semibold text-pink-600 bg-gradient-to-r from-pink-50/60 to-pink-50/30 rounded-t-2xl border-b border-pink-100/50">
                Shopping Cart ({cartCount})
              </div>
              <div className="px-2 py-2 space-y-2 max-h-96 overflow-y-auto">
                <div className="px-4 py-3 hover:bg-pink-50/50 rounded-xl cursor-pointer">
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Indecisive Club - Purple</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500">£29.99</p>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" aria-label="Decrease quantity" className="w-6 h-6 text-gray-600 hover:text-pink-500">
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-xs font-medium px-2">1</span>
                          <Button variant="ghost" size="icon" aria-label="Increase quantity" className="w-6 h-6 text-gray-600 hover:text-pink-500">
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" aria-label="Remove from cart" className="w-6 h-6 text-gray-600 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="px-4 py-3 hover:bg-pink-50/50 rounded-xl cursor-pointer">
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-500/20 to-black/20 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Daddy Chill - Black</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500">£24.99</p>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" aria-label="Decrease quantity" className="w-6 h-6 text-gray-600 hover:text-pink-500">
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-xs font-medium px-2">2</span>
                          <Button variant="ghost" size="icon" aria-label="Increase quantity" className="w-6 h-6 text-gray-600 hover:text-pink-500">
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" aria-label="Remove from cart" className="w-6 h-6 text-gray-600 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mx-2 h-px bg-pink-100/50" />
              <div className="px-4 py-3 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Total:</span>
                  <span className="font-bold text-lg text-pink-600">£79.97</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="text-pink-600 border-pink-200 hover:bg-pink-50 text-sm">
                    View Cart
                  </Button>
                  <Button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white text-sm">
                    Checkout
                  </Button>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  )
})