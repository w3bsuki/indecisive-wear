#!/bin/bash
set -e

echo "🚀 Starting Medusa on Railway..."

# Run migrations first
echo "📊 Running database migrations..."
npx medusa db:migrate || echo "⚠️ Migrations failed, continuing anyway..."

# Start Medusa
echo "✅ Starting Medusa server..."
npx medusa start