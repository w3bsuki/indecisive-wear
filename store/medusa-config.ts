import { loadEnv, defineConfig, Modules } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())


module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:3000,https://indecisive-wear.vercel.app",
      adminCors: process.env.ADMIN_CORS || "https://*.up.railway.app,http://localhost:9000", 
      authCors: process.env.AUTH_CORS || "https://*.up.railway.app,http://localhost:9000",
      jwtSecret: process.env.JWT_SECRET || require('crypto').randomBytes(64).toString('hex'),
      cookieSecret: process.env.COOKIE_SECRET || require('crypto').randomBytes(64).toString('hex'),
    },
    redisUrl: process.env.REDIS_URL,
  },
  admin: {
    backendUrl: process.env.MEDUSA_ADMIN_BACKEND_URL || process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
    path: "/app" as `/${string}`,
  },
  modules: {
    // Disable problematic modules that fail without migrations
    [Modules.STOCK_LOCATION]: false,
    [Modules.INVENTORY]: false,
    [Modules.FULFILLMENT]: false,
    [Modules.TAX]: false,
    [Modules.PAYMENT]: false,
  }
})
