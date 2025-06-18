import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { ShoppingCart } from 'lucide-react'
import { Star } from 'lucide-react'
import { X } from 'lucide-react'
import type { Product } from "@/lib/constants/product-data"

interface CompareDialogProps {
  products: Product[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const matchScores = [
  "Perfect Match! 💫",
  "Great Choice! ⭐",
  "Solid Pick! 🌟",
  "Worth a Try! ✨",
  "Maybe Next Time! 🎯"
];

export function CompareDialog({ products, open, onOpenChange }: CompareDialogProps) {
  const getRandomMatchScore = () => {
    return matchScores[Math.floor(Math.random() * matchScores.length)];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0 bg-white">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-black">Compare Your Picks</h2>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x divide-gray-100">
          {products.slice(0, 2).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-6 space-y-6"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src={product.image || `/images/hat${product.id}.png`}
                  alt={product.name}
                  className="w-full h-full object-contain p-8"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-black">{product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{product.slogan}</p>
                </div>

                {/* Match Score */}
                <div className="bg-pink-50 rounded-lg p-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-pink-500" />
                  <span className="text-sm font-medium text-pink-700">
                    {getRandomMatchScore()}
                  </span>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: product.color }} />
                    <span className="text-sm text-gray-600">{product.color}</span>
                  </div>
                  {product.isNew && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      New Arrival
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded ml-2">
                      Best Seller
                    </span>
                  )}
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4">
                  <span className="text-xl font-semibold text-black">{product.price}</span>
                  <button
                    type="button"
                    className="bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-pink-600 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fun Footer */}
        <div className="p-4 bg-gray-50 text-center">
          <p className="text-sm text-gray-600 italic">
            Still can&apos;t decide? Close your eyes and click randomly! 😉
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
} 