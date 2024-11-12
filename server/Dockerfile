# Use official Node.js image as the base image
FROM node:18.20.4-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install all dependencies, including development dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application files into the container
COPY . .

# Expose the port your application will be running on
EXPOSE 9000

# Command to run your application (using nodemon)
CMD ["npm", "start"]
