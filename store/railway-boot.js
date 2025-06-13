const { execSync } = require('child_process');
const { Client } = require('pg');

async function ensureTables() {
  console.log('=== RAILWAY MEDUSA BOOT SEQUENCE ===');
  
  // Wait for database
  console.log('Waiting 20 seconds for database...');
  await new Promise(resolve => setTimeout(resolve, 20000));

  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    await client.connect();
    console.log('Connected to database!');
    
    // Check if migrations have run
    const result = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'migrations'
      );
    `);
    
    const migrationsTableExists = result.rows[0].exists;
    
    if (!migrationsTableExists) {
      console.log('First time setup detected. Running migrations...');
      try {
        execSync('npx medusa db:migrate', { stdio: 'inherit' });
      } catch (e) {
        console.log('Migration warnings detected, continuing...');
      }
    } else {
      console.log('Migrations table exists. Running any pending migrations...');
      try {
        execSync('npx medusa db:migrate', { stdio: 'inherit' });
      } catch (e) {
        console.log('Migration warnings detected, continuing...');
      }
    }
    
  } catch (error) {
    console.error('Database connection error:', error.message);
    console.log('Attempting to continue anyway...');
  } finally {
    await client.end();
  }

  // Start Medusa
  console.log('Starting Medusa server...');
  execSync('npm run start', { stdio: 'inherit' });
}

ensureTables().catch(err => {
  console.error('Boot sequence failed:', err);
  process.exit(1);
});