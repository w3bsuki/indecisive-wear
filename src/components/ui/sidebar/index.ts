/**
 * Sidebar Components - Refactored
 * 
 * Modular sidebar system split from the original 763-line monolithic component
 * 
 * Architecture:
 * - SidebarProvider: Context and state management
 * - SidebarCore: Main sidebar structure and layout
 * - SidebarHelpers: Utility components (Input, Header, Footer, etc.)
 * - SidebarMenu: All menu-related components
 * - useSidebar: Custom hook for state management
 * 
 * Benefits:
 * - Better separation of concerns
 * - Easier to maintain and test
 * - Improved code organization
 * - Smaller bundle sizes through better tree-shaking
 */

// Core provider and hook
export { SidebarProvider } from "./SidebarProvider"
export { useSidebar } from "@/hooks/ui/useSidebar"

// Core sidebar structure
export {
  Sidebar,
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
} from "./SidebarCore"

// Helper components
export {
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarContent,
} from "./SidebarHelpers"

// Menu components
export {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "./SidebarMenu"