# Manual Render Setup for Medusa Backend

Since the Blueprint detection seems to have issues, here's the manual setup process:

## Step 1: Create PostgreSQL Database

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "PostgreSQL"
3. Configure:
   - Name: `indecisive-wear-db`
   - Database: `indecisive_wear_db`
   - User: `indecisive_wear` (auto-generated)
   - Region: Choose closest to you
   - Plan: Free
4. Click "Create Database"
5. Wait for it to be created, then copy the **Internal Database URL** (not external)

## Step 2: Create Web Service

1. Click "New +" → "Web Service"
2. Connect GitHub repository: `w3bsuki/indecisive-wear`
3. Configure:
   - Name: `indecisive-wear-medusa`
   - Region: Same as database
   - Branch: `master`
   - **Root Directory: `store`** (IMPORTANT!)
   - Runtime: Node
   - Build Command: `npm install && npm run build && npx medusa db:migrate`
   - Start Command: `npm run start`
   - Plan: Free

## Step 3: Add Environment Variables

Before deploying, add these environment variables:

```
NODE_ENV=production
DATABASE_URL=[Paste Internal Database URL from Step 1]
JWT_SECRET=your-super-secret-jwt-key-change-this
COOKIE_SECRET=your-super-secret-cookie-key-change-this
STORE_CORS=http://localhost:3000,https://indecisive-wear.vercel.app
ADMIN_CORS=https://*.onrender.com
AUTH_CORS=https://*.onrender.com
```

Generate secure secrets using:
```bash
openssl rand -hex 32
```

## Step 4: Deploy

Click "Create Web Service" and Render will:
1. Clone your repository
2. Install dependencies in the `store` directory
3. Build Medusa
4. Run database migrations
5. Start the server

## Step 5: Verify Deployment

Once deployed, check:
- API Health: `https://your-service.onrender.com/health`
- Store API: `https://your-service.onrender.com/store`
- Admin Panel: `https://your-service.onrender.com/app`

## Step 6: Create Admin User

Use Render Shell (in dashboard) or run locally with production DATABASE_URL:

```bash
npx medusa user -e admin@indecisivewear.com -p your-secure-password
```

## Troubleshooting

If build fails:
1. Check logs in Render dashboard
2. Ensure Node version is 20+ (already set in package.json)
3. Verify DATABASE_URL is the Internal URL
4. Check that all environment variables are set

## Next Steps

1. Update frontend `.env.local`:
   ```
   NEXT_PUBLIC_MEDUSA_URL=https://your-service.onrender.com
   ```

2. Test the integration:
   - Admin panel login
   - API endpoints
   - Frontend connection