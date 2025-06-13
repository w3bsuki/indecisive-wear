const { execSync } = require('child_process');
const { Client } = require('pg');

async function createTablesDirectly() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Create tax_provider table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "tax_provider" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "is_enabled" BOOLEAN NOT NULL DEFAULT true,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ
      )
    `);
    console.log('Created tax_provider table');

    // Insert system tax provider
    await client.query(`
      INSERT INTO "tax_provider" ("id") VALUES ('tp_system')
      ON CONFLICT DO NOTHING
    `);

    // Create region table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "region" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "currency_code" TEXT NOT NULL,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ
      )
    `);
    console.log('Created region table');

    // Create region_country table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "region_country" (
        "iso_2" CHAR(2) NOT NULL PRIMARY KEY,
        "iso_3" CHAR(3),
        "num_code" INTEGER,
        "name" TEXT NOT NULL,
        "display_name" TEXT,
        "region_id" TEXT,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ
      )
    `);
    console.log('Created region_country table');

    // Create payment_provider table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "payment_provider" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "is_enabled" BOOLEAN NOT NULL DEFAULT true,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ
      )
    `);
    
    // Create fulfillment_provider table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "fulfillment_provider" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "is_enabled" BOOLEAN NOT NULL DEFAULT true,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ
      )
    `);

    console.log('All tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await client.end();
  }
}

async function run() {
  console.log('Setting up database...');
  
  // First create tables directly
  await createTablesDirectly();
  
  // Then try to run Medusa migrations
  console.log('Running Medusa migrations...');
  try {
    execSync('npx medusa db:migrate', { stdio: 'inherit' });
  } catch (error) {
    console.log('Medusa migrations may have warnings, continuing...');
  }
}

run().catch(console.error);