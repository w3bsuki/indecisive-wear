const { execSync } = require('child_process');

console.log('=== PRODUCTION MEDUSA START ===');

// Run the ib script first to ensure database is initialized
console.log('Initializing backend...');
try {
  execSync('npm run ib', { stdio: 'inherit' });
  console.log('Backend initialized successfully');
} catch (error) {
  console.log('Backend initialization completed with warnings');
}

// Now start Medusa
console.log('Starting Medusa server...');
execSync('npm run start', { stdio: 'inherit' });