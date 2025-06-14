const { loadEnv, defineConfig, Modules } = require('@medusajs/framework/utils');

loadEnv(process.env.NODE_ENV || 'development', process.cwd());

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
    workerMode: process.env.MEDUSA_WORKER_MODE,
    http: {
      port: parseInt(process.env.PORT || "9000"),
      storeCors: process.env.STORE_CORS || "http://localhost:3000,https://indecisive-wear.vercel.app",
      adminCors: process.env.ADMIN_CORS || "https://*.onrender.com,http://localhost:9000", 
      authCors: process.env.AUTH_CORS || "https://*.onrender.com,http://localhost:9000",
      jwtSecret: process.env.JWT_SECRET || generateSecret(),
      cookieSecret: process.env.COOKIE_SECRET || generateSecret(),
    },
    redisUrl: process.env.REDIS_URL,
  },
  admin: {
    backendUrl: process.env.MEDUSA_ADMIN_BACKEND_URL || process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
    path: "/app",
    disable: false,
  },
  modules: process.env.REDIS_URL ? [
    {
      resolve: "@medusajs/medusa/cache-redis",
      options: { 
        redisUrl: process.env.REDIS_URL 
      }
    },
    {
      resolve: "@medusajs/medusa/event-bus-redis", 
      options: { 
        redisUrl: process.env.REDIS_URL 
      }
    },
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: { 
        redis: { 
          url: process.env.REDIS_URL 
        } 
      }
    }
  ] : undefined
})