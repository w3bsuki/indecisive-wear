#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { SitemapStream, streamToPromise } = require('sitemap')
const { Readable } = require('stream')

// Configuration
const DOMAIN = process.env.NEXT_PUBLIC_APP_URL || 'https://indecisive-wear.com'
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'sitemap.xml')

// Static pages with their priorities and change frequencies
const staticPages = [
  {
    url: '/',
    changefreq: 'daily',
    priority: 1.0,
    lastmod: new Date().toISOString(),
  },
  {
    url: '/about',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString(),
  },
  {
    url: '/contact',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString(),
  },
  {
    url: '/test-forms',
    changefreq: 'weekly',
    priority: 0.6,
    lastmod: new Date().toISOString(),
  },
  {
    url: '/performance-demo',
    changefreq: 'weekly',
    priority: 0.6,
    lastmod: new Date().toISOString(),
  },
  // Add more static pages as needed
]

// Dynamic page generators
const dynamicPages = {
  // Product pages (example)
  products: async () => {
    // In a real app, you'd fetch from your API or database
    const products = [
      { slug: 'premium-t-shirt', lastmod: '2024-01-15T10:00:00.000Z' },
      { slug: 'designer-jeans', lastmod: '2024-01-14T15:30:00.000Z' },
      { slug: 'winter-jacket', lastmod: '2024-01-13T09:20:00.000Z' },
      // Add more products...
    ]

    return products.map(product => ({
      url: `/products/${product.slug}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: product.lastmod,
    }))
  },

  // Collection pages (example)
  collections: async () => {
    const collections = [
      { slug: 'summer-collection', lastmod: '2024-01-10T12:00:00.000Z' },
      { slug: 'winter-essentials', lastmod: '2024-01-08T14:00:00.000Z' },
      { slug: 'formal-wear', lastmod: '2024-01-05T11:30:00.000Z' },
      // Add more collections...
    ]

    return collections.map(collection => ({
      url: `/collections/${collection.slug}`,
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: collection.lastmod,
    }))
  },

  // Blog posts (example)
  blog: async () => {
    const posts = [
      { slug: 'sustainable-fashion-guide', lastmod: '2024-01-12T16:00:00.000Z' },
      { slug: 'styling-tips-2024', lastmod: '2024-01-11T13:45:00.000Z' },
      { slug: 'wardrobe-essentials', lastmod: '2024-01-09T10:15:00.000Z' },
      // Add more blog posts...
    ]

    return posts.map(post => ({
      url: `/blog/${post.slug}`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: post.lastmod,
    }))
  },

  // Category pages (example)
  categories: async () => {
    const categories = [
      { slug: 'men', lastmod: '2024-01-01T00:00:00.000Z' },
      { slug: 'women', lastmod: '2024-01-01T00:00:00.000Z' },
      { slug: 'accessories', lastmod: '2024-01-01T00:00:00.000Z' },
      { slug: 'shoes', lastmod: '2024-01-01T00:00:00.000Z' },
      // Add more categories...
    ]

    return categories.map(category => ({
      url: `/category/${category.slug}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: category.lastmod,
    }))
  },
}

// Auto-discovery of pages from the file system
async function discoverPages() {
  const pagesDir = path.join(process.cwd(), 'src', 'app')
  const discoveredPages = []

  function scanDirectory(dir, basePath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      const urlPath = path.join(basePath, entry.name)

      if (entry.isDirectory()) {
        // Skip special Next.js directories
        if (entry.name.startsWith('(') || entry.name.startsWith('_') || entry.name === 'api') {
          continue
        }

        scanDirectory(fullPath, urlPath)
      } else if (entry.name === 'page.tsx' || entry.name === 'page.jsx') {
        // Found a page
        const url = basePath === '' ? '/' : basePath.replace(/\\/g, '/')
        
        // Skip if already in static pages
        if (!staticPages.some(page => page.url === url)) {
          discoveredPages.push({
            url,
            changefreq: 'weekly',
            priority: 0.5,
            lastmod: fs.statSync(fullPath).mtime.toISOString(),
          })
        }
      }
    }
  }

  try {
    scanDirectory(pagesDir)
  } catch (error) {
    console.warn('Could not scan pages directory:', error.message)
  }

  return discoveredPages
}

