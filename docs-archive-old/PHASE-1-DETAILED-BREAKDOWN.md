# 🎯 Phase 1: Critical Foundation - Detailed Task Breakdown

**WEEK 1 EXECUTION PLAN** - Complete breakdown of every task needed to fix the foundation

---

## 📊 Overview

**Phase 1 Goal**: Get from broken build to 100% working foundation  
**Timeline**: 5 days (1 week)  
**Success Criteria**: Clean build, working auth, all tests passing  
**Priority**: SHOWSTOPPER - Nothing else can be done until this is complete  

---

## 🔥 Day 1: Environment & TypeScript Fixes

### Morning Session (3 hours)

#### 1.1 Environment Setup (60 minutes)
```bash
# Step 1: Create environment file (5 min)
cp .env.local.example .env.local

# Step 2: Set up Clerk account (15 min)
# - Go to clerk.com
# - Create account and application
# - Copy publishable key

# Step 3: Configure .env.local (10 min)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-key-here
CLERK_SECRET_KEY=sk_test_your-secret-key
CLERK_WEBHOOK_SECRET=whsec_your-webhook-secret

# Step 4: Test environment (30 min)
pnpm dev
# Visit localhost:3000
# Click user icon - should redirect to sign-in (not error)
```

**Verification**: Sign-in page loads without prerender errors

#### 1.2 Critical TypeScript Fixes (120 minutes)

##### Fix 1: Generic Type Constraints - object.ts (30 min)
```typescript
// File: src/lib/utils/object.ts
// Line 156
result[transformer(key)] = value as T[keyof T];

// Line 170
result[key as keyof T] = transformer(value as T[keyof T], key as keyof T);
```

##### Fix 2: Performance Utility Types (30 min)
```typescript
// File: src/lib/utils/performance.ts
// Lines 82, 105, 118, 161, 197
// Add proper type assertions for all unknown -> ReturnType<T> conversions

// Line 82
callback(result as ReturnType<T>);

// Line 105
setResult(result as ReturnType<T>);

// Continue for all 5 instances
```

##### Fix 3: Event Handler Types (30 min)
```typescript
// File: src/components/locale/LanguageToggle.tsx
// Line 25 & 43 - Wrap function to match MouseEventHandler signature
onClick={() => switchLocale('bg')}
onClick={() => switchLocale('en')}

// File: src/components/features/shop/cards/SharedProductCard.tsx
// Line 251 - Remove synthetic event creation
onKeyDown={(e) => {
  if ((e.key === 'Enter' || e.key === ' ') && inStock) {
    e.preventDefault()
    e.stopPropagation()
    onClick?.() // Remove event parameter
  }
}}
```

##### Fix 4: Store and Testing Issues (30 min)
```typescript
// File: src/stores/ui-store.ts
// Line 117 - Fix Zustand selector signature
const sidebar = useUIStore(state => state.sidebar);

// File: src/lib/testing/index.ts
// Line 15 - Fix duplicate export
export { queryHelpers as testQueryHelpers } from './helpers';

// File: src/lib/utils/__tests__/object.test.ts
// Line 42 - Fix test data structure
expect(result).toEqual({
  a: 1,
  b: { c: 2 }, // Fix: was { d: number } expecting { c: number }
  e: 3
});
```

**Verification**: `pnpm typecheck` passes with 0 errors

### Afternoon Session (2 hours)

#### 1.3 Exclude Medusa from TypeScript (30 minutes)
```json
// File: tsconfig.json
{
  "exclude": [
    "node_modules", 
    ".next",
    "store/**/*",  // Add this line
    "out"
  ]
}
```

#### 1.4 Verify Build Process (90 minutes)
```bash
# Test full compilation
pnpm typecheck
# Expected: 0 errors

# Test production build
pnpm build
# Expected: Successful build

# Test development server
pnpm dev
# Expected: Starts without errors
```

**Day 1 Success Criteria**:
- ✅ Environment configured, Clerk auth pages load
- ✅ All TypeScript errors resolved
- ✅ `pnpm build` succeeds
- ✅ Development server starts clean

---

## 🧹 Day 2: ESLint & Code Quality

### Morning Session (3 hours)

#### 2.1 Fix Critical ESLint Errors (120 minutes)

