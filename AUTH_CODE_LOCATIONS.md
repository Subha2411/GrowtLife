# Authentication Code Locations Guide

This guide shows exactly where to find and uncomment the Firebase code.

## Files to Modify After Installing Firebase

### 1. `src/App.tsx` - Main Application File

#### Section 1: Imports (Lines 36-48)
```typescript
// Add Firebase imports by uncommenting:

// import { auth, db } from "./firebase";
// import { 
//   createUserWithEmailAndPassword, 
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   User
// } from "firebase/auth";
// import {
//   collection,
//   doc,
//   setDoc,
//   getDoc,
//   query,
//   where,
//   getDocs,
// } from "firebase/firestore";
```

#### Section 2: useEffect Hook (Lines 334-349)
```typescript
// Inside the useEffect hook, uncomment:

// const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//   if (currentUser) {
//     setUser(currentUser);
//     // Load user data from Firestore
//     loadUserData(currentUser.uid);
//   } else {
//     setUser(null);
//   }
//   setIsAuthLoading(false);
// });
```

#### Section 3: Sign Up Handler (Lines 418-425)
```typescript
// In handleSignUp function, uncomment:

// await createUserWithEmailAndPassword(auth, authEmail, authPassword);
// setShowAuthModal(false);
// setAuthEmail("");
// setAuthPassword("");
```

#### Section 4: Login Handler (Lines 444-450)
```typescript
// In handleLogin function, uncomment:

// await signInWithEmailAndPassword(auth, authEmail, authPassword);
// setShowAuthModal(false);
// setAuthEmail("");
// setAuthPassword("");
```

---

### 2. `src/firebase.ts` - Firebase Configuration

This file is ready to go once Firebase is installed.

```typescript
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuration uses environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

---

## Environment Setup

### Create `.env.local` in Project Root

```bash
# .env.local file (DO NOT commit this to Git)

VITE_FIREBASE_API_KEY=YOUR_API_KEY_HERE
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN_HERE
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID_HERE
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET_HERE
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID_HERE
VITE_FIREBASE_APP_ID=YOUR_APP_ID_HERE
```

### Add to `.gitignore` (Already Done)

```bash
.env.local
.env.*.local
```

---

## Step-by-Step Uncommenting Process

### 1. Install Firebase First
```bash
npm install firebase
```

### 2. Create `.env.local` with Your Credentials
See section above

### 3. Open `src/App.tsx`

#### Uncomment Section 1 (Imports)
- Find lines 36-48
- Remove `//` from the Firebase import lines
- Save file

#### Uncomment Section 2 (useEffect)
- Find the useEffect hook (around line 334)
- Uncomment the `onAuthStateChanged` section
- Remove the `setIsAuthLoading(false)` line that's before it
- Save file

#### Uncomment Section 3 (handleSignUp)
- Find the `handleSignUp` function
- Uncomment the Firebase sign up lines
- Comment out the `alert()` line
- Save file

#### Uncomment Section 4 (handleLogin)
- Find the `handleLogin` function
- Uncomment the Firebase login lines
- Comment out the `alert()` line
- Save file

### 4. Restart Dev Server
```bash
npm run dev
```

### 5. Test Authentication

1. Click "Sign In" button in top right
2. Click "Create Account" link
3. Enter email and password
4. Click "Create Account" button
5. You should be signed in!

---

## Firebase Console Setup Checklist

- [ ] Go to https://console.firebase.google.com
- [ ] Create new project (name: "achievement-vault")
- [ ] Go to Project Settings ⚙️
- [ ] Copy all config values
- [ ] Paste into `.env.local` file
- [ ] Go to Authentication tab
- [ ] Enable Email/Password sign-in method
- [ ] Go to Firestore Database
- [ ] Create database in test mode
- [ ] Update Firestore rules (see AUTHENTICATION_SETUP.md)

---

## Troubleshooting

### "Cannot find module 'firebase/app'"
→ Run `npm install firebase`

### Auth button doesn't work
→ Check `.env.local` file exists with correct values
→ Restart dev server after adding `.env.local`

### "Invalid Firebase credentials"
→ Copy credentials from Firebase Console again
→ Make sure VITE_ prefix is used in env vars
→ Check for extra spaces or line breaks in .env.local

### Data not syncing
→ Check Firestore rules in Firebase Console
→ Make sure Email/Password is enabled in Authentication
→ Check browser console for error messages

---

## What Each Auth Function Does

### `handleSignUp()`
- Creates new user account with email/password
- Stores in Firebase Authentication
- Closes auth modal
- User can now log in

### `handleLogin()`
- Signs in existing user
- Checks email/password combination
- Sets user state
- Shows user email in top bar

### `handleLogout()`
- Signs user out of Firebase
- Clears user state
- Hides user email from top bar

### `renderAuthModal()`
- Shows login/signup form
- Handles input fields
- Displays errors
- Shows loading states

---

## File Structure After Setup

```
project/
├── src/
│   ├── App.tsx           ← Modified with auth code uncommented
│   ├── firebase.ts       ← Ready to use after npm install
│   ├── main.tsx
│   └── index.css
├── .env.local            ← Create this with Firebase credentials
├── .gitignore            ← Already includes .env.local
├── package.json
└── [other files...]
```

---

Ready to uncomment? Start with `npm install firebase`!
