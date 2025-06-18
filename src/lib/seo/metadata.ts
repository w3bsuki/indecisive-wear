import { Metadata, Viewport } from 'next'

// Base URL for the application
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://indecisive-wear.com'

// Default metadata configuration
export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Indecisive Wear - Premium Fashion for the Modern Individual',
    template: '%s | Indecisive Wear'
  },
  description: 'Discover premium fashion pieces that adapt to your style. Curated collections for the modern individual who values quality, comfort, and timeless design.',
  applicationName: 'Indecisive Wear',
  authors: [{ name: 'Indecisive Wear Team' }],
  creator: 'Indecisive Wear',
  publisher: 'Indecisive Wear',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: [
    'fashion',
    'premium clothing',
    'modern style',
    'sustainable fashion',
    'quality apparel',
    'contemporary design',
    'wardrobe essentials',
    'lifestyle brand'
  ],
  
  // Open Graph metadata
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Indecisive Wear',
    title: 'Indecisive Wear - Premium Fashion for the Modern Individual',
    description: 'Discover premium fashion pieces that adapt to your style. Curated collections for the modern individual.',
    images: [
      {
        url: '/images/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'Indecisive Wear - Premium Fashion',
        type: 'image/jpeg',
      }
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    site: '@indecisivewear',
    creator: '@indecisivewear',
    title: 'Indecisive Wear - Premium Fashion for the Modern Individual',
    description: 'Discover premium fashion pieces that adapt to your style. Curated collections for the modern individual.',
    images: ['/images/og/default.jpg'],
  },
  
  // Icons and app metadata
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/icons/safari-pinned-tab.svg', color: '#000000' },
    ],
  },
  
  // Manifest for PWA
  manifest: '/manifest.json',
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
    other: {
      me: ['mailto:hello@indecisive-wear.com'],
    },
  },
  
  // Category
  category: 'fashion',
}

// Separate viewport configuration (required by Next.js 15)
export const defaultViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

// Page-specific metadata generators
export const pageMetadata = {
  home: (): Metadata => ({
    title: 'Home',
    description: 'Discover premium fashion pieces that adapt to your style. Shop our curated collections for the modern individual.',
    openGraph: {
      title: 'Indecisive Wear - Premium Fashion for the Modern Individual',
      description: 'Discover premium fashion pieces that adapt to your style. Shop our curated collections for the modern individual.',
      url: baseUrl,
      images: [
        {
          url: '/images/og/home.jpg',
          width: 1200,
          height: 630,
          alt: 'Indecisive Wear Homepage',
        }
      ],
    },
    twitter: {
      title: 'Indecisive Wear - Premium Fashion for the Modern Individual',
      description: 'Discover premium fashion pieces that adapt to your style. Shop our curated collections for the modern individual.',
      images: ['/images/og/home.jpg'],
    },
  }),

  about: (): Metadata => ({
    title: 'About Us',
    description: 'Learn about our commitment to sustainable fashion, quality craftsmanship, and modern design philosophy.',
    openGraph: {
      title: 'About Indecisive Wear',
      description: 'Learn about our commitment to sustainable fashion, quality craftsmanship, and modern design philosophy.',
      url: `${baseUrl}/about`,
      images: [
        {
          url: '/images/og/about.jpg',
          width: 1200,
          height: 630,
          alt: 'About Indecisive Wear',
        }
      ],
    },
  }),

  collection: (name: string, description?: string): Metadata => ({
    title: `${name} Collection`,
    description: description || `Explore our ${name.toLowerCase()} collection featuring premium fashion pieces designed for the modern individual.`,
    openGraph: {
      title: `${name} Collection | Indecisive Wear`,
      description: description || `Explore our ${name.toLowerCase()} collection featuring premium fashion pieces.`,
      url: `${baseUrl}/collections/${name.toLowerCase().replace(/\s+/g, '-')}`,
      images: [
        {
          url: `/images/og/collections/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
          width: 1200,
          height: 630,
          alt: `${name} Collection`,
        }
      ],
    },
  }),

  product: (product: {
    name: string
    description: string
    price: number
    image?: string
    category?: string
  }): Metadata => ({
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Indecisive Wear`,
      description: product.description,
      url: `${baseUrl}/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`,
      type: 'website',
      images: product.image ? [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        }
      ] : undefined,
    },
    twitter: {
      title: `${product.name} | Indecisive Wear`,
      description: product.description,
      images: product.image ? [product.image] : undefined,
    },
    other: {
      'product:price:amount': product.price.toString(),
      'product:price:currency': 'USD',
      'product:availability': 'in stock',
      'product:condition': 'new',
      'product:category': product.category || 'fashion',
    },
  }),

  blog: (post: {
    title: string
    description: string
    publishedTime: string
    modifiedTime?: string
    author: string
    tags?: string[]
    image?: string
  }): Metadata => ({
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedTime,
      modifiedTime: post.modifiedTime,
      authors: [post.author],
      tags: post.tags,
      images: post.image ? [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : undefined,
    },
    twitter: {
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  }),
}

// Structured data generators
export const structuredData = {
  organization: () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Indecisive Wear',
    url: baseUrl,
    logo: `${baseUrl}/icons/icon-512x512.png`,
    description: 'Premium fashion for the modern individual',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-4567',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://twitter.com/indecisivewear',
      'https://instagram.com/indecisivewear',
      'https://facebook.com/indecisivewear',
    ],
  }),

  website: () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Indecisive Wear',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }),

  product: (product: {
    name: string
    description: string
    price: number
    currency?: string
    availability?: string
    condition?: string
    brand?: string
    category?: string
    image?: string
    sku?: string
    reviews?: {
      rating: number
      count: number
    }
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Indecisive Wear',
    },
    category: product.category,
    image: product.image,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'USD',
      availability: `https://schema.org/${product.availability || 'InStock'}`,
      itemCondition: `https://schema.org/${product.condition || 'NewCondition'}`,
      seller: {
        '@type': 'Organization',
        name: 'Indecisive Wear',
      },
    },
    ...(product.reviews && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.reviews.rating,
        reviewCount: product.reviews.count,
      },
    }),
  }),

  breadcrumb: (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),
}

// Utility function to merge metadata
export function mergeMetadata(base: Metadata, override: Metadata): Metadata {
  return {
    ...base,
    ...override,
    openGraph: {
      ...base.openGraph,
      ...override.openGraph,
    },
    twitter: {
      ...base.twitter,
      ...override.twitter,
    },
  }
} 