-- Force create required tables for Medusa v2
-- Run this if migrations fail

CREATE TABLE IF NOT EXISTS "public"."tax_provider" (
    "id" TEXT NOT NULL,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "deleted_at" TIMESTAMPTZ,
    CONSTRAINT "tax_provider_pkey" PRIMARY KEY ("id")
);

INSERT INTO "public"."tax_provider" ("id", "is_enabled") 
VALUES ('tp_system', true)
ON CONFLICT ("id") DO NOTHING;

CREATE TABLE IF NOT EXISTS "public"."payment_provider" (
    "id" TEXT NOT NULL,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "deleted_at" TIMESTAMPTZ,
    CONSTRAINT "payment_provider_pkey" PRIMARY KEY ("id")
);

INSERT INTO "public"."payment_provider" ("id", "is_enabled") 
VALUES ('pp_system_default', true)
ON CONFLICT ("id") DO NOTHING;

CREATE TABLE IF NOT EXISTS "public"."fulfillment_provider" (
    "id" TEXT NOT NULL,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "deleted_at" TIMESTAMPTZ,
    CONSTRAINT "fulfillment_provider_pkey" PRIMARY KEY ("id")
);

INSERT INTO "public"."fulfillment_provider" ("id", "is_enabled") 
VALUES ('manual_manual', true)
ON CONFLICT ("id") DO NOTHING;