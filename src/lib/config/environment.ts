/**
 * Environment Configuration
 * Centralized environment variable management with validation
 */

// Environment types
export type Environment = 'development' | 'staging' | 'production'

// Environment configuration interface
interface EnvironmentConfig {
  // Application
  NODE_ENV: Environment
  APP_URL: string
  
  // Medusa Backend
  MEDUSA_URL: string
  MEDUSA_PUBLISHABLE_KEY?: string
  
  // Supabase
  SUPABASE_URL?: string
  SUPABASE_ANON_KEY?: string
  
  // Analytics
  VERCEL_ANALYTICS_ID?: string
  GA_MEASUREMENT_ID?: string
  
  // Features
  ENABLE_WAITLIST: boolean
  ENABLE_MOCK_DATA: boolean
  ENABLE_DEBUG: boolean
}

// Get environment with validation
function getEnvironment(): Environment {
  const env = process.env.NODE_ENV as string
  if (env === 'production' || env === 'staging' || env === 'development') {
    return env as Environment
  }
  return 'development'
}

// Validate required environment variables
function validateEnvironment(): void {
  const required = ['NEXT_PUBLIC_MEDUSA_URL']
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0 && process.env.NODE_ENV === 'production') {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

// Get environment configuration
export function getEnvironmentConfig(): EnvironmentConfig {
  validateEnvironment()
  
  const env = getEnvironment()
  const isDevelopment = env === 'development'
  const isProduction = env === 'production'
  
  return {
    // Application
    NODE_ENV: env,
    APP_URL: process.env.NEXT_PUBLIC_APP_URL || 
      (isProduction ? 'https://indecisive-wear.com' : 'http://localhost:3000'),
    
    // Medusa Backend
    MEDUSA_URL: process.env.NEXT_PUBLIC_MEDUSA_URL || 
      (isProduction ? 'https://indecisive-wear-backend.onrender.com' : 'http://localhost:9000'),
    MEDUSA_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
    
    // Supabase
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    
    // Analytics
    VERCEL_ANALYTICS_ID: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID,
    GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    
    // Features
    ENABLE_WAITLIST: process.env.NEXT_PUBLIC_ENABLE_WAITLIST !== 'false',
    ENABLE_MOCK_DATA: false, // Never use mock data
    ENABLE_DEBUG: isDevelopment && process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true',
  }
}

// Export singleton config
export const env = getEnvironmentConfig()

// Type-safe environment variable access
export function getEnvVar<K extends keyof EnvironmentConfig>(
  key: K
): EnvironmentConfig[K] {
  return env[key]
}

// Check if in production
export const isProduction = () => env.NODE_ENV === 'production'

// Check if in development
export const isDevelopment = () => env.NODE_ENV === 'development'

// Check if in staging
export const isStaging = () => env.NODE_ENV === 'staging'