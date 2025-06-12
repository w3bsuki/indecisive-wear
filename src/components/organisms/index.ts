// Organisms - Complex components made up of molecules and atoms
// These are distinct sections of an interface that serve specific functions

// Navigation Organisms
export { default as Navbar } from '../layout/navbar'

// Waitlist components  
export {
  WaitlistDialog,
  WaitlistOverlay
} from '../features/waitlist'

// Layout Organisms
export { Footer } from '../features/footer/Footer'

// Marketing Organisms  
export { HeroSection } from '../features/marketing/HeroSection'

// Shop Organisms
export { ProductGrid } from '../features/shop/ProductGrid'
export { DesktopProductCard, MobileProductCard } from '../features/shop/cards' 