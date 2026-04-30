#!/bin/bash

# Project Manager - Local Setup Script

echo "🚀 Setting up Project Manager Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ from nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if MongoDB is running
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not found. Installing MongoDB locally..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew tap mongodb/brew
        brew install mongodb-community
        brew services start mongodb-community
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get update
        sudo apt-get install -y mongodb
        sudo systemctl start mongodb
    fi
fi

echo "📦 Installing dependencies..."
npm run install:all

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Copy .env.example to .env and update values if needed"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "🧪 Test with demo credentials:"
echo "   Email: demo@example.com"
echo "   Password: password123"
