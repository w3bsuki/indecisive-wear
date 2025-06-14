const fs = require('fs');
const path = require('path');

console.log('=== Medusa Admin Runtime Verification ===\n');

// Check environment at runtime
console.log('Runtime Environment:');
console.log(`MEDUSA_ADMIN_BACKEND_URL: ${process.env.MEDUSA_ADMIN_BACKEND_URL || 'NOT SET'}`);
console.log(`MEDUSA_BACKEND_URL: ${process.env.MEDUSA_BACKEND_URL || 'NOT SET'}`);
console.log(`BACKEND_URL: ${process.env.BACKEND_URL || 'NOT SET'}`);
console.log(`PORT: ${process.env.PORT || 'NOT SET'}`);
console.log(`RAILWAY_PUBLIC_DOMAIN: ${process.env.RAILWAY_PUBLIC_DOMAIN || 'NOT SET'}`);

// Check if admin is being served
const adminPath = path.join(__dirname, '.medusa', 'admin');
if (fs.existsSync(adminPath)) {
  console.log('\n✓ Admin directory exists');
  
  // Check index.html
  const indexPath = path.join(adminPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf-8');
    
    // Search for API references
    const apiMatches = content.match(/https?:\/\/[^'"<>\s]+/g);
    if (apiMatches) {
      console.log('\nFound API URLs in admin build:');
      const uniqueUrls = [...new Set(apiMatches)];
      uniqueUrls.forEach(url => {
        if (url.includes('localhost') || url.includes('9000')) {
          console.log(`  ⚠️  ${url}`);
        } else {
          console.log(`  ✓ ${url}`);
        }
      });
    }
  }
} else {
  console.log('\n✗ Admin directory not found');
}

console.log('\n=== End Runtime Verification ===');