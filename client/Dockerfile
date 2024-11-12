# Base image
FROM node:18.20.4-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy only necessary files
COPY . .

# Expose application port
EXPOSE 3000

CMD ["npm", "run", "dev"] 
