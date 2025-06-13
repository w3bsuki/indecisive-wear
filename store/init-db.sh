#!/bin/bash

# Create tables using psql directly
psql "$DATABASE_URL" < create-all-tables.sql || true

# Run migrations
npx medusa db:migrate || true

# Start server
npm run start