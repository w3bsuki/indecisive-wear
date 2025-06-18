"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer'
import { Badge } from '@/components/ui/badge'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { 
  ShoppingBag, 
  Heart, 
  Star,
  Truck,
  Shield,
  Check
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Product } from '@/lib/types/product'
import { useCartStore } from '@/stores/cart-store'
import { useSimpleI18n } from '@/hooks/i18n/useSimpleI18n'
import { toast } from 'sonner'
import { buttonVariants2025 } from '@/lib/design-system/component-variants-2025'

interface QuickViewDialogProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const QuickViewDialogComponent = ({ product, open, onOpenChange }: QuickViewDialogProps) => {
  const { formatPrice, t } = useSimpleI18n()
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!product) return null

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error('Please select a size')
      return
    }

    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 400))
      
      const priceNumber = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0
      
      addItem({
        productId: product.id,
        name: product.name,
        price: priceNumber,
        quantity: 1,
        size: selectedSize,
        image: product.image
      })

      toast.success('Added to cart!', {
        icon: <Check className="h-4 w-4" />
      })
      
      setTimeout(() => onOpenChange(false), 600)
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const isNew = product.tags?.includes('new') || false
  const isBestSeller = product.tags?.includes('bestseller') || false
  const isOutOfStock = product.availability === 'out-of-stock'

  const QuickViewContent = () => (
    <>
      {/* Product Image Section */}
      <div className="relative">
        {/* Image with Badges */}
        <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40">
          <AspectRatio ratio={1}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 128px, 160px"
              priority
            />
          </AspectRatio>
          
          {/* Badges */}
          {(isNew || isBestSeller) && (
            <div className="absolute -top-2 -left-2 flex gap-1">
              {isNew && (
                <Badge className="bg-green-500 text-white border-0 text-[10px] px-2 py-0.5 font-medium">
                  NEW
                </Badge>
              )}
              {isBestSeller && (
                <Badge className="bg-orange-500 text-white border-0 text-[10px] px-2 py-0.5 font-medium">
                  BEST
                </Badge>
              )}
            </div>
          )}
          
          {/* Wishlist Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={cn(
              "absolute -top-2 -right-2 h-8 w-8 rounded-full shadow-md transition-all",
              "flex items-center justify-center",
              isFavorite 
                ? "bg-pink-500 text-white hover:bg-pink-600" 
                : "bg-white text-gray-600 hover:text-pink-500 hover:bg-gray-50"
            )}
            aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        {/* Price and Rating */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">
              {product.price}
            </span>
            {product.rating && (
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3 w-3 md:h-4 md:w-4",
                        i < Math.floor(product.rating!) 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "fill-gray-200 text-gray-200"
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs md:text-sm text-gray-600">
                  ({product.reviewCount || 0})
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-sm md:text-base text-gray-600 text-center md:text-left line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Size Selection */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900 text-center md:text-left">
            Select Size
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                disabled={isOutOfStock}
                className={cn(
                  buttonVariants2025({ 
                    variant: selectedSize === size ? 'brand' : 'secondary',
                    size: 'sm'
                  }),
                  "font-medium",
                  selectedSize === size && "ring-2 ring-pink-500 ring-offset-2"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Trust Signals */}
        <div className="flex items-center justify-center gap-4 py-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Truck className="h-3.5 w-3.5 text-pink-500" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Shield className="h-3.5 w-3.5 text-pink-500" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>
    </>
  )

  // Mobile: Use Drawer
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="pb-2">
            <DrawerTitle className="text-center text-lg font-semibold">
              {product.name}
            </DrawerTitle>
          </DrawerHeader>
          
          <div className="px-4 pb-4">
            <QuickViewContent />
          </div>
          
          <DrawerFooter className="border-t">
            <Button
              onClick={handleAddToCart}
              disabled={isLoading || isOutOfStock || !selectedSize}
              className={cn(
                buttonVariants2025({ variant: 'brand', size: 'lg' }),
                "w-full font-semibold",
                "bg-gradient-to-r from-pink-500 to-pink-600",
                "hover:from-pink-600 hover:to-pink-700"
              )}
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  {!selectedSize ? 'Select Size' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </>
              )}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  // Desktop: Use Dialog
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <QuickViewContent />
          
          <Button
            onClick={handleAddToCart}
            disabled={isLoading || isOutOfStock || !selectedSize}
            className={cn(
              buttonVariants2025({ variant: 'brand', size: 'lg' }),
              "w-full font-semibold",
              "bg-gradient-to-r from-pink-500 to-pink-600",
              "hover:from-pink-600 hover:to-pink-700"
            )}
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4 mr-2" />
                {!selectedSize ? 'Select Size' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export const QuickViewDialog = QuickViewDialogComponent