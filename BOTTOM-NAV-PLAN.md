# Bottom Navigation Sheet Plan for Shop Page

## Overview
A sticky bottom navigation bar for mobile devices that provides quick access to essential shop features while maintaining our clean glass morphism design.

## Design Concept

### Visual Design
```
┌─────────────────────────────────────┐
│  🛍️ Filters    🛒 Cart    👤 Account │
│   (2)          (3)                  │
└─────────────────────────────────────┘
```

### Features
1. **Glass Morphism Design**
   - `bg-white/90 backdrop-blur-xl`
   - `border-t border-pink-200/30`
   - `shadow-[0_-4px_20px_rgba(236,72,153,0.08)]`
   - Rounded top corners: `rounded-t-2xl`

2. **Navigation Items**
   - **Filters**: Opens filter drawer, shows active filter count
   - **Cart**: Shows cart count, navigates to cart
   - **Account**: User profile/login
   - **Search** (optional): Quick search access

3. **Mobile-Only**
   - Hidden on desktop (lg:hidden)
   - Fixed positioning at bottom
   - Safe area padding for iPhone notch

4. **Scroll Behavior**
   - Hide on scroll down (more content space)
   - Show on scroll up (easy access)
   - Always visible at top/bottom of page

## Implementation Details

### Component Structure
```tsx
<BottomNavSheet>
  <NavItem 
    icon={<Filter />}
    label="Filters"
    badge={activeFilterCount}
    onClick={openFilters}
    active={showFilters}
  />
  <NavItem 
    icon={<ShoppingCart />}
    label="Cart"
    badge={cartCount}
    onClick={goToCart}
  />
  <NavItem 
    icon={<User />}
    label="Account"
    onClick={goToAccount}
  />
</BottomNavSheet>
```

### Styling
```tsx
// Container
"fixed bottom-0 left-0 right-0 z-30 lg:hidden"
"bg-white/90 backdrop-blur-xl"
"border-t border-pink-200/30"
"shadow-[0_-4px_20px_rgba(236,72,153,0.08)]"
"rounded-t-2xl"
"safe-area-padding" // For iPhone

// Nav Items
"flex-1 flex flex-col items-center justify-center"
"py-2 px-3 min-h-[56px]" // Good touch target
"text-xs font-medium"
"text-gray-600" // Default
"text-pink-600" // Active

// Badges
"absolute -top-1 -right-1"
"bg-pink-500 text-white"
"min-w-[18px] h-[18px]"
"rounded-full text-[10px]"
```

### Animations
- Slide up/down based on scroll
- No complex animations
- Simple opacity and transform transitions

## Benefits
1. **Better Mobile UX**: Essential actions always accessible
2. **More Content Space**: Hides on scroll down
3. **Familiar Pattern**: Users expect bottom nav in mobile apps
4. **Clean Design**: Matches our aesthetic perfectly
5. **Quick Actions**: Filter and cart access without scrolling

## Breadcrumb Fix
Also need to fix the translation keys:
- Add 'common.home' → 'Начало' / 'Home'
- Add 'nav.shop' → 'Магазин' / 'Shop'
- Or use existing 'home' and 'shop' keys