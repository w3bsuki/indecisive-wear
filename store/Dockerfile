FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create entrypoint script
RUN echo '#!/bin/sh' > /app/docker-entrypoint.sh && \
    echo 'echo "=== Runtime Build with Environment Variables ==="' >> /app/docker-entrypoint.sh && \
    echo 'echo "MEDUSA_ADMIN_BACKEND_URL: $MEDUSA_ADMIN_BACKEND_URL"' >> /app/docker-entrypoint.sh && \
    echo 'echo "RAILWAY_PUBLIC_DOMAIN: $RAILWAY_PUBLIC_DOMAIN"' >> /app/docker-entrypoint.sh && \
    echo 'if [ ! -d ".medusa" ]; then' >> /app/docker-entrypoint.sh && \
    echo '  echo "Building Medusa..."' >> /app/docker-entrypoint.sh && \
    echo '  npm run build' >> /app/docker-entrypoint.sh && \
    echo 'fi' >> /app/docker-entrypoint.sh && \
    echo 'npm run start' >> /app/docker-entrypoint.sh && \
    chmod +x /app/docker-entrypoint.sh

# Expose port
EXPOSE 9000

# Start the application
CMD ["/app/docker-entrypoint.sh"]