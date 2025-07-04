# Use official Node.js LTS image as base
FROM node:alpine

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /dist /usr/share/nginx/html
COPY --from=build /nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000
# Start the application
CMD ["nginx", "-g", "daemon off;"]