# Medusa v2 Production Deployment on Render

This guide provides a complete, tested solution for deploying Medusa v2 with the admin panel on Render.

## Architecture Overview

Medusa v2 uses a build process that creates a production-ready application in the `.medusa/server` directory. This includes:
- Compiled backend code
- Admin panel static files in `.medusa/server/public/admin`
- Production-optimized configuration

## Deployment Configuration

### 1. Build Process
The `render-build.sh` script handles:
- Installing dependencies
- Building Medusa with admin panel
- Verifying build output
- Ensuring admin panel files exist

### 2. Start Process
The `start-production.sh` script handles:
- Checking for build artifacts
- Copying environment variables
- Running database migrations
- Starting the server from the build directory

### 3. Key Files

#### `render.yaml`
- Defines infrastructure as code
- Creates PostgreSQL database
- Sets up Redis for caching
- Configures environment variables
- Specifies build and start commands

#### `medusa-config.ts`
- Production-ready configuration
- Admin panel path set to `/app`
- Disabled problematic modules for initial deployment
- Dynamic backend URL for admin panel

#### `package.json` Scripts
- `build`: Runs Medusa build process
- `start`: Executes production start script
- Migrations run automatically on start

## Environment Variables

### Required Variables
```
DATABASE_URL          # PostgreSQL connection (auto-set by Render)
JWT_SECRET           # Authentication secret (auto-generated)
COOKIE_SECRET        # Session secret (auto-generated)
NODE_ENV=production  # Production mode
```

### CORS Configuration
```
STORE_CORS=http://localhost:3000,https://indecisive-wear.vercel.app
ADMIN_CORS=https://*.onrender.com
AUTH_CORS=https://*.onrender.com
```

### Optional but Recommended
```
REDIS_URL            # Redis for caching (auto-set if using Blueprint)
MEDUSA_BACKEND_URL   # Backend URL for admin panel (auto-set)
```

## Deployment Steps

### Option A: Blueprint Deployment (Recommended)
1. Push code to GitHub
2. Go to Render Dashboard
3. New → Blueprint
4. Select repository
5. Render detects `render.yaml` automatically
6. Click Apply

### Option B: Manual Deployment
1. Create PostgreSQL database first
2. Create Web Service with:
   - Root Directory: `store`
   - Build Command: `./render-build.sh`
   - Start Command: `npm run start`
3. Add all environment variables
4. Deploy

## Post-Deployment

### 1. Verify Deployment
- Health: `https://your-app.onrender.com/health`
- Store API: `https://your-app.onrender.com/store`
- Admin Panel: `https://your-app.onrender.com/app`

### 2. Create Admin User
Use Render Shell or run locally with production DATABASE_URL:
```bash
cd .medusa/server
npx medusa user -e admin@example.com -p yourpassword
```

### 3. Update Frontend
```env
NEXT_PUBLIC_MEDUSA_URL=https://your-app.onrender.com
```

## Troubleshooting

### "index.html not found" Error
- Ensure build completes successfully
- Check `.medusa/server/public/admin/` exists
- Verify `render-build.sh` runs without errors

### Database Connection Issues
- Use Internal Database URL (not External)
- Ensure migrations run before server start
- Check DATABASE_URL is properly set

### Admin Panel Not Loading
- Verify MEDUSA_BACKEND_URL is set correctly
- Check ADMIN_CORS includes your domain
- Ensure build includes admin panel

### Performance Issues
- Enable Redis for caching
- Consider upgrading from free tier
- Monitor memory usage (2GB+ recommended)

## Production Best Practices

1. **Security**
   - Use strong JWT_SECRET and COOKIE_SECRET
   - Keep environment variables secure
   - Regular security updates

2. **Monitoring**
   - Set up error tracking (Sentry)
   - Monitor performance metrics
   - Configure alerts for downtime

3. **Scaling**
   - Use Redis for session storage
   - Consider worker mode for background tasks
   - Implement CDN for static assets

4. **Maintenance**
   - Regular database backups
   - Keep dependencies updated
   - Monitor disk usage

## Next Steps

1. Configure payment providers (Stripe)
2. Set up email notifications (SendGrid)
3. Implement file storage (S3)
4. Add custom modules as needed

This configuration has been tested and addresses all common deployment issues with Medusa v2 on Render.