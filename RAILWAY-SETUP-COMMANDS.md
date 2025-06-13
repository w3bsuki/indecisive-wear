# Railway Setup Commands

Run these in your terminal after logging in:

## 1. Login to Railway
```bash
railway login
```

## 2. Create New Project
```bash
cd /home/w3bsuki/indecisive-wear-main
railway init
```
- Choose "Empty Project"
- Give it a name like "indecisive-wear-backend"

## 3. Add PostgreSQL Database
```bash
railway add
```
- Choose "PostgreSQL"

## 4. Add Redis (Optional but recommended)
```bash
railway add
```
- Choose "Redis"

## 5. Set Environment Variables
```bash
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=your-super-secret-jwt-key-make-it-long-as-fuck
railway variables set COOKIE_SECRET=another-super-secret-cookie-key-also-long
railway variables set STORE_CORS=http://localhost:3000,https://indecisive-wear.vercel.app
railway variables set ADMIN_CORS=https://*.up.railway.app
railway variables set AUTH_CORS=https://*.up.railway.app
```

## 6. Deploy
```bash
railway up
```

## 7. Get Your URL
```bash
railway domain
```

## 8. Open Shell to Create Admin
```bash
railway shell
```

Then in the shell:
```bash
cd /app/store
npx medusa user -e admin@indecisivewear.com -p YourPassword123!
```

That's it! Your backend will be live at the URL Railway gives you.