import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

/**
 * ESLint Configuration
 * Compatible with Next.js 15 and React 19
 */

export default [
  // Global ignores
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
      'storybook-static/**',
      '**/*.d.ts',
      'public/**',
    ],
  },
  
  // Include Next.js recommended config
  ...compat.extends('next/core-web-vitals'),
  
  // Additional rules for TypeScript and React
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Relaxed rules for development
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-console': 'warn',
    },
  },
] 