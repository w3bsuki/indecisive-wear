/**
 * Components - Main Export Index
 * 
 * Centralized exports following Atomic Design methodology:
 * - Atoms: Basic building blocks
 * - Molecules: Simple combinations of atoms
 * - Organisms: Complex components with business logic
 * - Templates: Page-level layouts
 */

// === ATOMIC DESIGN EXPORTS ===

// Atoms - Basic UI building blocks
export * from './atoms'

// Molecules - Simple combinations of atoms
export * from './molecules'

// Organisms - Complex components with business logic
export * from './organisms'

// Templates - Page-level layouts
export * from './templates'

// === LEGACY STRUCTURE EXPORTS (for migration period) ===

// UI Components (shadcn/ui - mostly atoms)
export { Button } from './ui/button'
export { Input } from './ui/input'
export { Label } from './ui/label'
export { Badge } from './ui/badge'
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
export { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'

// Layout Components (organisms)
export { default as Navbar } from './layout/navbar'
export { Sidebar } from './ui/sidebar'

// Feature Components (organisms)
export { Footer } from './features/footer/Footer'

// Shared Components (molecules)
export { SectionHeader } from './shared/section-header'
export { SocialIcons } from './shared/social-icons'

// === COMPONENT TYPES ===

// Re-export common component types
export type { BaseComponentProps, VariantComponentProps, CompoundComponentProps } from '@/composition'

// === ATOMIC DESIGN DOCUMENTATION ===

/**
 * ATOMIC DESIGN STRUCTURE:
 * 
 * 🔷 ATOMS (Basic building blocks):
 * - Button, Input, Label, Badge, Avatar
 * - Checkbox, Switch, Toggle, Slider
 * - Progress, Skeleton, Separator
 * - Alert components
 * 
 * 🔶 MOLECULES (Simple combinations):
 * - Form fields (Input + Label)
 * - Card components
 * - Dialog/Sheet components
 * - Navigation items
 * - Data display components
 * 
 * 🔴 ORGANISMS (Complex components):
 * - Navbar with all functionality
 * - Footer with social links
 * - Product listings
 * - Forms with validation
 * - Sidebar with navigation
 * 
 * 📄 TEMPLATES (Page layouts):
 * - App shell structure
 * - Theme providers
 * - Layout wrappers
 * 
 * USAGE EXAMPLES:
 * 
 * // Import atoms for basic UI
 * import { Button, Input, Label } from '@/components'
 * 
 * // Import molecules for composed UI
 * import { Card, Dialog } from '@/components'
 * 
 * // Import organisms for complex features
 * import { Navbar, Footer, WaitlistForm } from '@/components'
 * 
 * // Import from specific atomic levels
 * import { Button } from '@/atoms'
 * import { Card } from '@/molecules'
 * import { Navbar } from '@/organisms'
 * import { AppShell } from '@/templates'
 */ 