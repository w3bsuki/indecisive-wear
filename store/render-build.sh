#!/bin/bash
set -e

echo "🚀 Starting Render build process for Medusa..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building Medusa..."
npm run build

# Run database migrations
echo "🗄️ Running database migrations..."
npx medusa db:migrate

echo "✅ Build complete!"