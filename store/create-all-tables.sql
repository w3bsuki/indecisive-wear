-- Create all required Medusa v2 tables
-- This ensures the database is ready before Medusa starts

-- User table
CREATE TABLE IF NOT EXISTS "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "first_name" TEXT,
    "last_name" TEXT,
    "avatar_url" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "deleted_at" TIMESTAMPTZ
);

-- Store table
CREATE TABLE IF NOT EXISTS "store" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Medusa Store',
    "supported_currencies" JSONB,
    "default_currency_code" TEXT DEFAULT 'usd',
    "default_sales_channel_id" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "deleted_at" TIMESTAMPTZ
);

-- Insert default store
INSERT INTO "store" ("id", "name") 
VALUES ('store_01', 'Indecisive Wear Store')
ON CONFLICT DO NOTHING;

-- Sales channel table
CREATE TABLE IF NOT EXISTS "sales_channel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_disabled" BOOLEAN DEFAULT false,
    "metadata" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "deleted_at" TIMESTAMPTZ
);

-- Region table
CREATE TABLE IF NOT EXISTS "region" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "currency_code" TEXT NOT NULL,
    "tax_rate" NUMERIC,
    "tax_code" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "deleted_at" TIMESTAMPTZ
);

-- Region country table
CREATE TABLE IF NOT EXISTS "region_country" (
    "iso_2" CHAR(2) NOT NULL,
    "iso_3" CHAR(3),
    "num_code" INTEGER,
    "name" TEXT NOT NULL,
    "display_name" TEXT,
    "region_id" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "deleted_at" TIMESTAMPTZ,
    CONSTRAINT "region_country_pkey" PRIMARY KEY ("iso_2")
);

-- Country table
CREATE TABLE IF NOT EXISTS "country" (
    "iso_2" CHAR(2) NOT NULL PRIMARY KEY,
    "iso_3" CHAR(3),
    "num_code" INTEGER,
    "name" TEXT NOT NULL,
    "display_name" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tax provider table
CREATE TABLE IF NOT EXISTS "tax_provider" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "deleted_at" TIMESTAMPTZ
);

-- Insert system tax provider
INSERT INTO "tax_provider" ("id", "is_enabled") 
VALUES ('tp_system', true)
ON CONFLICT DO NOTHING;

-- Tax region table
CREATE TABLE IF NOT EXISTS "tax_region" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "provider_id" TEXT,
    "country_code" CHAR(2),
    "province_code" TEXT,
    "parent_id" TEXT,
    "rate" NUMERIC,
    "name" TEXT,
    "code" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "deleted_at" TIMESTAMPTZ
);

-- Payment provider table
CREATE TABLE IF NOT EXISTS "payment_provider" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "deleted_at" TIMESTAMPTZ
);

-- Insert system payment provider
INSERT INTO "payment_provider" ("id", "is_enabled") 
VALUES ('pp_system_default', true)
ON CONFLICT DO NOTHING;

-- Fulfillment provider table
CREATE TABLE IF NOT EXISTS "fulfillment_provider" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "deleted_at" TIMESTAMPTZ
);

-- Insert manual fulfillment provider
INSERT INTO "fulfillment_provider" ("id", "is_enabled") 
VALUES ('manual_manual', true)
ON CONFLICT DO NOTHING;

-- Stock location table
CREATE TABLE IF NOT EXISTS "stock_location" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address_id" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "deleted_at" TIMESTAMPTZ
);

-- Stock location address table
CREATE TABLE IF NOT EXISTS "stock_location_address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address_1" TEXT,
    "address_2" TEXT,
    "city" TEXT,
    "country_code" CHAR(2),
    "postal_code" TEXT,
    "province" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "deleted_at" TIMESTAMPTZ
);

-- Inventory item table
CREATE TABLE IF NOT EXISTS "inventory_item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sku" TEXT,
    "hs_code" TEXT,
    "origin_country" CHAR(2),
    "mid_code" TEXT,
    "material" TEXT,
    "weight" NUMERIC,
    "length" NUMERIC,
    "height" NUMERIC,
    "width" NUMERIC,
    "title" TEXT,
    "description" TEXT,
    "thumbnail" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "deleted_at" TIMESTAMPTZ
);

-- Product table
CREATE TABLE IF NOT EXISTS "product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "handle" TEXT,
    "subtitle" TEXT,
    "description" TEXT,
    "is_giftcard" BOOLEAN DEFAULT false,
    "status" TEXT DEFAULT 'draft',
    "thumbnail" TEXT,
    "weight" NUMERIC,
    "length" NUMERIC,
    "height" NUMERIC,
    "width" NUMERIC,
    "hs_code" TEXT,
    "origin_country" CHAR(2),
    "mid_code" TEXT,
    "material" TEXT,
    "metadata" JSONB,
    "discountable" BOOLEAN DEFAULT true,
    "external_id" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "deleted_at" TIMESTAMPTZ
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "idx_region_country_region_id" ON "region_country" ("region_id");
CREATE INDEX IF NOT EXISTS "idx_region_country_deleted_at" ON "region_country" ("deleted_at");
CREATE INDEX IF NOT EXISTS "idx_tax_provider_deleted_at" ON "tax_provider" ("deleted_at");

-- Insert some basic countries
INSERT INTO "country" ("iso_2", "iso_3", "num_code", "name", "display_name") VALUES
('us', 'usa', 840, 'United States', 'United States'),
('gb', 'gbr', 826, 'United Kingdom', 'United Kingdom'),
('de', 'deu', 276, 'Germany', 'Germany'),
('fr', 'fra', 250, 'France', 'France'),
('es', 'esp', 724, 'Spain', 'Spain'),
('it', 'ita', 380, 'Italy', 'Italy'),
('bg', 'bgr', 100, 'Bulgaria', 'Bulgaria')
ON CONFLICT DO NOTHING;