#!/bin/bash

echo "🚂 Deploying to Railway..."
echo ""

# Check if railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Check if logged in
if ! railway whoami &> /dev/null; then
    echo "🔐 Please log in to Railway:"
    railway login
fi

# Initialize if needed
if [ ! -f "railway.json" ]; then
    echo "📝 Initializing Railway project..."
    railway init
fi

# Set environment variables
echo "🔧 Setting environment variables..."
echo ""
echo "Enter your Salesforce credentials:"
read -p "SF_USERNAME: " SF_USERNAME
read -p "SF_PASSWORD: " SF_PASSWORD
read -p "SF_SECURITY_TOKEN: " SF_SECURITY_TOKEN
read -p "SF_LOGIN_URL (default: https://login.salesforce.com): " SF_LOGIN_URL
SF_LOGIN_URL=${SF_LOGIN_URL:-https://login.salesforce.com}

echo ""
read -p "ANTHROPIC_API_KEY: " ANTHROPIC_API_KEY

echo ""
echo "📤 Setting variables in Railway..."
railway variables set SF_USERNAME="$SF_USERNAME"
railway variables set SF_PASSWORD="$SF_PASSWORD"
railway variables set SF_SECURITY_TOKEN="$SF_SECURITY_TOKEN"
railway variables set SF_LOGIN_URL="$SF_LOGIN_URL"
railway variables set ANTHROPIC_API_KEY="$ANTHROPIC_API_KEY"
railway variables set NODE_ENV="production"
railway variables set PORT="3001"

echo ""
echo "🚀 Deploying to Railway..."
railway up

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Run 'railway open' to view your app in the browser"
echo "Run 'railway logs' to view logs"
