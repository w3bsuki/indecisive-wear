/**
 * Sidebar - Refactored Entry Point
 * 
 * This file maintains backward compatibility by re-exporting all components
 * from the new modular sidebar system.
 * 
 * Original: 763 lines of monolithic code
 * Refactored: Modular system with clear separation of concerns
 * 
 * The original sidebar.tsx has been split into:
 * - SidebarProvider.tsx (85 lines) - Context and state management
 * - SidebarCore.tsx (155 lines) - Main sidebar structure
 * - SidebarHelpers.tsx (80 lines) - Utility components
 * - SidebarMenu.tsx (320 lines) - Menu components
 * - useSidebar.ts (35 lines) - Custom hook
 * 
 * Total: ~675 lines across 5 focused files vs 763 lines in 1 monolithic file
 */

// Re-export everything for backward compatibility
export * from "./sidebar/index"