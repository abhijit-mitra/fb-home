#!/usr/bin/env bash
echo "--------------Running: npm run build:prod. Please wait..."
npm run build:prod
cp -r build prod/
cd prod
zip -r ./payouts.zip *
rm -r build
cd ..
rm -r build
