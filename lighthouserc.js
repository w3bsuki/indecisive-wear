module.exports = {
  ci: {
    // Basic configuration
    collect: {
      // URLs to test
      url: [
        'http://localhost:3000',
        'http://localhost:3000/test-forms',
        'http://localhost:3000/performance-demo',
      ],
      
      // Collection settings
      numberOfRuns: 3, // Run multiple times for accurate averages
      startServerCommand: 'npm run build && npm run start',
      startServerReadyPattern: 'ready',
      startServerTimeout: 60000, // 60 seconds
      
      // Puppeteer settings for headless testing
      settings: {
        chromeFlags: [
          '--headless',
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--disable-extensions',
          '--no-first-run',
          '--disable-default-apps',
          '--disable-background-timer-throttling',
          '--disable-renderer-backgrounding',
          '--disable-backgrounding-occluded-windows',
        ],
        
        // Performance budget enforcement
        budgets: [
          {
            path: '/*',
            timings: [
              {
                metric: 'first-contentful-paint',
                budget: 2000, // 2 seconds
              },
              {
                metric: 'largest-contentful-paint',
                budget: 2500, // 2.5 seconds
              },
              {
                metric: 'cumulative-layout-shift',
                budget: 0.1,
              },
              {
                metric: 'total-blocking-time',
                budget: 300, // 300ms
              },
              {
                metric: 'max-potential-fid',
                budget: 100, // 100ms
              },
              {
                metric: 'speed-index',
                budget: 3000, // 3 seconds
              },
            ],
            resourceSizes: [
              {
                resourceType: 'script',
                budget: 150, // 150kb
              },
              {
                resourceType: 'stylesheet',
                budget: 50, // 50kb
              },
              {
                resourceType: 'image',
                budget: 200, // 200kb
              },
              {
                resourceType: 'font',
                budget: 100, // 100kb
              },
              {
                resourceType: 'total',
                budget: 500, // 500kb total
              },
            ],
            resourceCounts: [
              {
                resourceType: 'script',
                budget: 10,
              },
              {
                resourceType: 'stylesheet',
                budget: 5,
              },
              {
                resourceType: 'image',
                budget: 15,
              },
              {
                resourceType: 'font',
                budget: 5,
              },
            ],
          },
        ],
        
        // Emulation settings
        emulatedFormFactor: 'mobile',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
        
        // Disable irrelevant audits for faster runs
        skipAudits: [
          'robots-txt',
          'canonical',
          'structured-data',
        ],
        
        // Only run performance and best practices
        onlyCategories: ['performance', 'best-practices', 'accessibility', 'seo'],
        
        // Additional settings
        locale: 'en-US',
        blockedUrlPatterns: [
          // Block external analytics in CI
          '**/google-analytics.com/**',
          '**/googletagmanager.com/**',
          '**/facebook.com/**',
          '**/twitter.com/**',
        ],
      },
    },
    
    // Assertions for CI/CD pipeline
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }], // 90+ performance score
        'categories:best-practices': ['error', { minScore: 0.9 }], // 90+ best practices
        'categories:accessibility': ['error', { minScore: 0.9 }], // 90+ accessibility
        'categories:seo': ['error', { minScore: 0.9 }], // 90+ SEO
        
        // Core Web Vitals thresholds
        'audits.first-contentful-paint': ['error', { maxNumericValue: 2000 }], // 2s
        'audits.largest-contentful-paint': ['error', { maxNumericValue: 2500 }], // 2.5s
        'audits.cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }], // 0.1
        'audits.total-blocking-time': ['error', { maxNumericValue: 300 }], // 300ms
        'audits.max-potential-fid': ['error', { maxNumericValue: 100 }], // 100ms
        'audits.speed-index': ['error', { maxNumericValue: 3000 }], // 3s
        
        // Performance optimizations
        'audits.uses-responsive-images': 'error',
        'audits.uses-optimized-images': 'error',
        'audits.modern-image-formats': 'error',
        'audits.unused-css-rules': 'warn',
        'audits.unused-javascript': 'warn',
        'audits.render-blocking-resources': 'warn',
        'audits.unminified-css': 'error',
        'audits.unminified-javascript': 'error',
        
        // Best practices
        'audits.uses-https': 'error',
        'audits.no-vulnerable-libraries': 'error',
        'audits.csp-xss': 'warn',
        
        // Accessibility
        'audits.color-contrast': 'error',
        'audits.image-alt': 'error',
        'audits.label': 'error',
        'audits.link-name': 'error',
        
        // SEO
        'audits.meta-description': 'error',
        'audits.document-title': 'error',
        'audits.link-text': 'error',
        'audits.crawlable-anchors': 'error',
      },
    },
    
    // Upload results for tracking over time
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-reports',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
    
    // Server configuration for LHCI server (optional)
    server: {
      port: 9001,
      storage: {
        storageMethod: 'filesystem',
        storagePath: './lighthouse-data',
      },
    },
  },
  
  // Additional configuration for different environments
  environments: {
    // Development environment
    development: {
      ci: {
        collect: {
          url: [
            'http://localhost:3000',
            'http://localhost:3000/test-forms',
          ],
          startServerCommand: 'npm run dev',
          startServerReadyPattern: 'ready',
          numberOfRuns: 1, // Faster for development
        },
        assert: {
          assertions: {
            // Relaxed thresholds for development
            'categories:performance': ['warn', { minScore: 0.7 }],
            'categories:best-practices': ['warn', { minScore: 0.8 }],
            'categories:accessibility': ['error', { minScore: 0.9 }],
            'categories:seo': ['warn', { minScore: 0.8 }],
          },
        },
      },
    },
    
    // Production environment
    production: {
      ci: {
        collect: {
          url: [
            process.env.PRODUCTION_URL || 'https://indecisive-wear.vercel.app',
            `${process.env.PRODUCTION_URL || 'https://indecisive-wear.vercel.app'}/test-forms`,
          ],
          numberOfRuns: 5, // More runs for production accuracy
        },
        assert: {
          assertions: {
            // Strict thresholds for production
            'categories:performance': ['error', { minScore: 0.95 }],
            'categories:best-practices': ['error', { minScore: 0.95 }],
            'categories:accessibility': ['error', { minScore: 0.95 }],
            'categories:seo': ['error', { minScore: 0.95 }],
          },
        },
        upload: {
          target: 'lhci',
          serverBaseUrl: process.env.LHCI_SERVER_URL,
          token: process.env.LHCI_TOKEN,
        },
      },
    },
  },
}; 