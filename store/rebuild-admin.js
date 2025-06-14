const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('=== Rebuilding Medusa Admin with Correct Backend URL ===\n');

// Get the backend URL from environment or Railway domain
const railwayDomain = process.env.RAILWAY_PUBLIC_DOMAIN;
const backendUrl = process.env.MEDUSA_ADMIN_BACKEND_URL || 
                   process.env.MEDUSA_BACKEND_URL || 
                   (railwayDomain ? `https://${railwayDomain}` : 'http://localhost:9000');

console.log(`Using backend URL: ${backendUrl}`);

// Set the environment variable explicitly
process.env.MEDUSA_ADMIN_BACKEND_URL = backendUrl;
process.env.MEDUSA_BACKEND_URL = backendUrl;

console.log('\nEnvironment variables set:');
console.log(`MEDUSA_ADMIN_BACKEND_URL=${process.env.MEDUSA_ADMIN_BACKEND_URL}`);
console.log(`MEDUSA_BACKEND_URL=${process.env.MEDUSA_BACKEND_URL}`);

// Remove old admin build
const adminPath = path.join(__dirname, '.medusa', 'admin');
if (fs.existsSync(adminPath)) {
  console.log('\nRemoving old admin build...');
  fs.rmSync(adminPath, { recursive: true, force: true });
}

// Rebuild admin
console.log('\nRebuilding admin...');
try {
  execSync('npx medusa build', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      MEDUSA_ADMIN_BACKEND_URL: backendUrl,
      MEDUSA_BACKEND_URL: backendUrl
    }
  });
  console.log('\n✓ Admin rebuilt successfully');
  
  // Verify the build
  console.log('\nVerifying build...');
  execSync('node verify-admin-build.js', { stdio: 'inherit' });
} catch (error) {
  console.error('\n✗ Failed to rebuild admin:', error.message);
  process.exit(1);
}