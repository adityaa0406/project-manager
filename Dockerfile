FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies
RUN npm install
RUN cd server && npm install
RUN cd client && npm install

# Copy application code
COPY . .

# Build client
RUN cd client && npm run build

# Copy built client to server
RUN mkdir -p server/public && cp -r client/dist/* server/public/

WORKDIR /app/server

EXPOSE 3000

CMD ["npm", "start"]
