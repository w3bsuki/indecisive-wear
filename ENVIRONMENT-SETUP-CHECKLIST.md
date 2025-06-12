# 🔧 Environment Setup Checklist - Production Ready

**Complete Development Environment Setup for Indecisive Wear**

---

## 📋 Prerequisites Verification

### System Requirements
- [ ] **Node.js**: v18.17.0 or higher (`node --version`)
- [ ] **pnpm**: v8.0.0 or higher (`pnpm --version`)  
- [ ] **Git**: Latest version (`git --version`)
- [ ] **VSCode**: With recommended extensions
- [ ] **Chrome/Firefox**: For testing and debugging

### VSCode Extensions (Recommended)
- [ ] **TypeScript and JavaScript**: Built-in
- [ ] **Tailwind CSS IntelliSense**: bradlc.vscode-tailwindcss
- [ ] **ES7+ React/Redux/React-Native snippets**: dsznajder.es7-react-js-snippets
- [ ] **Prettier**: esbenp.prettier-vscode
- [ ] **ESLint**: dbaeumer.vscode-eslint
- [ ] **GitLens**: eamodio.gitlens

---

## 🌐 Phase 1: Basic Development Environment

### 1.1 Project Dependencies
```bash
# Install project dependencies (should already be done)
pnpm install

# Verify installation
pnpm --version
```

### 1.2 Environment Variables Setup
```bash
# Copy environment template
cp .env.local.example .env.local

# Edit .env.local with your values:
nano .env.local
```

**Required Environment Variables:**
```env
# CRITICAL - Must have for build to work
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# Clerk URLs (use defaults)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/shop
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/shop
```

### 1.3 Verification Tests
```bash
# Test TypeScript compilation
pnpm typecheck
# Expected: Should pass after TypeScript fixes

# Test build process
pnpm build
# Expected: Should succeed after environment setup

# Test development server
pnpm dev
# Expected: Should start on http://localhost:3000
```

---

## 🔐 Phase 2: Authentication Setup (Clerk)

