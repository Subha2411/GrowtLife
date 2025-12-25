## Simple Authentication Implementation Plan

### Current Issues:
- Complex auth state management causing bugs
- Landing page showing/hiding inconsistently  
- Multiple conditional checks causing confusion

### New Clean Implementation:

**State Variables:**
```typescript
const [user, setUser] = useState<UserProfile | null>(null);
const [authLoading, setAuthLoading] = useState(true);
const [showAuth, setShowAuth] = useState(false);
const [isSignup, setIsSignup] = useState(false);
```

**Auth Flow:**
1. App loads → Show loading state
2. Firebase checks auth → Set user or null
3. If no user → Show landing page
4. If user → Show app

**Landing Page Logic:**
```typescript
{authLoading && <LoadingScreen />}
{!authLoading && !user && <LandingPage />}
{!authLoading && user && <AppContent />}
```

**Implementation Steps:**
1. Simplify state variables (4 total, no complex flags)
2. Clean auth listener (one useEffect)
3. Simple modal (login/signup toggle)
4. Basic form validation
5. Clear error messages
