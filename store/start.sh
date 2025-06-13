#!/bin/bash

echo "Starting Medusa deployment..."

# Run migrations
echo "Running database migrations..."
npx medusa db:migrate

# Check if migrations succeeded
if [ $? -eq 0 ]; then
    echo "Migrations completed successfully"
else
    echo "Migrations failed, retrying..."
    sleep 5
    npx medusa db:migrate
fi

# Start Medusa
echo "Starting Medusa server..."
npm run start