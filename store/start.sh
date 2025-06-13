#!/bin/bash

echo "Starting Medusa deployment..."

# Ensure database connection
echo "Waiting for database..."
sleep 5

# Generate migrations from our setup
echo "Generating database migrations..."
npx medusa db:generate

# Run all migrations
echo "Running database migrations..."
npx medusa db:migrate

# Check if migrations succeeded
if [ $? -eq 0 ]; then
    echo "Migrations completed successfully"
    
    # Run seed script to ensure providers exist
    echo "Seeding initial data..."
    npm run seed || echo "Seed may have failed, continuing..."
else
    echo "Migrations failed, retrying..."
    sleep 5
    npx medusa db:migrate
fi

# Start Medusa
echo "Starting Medusa server..."
npm run start