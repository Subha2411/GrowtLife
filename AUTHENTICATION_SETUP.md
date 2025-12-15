# Authentication Added ✅

Your Achievement Vault now has authentication UI ready! Here's what was added:

## What's New

1. **Sign In / Sign Up Modal** - Professional auth screens in the app
2. **User State Management** - Ready to track authenticated users
3. **Logout Functionality** - Users can sign out from the top bar
4. **Firebase Configuration** - Set up file at `src/firebase.ts`
5. **Password Toggle** - Show/hide password input for better UX

## 3 Steps to Enable Authentication

### Step 1: Install Firebase

```bash
npm install firebase
```

### Step 2: Create Firebase Project

Go to [Firebase Console](https://console.firebase.google.com):
1. Click **Add project**
2. Name it `achievement-vault`
3. Click **Create project**
4. Wait for setup to complete

### Step 3: Get Your Credentials

1. In Firebase Console → **Project Settings** (⚙️)
2. Under "General" → scroll to "Your apps"
3. Click Web icon `</>`
4. Register app as "Achievement Vault"
5. **Copy the config object** (looks like below)

```javascript
{
  apiKey: "AIzaSy...",
  authDomain: "achievement-vault-xxx.firebaseapp.com",
  projectId: "achievement-vault-xxx",
  storageBucket: "achievement-vault-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
}
```

### Step 4: Create `.env.local` File

In your project root, create `.env.local`:

```
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

### Step 5: Enable Email/Password Auth

In Firebase Console:
1. Go to **Authentication**
2. Click **Sign-in method**
3. Click **Email/Password**
4. Toggle **Enable**
5. Click **Save**

### Step 6: Enable Firestore Database

1. Go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Choose a region closest to you
5. Click **Create**

### Step 7: Set Security Rules

In **Firestore Database** → **Rules**, paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

Click **Publish**.

### Step 8: Uncomment Firebase Code in App.tsx

Open `src/App.tsx` and uncomment these sections:

1. **Line 36-48** - Firebase imports
2. **Line 334-349** - useEffect with Firebase auth
3. **Line 418-425** - Sign up function
4. **Line 444-450** - Login function

Search for `// Uncomment when Firebase is installed:` to find each section.

### Step 9: Restart Dev Server

```bash
npm run dev
```

## What Happens After Setup

✅ **Sign In Screen** - Users see login/signup modal on first visit  
✅ **Account Creation** - Email/password registration  
✅ **Data Persistence** - User logs are saved in Firestore (cloud)  
✅ **Cross-Device Sync** - Login on any device to see the same data  
✅ **Secure** - Firebase handles password security  

## For Deployment to Vercel

1. **Do NOT commit `.env.local`** - Add to `.gitignore` (already done)
2. Go to Vercel dashboard
3. Select your project
4. Go to **Settings** → **Environment Variables**
5. Add the same Firebase variables:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
6. Redeploy
7. Authentication will work on your live app! 🚀

## Current State (Before Firebase Install)

- ✅ UI is ready (login/signup screens visible)
- ✅ All code commented and labeled
- ✅ Just need to install Firebase and uncomment
- ✅ Data saves locally (localStorage) for now

## Questions?

- Firebase Docs: https://firebase.google.com/docs
- Contact: firebase-setup@example.com

Happy growing! 🌱
