FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev) for the build
RUN npm ci

# Copy source code
COPY . .

# CRITICAL: Declare build arguments to access Railway environment variables
ARG MEDUSA_ADMIN_BACKEND_URL
ARG MEDUSA_BACKEND_URL
ARG RAILWAY_PUBLIC_DOMAIN

# Set environment variables from build args
ENV MEDUSA_ADMIN_BACKEND_URL=$MEDUSA_ADMIN_BACKEND_URL
ENV MEDUSA_BACKEND_URL=$MEDUSA_BACKEND_URL

# Build the Medusa application WITH the backend URL
RUN echo "=== Building Medusa Admin Panel ===" && \
    echo "MEDUSA_ADMIN_BACKEND_URL: $MEDUSA_ADMIN_BACKEND_URL" && \
    echo "MEDUSA_BACKEND_URL: $MEDUSA_BACKEND_URL" && \
    echo "===" && \
    npm run build

# Remove dev dependencies after build
RUN npm prune --production

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start"]