#!/bin/sh

echo "=== DIAGNOSTIC STARTUP SCRIPT ==="
echo "Current directory: $(pwd)"
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo ""

echo "=== CHECKING ENVIRONMENT VARIABLES ==="
echo "PORT: ${PORT:-NOT SET}"
echo "DATABASE_URL: ${DATABASE_URL:+SET}"
echo "MEDUSA_ADMIN_BACKEND_URL: ${MEDUSA_ADMIN_BACKEND_URL:-NOT SET}"
echo "JWT_SECRET: ${JWT_SECRET:+SET}"
echo "COOKIE_SECRET: ${COOKIE_SECRET:+SET}"
echo "REDIS_URL: ${REDIS_URL:-NOT SET}"
echo ""

echo "=== CHECKING BUILD OUTPUT ==="
if [ -d ".medusa" ]; then
  echo "✓ .medusa directory exists"
  if [ -f ".medusa/server/public/index.html" ]; then
    echo "✓ Admin panel index.html exists"
  else
    echo "✗ Admin panel index.html NOT FOUND"
  fi
else
  echo "✗ .medusa directory NOT FOUND"
fi
echo ""

echo "=== TESTING DATABASE CONNECTION ==="
if [ -n "$DATABASE_URL" ]; then
  node -e "
    const url = new URL('$DATABASE_URL');
    console.log('Database host:', url.hostname);
    console.log('Database port:', url.port);
    console.log('Database name:', url.pathname.slice(1));
  " 2>&1 || echo "Failed to parse DATABASE_URL"
else
  echo "✗ DATABASE_URL not set"
fi
echo ""

echo "=== STARTING MEDUSA ==="
npm run start