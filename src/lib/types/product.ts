/**
 * Product-related Type Definitions
 */

// Base product type
export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  color: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  description?: string;
  category?: string;
  tags?: string[];
  availability?: 'in-stock' | 'out-of-stock' | 'pre-order';
  rating?: number;
  reviewCount?: number;
}

// Product filtering types
export type FilterType = 'all' | 'new' | 'hot' | 'sale';
export type PriceRange = 'all' | 'under-30' | '30-35' | 'over-35';
export type SortOption = 'default' | 'price-low' | 'price-high' | 'name' | 'newest';

// Product display types
export interface ProductGridProps {
  products: Product[];
  columns?: number;
  gap?: number;
  showFilters?: boolean;
  className?: string;
}

export interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  isSelected?: boolean;
  className?: string;
}

// Product comparison
export interface ProductComparison {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
}

// Cart types
export interface CartItem extends Product {
  quantity: number;
  size?: string;
  variant?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
}

// Product search
export interface ProductSearchResult {
  query: string;
  products: Product[];
  totalCount: number;
  facets?: {
    colors: string[];
    priceRanges: PriceRange[];
    categories: string[];
  };
} 