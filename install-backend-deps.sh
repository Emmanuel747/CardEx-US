#!/bin/bash

# Check if package-backend.json exists
if [ ! -f package-backend.json ]; then
  echo "package-backend.json not found!"
  exit 1
fi

# Rename package.json to package-frontend.json if it exists
if [ -f package.json ]; then
  mv package.json package-frontend.json
fi

# Rename package-backend.json to package.json
mv package-backend.json package.json

# Run npm install
npm install

# Rename package.json back to package-backend.json
mv package.json package-backend.json

# Rename package-frontend.json back to package.json if it exists
if [ -f package-frontend.json ]; then
  mv package-frontend.json package.json
fi

echo "Backend dependencies installed successfully."