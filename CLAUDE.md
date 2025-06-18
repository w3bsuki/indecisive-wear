# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Indecisive Wear is a production-ready Barbie-themed e-commerce platform with a Next.js 15 frontend and Medusa v2 backend. The platform features advanced filter systems, internationalization (6 languages), mobile-first responsive design with professional glass morphism aesthetics, and a complete e-commerce backend infrastructure.

## Essential Commands

### Frontend Development (Root Directory)
```bash
pnpm dev          # Start frontend dev server on port 3000
pnpm build        # Build frontend for production
pnpm start        # Start frontend production server
```

### Backend Development (store/ Directory)
```bash
cd store          # Navigate to Medusa backend
npm run dev       # Start Medusa dev server on port 9000
npm run build     # Build Medusa for production
npm run start     # Start Medusa production server
npm run seed      # Seed database with sample data
```

### Full Stack Development
```bash
# Terminal 1 - Frontend
pnpm dev

# Terminal 2 - Backend
cd store && npm run dev

# Medusa Admin Dashboard: http://localhost:9000/app
```

### Testing
```bash
pnpm test         # Run unit tests in watch mode
pnpm test:run     # Run unit tests once
pnpm test:coverage # Generate coverage report
pnpm test:e2e     # Run Playwright E2E tests
pnpm test:e2e:ui  # Run E2E tests with UI
pnpm test:e2e:debug # Debug E2E tests
pnpm test:ui      # Interactive test runner
pnpm test:all     # Run both unit and E2E tests
pnpm storybook    # Start Storybook for component development
```

### Code Quality (ALWAYS run before committing)
```bash
pnpm lint         # Run ESLint
pnpm lint:fix     # Run ESLint with auto-fix
pnpm typecheck    # TypeScript type checking
pnpm format       # Format with Prettier
pnpm format:check # Check formatting without changes
pnpm quality      # Run all quality checks (lint + typecheck + format + test)
```

### Production Validation
```bash
pnpm build:analyze    # Analyze bundle size
pnpm bundle:analyze   # Bundle analysis with webpack analyzer
pnpm lighthouse       # Run Lighthouse CI tests
pnpm lighthouse:open  # Run Lighthouse and open results
pnpm prod:validate    # Full production validation suite
pnpm prod:setup       # Complete production setup (sitemap + build + lighthouse)
pnpm security:audit   # Security vulnerability scan
pnpm sitemap:generate # Generate sitemap.xml
```

### Database Setup (Medusa Backend)
```bash
# Prerequisites: PostgreSQL installed and running
createdb indecisive_wear_db  # Create database

# In store/ directory
npx medusa db:migrate        # Run migrations
npm run seed                 # Seed with sample data
```

### Internationalization
```bash
# Translation files located in src/i18n/resources/
# Supported locales: en, bg, es, fr, de, it
# Use useSimpleI18n hook for translations
# Currency formatting: 17 лв (BG), £17 (EN), €17 (EU)
```

## Architecture Overview

### Project Structure
- **Frontend**: Root directory - Next.js 15 app with complete UI/UX
- **Backend**: `store/` directory - Medusa v2 e-commerce backend
- **Status**: Frontend 100% complete, Backend scaffolded but not integrated

### Component Structure (Atomic Design + shadcn/ui)
- `src/components/ui/` - Base shadcn/ui primitives (Button, Dialog, Drawer, etc.)
- `src/components/features/` - Feature-specific components organized by domain:
  - `shop/` - E-commerce components with responsive cards and advanced filters
  - `marketing/` - Brand carousel, hero sections, social media integration
  - `waitlist/` - Email signup forms with validation
- `src/components/layout/` - Layout components (Container, Grid, Stack, Navbar)
- All components use mobile-first design with 44px minimum touch targets

### Advanced Filter System Architecture
The shop features a sophisticated filtering system in `src/components/features/shop/filters/`:
- **FilterDrawer**: Mobile-optimized drawer with Barbie theme and glass morphism
- **Color Swatches**: Visual color selection with accessibility support
- **Size Selection**: Interactive size grid (XS-XXL) with descriptions
- **Category Icons**: Lucide icon-based product categorization
- **Real-time Search**: Instant filtering with debounced input
- **Responsive Cards**: Separate mobile/desktop card implementations

### State Management
- **Server State**: TanStack Query for API data (see `src/hooks/api/`)
- **Client State**: Zustand stores in `src/stores/` (app, cart, user, waitlist, ui, monitoring)
- **Form State**: React Hook Form + Zod validation (see `src/hooks/forms/`)
- **I18n State**: Simple i18n system with locale-aware formatting

