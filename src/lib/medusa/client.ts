/**
 * Medusa Client Configuration
 * Production-ready client for all Medusa API interactions
 */

import Medusa from "@medusajs/js-sdk"
import type { Config } from "@medusajs/js-sdk"
import { env } from "@/lib/config/environment"

// Configure Medusa client
const config: Config = {
  baseUrl: env.MEDUSA_URL,
  debug: false, // Never expose debug info
  publishableKey: env.MEDUSA_PUBLISHABLE_KEY,
}

// Create Medusa client instance
export const medusa = new Medusa(config)

// Export types for TypeScript
export type MedusaClient = typeof medusa
export * from "@medusajs/types"