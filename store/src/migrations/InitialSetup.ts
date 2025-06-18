import { Migration } from '@mikro-orm/migrations';

export class InitialSetup extends Migration {
  async up(): Promise<void> {
    // Create tax_provider table if it doesn't exist
    this.addSql(`
      CREATE TABLE IF NOT EXISTS "tax_provider" (
        "id" TEXT NOT NULL,
        "is_enabled" BOOLEAN NOT NULL DEFAULT true,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ,
        CONSTRAINT "tax_provider_pkey" PRIMARY KEY ("id")
      );
    `);

    // Insert system tax provider
    this.addSql(`
      INSERT INTO "tax_provider" ("id", "is_enabled") 
      VALUES ('tp_system', true)
      ON CONFLICT ("id") DO NOTHING;
    `);

    // Create payment_provider table
    this.addSql(`
      CREATE TABLE IF NOT EXISTS "payment_provider" (
        "id" TEXT NOT NULL,
        "is_enabled" BOOLEAN NOT NULL DEFAULT true,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ,
        CONSTRAINT "payment_provider_pkey" PRIMARY KEY ("id")
      );
    `);

    // Insert system payment provider
    this.addSql(`
      INSERT INTO "payment_provider" ("id", "is_enabled") 
      VALUES ('pp_system_default', true)
      ON CONFLICT ("id") DO NOTHING;
    `);

    // Create stock_location table
    this.addSql(`
      CREATE TABLE IF NOT EXISTS "stock_location" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "metadata" JSONB,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ,
        CONSTRAINT "stock_location_pkey" PRIMARY KEY ("id")
      );
    `);

    // Create region_country table
    this.addSql(`
      CREATE TABLE IF NOT EXISTS "region_country" (
        "iso_2" CHAR(2) NOT NULL,
        "iso_3" CHAR(3) NOT NULL,
        "num_code" INTEGER NOT NULL,
        "name" TEXT NOT NULL,
        "display_name" TEXT NOT NULL,
        "region_id" TEXT,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ,
        CONSTRAINT "region_country_pkey" PRIMARY KEY ("iso_2")
      );
    `);

    // Create region table if needed
    this.addSql(`
      CREATE TABLE IF NOT EXISTS "region" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "currency_code" TEXT NOT NULL,
        "metadata" JSONB,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ,
        CONSTRAINT "region_pkey" PRIMARY KEY ("id")
      );
    `);
  }

  async down(): Promise<void> {
    // We don't drop tables in down migration for safety
  }
}