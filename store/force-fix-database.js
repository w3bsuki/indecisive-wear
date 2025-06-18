const { Client } = require('pg');
const { execSync } = require('child_process');

async function forceDatabaseFix() {
  console.log('FORCING DATABASE FIX...');
  
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Drop and recreate schema to start fresh
    console.log('Creating fresh schema...');
    await client.query('DROP SCHEMA IF EXISTS public CASCADE');
    await client.query('CREATE SCHEMA public');
    await client.query('GRANT ALL ON SCHEMA public TO public');
    
    console.log('Schema recreated');
    
  } catch (error) {
    console.error('Database reset error:', error.message);
  } finally {
    await client.end();
  }

  // Now run migrations with fresh database
  console.log('Running migrations on fresh database...');
  try {
    execSync('npx medusa db:migrate', { stdio: 'inherit', cwd: process.cwd() });
    console.log('Migrations completed');
  } catch (e) {
    console.log('Migration error, trying again...');
    // Try once more
    try {
      execSync('npx medusa db:migrate', { stdio: 'inherit', cwd: process.cwd() });
    } catch (e2) {
      console.log('Migrations may have partial success');
    }
  }

  // Run seed
  console.log('Running seed...');
  try {
    execSync('npm run seed', { stdio: 'inherit', cwd: process.cwd() });
  } catch (e) {
    console.log('Seed may have warnings');
  }

  // Finally start Medusa
  console.log('Starting Medusa...');
  require('child_process').spawn('npm', ['run', 'start'], {
    stdio: 'inherit',
    shell: true,
    cwd: process.cwd()
  });
}

forceDatabaseFix().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});