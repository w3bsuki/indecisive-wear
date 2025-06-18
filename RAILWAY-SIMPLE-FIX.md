# Railway Simple Fix - Get Medusa Running NOW

## Step 1: Delete Everything and Start Fresh

1. Go to Railway Dashboard
2. Delete the current project completely
3. Create a NEW project

## Step 2: Deploy with This Template

Use Railway's Medusa template instead of manual setup:

1. Go to: https://railway.app/template/medusa
2. Click "Deploy Now"
3. Connect your GitHub account
4. Wait for deployment (3-5 minutes)

## Step 3: If Template Doesn't Work, Manual Fix

### Create New Project:
1. New Project → Deploy from GitHub repo
2. Select your repo
3. Add PostgreSQL database

### Set These EXACT Environment Variables:
```
DATABASE_URL=${{Postgres.DATABASE_PRIVATE_URL}}
MEDUSA_ADMIN_ONBOARDING_TYPE=default
NODE_ENV=production
JWT_SECRET=something-super-secret-change-this-in-production
COOKIE_SECRET=something-super-secret-change-this-in-production
STORE_CORS=*
ADMIN_CORS=*
AUTH_CORS=*
PORT=9000
```

### Service Settings:
- Root Directory: `/store`
- Build Command: `npm install && npm run build`
- Start Command: `npm run start`

## Step 4: Create Admin User

After deployment succeeds:
1. Click the terminal icon in Railway
2. Run:
```bash
cd /app/store
npx medusa user -e admin@test.com -p admin123
```

## Step 5: Access Admin

Go to: `https://[your-app].up.railway.app/app`

## If Still Failing

The issue is likely:
1. Database connection - Check logs for "database" errors
2. Missing dependencies - Try adding to package.json:
```json
"dependencies": {
  "express": "^4.18.2",
  "cors": "^2.8.5"
}
```

## Nuclear Option

If nothing works, use Render instead:
1. render.com → New → Web Service
2. Connect repo
3. Use same environment variables
4. Render handles Medusa better than Railway sometimes