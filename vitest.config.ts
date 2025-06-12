import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    // Environment
    environment: 'jsdom',
    
    // Setup files
    setupFiles: ['./src/lib/testing/test-setup.ts'],
    
    // Global test settings
    globals: true,
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        '.next/',
        'coverage/',
        '**/*.d.ts',
        '**/*.config.{js,ts,mjs}',
        '**/index.ts',
        'src/app/**/layout.tsx',
        'src/app/**/loading.tsx',
        'src/app/**/not-found.tsx',
        'src/app/**/error.tsx',
        'src/app/**/page.tsx',
        'src/lib/testing/**',
        'src/components/ui/index.ts',
        '**/*.stories.{js,ts,tsx}',
        '.storybook/**',
        'storybook-static/**',
        'playwright.config.ts',
        'tailwind.config.ts',
        'next.config.mjs',
        'postcss.config.mjs',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    
    // Include patterns
    include: [
      'src/**/*.{test,spec}.{js,ts,tsx}',
      'src/**/__tests__/**/*.{js,ts,tsx}',
    ],
    
    // Exclude patterns
    exclude: [
      'node_modules/',
      '.next/',
      'coverage/',
      'e2e/',
      '**/*.e2e.{js,ts}',
    ],
    
    // Test timeout
    testTimeout: 10000,
    
    // Reporting
    reporters: ['verbose', 'html'],
    outputFile: {
      html: './coverage/test-results.html',
    },
    
    // Retry flaky tests
    retry: 2,
    
    // Run tests in parallel
    pool: 'threads',
    poolOptions: {
      threads: {
        minThreads: 1,
        maxThreads: 4,
      },
    },
  },
  
  // Path resolution to match Next.js
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/lib': resolve(__dirname, './src/lib'),
      '@/hooks': resolve(__dirname, './src/hooks'),
      '@/stores': resolve(__dirname, './src/stores'),
      '@/styles': resolve(__dirname, './src/styles'),
      '@/app': resolve(__dirname, './src/app'),
      
      // Atomic design aliases
      '@/atoms': resolve(__dirname, './src/components/atoms'),
      '@/molecules': resolve(__dirname, './src/components/molecules'),
      '@/organisms': resolve(__dirname, './src/components/organisms'),
      '@/templates': resolve(__dirname, './src/components/templates'),
      '@/design-tokens': resolve(__dirname, './src/lib/design-tokens'),
      '@/composition': resolve(__dirname, './src/lib/component-composition'),
    },
  },
  
  // Define globals for better TypeScript support
  define: {
    'process.env.NODE_ENV': '"test"',
  },
}) 