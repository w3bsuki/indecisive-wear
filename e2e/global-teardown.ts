import type { FullConfig } from '@playwright/test'

async function globalTeardown(_config: FullConfig) {
  console.log('🧹 Starting global teardown...')
  
  try {
    // Clean up any global resources
    // For example, stop test databases, clear auth states, etc.
    
    console.log('✅ Global teardown completed')
  } catch (error) {
    console.error('❌ Global teardown failed:', error)
    // Don't throw errors in teardown as it might mask test failures
  }
}

export default globalTeardown 