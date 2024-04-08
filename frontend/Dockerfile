# Use the official Node.js image as the base image
FROM node:14-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Nginx image to serve the production build
FROM nginx:alpine

# Copy the production build from the build stage to the Nginx image
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
