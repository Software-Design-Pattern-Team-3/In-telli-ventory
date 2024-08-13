# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY . /app

RUN npm i npm@latest -g
RUN npm install
RUN npm run build

# Production stage
FROM amazonlinux:2023

# Install nginx
RUN dnf update -y && \
    dnf install nginx -y && \
    dnf clean all

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]