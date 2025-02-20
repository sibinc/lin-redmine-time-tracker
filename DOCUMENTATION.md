# Linways Redmine Time Tracker

## Introduction
The Linways Redmine Time Tracker is a Chrome Extension designed to automatically trigger time tracking based on issue status changes in Redmine.

## Features
- **Automatic Time Tracking**: Automatically starts and stops time tracking based on issue status changes.
- **User Preferences**: Allows users to enable or disable the extension's functionality.

## Permissions
The extension requires the following permissions:
- **Storage**: To save user preferences and settings.
- **Scripting**: To inject scripts into the Redmine website.
- **ActiveTab**: To access the content of the active tab.
- **Host Permissions**: To interact with `https://redmine.linways.com/*`.

## How It Works
1. **Injection of Content Script**: The extension injects a content script into the Redmine issue pages to monitor changes in issue status.
2. **Event Listeners**: Listens for changes in the issue status dropdown and triggers time tracking accordingly.
3. **Cleanup**: Includes a cleanup function to remove event listeners and reset the injection flag.

## Setup and Installation
1. Install the extension from the [Chrome Webstore](#).
2. Navigate to the Linways Redmine issue pages.
3. The extension will automatically start tracking time based on issue status changes.

## Privacy Policy
Please refer to the [Privacy Policy](PRIVACY_POLICY.md) for information on how we handle user data.

## Contact Us
If you have any questions or need further assistance, please contact us at sibincbaby219@gmail.com.

Effective Date: [2025-02-20]