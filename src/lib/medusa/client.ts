/**
 * Medusa Client Configuration
 * Centralized client for all Medusa API interactions
 */

import Medusa from "@medusajs/js-sdk"
import { mockMedusaClient, medusaClient } from "./mock-client"

// Get Medusa backend URL from environment
const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_URL || "http://localhost:9000"

// Determine if we should use mock or real client
const USE_MOCK = process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_USE_REAL_MEDUSA !== "true"

// Create real Medusa client instance
const realMedusaClient = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})

// Export the appropriate client based on environment
export const medusa = USE_MOCK ? mockMedusaClient : realMedusaClient

// Helper to check if using mock
export const isMockMode = USE_MOCK

// Export types for TypeScript
export type MedusaClient = typeof Medusa
export * from "@medusajs/types"