import withPWA from 'next-pwa';
import { withSentryConfig } from '@sentry/nextjs';

// Bundle analyzer (optional)
const withBundleAnalyzer = (config) => {
  if (process.env.ANALYZE !== 'true') {
    return config;
  }
  
  try {
    const { default: bundleAnalyzer } = require('@next/bundle-analyzer');
    return bundleAnalyzer({ 
      enabled: true,
      openAnalyzer: true,
      analyzerMode: 'static',
      reportFilename: './analyze/client.html'
    })(config);
  } catch (error) {
    console.warn('Bundle analyzer not installed. Install with: npm install @next/bundle-analyzer');
    return config;
  }
};

// Content Security Policy for enhanced security
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-analytics.com *.vercel-insights.com *.sentry.io;
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
  img-src 'self' blob: data: https: *.vercel.app;
  font-src 'self' fonts.gstatic.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  block-all-mixed-content;
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disable linting during production builds
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily ignore TypeScript errors for deployment
  },
  
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  
  // Skip standalone output for now
  // output: 'standalone',
  
  // Image optimization for Core Web Vitals
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  
  // React optimizations
  reactStrictMode: true,
  
  // Simplified experimental features
  experimental: {
    scrollRestoration: true,
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer, webpack }) => {
    // Memory optimization for build
    config.optimization = {
      ...config.optimization,
      minimize: !dev,
      splitChunks: dev ? false : {
        chunks: 'all',
        maxSize: 100000, // Smaller chunks to reduce memory usage
      }
    };
    
    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        sideEffects: false,
        usedExports: true,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
      };
      
      // Tree shaking optimization
      config.plugins.push(
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(false),
        })
      );
    }
    
    // Simplified bundle splitting for memory efficiency
    if (!dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 100000, // Much smaller chunks
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
        },
      };
    }
    
    // Performance optimizations
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        buffer: false,
        stream: false,
      };
    }
    
    // SVG optimization
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    return config;
  },
  
  // Enhanced security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          // Performance headers
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      // Specific caching for static assets
      {
        source: '/(_next/static|favicon.ico|robots.txt|sitemap.xml)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      // API routes with shorter cache
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, max-age=0, must-revalidate'
          },
        ],
      },
    ];
  },
  
  // Redirects for SEO and user experience
  async redirects() {
    return [
      // Redirect to clean URLs
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // Rewrites for clean URLs and API routing
  async rewrites() {
    return [
      // Rewrite for analytics tracking
      {
        source: '/analytics/:path*',
        destination: 'https://analytics.vercel.com/:path*',
      },
    ];
  },
};

// Simplified PWA configuration
const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/],
});

// Sentry configuration
const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  
  // Only upload source maps in production
  silent: process.env.NODE_ENV !== 'production',
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  
  // Upload source maps only
  include: ['.next'],
  ignore: ['node_modules'],
};

// Apply configurations in order (skip PWA for now)
let config = nextConfig;
// config = withPWAConfig(config); // Skip PWA to reduce memory
config = withBundleAnalyzer(config);

// Skip Sentry for now to reduce build memory usage
// if (process.env.NODE_ENV === 'production' || process.env.SENTRY_UPLOAD_SOURCE_MAPS === 'true') {
//   config = withSentryConfig(config, sentryWebpackPluginOptions);
// }

export default config;
