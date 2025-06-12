import { motion, AnimatePresence } from "framer-motion"
import { Shuffle } from 'lucide-react'
import { X } from 'lucide-react'
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/constants/product-data"

interface CompareButtonProps {
  selectedProducts: Product[];
  onCompare: () => void;
  onRemoveProduct: (productId: number) => void;
  className?: string;
}

export function CompareButton({
  selectedProducts,
  onCompare,
  onRemoveProduct,
  className
}: CompareButtonProps) {
  if (selectedProducts.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className={cn(
          "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
          "bg-white rounded-full shadow-lg border border-pink-500/20",
          "px-4 py-2 flex items-center gap-3",
          className
        )}
      >
        <div className="flex -space-x-2">
          {selectedProducts.map((product) => (
            <div key={product.id} className="relative group">
              <img
                src={product.image || `/images/hat${product.id}.png`}
                alt={product.name}
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
              <button
                type="button"
                onClick={() => onRemoveProduct(product.id)}
                className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remove ${product.name} from comparison`}
              >
                <X className="w-3 h-3 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
        
        <button
          type="button"
          onClick={onCompare}
          className="bg-pink-500 text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-pink-600 transition-colors"
        >
          <Shuffle className="w-4 h-4" />
          Compare {selectedProducts.length} Hats
        </button>
      </motion.div>
    </AnimatePresence>
  );
} 