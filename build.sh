#!/bin/bash

# Build backend
cd server
npm install
cd ..

# Build frontend
cd client
npm install
npm run build
cd ..

# Move built frontend to server public folder
mkdir -p server/public
cp -r client/dist/* server/public/

echo "Build complete!"
