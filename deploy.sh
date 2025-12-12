#!/bin/bash

# Time Store Deployment Script for Beginners
# This script helps automate the deployment process

echo "🚀 Time Store Deployment Helper"
echo "==============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed"
    echo "Please download it from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed"

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed"
    echo "Please install Node.js which includes npm"
    exit 1
fi

echo "✅ npm is installed"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Build the project
echo ""
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "Next steps:"
    echo "1. Create a GitHub account at https://github.com"
    echo "2. Download GitHub Desktop from https://desktop.github.com"
    echo "3. Upload your files to GitHub"
    echo "4. Sign up at https://vercel.com with your GitHub account"
    echo "5. Import your repository and deploy!"
    echo ""
    echo "🎉 Your website is ready for deployment!"
else
    echo ""
    echo "❌ Build failed. Please check for errors above."
    echo "Fix any issues and run this script again."
fi