#!/bin/bash

echo "🚀 Starting Salesforce AI Email Generator..."
echo ""

# Check if .env exists in server directory
if [ ! -f "server/.env" ]; then
    echo "❌ Error: server/.env file not found!"
    echo ""
    echo "Please follow these steps:"
    echo "1. cd server"
    echo "2. cp .env.example .env"
    echo "3. Edit .env with your Salesforce and Anthropic credentials"
    echo ""
    echo "See docs/SALESFORCE_SETUP.md for detailed instructions."
    exit 1
fi

# Check if node_modules exists in server
if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server && npm install && cd ..
    echo "✅ Server dependencies installed"
    echo ""
fi

# Check if node_modules exists in client
if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    cd client && npm install && cd ..
    echo "✅ Client dependencies installed"
    echo ""
fi

echo "🔧 Starting backend server on port 3001..."
cd server && npm run dev &
SERVER_PID=$!

echo "⏳ Waiting for server to start..."
sleep 3

echo "🎨 Starting frontend on port 5173..."
cd ../client && npm run dev &
CLIENT_PID=$!

echo ""
echo "✅ Application started!"
echo ""
echo "📊 Backend API: http://localhost:3001/api"
echo "🌐 Frontend UI: http://localhost:5173"
echo "🏥 Health Check: http://localhost:3001/api/health"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for Ctrl+C
trap "kill $SERVER_PID $CLIENT_PID; exit" INT
wait
