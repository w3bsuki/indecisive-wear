#!/bin/bash
set -e

echo "🚀 Starting Medusa production server..."

# Check if .medusa/server exists
if [ ! -d ".medusa/server" ]; then
    echo "❌ Error: .medusa/server directory not found. Please run 'npm run build' first."
    exit 1
fi

# Copy environment variables to the build directory
if [ -f ".env" ]; then
    cp .env .medusa/server/.env
fi

# Navigate to the production build directory
cd .medusa/server

# Run migrations
echo "🗄️ Running database migrations..."
npx medusa db:migrate

# Start the server
echo "✅ Starting Medusa server..."
NODE_ENV=production npx medusa start