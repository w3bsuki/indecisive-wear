const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

console.log('=== Medusa Admin Build Verification ===\n');

// Print environment variables
console.log('Environment Variables:');
console.log(`MEDUSA_ADMIN_BACKEND_URL: ${process.env.MEDUSA_ADMIN_BACKEND_URL || 'NOT SET'}`);
console.log(`MEDUSA_BACKEND_URL: ${process.env.MEDUSA_BACKEND_URL || 'NOT SET'}`);
console.log(`BACKEND_URL: ${process.env.BACKEND_URL || 'NOT SET'}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'NOT SET'}`);
console.log(`RAILWAY_ENVIRONMENT: ${process.env.RAILWAY_ENVIRONMENT || 'NOT SET'}`);
console.log(`RAILWAY_PUBLIC_DOMAIN: ${process.env.RAILWAY_PUBLIC_DOMAIN || 'NOT SET'}`);
console.log('\n');

// Check admin build directory
const adminBuildPath = path.join(__dirname, '.medusa', 'admin');
const adminIndexPath = path.join(adminBuildPath, 'index.html');

console.log('Admin Build Status:');
if (fs.existsSync(adminBuildPath)) {
  console.log(`✓ Admin build directory exists: ${adminBuildPath}`);
  
  if (fs.existsSync(adminIndexPath)) {
    const stats = fs.statSync(adminIndexPath);
    console.log(`✓ index.html exists`);
    console.log(`  Modified: ${stats.mtime}`);
    console.log(`  Size: ${stats.size} bytes`);
    
    // Read first 500 chars of index.html to check for localhost references
    const content = fs.readFileSync(adminIndexPath, 'utf-8');
    const localhostMatches = content.match(/localhost:9000/g);
    if (localhostMatches) {
      console.log(`⚠️  Found ${localhostMatches.length} references to 'localhost:9000' in index.html`);
    } else {
      console.log('✓ No localhost:9000 references found in index.html');
    }
    
    // Check for backend URL in the build
    const backendUrlPattern = /MEDUSA_ADMIN_BACKEND_URL['"]\s*:\s*['"]([^'"]+)['"]/;
    const match = content.match(backendUrlPattern);
    if (match) {
      console.log(`  Embedded backend URL: ${match[1]}`);
    }
  } else {
    console.log('✗ index.html not found');
  }
  
  // List all files in admin build
  console.log('\nAdmin build contents:');
  const files = fs.readdirSync(adminBuildPath).slice(0, 10);
  files.forEach(file => {
    const filePath = path.join(adminBuildPath, file);
    const stats = fs.statSync(filePath);
    console.log(`  ${file} (${stats.isDirectory() ? 'dir' : stats.size + ' bytes'})`);
  });
} else {
  console.log('✗ Admin build directory does not exist');
}

console.log('\n=== End Verification ===');