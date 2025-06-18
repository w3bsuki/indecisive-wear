#!/bin/bash

echo "Installing i18n packages individually..."

echo "Installing react-i18next..."
npm install react-i18next --no-optional --no-audit --no-fund

echo "Installing i18next..."  
npm install i18next --no-optional --no-audit --no-fund

echo "Installing i18next-browser-languagedetector..."
npm install i18next-browser-languagedetector --no-optional --no-audit --no-fund

echo "All packages installed successfully!"