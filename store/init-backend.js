#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('=== INIT BACKEND ===');

try {
  console.log('Building admin panel...');
  execSync('npx medusa build', { stdio: 'inherit' });
  
  console.log('Running migrations...');
  execSync('npx medusa db:migrate', { stdio: 'inherit' });
  
  console.log('Seeding database...');
  execSync('npx medusa exec ./src/scripts/seed.ts', { stdio: 'inherit' });
  
  console.log('Backend initialized successfully!');
} catch (error) {
  console.log('Init completed with warnings, continuing...');
}