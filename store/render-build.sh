#!/bin/bash
set -e

echo "🚀 Starting Render build process for Medusa v2..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project (including admin panel)
echo "🔨 Building Medusa with admin panel..."
npx medusa build

# Verify build output
if [ ! -d ".medusa/server" ]; then
    echo "❌ Build failed: .medusa/server directory not found"
    exit 1
fi

if [ ! -f ".medusa/server/public/admin/index.html" ]; then
    echo "❌ Build failed: Admin panel index.html not found"
    exit 1
fi

echo "✅ Build complete! Admin panel built successfully."

# List build contents for verification
echo "📁 Build contents:"
ls -la .medusa/server/public/admin/ | head -5