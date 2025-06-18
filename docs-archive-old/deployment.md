# 🚀 Deployment & Operations Guide

## Environment Setup

### Development Environment
```bash
# Install dependencies
pnpm install

# Environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Start development server
pnpm dev          # http://localhost:3000
```

### Required Environment Variables
```bash
# Core Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase (for waitlist and future features)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: Error Tracking
SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn

# Optional: Analytics
GOOGLE_ANALYTICS_ID=your_ga_id
```

### Optional Environment Variables
```bash
# Future Medusa Integration
MEDUSA_BACKEND_URL=http://localhost:9000
MEDUSA_ADMIN_URL=http://localhost:7001

# Development
NODE_ENV=development
ANALYZE=false
```

## Build & Production

### Production Build
```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Build analysis
pnpm build:analyze
```

### Production Validation
```bash
# Full production validation suite
pnpm prod:validate

# Individual checks
pnpm lighthouse       # Performance audit
pnpm quality         # Code quality (lint + typecheck + format)
pnpm test:run        # Unit tests
pnpm test:e2e        # E2E tests
```

## Deployment Platforms

### Vercel (Recommended)
1. **Connect Repository**
   - Import from GitHub/GitLab
   - Auto-deploy on push to main

2. **Environment Variables**
   - Add all required variables in Vercel dashboard
   - Use production URLs for NEXT_PUBLIC_APP_URL

3. **Build Settings**
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

4. **Domain Configuration**
   - Add custom domain in Vercel dashboard
   - Configure DNS records

### Netlify
1. **Build Settings**
   ```
   Build command: pnpm build && pnpm export
   Publish directory: out
   ```

2. **Environment Variables**
   - Add in Netlify site settings
   - Include all NEXT_PUBLIC_ variables

### Docker Deployment
```dockerfile
# Dockerfile (create if needed)
FROM node:18-alpine

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]
```

## Performance Optimization

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **Bundle Size**: < 150KB initial

### Optimization Strategies
1. **Image Optimization**
   - Use Next.js Image component
   - WebP/AVIF formats
   - Proper sizing and lazy loading

2. **Code Splitting**
   - Dynamic imports for heavy components
   - Route-based splitting
   - Vendor chunk optimization

3. **Caching Strategy**
   - Static assets: 1 year
   - API responses: Based on data freshness
   - ISR for product pages

## Monitoring & Analytics

### Performance Monitoring
```bash
# Production dashboard
/production-dashboard

# Core Web Vitals tracking
# Automatically enabled in production
```

### Error Tracking (Sentry)
```typescript
// Automatic error tracking configured
// Check sentry.client.config.ts and sentry.server.config.ts
```

### Analytics
- **Google Analytics** - Configured via environment variable
- **Core Web Vitals** - Built-in tracking
- **Custom events** - Performance monitoring store

## Security

### Headers Configuration
```javascript
// next.config.mjs
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]
```

### Content Security Policy
```javascript
// Implement CSP headers for production
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
`
```

## Database Setup (Future)

### Supabase Configuration
1. **Create Supabase Project**
   - Sign up at supabase.com
   - Create new project
   - Copy URL and anon key

2. **Database Schema**
   ```sql
   -- Waitlist table
   CREATE TABLE waitlist (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     created_at TIMESTAMP DEFAULT NOW(),
     locale VARCHAR(5) DEFAULT 'en'
   );
   ```

3. **Row Level Security**
   ```sql
   ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Enable insert for all users" ON waitlist
   FOR INSERT WITH CHECK (true);
   ```

### Medusa Setup (Future)
1. **Backend Setup**
   ```bash
   cd medusa-backend
   npm install
   npm run seed
   npm run start
   ```

2. **Admin Dashboard**
   ```bash
   npm run dev:admin  # http://localhost:7001
   ```

## Internationalization

### Locale Configuration
- **Supported locales**: en, bg, es, fr, de, it
- **Default locale**: en
- **Currency support**: GBP, BGN, EUR

### Deployment Considerations
- All locales built at build time
- Static generation for SEO
- Proper hreflang tags

## CI/CD Pipeline

### GitHub Actions (Recommended)
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g pnpm
      - run: pnpm install
      - run: pnpm quality
      - run: pnpm build
      - run: pnpm test:run
```

## Troubleshooting

### Common Issues
1. **Build Failures**
   - Check TypeScript errors: `pnpm typecheck`
   - Verify environment variables
   - Clear .next directory

2. **Performance Issues**
   - Run bundle analysis: `pnpm build:analyze`
   - Check Core Web Vitals: `/production-dashboard`
   - Review Lighthouse report

3. **Deployment Issues**
   - Verify all environment variables
   - Check build logs
   - Ensure correct Node.js version

### Debug Commands
```bash
# Check build
pnpm build

# Analyze bundle
pnpm build:analyze

# Run all quality checks
pnpm quality

# Production validation
pnpm prod:validate
```

## Rollback Strategy

### Vercel
- Use deployment history in dashboard
- Instant rollback to previous deployment
- Maintain environment variable history

### Manual Rollback
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or rollback specific commit
git reset --hard <commit-hash>
git push --force-with-lease origin main
```

This deployment guide ensures reliable, performant, and secure production deployments.