# Railway Deployment for Medusa v2

## Quick Deploy Steps:

### 1. Create New Project on Railway
- Go to https://railway.app/new
- Click "Deploy from GitHub repo"
- Select your `indecisive-wear` repo
- Choose "Empty Service"

### 2. Configure Service
- **Service name**: medusa-backend
- **Root directory**: `/store`
- **Build command**: `npm install && npm run build`
- **Start command**: `npm run start`

### 3. Add PostgreSQL
- Click "New" in your project
- Choose "Database" → "PostgreSQL"
- It auto-connects, no URL bullshit needed

### 4. Add Redis (Optional)
- Click "New" → "Database" → "Redis"
- Auto-connects too

### 5. Set Environment Variables
Click on your service → Variables → Add:

```
NODE_ENV=production
JWT_SECRET=your-jwt-secret-here-make-it-long
COOKIE_SECRET=your-cookie-secret-here-also-long
STORE_CORS=http://localhost:3000,https://indecisive-wear.vercel.app
ADMIN_CORS=https://*.up.railway.app
AUTH_CORS=https://*.up.railway.app
```

### 6. Deploy
- Push your code or click "Deploy"
- Takes 3-5 minutes

### 7. Create Admin User (THIS ACTUALLY WORKS)
- Click on your service
- Go to "Settings" tab
- Click "Generate Domain" to get your URL
- Click the terminal icon (🖥️) - YES, FREE SHELL ACCESS!
- Run:
```bash
cd /app
npx medusa user -e admin@indecisivewear.com -p yourpassword
```

### 8. Access Your Backend
- API: https://your-app.up.railway.app/store
- Admin: https://your-app.up.railway.app/app

## Why Railway Doesn't Suck:
1. **Free shell access** - Can actually run commands
2. **No cold starts** - Stays warm for 500 hours/month free
3. **Auto SSL** - HTTPS works immediately
4. **Better logs** - Can actually debug
5. **PostgreSQL included** - No external database BS

## If Deploy Fails:
Check logs in Railway dashboard - they actually show useful errors unlike Render's garbage.