##### Error Category 1: Unescaped Quotes (30 min)
```typescript
// Find and replace in these files:
// src/components/features/marketing/HeadlineMarquee.tsx
// src/components/features/marketing/BrandMarquee.tsx
// And 4 other components

// Replace:
"Don't"
// With:
"Don&apos;t"
// Or:
{"Don't"}
```

##### Error Category 2: Image Optimization (45 min)
```typescript
// Replace <img> with Next.js <Image> in 8 files
// Example pattern:

// Before:
<img src="/images/hat1.png" alt="Product" className="w-full h-auto" />

// After:
import Image from 'next/image'
<Image 
  src="/images/hat1.png" 
  alt="Product" 
  width={400} 
  height={400} 
  className="w-full h-auto" 
/>
```

##### Error Category 3: Console Statements (30 min)
```typescript
// Remove or replace console statements in 8 files
// Production code should not have console.log

// Replace:
console.log('Debug info:', data)

// With:
// console.log('Debug info:', data) // TODO: Remove in production
// Or remove entirely
```

##### Error Category 4: React Hooks Rules (15 min)
```typescript
// Fix hook usage in 3 components
// Ensure hooks are only called at top level
// Move conditional hooks outside conditions
```

#### 2.2 Auto-fix What's Possible (60 minutes)
```bash
# Run auto-fix for fixable issues
pnpm lint:fix

# Check remaining issues
pnpm lint

# Manually fix remaining issues
```

**Verification**: `pnpm lint` passes with 0 errors

### Afternoon Session (2 hours)

#### 2.3 Code Formatting (30 minutes)
```bash
# Fix all formatting issues
pnpm format

# Verify formatting
pnpm format:check
# Expected: All files properly formatted
```

#### 2.4 Fix Storybook Preview Error (30 minutes)
```typescript
// File: .storybook/preview.ts
// Change file extension to .tsx if it contains JSX
// Or remove JSX and keep as .ts
```

#### 2.5 Quality Check Verification (60 minutes)
```bash
# Run complete quality suite
pnpm quality

# Should pass:
# - TypeScript: 0 errors
# - ESLint: 0 errors  
# - Prettier: All formatted
# - Tests: Will fix tomorrow
```

**Day 2 Success Criteria**:
- ✅ All ESLint errors resolved
- ✅ Code properly formatted
- ✅ `pnpm lint` and `pnpm format:check` pass

---

## 🧪 Day 3: Test Fixes & i18n

### Morning Session (3 hours)

#### 3.1 Fix i18n Test Failures (120 minutes)

##### Locale Switching Tests (60 min)
```typescript
// File: src/i18n/__tests__/simple-i18n.test.ts
// Fix mock implementations for locale switching

// Update test expectations:
// Change £18.00 to £18 if that's the actual output
// Or update currency formatting to match expectations
```

##### Currency Formatting Tests (30 min)
```typescript
// Fix currency formatting expectations
// If getting £18.00 but expecting £18:

// Option 1: Update test expectation
expect(formatPrice(18, 'en')).toBe('£18.00');

// Option 2: Update formatting function to remove decimals for whole numbers
```

##### Date Formatting Tests (30 min)
```typescript
// Fix locale detection in date formatting tests
// Ensure mock locale is properly set before tests
```

#### 3.2 Fix ResizeObserver Mock Issues (60 minutes)
```typescript
// File: src/lib/testing/test-setup.ts
// Add ResizeObserver mock

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
```

**Verification**: Major test categories passing

### Afternoon Session (2 hours)

#### 3.3 Fix Remaining Test Issues (90 minutes)
```bash
# Run tests and fix remaining failures
pnpm test:run

# Focus on:
# - Component tests that import missing dependencies
# - Mock implementations
# - Test data structure issues
```

#### 3.4 Test Environment Verification (30 minutes)
```bash
# Verify test commands work
pnpm test:run     # All tests pass
pnpm test:coverage # Coverage report generates
pnpm test:ui      # Interactive runner works
```

**Day 3 Success Criteria**:
- ✅ All critical tests passing
- ✅ i18n functionality working
- ✅ Test environment stable

---

## ✅ Day 4: Integration Testing & Polish

### Morning Session (3 hours)

