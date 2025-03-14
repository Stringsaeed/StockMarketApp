#!/usr/bin/env node

/**
 * This script updates version numbers across multiple files using Fastlane:
 * - iOS project version and build number
 * - Android build.gradle version code and name
 * - package.json version
 */

const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

// Get the new version from command line arguments
const newVersion = process.argv[2];
if (!newVersion) {
  console.error('Error: No version specified');
  process.exit(1);
}

// Parse version components
const versionParts = newVersion.split('.');
if (versionParts.length !== 3) {
  console.error('Error: Version must be in format x.y.z');
  process.exit(1);
}

const major = parseInt(versionParts[0], 10);
const minor = parseInt(versionParts[1], 10);
const patch = parseInt(versionParts[2], 10);

// Calculate build number (can be customized based on your needs)
// Here we use a simple formula: major * 10000 + minor * 100 + patch
const buildNumber = major * 10000 + minor * 100 + patch;

console.log(`Updating to version ${newVersion} (build ${buildNumber})`);

// Update package.json version
function updatePackageJson() {
  try {
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.version = newVersion;
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + '\n',
    );
    console.log('✅ Updated package.json version');
  } catch (error) {
    console.error('❌ Failed to update package.json:', error.message);
  }
}

// Update Android version using Fastlane
function updateAndroidVersion() {
  try {
    execSync(
      `cd ${path.join(
        __dirname,
        '..',
      )} && bundle exec fastlane run increment_version_code version_code:${buildNumber} gradle_file_path:android/app/build.gradle`,
      {stdio: 'inherit'},
    );
    execSync(
      `cd ${path.join(
        __dirname,
        '..',
      )} && bundle exec fastlane run increment_version_name version_name:${newVersion} gradle_file_path:android/app/build.gradle`,
      {stdio: 'inherit'},
    );
    console.log('✅ Updated Android version');
  } catch (error) {
    console.error('❌ Failed to update Android version:', error.message);
  }
}

// Update iOS version using Fastlane
function updateIOSVersion() {
  try {
    execSync(
      `cd ${path.join(
        __dirname,
        '..',
      )} && bundle exec fastlane run increment_version_number version_number:${newVersion} xcodeproj:ios/StockMarketApp.xcodeproj`,
      {stdio: 'inherit'},
    );
    execSync(
      `cd ${path.join(
        __dirname,
        '..',
      )} && bundle exec fastlane run increment_build_number build_number:${buildNumber} xcodeproj:ios/StockMarketApp.xcodeproj`,
      {stdio: 'inherit'},
    );
    console.log('✅ Updated iOS version');
  } catch (error) {
    console.error('❌ Failed to update iOS version:', error.message);
  }
}

// Execute updates
updatePackageJson();
updateAndroidVersion();
updateIOSVersion();

console.log('Version update completed!');
