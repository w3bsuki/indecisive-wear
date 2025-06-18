/**
 * Error State Components
 * Consistent error handling across the application
 */
import { Button } from "@/components/ui/button"
import { AlertTriangle } from 'lucide-react'
import { RefreshCw } from 'lucide-react'
import { Wifi } from 'lucide-react'
import { ShoppingBag } from 'lucide-react'
import { Search } from 'lucide-react'
import { Heart } from 'lucide-react'
import { cn } from "@/lib/utils"

interface ErrorStateProps {
  className?: string
  onRetry?: () => void
  title?: string
  description?: string
  showRetry?: boolean
}

// Generic Error State
export function ErrorState({ 
  className, 
  onRetry, 
  title = "Something went wrong",
  description = "We encountered an unexpected error. Please try again.",
  showRetry = true 
}: ErrorStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center p-8 space-y-4",
      className
    )}>
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 max-w-md">{description}</p>
      </div>
      {showRetry && onRetry && (
        <Button 
          onClick={onRetry}
          variant="outline"
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </div>
  )
}

// Network Error State
export function NetworkError({ className, onRetry }: ErrorStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center p-8 space-y-4",
      className
    )}>
      <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center">
        <Wifi className="w-8 h-8 text-orange-500" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">Connection Lost</h3>
        <p className="text-gray-600 max-w-md">
          Please check your internet connection and try again.
        </p>
      </div>
      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="outline"
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </Button>
      )}
    </div>
  )
}

// Empty Cart State
export function EmptyCartState({ className }: { className?: string }) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center p-8 space-y-4",
      className
    )}>
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
        <ShoppingBag className="w-8 h-8 text-gray-400" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">Your cart is empty</h3>
        <p className="text-gray-600 max-w-md">
          Looks like you haven't added anything to your cart yet.
        </p>
      </div>
      <Button 
        onClick={() => window.location.href = '/#products'}
        className="gap-2"
      >
        <ShoppingBag className="w-4 h-4" />
        Start Shopping
      </Button>
    </div>
  )
}

// No Search Results State
export function NoSearchResults({ 
  className, 
  searchTerm, 
  onClearSearch 
}: { 
  className?: string
  searchTerm?: string
  onClearSearch?: () => void
}) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center p-8 space-y-4",
      className
    )}>
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">No results found</h3>
        <p className="text-gray-600 max-w-md">
          {searchTerm 
            ? `We couldn't find anything matching "${searchTerm}"`
            : "Try adjusting your search or filters"
          }
        </p>
      </div>
      {onClearSearch && (
        <Button 
          onClick={onClearSearch}
          variant="outline"
        >
          Clear Search
        </Button>
      )}
    </div>
  )
}

// Empty Wishlist State
export function EmptyWishlistState({ className }: { className?: string }) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center p-8 space-y-4",
      className
    )}>
      <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center">
        <Heart className="w-8 h-8 text-pink-400" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">No favorites yet</h3>
        <p className="text-gray-600 max-w-md">
          Save items you love by clicking the heart icon.
        </p>
      </div>
      <Button 
        onClick={() => window.location.href = '/#products'}
        className="gap-2"
      >
        <Heart className="w-4 h-4" />
        Explore Products
      </Button>
    </div>
  )
}

// Form Error Alert
export function FormError({ 
  message, 
  className 
}: { 
  message: string
  className?: string 
}) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700",
      className
    )}>
      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  )
}

// Success Alert
export function SuccessAlert({ 
  message, 
  className 
}: { 
  message: string
  className?: string 
}) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700",
      className
    )}>
      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xs">✓</span>
      </div>
      <p className="text-sm">{message}</p>
    </div>
  )
}

// Loading Error (when something fails to load)
export function LoadingError({ 
  onRetry, 
  type = "content",
  className 
}: {
  onRetry?: () => void
  type?: "content" | "image" | "page"
  className?: string
}) {
  const getTitle = () => {
    switch (type) {
      case "image": return "Image failed to load"
      case "page": return "Page failed to load"
      default: return "Content failed to load"
    }
  }

  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center p-6 space-y-3 bg-gray-50 rounded-lg border border-gray-200",
      className
    )}>
      <AlertTriangle className="w-6 h-6 text-gray-400" />
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-700">{getTitle()}</p>
        <p className="text-xs text-gray-500">Something went wrong</p>
      </div>
      {onRetry && (
        <Button 
          onClick={onRetry}
          size="sm"
          variant="outline"
          className="gap-1 text-xs"
        >
          <RefreshCw className="w-3 h-3" />
          Retry
        </Button>
      )}
    </div>
  )
}