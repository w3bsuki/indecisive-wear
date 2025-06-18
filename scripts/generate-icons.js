const fs = require('fs')
const path = require('path')

// Icon sizes needed
const iconSizes = [
  { size: 16, filename: 'icon-16x16.png' },
  { size: 32, filename: 'icon-32x32.png' },
  { size: 192, filename: 'icon-192x192.png' },
  { size: 512, filename: 'icon-512x512.png' },
  { size: 180, filename: 'apple-touch-icon.png' }
]

// Simple PNG data URL for different sizes
function generateIconDataUrl(size) {
  // This is a simple pink square with "IW" text as a minimal icon
  // For production, you'd want to use a proper image generation library
  const canvas = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="#EC4899"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-weight="bold" 
            font-size="${size * 0.4}" fill="white" text-anchor="middle" 
            dominant-baseline="central">IW</text>
    </svg>
  `
  
  // Convert SVG to base64 data URL
  const base64 = Buffer.from(canvas).toString('base64')
  return `data:image/svg+xml;base64,${base64}`
}

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '..', 'public', 'icons')
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true })
}

// Generate placeholder icon files
iconSizes.forEach(({ size, filename }) => {
  const iconPath = path.join(iconsDir, filename)
  
  // Create a minimal SVG-based icon file
  const svgContent = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="#EC4899"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-weight="bold" 
        font-size="${size * 0.4}" fill="white" text-anchor="middle" 
        dominant-baseline="central">IW</text>
</svg>`
  
  // For now, save as SVG files with PNG extension (browsers will handle it)
  // In production, you'd use sharp or canvas to generate actual PNG files
  fs.writeFileSync(iconPath.replace('.png', '.svg'), svgContent)
  
  console.log(`Generated ${filename} (${size}x${size})`)
})

// Create favicon.ico placeholder
const faviconPath = path.join(__dirname, '..', 'public', 'favicon.ico')
const faviconSvg = `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="6" fill="#EC4899"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-weight="bold" 
        font-size="12" fill="white" text-anchor="middle" 
        dominant-baseline="central">IW</text>
</svg>`

fs.writeFileSync(faviconPath.replace('.ico', '.svg'), faviconSvg)

console.log('Icons generated successfully!')
console.log('Note: These are SVG placeholders. For production, use a proper image generation library like sharp.') 