# Render Deployment Guide for Medusa Backend

## Prerequisites
- GitHub account connected to Render
- Render account (free tier works)
- Frontend deployed to Vercel (or update CORS settings)

## Step-by-Step Deployment

### 1. Prepare Your Repository
Ensure your repository contains:
- ✅ `render.yaml` (in repository root - deployment configuration)
- ✅ `store/medusa-config.ts` (already configured)
- ✅ `store/render-build.sh` (build script)
- ✅ `store/.env.template` (environment variable reference)

### 2. Deploy via Render Dashboard

#### Option A: Using render.yaml (Recommended)
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Select `indecisive-wear-main` repository
5. Render will automatically detect `render.yaml` in the root
6. Click "Apply"

Render will automatically:
- Create PostgreSQL database
- Create Redis instance
- Set up web service with proper environment variables
- Run migrations on deploy

#### Option B: Manual Setup
1. Create PostgreSQL Database:
   - New → PostgreSQL
   - Name: `indecisive-wear-db`
   - Database: `indecisive_wear_db`
   - Plan: Starter (free)
   - Create Database

2. Create Web Service:
   - New → Web Service
   - Connect repository: `indecisive-wear-main`
   - Name: `indecisive-wear-medusa`
   - Root Directory: `store`
   - Runtime: Node
   - Build Command: `npm install && npm run build && npx medusa db:migrate`
   - Start Command: `npm run start`
   - Plan: Starter (free)

3. Add Environment Variables:
   ```bash
   NODE_ENV=production
   DATABASE_URL=[Copy from PostgreSQL dashboard]
   JWT_SECRET=[Click "Generate" or use a secure random string]
   COOKIE_SECRET=[Click "Generate" or use a secure random string]
   STORE_CORS=http://localhost:3000,https://indecisive-wear.vercel.app
   ADMIN_CORS=https://*.onrender.com
   AUTH_CORS=https://*.onrender.com
   ```

### 3. Post-Deployment Setup

Once deployed, your Medusa backend will be available at:
- API: `https://your-service-name.onrender.com/store`
- Admin: `https://your-service-name.onrender.com/app`

#### Create Admin User
```bash
# SSH into your Render service or run locally with production DATABASE_URL
npx medusa user -e admin@indecisivewear.com -p your-secure-password
```

#### Seed Initial Data (Optional)
```bash
# Run the seed script to populate sample products
npm run seed
```

### 4. Update Frontend Configuration

Update your frontend `.env.local`:
```bash
NEXT_PUBLIC_MEDUSA_URL=https://your-service-name.onrender.com
```

### 5. Configure Payment & Email Providers (Optional)

Add these environment variables when ready:
```bash
# Stripe
STRIPE_API_KEY=sk_live_...

# SendGrid
SENDGRID_API_KEY=SG...
SENDGRID_FROM_EMAIL=noreply@indecisivewear.com

# AWS S3 (for file uploads)
S3_BUCKET_NAME=indecisive-wear-uploads
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
S3_REGION=us-east-1
```

## Troubleshooting

### Common Issues

1. **Build Fails**: Check Node version (must be 20+)
2. **Database Connection**: Ensure DATABASE_URL is properly set
3. **CORS Errors**: Update STORE_CORS with your frontend URL
4. **Admin Panel 404**: Check ADMIN_CORS includes Render domain

### Monitoring

- View logs: Render Dashboard → Your Service → Logs
- Database metrics: PostgreSQL Dashboard → Metrics
- API health: `https://your-service.onrender.com/health`

### Performance Tips

1. Enable Redis for caching (included in render.yaml)
2. Scale to paid tier for better performance
3. Use CDN for static assets
4. Enable auto-scaling for traffic spikes

## Security Checklist

- [x] Strong JWT_SECRET and COOKIE_SECRET
- [x] CORS properly configured
- [x] Database uses SSL
- [x] Admin panel protected
- [ ] API rate limiting configured
- [ ] Regular security updates

## Next Steps

1. Create admin user
2. Configure payment provider
3. Set up email notifications
4. Import product catalog
5. Test checkout flow
6. Monitor performance