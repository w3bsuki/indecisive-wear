# Railway Deployment Fix

## CRITICAL: Set These Environment Variables in Railway Dashboard

1. **DATABASE_URL** = ${{Postgres.DATABASE_PUBLIC_URL}}
   - MUST use PUBLIC URL, not the default DATABASE_URL
   - DO NOT include backticks or quotes around the value
   - This is the #1 cause of deployment failures

2. **MEDUSA_WORKER_MODE** = server

3. **JWT_SECRET** = (generate a secure random string)

4. **COOKIE_SECRET** = (generate a secure random string)

5. **ADMIN_EMAIL** = admin@indecisive-wear.com

6. **ADMIN_PASSWORD** = (set your admin password)

## Deployment Process

1. Push this code to master branch
2. Railway will:
   - Install dependencies
   - Wait for database to be ready
   - Run migrations (with retries)
   - Create admin user
   - Start Medusa server

## Access Admin Panel

After successful deployment:
- URL: `https://your-app.up.railway.app/app`
- Login with ADMIN_EMAIL and ADMIN_PASSWORD

## If Still Failing

Check Railway logs for:
- "Migrations completed successfully!" - if missing, database isn't connecting
- Look for DATABASE_URL value - ensure it's not null or undefined