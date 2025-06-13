#!/bin/bash

echo "=== Railway Medusa Deployment Starting ==="

# Build the application first
echo "Building Medusa application..."
npm run build

# Wait a bit for database to be ready
echo "Waiting for services to be ready..."
sleep 10

# Run migrations with retry logic
echo "Running database migrations..."
npx medusa db:migrate || (sleep 5 && npx medusa db:migrate) || (sleep 10 && npx medusa db:migrate)

# Create admin user if it doesn't exist
echo "Creating admin user..."
npm run create-admin || true

# Start the application
echo "Starting Medusa server..."
exec npm run start