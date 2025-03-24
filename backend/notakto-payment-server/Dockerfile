# Use Node.js base image
FROM mhart/alpine-node

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the server port (change accordingly)
EXPOSE 3000

# Run the server
CMD ["node", "server.js"]
