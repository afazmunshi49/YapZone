# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies with legacy peer deps flag (I'm using this since some dependencies do not support the version of redux-thunk I use.)
RUN npm install --legacy-peer-deps

# # Install dependencies
# RUN npm install

# Copy the rest of the application to the container
COPY . .

# Build the React application
RUN npm run build

# Install serve to serve the build folder
RUN npm install -g serve

# Set environment variables for serve
ENV REACT_APP_BACKEND_URL=http://localhost:5002

# Command to run the application
CMD ["serve", "-s", "build"]

# Expose the port the app runs on
EXPOSE 3000