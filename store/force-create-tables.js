const { Client } = require('pg');

async function forceCreateTables() {
  console.log('Force creating database tables...');
  
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Create tables in order
    const queries = [
      // Tax provider
      `CREATE TABLE IF NOT EXISTS "tax_provider" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "is_enabled" BOOLEAN NOT NULL DEFAULT true,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ
      )`,
      
      `INSERT INTO "tax_provider" ("id", "is_enabled") VALUES ('tp_system', true) ON CONFLICT DO NOTHING`,
      
      // Region
      `CREATE TABLE IF NOT EXISTS "region" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "currency_code" TEXT NOT NULL,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ
      )`,
      
      // Region country
      `CREATE TABLE IF NOT EXISTS "region_country" (
        "iso_2" CHAR(2) NOT NULL PRIMARY KEY,
        "iso_3" CHAR(3),
        "num_code" INTEGER,
        "name" TEXT NOT NULL,
        "display_name" TEXT,
        "region_id" TEXT,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ
      )`,
      
      // Payment provider
      `CREATE TABLE IF NOT EXISTS "payment_provider" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "is_enabled" BOOLEAN NOT NULL DEFAULT true,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ
      )`,
      
      `INSERT INTO "payment_provider" ("id", "is_enabled") VALUES ('pp_system_default', true) ON CONFLICT DO NOTHING`,
      
      // Fulfillment provider
      `CREATE TABLE IF NOT EXISTS "fulfillment_provider" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "is_enabled" BOOLEAN NOT NULL DEFAULT true,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ
      )`,
      
      `INSERT INTO "fulfillment_provider" ("id", "is_enabled") VALUES ('manual_manual', true) ON CONFLICT DO NOTHING`,
      
      // Stock location
      `CREATE TABLE IF NOT EXISTS "stock_location" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ
      )`
    ];

    for (const query of queries) {
      try {
        await client.query(query);
        console.log('Executed:', query.substring(0, 50) + '...');
      } catch (err) {
        console.error('Query failed:', err.message);
      }
    }

    console.log('All tables created');
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await client.end();
  }
}

// Run immediately
forceCreateTables().then(() => {
  console.log('Table creation complete');
  process.exit(0);
}).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});