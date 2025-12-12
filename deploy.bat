@echo off
title Time Store Deployment Helper

echo 🚀 Time Store Deployment Helper
echo ===============================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed
    echo Please download it from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed
    echo Please install Node.js which includes npm
    pause
    exit /b 1
)

echo ✅ npm is installed

REM Install dependencies
echo.
echo 📦 Installing dependencies...
npm install

REM Build the project
echo.
echo 🔨 Building the project...
npm run build

REM Check if build was successful
if %errorlevel% equ 0 (
    echo.
    echo ✅ Build successful!
    echo.
    echo Next steps:
    echo 1. Create a GitHub account at https://github.com
    echo 2. Download GitHub Desktop from https://desktop.github.com
    echo 3. Upload your files to GitHub
    echo 4. Sign up at https://vercel.com with your GitHub account
    echo 5. Import your repository and deploy!
    echo.
    echo 🎉 Your website is ready for deployment!
) else (
    echo.
    echo ❌ Build failed. Please check for errors above.
    echo Fix any issues and run this script again.
)

pause