#!/bin/bash

echo "=== Railway Medusa Build Script ==="
echo "MEDUSA_ADMIN_BACKEND_URL: $MEDUSA_ADMIN_BACKEND_URL"
echo "MEDUSA_BACKEND_URL: $MEDUSA_BACKEND_URL"
echo "RAILWAY_PUBLIC_DOMAIN: $RAILWAY_PUBLIC_DOMAIN"
echo "RAILWAY_STATIC_URL: $RAILWAY_STATIC_URL"

# If MEDUSA_ADMIN_BACKEND_URL is not set but we have a Railway domain
if [ -z "$MEDUSA_ADMIN_BACKEND_URL" ] && [ -n "$RAILWAY_PUBLIC_DOMAIN" ]; then
    export MEDUSA_ADMIN_BACKEND_URL="https://${RAILWAY_PUBLIC_DOMAIN}"
    export MEDUSA_BACKEND_URL="https://${RAILWAY_PUBLIC_DOMAIN}"
    echo "Set MEDUSA_ADMIN_BACKEND_URL to: $MEDUSA_ADMIN_BACKEND_URL"
fi

# If still not set, try RAILWAY_STATIC_URL
if [ -z "$MEDUSA_ADMIN_BACKEND_URL" ] && [ -n "$RAILWAY_STATIC_URL" ]; then
    export MEDUSA_ADMIN_BACKEND_URL="$RAILWAY_STATIC_URL"
    export MEDUSA_BACKEND_URL="$RAILWAY_STATIC_URL"
    echo "Set MEDUSA_ADMIN_BACKEND_URL to: $MEDUSA_ADMIN_BACKEND_URL"
fi

echo "=== Final URLs ==="
echo "MEDUSA_ADMIN_BACKEND_URL: $MEDUSA_ADMIN_BACKEND_URL"
echo "MEDUSA_BACKEND_URL: $MEDUSA_BACKEND_URL"

# Build Medusa
medusa build

# Create symlink for admin
ln -sf .medusa/server/public/ public

echo "=== Build completed ==="