// Generate sitemap
async function generateSitemap() {
  console.log('🗺️ Generating sitemap...')

  try {
    // Collect all pages
    const allPages = [...staticPages]

    // Add dynamic pages
    for (const [type, generator] of Object.entries(dynamicPages)) {
      try {
        console.log(`📄 Adding ${type} pages...`)
        const pages = await generator()
        allPages.push(...pages)
      } catch (error) {
        console.warn(`⚠️ Could not generate ${type} pages:`, error.message)
      }
    }

    // Add discovered pages
    console.log('🔍 Discovering pages from filesystem...')
    const discoveredPages = await discoverPages()
    allPages.push(...discoveredPages)

    // Remove duplicates and sort
    const uniquePages = allPages.reduce((acc, page) => {
      const existing = acc.find(p => p.url === page.url)
      if (!existing) {
        acc.push(page)
      } else if (new Date(page.lastmod) > new Date(existing.lastmod)) {
        // Keep the page with the more recent lastmod
        Object.assign(existing, page)
      }
      return acc
    }, [])

    uniquePages.sort((a, b) => b.priority - a.priority || a.url.localeCompare(b.url))

    console.log(`📊 Found ${uniquePages.length} unique pages`)

    // Create sitemap
    const stream = new SitemapStream({ 
      hostname: DOMAIN,
      cacheTime: 600000, // 10 minutes
    })

    const xmlString = await streamToPromise(Readable.from(uniquePages).pipe(stream))

    // Write sitemap
    fs.writeFileSync(OUTPUT_PATH, xmlString.toString())

    console.log(`✅ Sitemap generated successfully at ${OUTPUT_PATH}`)
    console.log(`🌐 Sitemap URL: ${DOMAIN}/sitemap.xml`)

    // Generate sitemap index if needed (for large sites)
    if (uniquePages.length > 50000) {
      console.log('📚 Generating sitemap index for large site...')
      await generateSitemapIndex(uniquePages)
    }

    // Generate robots.txt if it doesn't exist
    await generateRobotsTxt()

    return {
      success: true,
      pageCount: uniquePages.length,
      path: OUTPUT_PATH,
      url: `${DOMAIN}/sitemap.xml`
    }

  } catch (error) {
    console.error('❌ Error generating sitemap:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Generate sitemap index for large sites
async function generateSitemapIndex(pages) {
  const PAGES_PER_SITEMAP = 50000
  const sitemapCount = Math.ceil(pages.length / PAGES_PER_SITEMAP)

  const sitemapIndexPath = path.join(process.cwd(), 'public', 'sitemap-index.xml')
  
  let indexXml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  indexXml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  for (let i = 0; i < sitemapCount; i++) {
    const sitemapUrl = `${DOMAIN}/sitemap-${i + 1}.xml`
    const lastmod = new Date().toISOString()
    
    indexXml += '  <sitemap>\n'
    indexXml += `    <loc>${sitemapUrl}</loc>\n`
    indexXml += `    <lastmod>${lastmod}</lastmod>\n`
    indexXml += '  </sitemap>\n'

    // Generate individual sitemap
    const startIndex = i * PAGES_PER_SITEMAP
    const endIndex = Math.min(startIndex + PAGES_PER_SITEMAP, pages.length)
    const sitemapPages = pages.slice(startIndex, endIndex)

    const stream = new SitemapStream({ hostname: DOMAIN })
    const xmlString = await streamToPromise(Readable.from(sitemapPages).pipe(stream))
    
    const sitemapPath = path.join(process.cwd(), 'public', `sitemap-${i + 1}.xml`)
    fs.writeFileSync(sitemapPath, xmlString.toString())
  }

  indexXml += '</sitemapindex>'
  fs.writeFileSync(sitemapIndexPath, indexXml)

  console.log(`📚 Sitemap index generated with ${sitemapCount} sitemaps`)
}

// Generate robots.txt
async function generateRobotsTxt() {
  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt')
  
  if (!fs.existsSync(robotsPath)) {
    const robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${DOMAIN}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow sensitive paths
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/

# Allow important files
Allow: /api/og/*
Allow: /_next/static/
Allow: /_next/image/

# Host
Host: ${DOMAIN}
`

    fs.writeFileSync(robotsPath, robotsContent)
    console.log('🤖 robots.txt generated')
  } else {
    console.log('🤖 robots.txt already exists')
  }
}

// Run if called directly
if (require.main === module) {
  generateSitemap()
    .then(result => {
      if (result.success) {
        console.log(`\n🎉 Sitemap generation completed!`)
        console.log(`📊 Generated ${result.pageCount} pages`)
        console.log(`📍 Location: ${result.path}`)
        console.log(`🌐 URL: ${result.url}`)
      } else {
        console.error(`\n❌ Sitemap generation failed: ${result.error}`)
        process.exit(1)
      }
    })
    .catch(error => {
      console.error('❌ Fatal error:', error)
      process.exit(1)
    })
}

module.exports = { generateSitemap, discoverPages } 