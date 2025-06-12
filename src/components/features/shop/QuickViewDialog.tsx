"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ShoppingBag, 
  Heart, 
  X,
  Star
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Product } from '@/lib/types/product'
import { useCartStore } from '@/stores/cart-store'
import { useSimpleI18n } from '@/hooks/i18n/useSimpleI18n'
import { toast } from 'sonner'

interface QuickViewDialogProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const QuickViewDialogComponent = ({ product, open, onOpenChange }: QuickViewDialogProps) => {
  const { formatPrice } = useSimpleI18n()
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  if (!product) return null

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error('Select a size')
      return
    }

    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 200))
      
      const priceNumber = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0
      
      addItem({
        productId: product.id,
        name: product.name,
        price: priceNumber,
        quantity: 1,
        size: selectedSize,
        image: product.image
      })

      toast.success('Added to cart!')
      onOpenChange(false)
    } catch (error) {
      toast.error('Try again')
    } finally {
      setIsLoading(false)
    }
  }

  const isOnSale = product.tags?.includes('sale') || false
  const isOutOfStock = product.availability === 'out-of-stock'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-md h-[80vh] overflow-hidden">
        
        {/* Image Section - Compact */}
        <div className="relative h-[35vh] bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="400px"
            priority
          />
          
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white shadow-sm"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Badges */}
          {(isOnSale || product.isNew || isOutOfStock) && (
            <div className="absolute top-2 left-2">
              {isOnSale && <Badge className="bg-red-500 text-white text-xs">SALE</Badge>}
              {product.isNew && <Badge className="bg-green-500 text-white text-xs">NEW</Badge>}
              {isOutOfStock && <Badge variant="destructive" className="text-xs">OUT OF STOCK</Badge>}
            </div>
          )}

          {/* Heart */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute bottom-2 right-2 h-8 w-8 rounded-full bg-white shadow-sm",
              isFavorite && "text-red-500"
            )}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
          </Button>
        </div>
        
        {/* Content - No scroll needed */}
        <div className="p-4 h-[45vh] flex flex-col">
          
          {/* Product Info - Compact */}
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "h-3 w-3 fill-current",
                    i < (product.rating || 4) ? "text-yellow-400" : "text-gray-300"
                  )} 
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">
                ({product.reviewCount || 127})
              </span>
            </div>
            
            <h3 className="font-semibold text-lg leading-tight mb-1">
              {product.name}
            </h3>
            
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{product.price}</span>
              {isOnSale && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice((parseFloat(product.price.replace(/[^0-9.]/g, '')) * 1.25) || 0)}
                </span>
              )}
            </div>
          </div>

          {/* Size Selection - Compact Grid */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Size</p>
            <div className="grid grid-cols-6 gap-1">
              {SIZES.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  size="sm"
                  className="h-9 p-0 text-xs"
                  onClick={() => !isOutOfStock && setSelectedSize(size)}
                  disabled={isOutOfStock}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Actions - Sticky at bottom */}
          <div className="mt-auto space-y-2">
            <Button 
              className="w-full h-11"
              onClick={handleAddToCart}
              disabled={isLoading || !selectedSize || isOutOfStock}
            >
              {isOutOfStock ? (
                'Out of Stock'
              ) : isLoading ? (
                'Adding...'
              ) : (
                <>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to Cart
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-9"
              onClick={() => onOpenChange(false)}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export const QuickViewDialog = React.memo(QuickViewDialogComponent, (prevProps, nextProps) => {
  return (
    prevProps.open === nextProps.open &&
    prevProps.product?.id === nextProps.product?.id
  )
})