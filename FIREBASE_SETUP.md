# Authentication Setup Guide

This guide walks you through adding Firebase Authentication to your Achievement Vault app.

## Step 1: Install Firebase

Open your terminal and run:

```bash
npm install firebase
```

## Step 2: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Name it "achievement-vault" (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 3: Get Firebase Credentials

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Under "General" tab, scroll down to "Your apps"
3. Click on Web icon `</>`
4. Register app with name "Achievement Vault"
5. Copy your Firebase config - it looks like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "achievement-vault-xxx.firebaseapp.com",
  projectId: "achievement-vault-xxx",
  storageBucket: "achievement-vault-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456",
};
```

## Step 4: Create Environment File

Create a `.env.local` file in the root directory:

```
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

Replace `YOUR_*` values with your Firebase config values.

## Step 5: Enable Authentication Methods

1. In Firebase Console, go to **Authentication**
2. Click **Sign-in method**
3. Enable **Email/Password**
4. Click **Save**

## Step 6: Enable Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (or production mode with security rules)
4. Choose a location near your users
5. Click **Create**

## Step 7: Set Firestore Security Rules

Go to **Firestore Database** → **Rules** and update to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read/write their own data
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

Click **Publish**.

## Step 8: Restart Development Server

```bash
npm run dev
```

The app should now have authentication enabled!

## Testing Authentication

1. Click "Sign Up" on the login screen
2. Enter email and password
3. Your data will now be stored in Firestore and synced across devices
4. Log in from another device with the same credentials to see your data persist

## Deploying to Vercel

1. Push your code to GitHub (with `.env.local` in `.gitignore`)
2. Go to Vercel and import your GitHub repo
3. Add environment variables in Vercel settings with your Firebase credentials
4. Deploy!

---

**Note:** The authentication code has been prepared in the updated App.tsx. Once Firebase is installed and configured, everything will work seamlessly.
