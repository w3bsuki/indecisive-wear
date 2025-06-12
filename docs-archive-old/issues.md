# 🚨 Codebase Issues & Technical Debt

## 🔥 Critical Issues (Must Fix Immediately)

### 1. **TypeScript Build Failures** ⚠️
- **16+ TypeScript errors** preventing clean builds
- **Files affected:**
  - `src/hooks/forms/useModernForm.ts:68,129` - Generic type constraints
  - `src/i18n/__tests__/simple-i18n.test.ts:44,130,195` - Type index access
  - `src/lib/api/client.ts:194` - Missing ApiError properties
  - `src/lib/performance/core-web-vitals.ts:18,63,73-75,102` - Performance API types
  - `src/lib/localization/localeManager.ts:367` - Undefined parameter
  - `src/lib/i18n/simple-i18n.ts:188,368` - Duplicate object properties

### 2. **Security Vulnerabilities** 🛡️
- **esbuild vulnerability** - Version ≤0.24.2 allows unauthorized requests
- **Unsafe HTML usage** - `dangerouslySetInnerHTML` without sanitization
  - `src/components/ui/chart.tsx` - Potential XSS risk
  - `src/components/features/footer/Footer.tsx` - Needs review
- **Missing input validation** - Forms lack XSS protection

### 3. **Missing Error Handling** 💥
- **Only 42 catch blocks** for async operations across entire codebase
- **Console statements** in production code (3 files)
- **No error boundaries** for component failures
- **API calls without fallbacks**

## 🗂️ Code Organization Issues

### 1. **Duplicate & Redundant Files**
- **Backup files to delete:**
  - `src/app/globals.css.backup`
  - `src/components/layout/navbar.backup.tsx`
  - `src/components/layout/navbar/UserActions.backup.tsx`

- **Duplicate components:**
  - `ProductFilters.tsx` (in e-commerce/ and shop/ folders)
  - `ProductGrid.tsx` (in e-commerce/ and shop/ folders)
  - `LocationPopup.tsx` (multiple locations)
  - `social-icons.tsx` (duplicated functionality)

### 2. **Poor Component Structure**
- **Mixed patterns:** Both e-commerce/ and shop/ folders for products
- **Inconsistent barrel exports:** 10+ incomplete index.ts files
- **Orphaned test:** `ShopPageSimple.test.tsx` references non-existent `TestWrapper`
- **Scattered locale detection:** Multiple location files without hierarchy

### 3. **Naming Convention Chaos**
- **Hook naming:** Mix of `use-mobile.tsx` (kebab) and `useMobile` (camel)
- **Component exports:** Inconsistent default vs named exports
- **File naming:** Mixed PascalCase and kebab-case

## 📦 Bundle & Performance Issues

### 1. **Unused Code & Dependencies**
- **Medusa backend:** Complete unused directory
- **Storybook static:** Build artifacts in repo
- **Coverage reports:** Should be in .gitignore
- **Legacy components:** Deprecated patterns and backups

### 2. **Bundle Size Problems**
- **No tree-shaking analysis** for unused imports
- **Heavy documentation:** 3910+ markdown files causing bloat
- **Missing bundle optimization**
- **No proper dead code elimination**

### 3. **Next.js Best Practice Violations**
- **Excessive "use client":** 20+ files unnecessarily client-side
- **Mixed rendering:** Server/client boundaries not optimized
- **Performance impact:** Client rendering where SSR would be better

## ♿ Accessibility & UX Issues

### 1. **Accessibility Gaps**
- **Inconsistent ARIA:** Not all interactive components labeled
- **Missing focus management:** Drawers/modals need keyboard navigation
- **Color contrast:** Pink gradients may not meet WCAG standards

### 2. **Mobile Experience**
- **Touch target inconsistencies** before recent spacing fixes
- **Missing safe area handling** for iOS devices
- **Viewport issues** on various devices

## 🔧 Code Quality Issues

### 1. **TypeScript Quality**
- **`any` types:** 38 instances (mostly in tests)
- **Loose type checking:** Components accept any for flexibility
- **Missing type definitions:** Generic constraints not defined

### 2. **Development Debris**
- **TODO comments:** Found in ProductSection.tsx:60
- **Console statements:** Debug code left in production
- **Incomplete implementations:** Sale logic commented out
- **Unused imports:** Not properly cleaned up

### 3. **Testing Issues**
- **Missing TestWrapper:** Test setup incomplete
- **Broken test imports:** References to non-existent test utilities
- **Incomplete test coverage:** Critical paths not tested

## 📁 File Structure Problems

### 1. **Inconsistent Organization**
```
❌ Current messy structure:
src/components/
├── features/
│   ├── e-commerce/      # Product components here
│   └── shop/            # ALSO product components here
├── ui/                  # Mix of shadcn and custom
└── [scattered files]

✅ Should be:
src/components/
├── ui/                  # Only shadcn primitives
├── primitives/          # Custom atomic components  
├── features/            # Feature-specific only
└── layout/              # Layout components
```

### 2. **Import Path Chaos**
- **Inconsistent aliases:** Mix of relative and absolute imports
- **Circular dependencies:** Some components import each other
- **Deep import paths:** Complex nested imports

## 🌐 Internationalization Issues

### 1. **Translation Problems**
- **Duplicate language objects** in simple-i18n.ts
- **Missing translations** for some locales
- **Inconsistent translation keys**

### 2. **Locale Detection**
- **Multiple location detection files** without clear purpose
- **Redundant locale management**
- **Missing fallback strategies**

## 📊 Documentation Bloat

### 1. **Excessive Documentation**
- **50+ markdown files** in root and docs/
- **Duplicate information** across multiple files
- **Outdated documentation** not matching current state
- **Planning documents** that should be archived

### 2. **Maintenance Burden**
- **Information scattered** across too many files
- **Conflicting documentation**
- **Hard to find current information**

## 🎯 Refactor Priority Matrix

### **🔥 Fix Immediately (Blocks Development)**
1. TypeScript build errors
2. Security vulnerabilities (esbuild, XSS)
3. Missing error handling

### **⚡ High Priority (Affects Quality)**
1. Remove duplicate files and components
2. Fix component organization structure
3. Complete test setup
4. Standardize naming conventions

### **📈 Medium Priority (Improves Performance)**
1. Bundle size optimization
2. Remove unused code
3. Fix Next.js best practices
4. Improve accessibility

### **🧹 Low Priority (Code Cleanliness)**
1. Remove console statements
2. Clean up TODO comments
3. Optimize imports
4. Documentation consolidation

## 📋 Success Metrics

### **Before Refactor:**
- ❌ 16+ TypeScript errors
- ❌ Security vulnerabilities
- ❌ 50+ scattered markdown files
- ❌ Duplicate components
- ❌ Poor component organization

### **After Refactor:**
- ✅ Zero TypeScript errors
- ✅ No security vulnerabilities
- ✅ 5 consolidated markdown files + CLAUDE.md
- ✅ Single source components
- ✅ Clear, organized structure following Next.js best practices

This comprehensive issue list forms the foundation for our complete codebase refactor.