# Stage 1: Build the React app
FROM node:18-alpine3.17 as build

WORKDIR /app
COPY . /app

RUN npm i npm@latest -g
RUN npm install
RUN npm run build

# Stage 2: Serve the React app using Amazon Linux and Nginx
FROM amazonlinux:2

# Install Nginx
RUN yum -y update && \
    yum -y install nginx

# Remove the default Nginx configuration and use your custom one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the first stage
COPY --from=build /app/dist /var/www/html/

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