### Internationalization System
- **6 Languages**: English, Bulgarian, Spanish, French, German, Italian
- **Translation Files**: Organized by feature in `src/i18n/resources/{locale}/{feature}.json`
- **Currency Formatting**: Locale-aware (17 лв for BG, £17 for EN, €17 for EU)
- **Hooks**: `useSimpleI18n` for translations, `useCurrency` for formatting
- **Middleware**: Automatic locale detection and routing

### Design System (Barbie Theme)
- **Color Palette**: Pink gradients (`from-pink-500 to-purple-600`) throughout
- **Glass Morphism**: `bg-white/90 backdrop-blur-sm` with subtle shadows
- **Typography**: Cal Sans for headings, Inter for body text
- **Animations**: Framer Motion with staggered entrance effects
- **Mobile-First**: All components work perfectly on mobile devices

### Key Architectural Decisions
1. **Next.js App Router**: All pages use App Router with proper layouts and middleware
2. **TypeScript Strict Mode**: All code must pass strict type checking
3. **Mobile-First Responsive**: 100% mobile-perfect design with desktop enhancements
4. **Performance Budget**: Initial bundle under 150KB, LCP < 2.5s
5. **Barbie Brand Consistency**: Pink/purple gradients and playful aesthetics
6. **Accessibility**: ARIA labels, keyboard navigation, color contrast compliance
7. **Medusa Backend**: v2 for modern e-commerce capabilities

### Shop Page Architecture
- **ShopPageSimple**: Main shop component with mobile-perfect layout
- **ProductGrid**: Responsive grid with layout options (2/3/4 columns)
- **ProductCards**: Separate mobile/desktop implementations for optimal performance
- **Advanced Filtering**: Real-time search, color/size/category filters, price ranges
- **Currency Support**: Multi-locale pricing with proper formatting

### Performance Monitoring
- Core Web Vitals tracked automatically via `src/components/ui/CoreWebVitalsTracker.tsx`
- Production dashboard available at `/production-dashboard`
- Bundle analysis available via `pnpm build:analyze`
- Real-time error tracking with Sentry integration

## Critical Implementation Details

### Filter System Implementation
- **FilterDrawer.tsx**: Uses shadcn/ui Drawer with custom Barbie styling
- **Color Swatches**: Circular color pickers with checkmark animations
- **Size Grid**: 3x2 grid layout with hover states and descriptions
- **Mobile-Perfect**: 92vh max height, proper touch targets, smooth animations
- **Type Safety**: Strict TypeScript interfaces for all filter states

### Responsive Card System
- **DesktopProductCard**: Optimized for hover states and larger screens
- **MobileProductCard**: Touch-optimized with larger buttons and simplified layout
- **useResponsiveCard**: Hook for dynamic card selection based on screen size
- **Performance**: Separate implementations prevent unnecessary mobile code

### Brand Carousel Implementation
- **BrandMarquee**: Matches social media section design pattern exactly
- **HeadlineMarquee**: Reusable text scrolling component with customizable speed
- **Animation**: CSS keyframes with `-webkit-transform` for smooth performance
- **Typography**: Cal Sans font with proper text shadows and gradients

### Currency and Localization
- **formatPrice()**: Handles locale-specific currency formatting
- **Simple i18n**: Lightweight translation system without heavy libraries
- **Middleware**: `src/middleware/locale.ts` for automatic locale detection
- **Fallbacks**: Graceful degradation when translations are missing

### Security Improvements (Waitlist API)
- **CORS**: Properly configured allowed origins (no wildcards)
- **Rate Limiting**: IP-based with retry-after headers
- **XSS Protection**: Input sanitization on all forms
- **CSRF**: Token validation for state-changing operations

## Development Guidelines

### Code Standards
1. **Always run `pnpm quality`** before committing (lint + typecheck + format + test)
2. **Mobile-First Design**: All components must work perfectly on mobile
3. **Barbie Theme Consistency**: Use pink gradients and glass morphism patterns
4. **TypeScript Strict**: Avoid `any` type, use proper interfaces
5. **shadcn/ui Patterns**: Follow established component composition patterns

### Component Development
- **File Naming**: kebab-case for files, PascalCase for components
- **Mobile Optimization**: 44px minimum touch targets, proper spacing
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- **Performance**: Use React.memo for expensive components, optimize re-renders
- **Testing**: Unit tests for utilities, integration tests for components

