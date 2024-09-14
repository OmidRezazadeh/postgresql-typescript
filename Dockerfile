# Use the official Node.js 20 image based on Alpine Linux for a lightweight build
FROM node:20-alpine

# Set the working directory in the container to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies listed in package.json
RUN npm install

# Copy the rest of the application code into the working directory
COPY . .

# Start the application using the 'start' script defined in package.json
CMD ["npx", "nodemon", "src/index.ts"]
