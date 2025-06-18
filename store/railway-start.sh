#!/bin/bash

echo "=== Railway Medusa Deployment Starting ==="

# Build the application first
echo "Building Medusa application..."
npm run build

# Wait for database
echo "Waiting for database..."
sleep 15

# Force create required tables using psql
echo "Creating required tables..."
if [ -n "$DATABASE_URL" ]; then
    # Extract database URL components
    DB_URL="$DATABASE_URL"
    
    # Run SQL directly to create tables
    psql "$DB_URL" -f force-migrations.sql || echo "SQL execution warning - continuing"
fi

# Run official migrations
echo "Running Medusa migrations..."
npx medusa db:migrate || echo "Migrations may have warnings - continuing"

# Start the application
echo "Starting Medusa server..."
exec npm run start