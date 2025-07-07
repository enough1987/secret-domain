# ----------- Build Stage -----------
FROM node:current-alpine as build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the source code into the container
COPY . .

# Build the frontend app (output goes to /app/dist)
RUN npm run build

# ----------- Production Stage -----------
FROM nginx:alpine

# Copy built static assets from build stage to Nginx's html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config for serving the frontend
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3000 (for internal Docker networking; not exposed to host in production)
EXPOSE 3000

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]