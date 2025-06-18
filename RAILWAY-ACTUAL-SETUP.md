# Railway - What Actually Works

## Fuck the CLI, Use the Dashboard

1. **Go to https://railway.app/new**

2. **Click "Deploy from GitHub repo"**
   - Connect your GitHub
   - Select `indecisive-wear`

3. **Add Services:**
   - Click "+ New" → PostgreSQL
   - Click "+ New" → Your repo

4. **Configure Your Service:**
   - Click on your service
   - Go to "Settings"
   - Set Root Directory: `/store`
   - Deploy

5. **Set Environment Variables:**
   In your service, go to "Variables" and add:
   ```
   NODE_ENV=production
   JWT_SECRET=anylongstringhere
   COOKIE_SECRET=anotherlongstringhere
   STORE_CORS=https://indecisive-wear.vercel.app
   ADMIN_CORS=https://*.up.railway.app
   AUTH_CORS=https://*.up.railway.app
   ```

6. **Generate Domain:**
   - Settings → Networking → Generate Domain
   - You get: `https://your-app.up.railway.app`

7. **Create Admin User:**
   - Click the "Shell" button in Railway dashboard
   - Run:
   ```bash
   cd store
   npx medusa user -e admin@example.com -p password
   ```

## If You Want to Use CLI:

The actual working commands:
```bash
# Link existing project
railway link [project-id]

# Deploy
railway up

# Open in browser
railway open
```

The `railway domain` command doesn't exist. You generate domains in the dashboard.