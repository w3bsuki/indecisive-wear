import { loadEnv, defineConfig, Modules } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// Helper to safely generate secrets
const generateSecret = () => {
  try {
    return require('crypto').randomBytes(64).toString('hex');
  } catch {
    return 'fallback-secret-' + Date.now();
  }
};

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    workerMode: process.env.MEDUSA_WORKER_MODE as "shared" | "worker" | "server",
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:3000,https://indecisive-wear.vercel.app",
      adminCors: process.env.ADMIN_CORS || "https://*.up.railway.app,http://localhost:9000", 
      authCors: process.env.AUTH_CORS || "https://*.up.railway.app,http://localhost:9000",
      jwtSecret: process.env.JWT_SECRET || generateSecret(),
      cookieSecret: process.env.COOKIE_SECRET || generateSecret(),
    },
    redisUrl: process.env.REDIS_URL,
  },
  admin: {
    backendUrl: process.env.MEDUSA_ADMIN_BACKEND_URL || process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
    path: "/app" as `/${string}`,
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
  },
  modules: process.env.MEDUSA_WORKER_MODE === "worker" ? {} : undefined
})