### 2.1 Clerk Account Setup
- [ ] **Create Clerk Account**: Go to [clerk.com](https://clerk.com)
- [ ] **Create New Application**: Name it "Indecisive Wear"
- [ ] **Choose Authentication Methods**:
  - [ ] Email/Password (required)
  - [ ] Google (recommended)
  - [ ] Facebook (optional)
  - [ ] Phone Number (optional)

### 2.2 Clerk Configuration
```bash
# From Clerk Dashboard → API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxx
```

### 2.3 Clerk Settings Configuration
- [ ] **Session Settings**: Set session timeout to 7 days
- [ ] **Security**: Enable bot protection
- [ ] **Appearance**: Theme settings (handled in code)
- [ ] **Domains**: Add localhost:3000 for development

### 2.4 Webhook Setup (for production)
- [ ] **Create Endpoint**: `https://yourdomain.com/api/webhooks/clerk`
- [ ] **Select Events**: user.created, user.updated, user.deleted
- [ ] **Copy Signing Secret**: Add to `CLERK_WEBHOOK_SECRET`

### 2.5 Testing Authentication
```bash
# Start development server
pnpm dev

# Test flow:
# 1. Visit http://localhost:3000
# 2. Click user icon → should redirect to sign-in
# 3. Create test account
# 4. Should redirect to /shop
# 5. User avatar should appear in navbar
```

---

## 💾 Phase 3: Database Setup (Choose Your Path)

### Option A: Supabase Setup (Recommended)

#### 3.1 Supabase Account
- [ ] **Create Account**: [supabase.com](https://supabase.com)
- [ ] **Create New Project**: Name it "indecisive-wear"
- [ ] **Choose Region**: Closest to your users
- [ ] **Set Database Password**: Strong password

#### 3.2 Supabase Configuration
```env
# Add to .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 3.3 Database Schema Setup
```sql
-- Run in Supabase SQL Editor
-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  images TEXT[] NOT NULL,
  sizes TEXT[] DEFAULT '{"XS","S","M","L","XL","XXL"}',
  colors TEXT[] NOT NULL,
  category TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);

-- Waitlist table  
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Waitlist entries are viewable by authenticated users" ON waitlist FOR SELECT USING (auth.role() = 'authenticated');
```

#### 3.4 Test Database Connection
```bash
# Install Supabase client
pnpm add @supabase/supabase-js

# Test connection (create test file)
node -e "
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
supabase.from('products').select('count').then(console.log);
"
```

### Option B: Medusa Setup (Advanced)

#### 3.1 PostgreSQL Installation
```bash
# Ubuntu/WSL
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql

# macOS
brew install postgresql
brew services start postgresql
```

#### 3.2 Database Creation
```bash
# Create database
sudo -u postgres createdb indecisive_wear_medusa

# Create user
sudo -u postgres psql -c "CREATE USER medusa_user WITH PASSWORD 'secure_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE indecisive_wear_medusa TO medusa_user;"
```

#### 3.3 Medusa Backend Setup
```bash
# Navigate to store directory
cd store/

# Install dependencies
npm install

# Configure environment
cp .env.template .env
# Edit .env with database URL and secrets

# Run migrations
npx medusa db:migrate

# Seed data
npm run seed
```

---

## 💳 Phase 4: Payment Setup (Stripe)

### 4.1 Stripe Account Setup
- [ ] **Create Stripe Account**: [stripe.com](https://stripe.com)
- [ ] **Activate Account**: Complete business verification
- [ ] **Get API Keys**: Dashboard → Developers → API Keys

### 4.2 Stripe Configuration
```env
# Add to .env.local
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 4.3 Stripe Installation
```bash
# Install Stripe dependencies
pnpm add @stripe/stripe-js @stripe/react-stripe-js stripe
```

### 4.4 Test Stripe Integration
```bash
# Create test payment intent
curl https://api.stripe.com/v1/payment_intents \
  -H "Authorization: Bearer sk_test_..." \
  -d amount=2000 \
  -d currency=gbp \
  -d automatic_payment_methods[enabled]=true
```

---

## 🚀 Phase 5: Production Environment

### 5.1 Hosting Setup (Vercel Recommended)
- [ ] **Create Vercel Account**: [vercel.com](https://vercel.com)
- [ ] **Connect GitHub**: Link your repository
- [ ] **Configure Environment Variables**: Add all production values
- [ ] **Custom Domain**: Configure your domain name

### 5.2 Production Environment Variables
```env
# Production values (different from development)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_SUPABASE_URL=https://prod-project.supabase.co
```

### 5.3 Domain Configuration
- [ ] **DNS Setup**: Point domain to Vercel
- [ ] **SSL Certificate**: Automatic with Vercel
- [ ] **Clerk Domain**: Add production domain to Clerk
- [ ] **Stripe Domain**: Add to Stripe webhook endpoints

---

## ✅ Verification Checklist

### Development Environment Ready
- [ ] `pnpm dev` starts without errors
- [ ] `pnpm build` completes successfully  
- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] Authentication flow works (sign up/sign in)
- [ ] Database connection established
- [ ] Stripe test payment works

### Production Environment Ready
- [ ] Domain configured and SSL active
- [ ] All environment variables set in Vercel
- [ ] Clerk production app configured
- [ ] Stripe live mode configured
- [ ] Database production instance ready
- [ ] Monitoring and error tracking active

---

## 🆘 Troubleshooting Common Issues

### Build Failures
```bash
# Clear Next.js cache
rm -rf .next
pnpm build

# Clear node modules
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Clerk Integration Issues
```bash
# Check environment variables are loaded
echo $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

# Verify Clerk configuration
# Check browser console for Clerk errors
# Ensure domains are added to Clerk dashboard
```

### Database Connection Issues
```bash
# Test Supabase connection
curl -H "apikey: your-anon-key" "https://your-project.supabase.co/rest/v1/products"

# Check PostgreSQL connection (Medusa)
psql -h localhost -U medusa_user -d indecisive_wear_medusa -c "SELECT NOW();"
```

### TypeScript Errors
```bash
# Regenerate types
pnpm typecheck --noEmit false

# Check tsconfig.json configuration
# Ensure all paths are correct
```

---

## 📚 Additional Resources

### Documentation Links
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Clerk**: [clerk.com/docs](https://clerk.com/docs)
- **Supabase**: [supabase.com/docs](https://supabase.com/docs)
- **Stripe**: [stripe.com/docs](https://stripe.com/docs)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)

### Monitoring & Analytics
- **Vercel Analytics**: Built-in performance monitoring
- **Sentry**: Error tracking and performance monitoring
- **Google Analytics**: User behavior tracking
- **Stripe Dashboard**: Payment analytics

---

*This checklist ensures a complete, production-ready development environment. Complete each phase in order for the smoothest setup experience.*