# Shop Page Improvement Plan

## Issues Identified

### 1. Filter Components
- Using motion/framer-motion animations
- Card-based design instead of glass morphism
- Not following our clean design tokens
- Complex expand/collapse mechanisms
- Inconsistent with main page aesthetic

### 2. Shop Filters Bar
- Poor layout organization
- Search, filter, and sort not well balanced
- Doesn't use our clean design system
- Not mobile-optimized

### 3. Mobile Product Cards
- Price and button take too much vertical space
- "Add to Cart" text too long for mobile
- Not optimized for touch interaction

### 4. Filter Drawer
- Complex component structure
- Not using glass morphism
- Too many separate filter components
- Doesn't match main page drawer style

## Solutions

### Phase 1: Mobile Product Card Optimization
```tsx
// Single row layout for mobile
<div className="flex items-center justify-between gap-2">
  <span className="font-bold text-pink-600">17 лв</span>
  <Button size="icon" className="h-9 w-9">
    <ShoppingCart className="h-4 w-4" />
  </Button>
</div>
```

### Phase 2: Clean Filters Bar
```tsx
// Three sections: Search | Results Count | Actions
<div className="glass-morphism-bar">
  {/* Left: Search with integrated filter button */}
  <div className="flex items-center gap-2">
    <SearchInput />
    <FilterButton />
  </div>
  
  {/* Center: Results */}
  <div className="hidden md:block">
    <Badge>19 products</Badge>
  </div>
  
  {/* Right: Sort and Grid */}
  <div className="flex gap-2">
    <SortDropdown />
    <GridToggle />
  </div>
</div>
```

### Phase 3: Simplified Filter System
- Remove all animations
- Use glass morphism containers
- Simple toggle switches instead of checkboxes
- Clean color swatches
- Simplified price slider
- No expand/collapse - always visible

### Phase 4: Clean Filter Components
```tsx
// Example: Clean Color Filter
<div className="glass-container p-4">
  <h3 className="font-semibold mb-3">Colors</h3>
  <div className="flex flex-wrap gap-2">
    {colors.map(color => (
      <button
        className={cn(
          "w-8 h-8 rounded-full border-2",
          selected ? "border-pink-500" : "border-gray-200"
        )}
        style={{ backgroundColor: color.hex }}
      />
    ))}
  </div>
</div>
```

### Phase 5: Unified Design Tokens
- Glass morphism: `bg-white/90 backdrop-blur-xl`
- Borders: `border border-pink-200/30`
- Shadows: `shadow-[0_0_20px_rgba(236,72,153,0.08)]`
- Buttons: Pink with white borders
- No hover animations, only color transitions

## Expected Improvements
1. **Better Mobile UX**: Single-row pricing, icon buttons
2. **Cleaner Filters**: Glass morphism, no animations
3. **Consistent Design**: Matches main page perfectly
4. **Simplified Code**: Less complexity, better performance
5. **Touch-Optimized**: 44px minimum touch targets