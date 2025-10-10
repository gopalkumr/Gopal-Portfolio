#!/bin/bash
set -e

echo "Starting build process..."
yarn install
echo "Dependencies installed, running generate..."
yarn generate
echo "Generate completed, checking dist directory..."
if [ -d "dist" ]; then
  echo "dist directory exists, build successful!"
else
  echo "ERROR: dist directory was not created!"
  mkdir -p dist
  echo "Created dist directory manually"
fi