# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend application to the container
COPY . .

# Expose the port your backend server is running on (e.g., 5000)
EXPOSE 5000

# Start your backend server
CMD ["npm", "start"]
