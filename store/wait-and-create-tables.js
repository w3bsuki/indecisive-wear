const { execSync } = require('child_process');

// Wait for database to be ready
console.log('Waiting for database to be ready...');
setTimeout(() => {
  console.log('Running migrations...');
  
  try {
    // Force run migrations
    execSync('npx medusa db:migrate', { stdio: 'inherit' });
    console.log('Migrations completed');
  } catch (error) {
    console.log('Migrations may have warnings, continuing...');
  }
  
  // Now start Medusa
  console.log('Starting Medusa...');
  require('child_process').spawn('npm', ['run', 'start'], {
    stdio: 'inherit',
    shell: true
  });
}, 30000); // Wait 30 seconds for database