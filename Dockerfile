# Step 1: Use an official Node.js runtime as a parent image
FROM node:20-alpine as base

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json (if available) files
COPY package*.json ./

# Step 4: Install your application's dependencies
RUN npm install

# Step 5: Bundle your app's source code inside the Docker image
COPY . .

# Step 6: Your app binds to port 8080, so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8080

# Step 7: Define the command to run your app
CMD [ "node", "index.js" ]
