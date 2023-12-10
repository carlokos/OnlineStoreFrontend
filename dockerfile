# Use the official Node.js image as the base image
FROM node:21-alpine AS PRODUCTION_IMAGE

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY vite.config.js ./

# Install dependencies
RUN npm install

# Copy the entire application to the working directory
COPY . .

# Copy the pre-built dist directory
COPY dist/ ./dist/

# Expose the port 
EXPOSE 5173

# Command to run the application, CHECK VITE.CONFIG.JS
CMD [ "npm", "run", "preview" ]