### Filter Development Patterns
When working with the shop filters:
- **State Management**: Use the established `Filters` interface
- **Animation**: Framer Motion with staggered entrance effects
- **Mobile UX**: Drawer pattern for mobile, sidebar for desktop
- **Real-time Updates**: Debounced search with instant visual feedback

### Internationalization Workflow
- **Adding Translations**: Update all 6 locale files consistently
- **Currency Support**: Use `formatPrice()` function with locale detection
- **RTL Support**: Consider text direction for future Arabic/Hebrew support
- **Fallback Strategy**: Always provide English fallbacks

### Medusa Integration Workflow
1. **Install SDK**: `pnpm add @medusajs/js-sdk`
2. **Create Client**: Initialize in `src/lib/medusa/client.ts`
3. **Replace Static Data**: Update product fetching to use Medusa API
4. **Connect Cart**: Sync Zustand cart with Medusa sessions
5. **Add Auth**: Implement customer authentication flow

## Backend Integration Status

### Current Setup
- **Frontend**: Complete with static product data
- **Medusa Backend**: v2.8.4 scaffolded in `store/` directory
- **Database**: PostgreSQL configuration ready
- **Admin Panel**: Available at `http://localhost:9000/app`
- **API Routes**: Basic structure in `store/src/api/`

### Integration Points (Not Yet Connected)
1. **Product Data**: Static in `src/lib/constants/product-data.ts` → needs Medusa API
2. **Cart System**: Frontend-only → needs Medusa cart sessions
3. **User Auth**: Zustand store → needs Medusa customer auth
4. **Checkout**: Not implemented → needs Medusa + Stripe
5. **Orders**: No order management → needs Medusa order system

### Environment Variables Required
```bash
# Frontend (.env.local)
NEXT_PUBLIC_MEDUSA_URL=http://localhost:9000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Backend (store/.env)
DATABASE_URL=postgresql://user:pass@localhost:5432/indecisive_wear_db
JWT_SECRET=your-jwt-secret
COOKIE_SECRET=your-cookie-secret
STORE_CORS=http://localhost:3000,https://your-domain.com
ADMIN_CORS=http://localhost:9000
AUTH_CORS=http://localhost:9000
```

### Medusa Configuration
- **Config File**: `store/medusa-config.ts`
- **Seed Script**: `store/src/scripts/seed.ts` (needs customization for Indecisive Wear products)
- **Migrations**: Run with `npx medusa db:migrate`
- **Plugins**: Ready for Stripe, SendGrid, S3, etc.

## Environment Variables
Required environment variables are documented in `docs/environment-variables.md`. The app validates these on startup and includes comprehensive locale support.

## Important Development Instructions

### Code Creation and Modification Guidelines
- **ALWAYS prefer editing existing files** over creating new ones
- **NEVER create files unless absolutely necessary** for achieving the goal
- **NEVER proactively create documentation files** (*.md) or README files unless explicitly requested
- **File Naming**: Use kebab-case for files, PascalCase for components
- **No Comments**: DO NOT ADD COMMENTS unless explicitly asked by the user

### Pre-commit Requirements
- **ALWAYS run `pnpm quality`** before any commit to ensure code quality
- All TypeScript errors must be resolved (strict mode enabled)
- All ESLint warnings must be addressed
- Prettier formatting must be applied
- Tests must pass for affected code

## Documentation Structure

This project uses a comprehensive documentation system. Reference these files for specific needs:

### Core Documentation
- **[IMPLEMENTATION-PLAN.md](./IMPLEMENTATION-PLAN.md)** - Step-by-step guide for Medusa integration
- **[handbook.md](./handbook.md)** - Complete development guide with architecture, design system, and best practices
- **[operations.md](./operations.md)** - Production deployment, monitoring, and infrastructure management
- **[issues.md](./issues.md)** - Known issues, technical debt, bugs, and troubleshooting guide
- **[roadmap.md](./roadmap.md)** - Strategic development timeline and feature roadmap
- **[to-do.md](./to-do.md)** - Immediate action items and priority task list

### When to Use Each Document
- **For Medusa integration**: Follow IMPLEMENTATION-PLAN.md
- **For development guidance**: Start with handbook.md
- **For deployment and production**: Use operations.md
- **For bug reports and troubleshooting**: Check issues.md
- **For feature planning**: Reference roadmap.md  
- **For immediate tasks**: Review to-do.md
- **For AI assistant instructions**: This CLAUDE.md file