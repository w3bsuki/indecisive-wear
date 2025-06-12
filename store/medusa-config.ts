import { loadEnv, defineConfig, Modules } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:3000,https://indecisive-wear.vercel.app",
      adminCors: process.env.ADMIN_CORS || "https://*.onrender.com", 
      authCors: process.env.AUTH_CORS || "https://*.onrender.com",
      jwtSecret: process.env.JWT_SECRET || require('crypto').randomBytes(64).toString('hex'),
      cookieSecret: process.env.COOKIE_SECRET || require('crypto').randomBytes(64).toString('hex'),
    }
  },
  modules: {
    // Disable problematic modules for now
    [Modules.STOCK_LOCATION]: false,
    [Modules.INVENTORY]: false,
    [Modules.FULFILLMENT]: false,
  }
})
