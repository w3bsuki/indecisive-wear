#!/bin/sh

echo "=== Runtime Build with Environment Variables ==="
echo "MEDUSA_ADMIN_BACKEND_URL: $MEDUSA_ADMIN_BACKEND_URL"
echo "RAILWAY_PUBLIC_DOMAIN: $RAILWAY_PUBLIC_DOMAIN"

# Check if build already exists
if [ ! -d ".medusa/server/public" ]; then
  echo "Building Medusa admin panel..."
  npm run build
else
  echo "Medusa build already exists, skipping build"
fi

# Start the server
echo "Starting Medusa server..."
exec npm run start