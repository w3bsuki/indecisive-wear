# Render.com Deployment Guide for Medusa

## Step 1: Create Render Account
Go to https://render.com and sign up (free tier available)

## Step 2: Create PostgreSQL Database First
1. Dashboard → New → PostgreSQL
2. Name: `indecisive-wear-db`
3. Database: `indecisive_wear`
4. User: Leave default
5. Region: Choose closest to you
6. Plan: Free tier is fine
7. Click "Create Database"
8. Wait for it to be ready (2-3 minutes)
9. Copy the "Internal Database URL" (starts with postgres://)

## Step 3: Deploy Medusa Backend
1. Dashboard → New → Web Service
2. Connect your GitHub account
3. Select your `indecisive-wear` repository
4. Configure:
   - Name: `indecisive-wear-backend`
   - Root Directory: `store`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`
   - Plan: Free tier

## Step 4: Add Environment Variables
Click "Environment" tab and add:

```
DATABASE_URL=[paste the Internal Database URL from step 2]
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-this
COOKIE_SECRET=your-super-secret-cookie-key-change-this
STORE_CORS=https://indecisive-wear.vercel.app,http://localhost:3000
ADMIN_CORS=https://indecisive-wear-backend.onrender.com
AUTH_CORS=https://indecisive-wear-backend.onrender.com
PORT=9000
MEDUSA_ADMIN_BACKEND_URL=https://indecisive-wear-backend.onrender.com
```

## Step 5: Deploy
1. Click "Create Web Service"
2. Wait for build and deploy (5-10 minutes first time)
3. Check logs for "Server is ready on port: 9000"

## Step 6: Run Migrations
1. Go to your web service dashboard
2. Click "Shell" tab
3. Run:
```bash
cd store
npx medusa db:migrate
```

## Step 7: Create Admin User
Still in the Shell:
```bash
npx medusa user -e admin@indecisive-wear.com -p YourPassword123
```

## Step 8: Access Admin Panel
Go to: `https://indecisive-wear-backend.onrender.com/app`

## Important Notes
- Render free tier spins down after 15 minutes of inactivity
- First request after spin down takes ~30 seconds
- Database is persistent even on free tier
- Logs are much clearer than Railway

## If This Fails Too
The issue might be with Medusa v2 itself. Consider:
1. Downgrading to Medusa v1 (more stable)
2. Using Medusa Cloud (their official hosting)
3. Using a VPS with Docker

## Render Advantages Over Railway
- Better Medusa compatibility
- Clearer error messages
- Built-in shell access that actually works
- Free tier doesn't have as many restrictions