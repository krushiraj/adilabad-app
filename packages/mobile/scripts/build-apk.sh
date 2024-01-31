#!/bin/bash

# set current working directory to the parent directory of the directory containing this script
cd "$(dirname "$(dirname "$(readlink -f "$0")")")"

pwd

# Run the build command and save the output
output=$(eas build --platform android)

# Use grep to find the line with the URL, then use awk to get the URL
url=$(echo "$output" | grep -o 'https://expo\.dev/artifacts/eas/[^ ]*')

# download aab file
wget -O app.aab "$url"

# extract apks file
java -jar ./scripts/build/bundletool-all-1.15.6.jar build-apks --bundle=./app.aab --output=./app.apks --mode=universal

# extract single apk
java -jar ./scripts/build/bundletool-all-1.15.6.jar extract-apks --apks=./app.apks --output-dir=./app-apks --device-spec=./scripts/build/device-spec.json

# rename apk file
mv ./app-apks/*.apk ./adilabad-app.apk

# remove temporary files
rm -rf ./app.aab ./app.apks ./app-apks

# open the folder with the apk file
open .

echo "Done building APK!"