#### 4.1 Clerk Integration Testing (120 minutes)
```bash
# Complete authentication flow testing
# 1. Sign-up process (60 min)
pnpm dev
# - Visit localhost:3000
# - Click user icon
# - Complete sign-up with test email
# - Verify redirect to /shop
# - Check user avatar appears

# 2. Sign-in process (30 min)
# - Sign out
# - Sign back in
# - Verify flow works

# 3. Protected routes (30 min)
# - Visit /account while signed out
# - Should redirect to sign-in
# - Sign in and try again
# - Should access account page
```

#### 4.2 Mobile Testing (60 minutes)
```bash
# Test on mobile viewport
# - Open Chrome DevTools
# - Switch to mobile view
# - Test all authentication flows
# - Verify touch targets work
# - Check responsive design
```

### Afternoon Session (2 hours)

#### 4.3 Cross-browser Testing (60 minutes)
```bash
# Test in different browsers:
# - Chrome (primary)
# - Firefox  
# - Safari (if on Mac)
# - Edge

# Verify:
# - Authentication works
# - UI renders correctly
# - No console errors
```

#### 4.4 Performance Verification (60 minutes)
```bash
# Check Core Web Vitals
# Open Chrome DevTools → Lighthouse
# Run performance audit
# Verify metrics are reasonable

# Check bundle size
pnpm build:analyze
# Ensure no regression in bundle size
```

**Day 4 Success Criteria**:
- ✅ Authentication fully functional
- ✅ Mobile experience perfect
- ✅ Cross-browser compatibility
- ✅ Performance maintained

---

## 🎯 Day 5: Final Verification & Documentation

### Morning Session (2 hours)

#### 5.1 Complete Quality Suite (60 minutes)
```bash
# Run every quality check
pnpm typecheck    # 0 errors
pnpm lint         # 0 errors
pnpm format:check # All formatted
pnpm test:run     # All tests pass
pnpm build        # Successful build
```

#### 5.2 End-to-End User Journey (60 minutes)
```bash
# Test complete user flow:
# 1. Fresh browser session
# 2. Visit homepage
# 3. Browse products
# 4. Sign up for account
# 5. Add items to cart
# 6. Visit account page
# 7. Sign out and sign back in
# 8. Verify cart persistence
```

### Afternoon Session (2 hours)

#### 5.3 Documentation Updates (60 minutes)
```markdown
# Update todo.md Phase 1 tasks to completed
# Update CLAUDE.md with any configuration changes
# Document any decisions made during fixes
```

#### 5.4 Phase 2 Preparation (60 minutes)
```bash
# Prepare for Phase 2:
# - Backend decision confirmed
# - Environment ready for next integrations
# - Clean foundation established
```

**Day 5 Success Criteria**:
- ✅ All Phase 1 tasks completed
- ✅ Documentation updated
- ✅ Ready for Phase 2 development

---

## 📋 Daily Verification Checklist

### Day 1 ✅
- [ ] Environment configured
- [ ] TypeScript errors fixed
- [ ] Build succeeds
- [ ] Auth pages load

### Day 2 ✅
- [ ] ESLint errors resolved
- [ ] Code formatted
- [ ] Image optimization complete
- [ ] Console statements removed

### Day 3 ✅
- [ ] Tests passing
- [ ] i18n working
- [ ] Mocks configured
- [ ] Test environment stable

### Day 4 ✅
- [ ] Authentication functional
- [ ] Mobile testing complete
- [ ] Cross-browser verified
- [ ] Performance maintained

### Day 5 ✅
- [ ] Full quality suite passing
- [ ] User journey tested
- [ ] Documentation updated
- [ ] Phase 2 ready

---

## 🚨 Risk Mitigation

### Potential Blockers
1. **Clerk API limits**: Use test mode initially
2. **TypeScript complexity**: Fix one file at a time
3. **Test environment**: May need Jest configuration updates
4. **Mobile testing**: Use multiple device simulators

### Contingency Plans
1. **If TypeScript fixes break functionality**: Revert and fix differently
2. **If tests are too complex**: Focus on build/lint first, tests later
3. **If authentication doesn't work**: Check environment variables first
4. **If timeline slips**: Prioritize build/lint over tests

---

*This detailed breakdown ensures no task is overlooked and provides clear verification criteria for each day. Follow this plan systematically for guaranteed success in Phase 1.*