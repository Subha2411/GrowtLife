import React, { useState, useEffect, useMemo } from "react";
import {
  Trophy,
  Zap,
  Calendar,
  TrendingUp,
  Plus,
  Award,
  Flame,
  Crown,
  Egg,
  Sprout,
  X,
  Share2,
  Activity,
  BookOpen,
  Briefcase,
  Heart,
  Smile,
  Music,
  Camera,
  Mic,
  ChevronRight,
  Star,
  Sparkles,
  Loader2,
  Ghost,
  Moon,
  Sun,
  Infinity,
  CircleDashed,
  Wind,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";

// Firebase imports (will work after npm install firebase)
// Uncomment when Firebase is installed:
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

// --- Constants & Config ---

const apiKey = "AIzaSyB7LO52r2at4sDHhSCwJflnvihyQYs4i3U"; // API Key provided by environment

const CATEGORIES = [
  {
    id: "skill",
    label: "Skill",
    icon: BookOpen,
    color: "text-blue-400",
    bg: "bg-blue-500/20",
  },
  {
    id: "career",
    label: "Career",
    icon: Briefcase,
    color: "text-purple-400",
    bg: "bg-purple-500/20",
  },
  {
    id: "health",
    label: "Health",
    icon: Activity,
    color: "text-green-400",
    bg: "bg-green-500/20",
  },
  {
    id: "mindset",
    label: "Mindset",
    icon: Smile,
    color: "text-yellow-400",
    bg: "bg-yellow-500/20",
  },
  {
    id: "personal",
    label: "Personal",
    icon: Heart,
    color: "text-pink-400",
    bg: "bg-pink-500/20",
  },
];

const STAGES = [
  {
    level: 1,
    name: "Stardust Mote",
    minGP: 0,
    icon: CircleDashed,
    color: "text-slate-400",
    desc: "A tiny speck of potential waiting to coalesce.",
  },
  {
    level: 2,
    name: "Lunar Wisp",
    minGP: 100,
    icon: Moon,
    color: "text-indigo-300",
    desc: "Reflecting the light of your first achievements.",
  },
  {
    level: 3,
    name: "Astral Spirit",
    minGP: 250,
    icon: Ghost,
    color: "text-purple-400",
    desc: "A conscious entity formed from your habits.",
  },
  {
    level: 4,
    name: "Solar Guardian",
    minGP: 450,
    icon: Sun,
    color: "text-amber-400",
    desc: "Burning bright with the heat of consistency.",
  },
  {
    level: 5,
    name: "Universal Entity",
    minGP: 750,
    icon: Infinity,
    color: "text-cyan-400",
    desc: "Boundless growth that transcends the chart.",
  },
  {
    level: 6,
    name: "Cosmic Sentinel",
    minGP: 1150,
    icon: Star,
    color: "text-yellow-400",
    desc: "A guardian of endless possibility and wonder.",
  },
  {
    level: 7,
    name: "Infinite Ascendant",
    minGP: 1750,
    icon: Infinity,
    color: "text-cyan-400",
    desc: "Beyond measure, transcending all known limits.",
  },
];

// --- Helper Functions ---

async function callGemini(prompt, systemInstruction = "") {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] },
  };

  const delays = [1000, 2000, 4000, 8000, 16000];

  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response generated."
      );
    } catch (error) {
      if (i === 4) throw error;
      await new Promise((resolve) => setTimeout(resolve, delays[i]));
    }
  }
}

// --- Helper Components ---

const ProgressBar = ({ current, max, colorClass = "bg-indigo-500" }) => {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));
  return (
    <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
      <div
        className={`h-full ${colorClass} transition-all duration-1000 ease-out`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const Companion = ({ gp }) => {
  // Determine stage based on GP
  const stage = [...STAGES].reverse().find((s) => gp >= s.minGP) || STAGES[0];
  const nextStage = STAGES.find((s) => s.minGP > gp);
  const progressToNext = nextStage ? gp - stage.minGP : 100;
  const rangeToNext = nextStage ? nextStage.minGP - stage.minGP : 100;

  const Icon = stage.icon;

  return (
    <div className="flex flex-col items-center justify-center py-8 animate-in fade-in zoom-in duration-500">
      <div
        className={`relative p-10 rounded-full bg-slate-900/80 border border-slate-700/50 mb-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] group`}
      >
        {/* Dynamic Background Glow based on color */}
        <div
          className={`absolute inset-0 rounded-full opacity-20 blur-xl scale-110 transition-all duration-1000 ${stage.color.replace(
            "text-",
            "bg-"
          )}`}
        />

        {/* The Main Icon */}
        <Icon
          strokeWidth={1.5}
          className={`w-24 h-24 ${
            stage.color
          } drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-500 relative z-10 ${
            stage.level > 3 ? "animate-pulse" : ""
          }`}
        />

        {/* Orbital Particles */}
        {stage.level > 1 && (
          <div
            className={`absolute inset-0 border border-dashed border-white/10 rounded-full animate-[spin_12s_linear_infinite] w-full h-full scale-125 pointer-events-none`}
          >
            <div
              className={`w-2 h-2 rounded-full bg-white/50 absolute -top-1 left-1/2 blur-[1px]`}
            />
          </div>
        )}
        {stage.level > 3 && (
          <div
            className={`absolute inset-0 border border-dotted border-white/20 rounded-full animate-[spin_8s_linear_infinite_reverse] w-full h-full scale-150 pointer-events-none`}
          >
            <div
              className={`w-3 h-3 rounded-full ${stage.color.replace(
                "text-",
                "bg-"
              )} absolute top-1/2 -left-1.5 blur-[2px]`}
            />
          </div>
        )}
      </div>

      <div className="text-center space-y-1">
        <h2
          className={`text-3xl font-black tracking-tight ${stage.color} drop-shadow-sm`}
        >
          {stage.name}
        </h2>
        <p className="text-slate-400 text-xs italic max-w-[200px] mx-auto leading-relaxed">
          {stage.desc}
        </p>
      </div>

      <div className="mt-6 w-64 bg-slate-900/50 p-3 rounded-xl border border-slate-800/50 backdrop-blur-sm">
        {nextStage ? (
          <>
            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-wider">
              <span>Lvl {stage.level}</span>
              <span className="text-indigo-400">
                {rangeToNext - progressToNext} GP to Evolve
              </span>
              <span>Lvl {nextStage.level}</span>
            </div>
            <ProgressBar
              current={progressToNext}
              max={rangeToNext}
              colorClass={stage.color.replace("text-", "bg-")}
            />
          </>
        ) : (
          <div className="text-center">
            <div className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
              Ascension Complete
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Application ---

export default function GrowthApp() {
  // Authentication State
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "signup"
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // App State
  const [logs, setLogs] = useState([]);
  const [starredIds, setStarredIds] = useState(new Set());
  const [showLogModal, setShowLogModal] = useState(false);
  const [showWrapped, setShowWrapped] = useState(false);
  const [view, setView] = useState("dashboard"); // dashboard, timeline, vault, wrapped, monthly
  const [newLogData, setNewLogData] = useState({
    title: "",
    category: "skill",
    difficulty: "medium",
    note: "",
  });
  const [monthlyReflection, setMonthlyReflection] = useState("");
  const [showReflectionInput, setShowReflectionInput] = useState(false);

  // AI Integration State
  const [magicPrompt, setMagicPrompt] = useState("");
  const [isMagicLoading, setIsMagicLoading] = useState(false);
  const [insight, setInsight] = useState("");
  const [isInsightLoading, setIsInsightLoading] = useState(false);

  // Load data from local storage on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem("growth_logs");
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
    const savedStarred = localStorage.getItem("starred_ids");
    if (savedStarred) {
      setStarredIds(new Set(JSON.parse(savedStarred)));
    }
    
    // Check if user is logged in (Firebase integration)
    // Uncomment when Firebase is set up:
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
    
    // For now, just set auth as complete
    setIsAuthLoading(false);
    
    // return () => unsubscribe();
  }, []);

  // Authentication handlers
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSubmitting(true);

    if (!authEmail || !authPassword) {
      setAuthError("Please fill in all fields");
      setAuthSubmitting(false);
      return;
    }

    try {
      // Uncomment when Firebase is installed:
      // await createUserWithEmailAndPassword(auth, authEmail, authPassword);
      // setShowAuthModal(false);
      // setAuthEmail("");
      // setAuthPassword("");
      
      // Demo mode: simulate successful signup
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowAuthModal(false);
      setAuthEmail("");
      setAuthPassword("");
      setAuthMode("login");
    } catch (error: any) {
      setAuthError(error.message || "Failed to sign up");
      setAuthSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSubmitting(true);

    if (!authEmail || !authPassword) {
      setAuthError("Please fill in all fields");
      setAuthSubmitting(false);
      return;
    }

    try {
      // Uncomment when Firebase is installed:
      // await signInWithEmailAndPassword(auth, authEmail, authPassword);
      // setShowAuthModal(false);
      // setAuthEmail("");
      // setAuthPassword("");
      
      // Demo mode: simulate successful login
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowAuthModal(false);
      setAuthEmail("");
      setAuthPassword("");
    } catch (error: any) {
      setAuthError(error.message || "Failed to login");
      setAuthSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Uncomment when Firebase is installed:
      // await signOut(auth);
      setUser(null);
      setShowAuthModal(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const renderAuthModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">
            {authMode === "login" ? "Sign In" : "Create Account"}
          </h3>
          <button
            onClick={() => {
              setShowAuthModal(false);
              setAuthError("");
            }}
            className="text-slate-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={authMode === "login" ? handleLogin : handleSignUp}
          className="space-y-4"
        >
          <div>
            <label className="block text-slate-400 text-xs uppercase font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-slate-400 text-xs uppercase font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 pr-10 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {authError && (
            <div className="p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-red-400 text-sm">
              {authError}
            </div>
          )}

          <button
            type="submit"
            disabled={authSubmitting}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {authSubmitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                {authMode === "login" ? "Sign In" : "Create Account"}
              </>
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-slate-400 text-sm">
            {authMode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setAuthMode(authMode === "login" ? "signup" : "login");
                setAuthError("");
              }}
              className="text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              {authMode === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <p className="text-slate-400 text-xs">
            <strong>Demo Mode:</strong> Authentication buttons now work in demo mode! Install Firebase when you're ready for real user accounts and data sync.
          </p>
        </div>
      </div>
    </div>
  );

  // Save data whenever it changes
  useEffect(() => {
    localStorage.setItem("growth_logs", JSON.stringify(logs));
  }, [logs]);

  // Save starred ids whenever they change
  useEffect(() => {
    localStorage.setItem("starred_ids", JSON.stringify([...starredIds]));
  }, [starredIds]);

  // Computed Stats
  const totalGP = useMemo(
    () => logs.reduce((acc, log) => acc + log.gp, 0),
    [logs]
  );

  const streak = useMemo(() => {
    if (logs.length === 0) return 0;
    // Simplified streak logic for prototype
    const uniqueDays = new Set(
      logs.map((l) => new Date(l.timestamp).toDateString())
    );
    return uniqueDays.size;
  }, [logs]);

  const recentLogs = useMemo(() => {
    return [...logs]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5);
  }, [logs]);

  // --- AI Handlers ---

  const handleMagicFill = async () => {
    if (!magicPrompt.trim()) return;
    setIsMagicLoading(true);

    try {
      const systemPrompt = `You are an API that extracts structured data from user growth logs. 
      Return ONLY a raw JSON object (no markdown, no backticks) with these keys:
      - title: A concise, professional summary of the action (string).
      - category: ONE of ['skill', 'career', 'health', 'mindset', 'personal']. Choose the best fit.
      - difficulty: ONE of ['easy', 'medium', 'hard']. specific learning or heavy workouts are hard, maintenance is easy.
      - note: A short, 1-sentence encouraging reflection or affirmation based on the action.
      `;

      const response = await callGemini(magicPrompt, systemPrompt);

      // Clean up potential markdown formatting if the model adds it despite instructions
      const jsonStr = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const data = JSON.parse(jsonStr);

      setNewLogData({
        title: data.title || magicPrompt,
        category: data.category || "skill",
        difficulty: data.difficulty || "medium",
        note: data.note || "",
      });
    } catch (error) {
      console.error("Magic fill failed", error);
      setNewLogData((prev) => ({
        ...prev,
        note: "AI couldn't process automatically, but you can still log it manually!",
      }));
    } finally {
      setIsMagicLoading(false);
    }
  };

  const handleGenerateInsight = async () => {
    setIsInsightLoading(true);
    try {
      const recentHistory = logs
        .slice(0, 10)
        .map((l) => `${l.title} (${l.category})`)
        .join(", ");
      // Updated system prompt for simpler language
      const systemPrompt =
        "You are a friendly, gamified growth companion (a Cosmic Spirit). Speak directly to the user in very simple, easy-to-understand English. Avoid complex words or metaphors that are hard to understand.";
      const userPrompt = `Here is my recent growth history: [${
        recentHistory || "I am just starting out"
      }]. 
      Analyze my patterns. Give me 1 short sentence of motivation about my progress, and 1 specific, fun "Quest" or challenge for tomorrow based on what I might be neglecting or excelling at. 
      Keep it under 40 words total. Use celestial/star emojis.`;

      const text = await callGemini(userPrompt, systemPrompt);
      setInsight(text);
    } catch (error) {
      setInsight(
        "The cosmos is cloudy today... try again later to receive wisdom."
      );
    } finally {
      setIsInsightLoading(false);
    }
  };

  // Actions
  const handleAddLog = () => {
    if (!newLogData.title) return;

    let gpBase = 0;
    if (newLogData.difficulty === "easy") gpBase = 5;
    if (newLogData.difficulty === "medium") gpBase = 10;
    if (newLogData.difficulty === "hard") gpBase = 20;

    const newLog = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...newLogData,
      gp: gpBase,
    };

    setLogs((prev) => [newLog, ...prev]);
    setShowLogModal(false);
    setNewLogData({
      title: "",
      category: "skill",
      difficulty: "medium",
      note: "",
    });
    setMagicPrompt("");
    // Clear old insight when new data comes in so it stays fresh
    setInsight("");
  };

  const generateDemoData = () => {
    // Generates a year worth of fake data for the "Wrapped" demo
    const demoLogs = [];
    const now = new Date();
    const categories = ["skill", "career", "health", "mindset", "personal"];
    const difficulties = ["easy", "medium", "hard"];

    for (let i = 0; i < 50; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - Math.floor(Math.random() * 365));
      const diff =
        difficulties[Math.floor(Math.random() * difficulties.length)];

      demoLogs.push({
        id: i,
        timestamp: date.toISOString(),
        title: `Demo Achievement #${i + 1}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        difficulty: diff,
        gp: diff === "easy" ? 5 : diff === "medium" ? 10 : 20,
      });
    }
    setLogs(demoLogs);
    setView("wrapped");
  };

  const toggleStar = (logId: number) => {
    setStarredIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(logId)) {
        newSet.delete(logId);
      } else {
        newSet.add(logId);
      }
      return newSet;
    });
  };

  // --- Sub-Views ---

  const renderLogModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Log Growth</h3>
          <button
            onClick={() => setShowLogModal(false)}
            className="text-slate-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Gemini Magic Fill Section */}
        <div className="bg-indigo-900/20 border border-indigo-500/30 p-3 rounded-xl mb-6">
          <label className="flex items-center gap-2 text-indigo-300 text-xs uppercase font-bold mb-2">
            <Sparkles size={12} /> Magic Auto-Fill
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Ran 5km in 25 mins today..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              value={magicPrompt}
              onChange={(e) => setMagicPrompt(e.target.value)}
            />
            <button
              onClick={handleMagicFill}
              disabled={isMagicLoading || !magicPrompt}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors flex items-center justify-center w-10"
            >
              {isMagicLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Sparkles size={18} />
              )}
            </button>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">
            Type what you did and let AI fill the details for you.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-slate-400 text-xs uppercase font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="e.g. Read 10 pages of React docs"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              value={newLogData.title}
              onChange={(e) =>
                setNewLogData({ ...newLogData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-slate-400 text-xs uppercase font-bold mb-2">
              Category
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() =>
                    setNewLogData({ ...newLogData, category: cat.id })
                  }
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                    newLogData.category === cat.id
                      ? "bg-indigo-600 text-white ring-2 ring-indigo-400"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  <cat.icon size={14} />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-xs uppercase font-bold mb-2">
              Difficulty
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["easy", "medium", "hard"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() =>
                    setNewLogData({ ...newLogData, difficulty: lvl })
                  }
                  className={`p-2 rounded-lg text-center capitalize text-sm font-medium transition-all ${
                    newLogData.difficulty === lvl
                      ? "bg-indigo-600 text-white ring-2 ring-indigo-400"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  {lvl} <br />
                  <span className="text-xs opacity-70">
                    +{lvl === "easy" ? 5 : lvl === "medium" ? 10 : 20} GP
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-xs uppercase font-bold mb-2">
              Proof of Achievement (Optional)
            </label>
            <div className="flex gap-2 mb-4">
              <button className="flex-1 bg-slate-800 hover:bg-slate-700 p-2 rounded-lg text-slate-400 flex justify-center items-center gap-2 text-xs">
                <Camera size={14} /> Photo
              </button>
              <button className="flex-1 bg-slate-800 hover:bg-slate-700 p-2 rounded-lg text-slate-400 flex justify-center items-center gap-2 text-xs">
                <Mic size={14} /> Voice
              </button>
            </div>

            <label className="block text-slate-400 text-xs uppercase font-bold mb-2">
              Reflection
            </label>
            <textarea
              placeholder="How did it make you feel?"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white text-sm h-20 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              value={newLogData.note}
              onChange={(e) =>
                setNewLogData({ ...newLogData, note: e.target.value })
              }
            />
          </div>

          <button
            onClick={handleAddLog}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
          >
            Claim Growth Points
          </button>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-2 text-slate-400 mb-1 text-xs uppercase font-bold">
            <Trophy size={14} /> Growth Points
          </div>
          <div className="text-3xl font-black text-white">{totalGP}</div>
        </div>
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-2 text-slate-400 mb-1 text-xs uppercase font-bold">
            <Flame size={14} /> Active Streak
          </div>
          <div className="text-3xl font-black text-white">
            {streak}{" "}
            <span className="text-sm font-normal text-slate-500">days</span>
          </div>
        </div>
      </div>

      {/* Companion View */}
      <Companion gp={totalGP} />

      {/* AI Insight Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-2xl border border-slate-700/50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all" />

        <div className="flex justify-between items-start mb-3 relative z-10">
          <h3 className="font-bold text-indigo-200 flex items-center gap-2">
            <Sparkles size={16} className="text-indigo-400" /> Companion Insight
          </h3>
          {!insight && !isInsightLoading && (
            <button
              onClick={handleGenerateInsight}
              className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-full transition-colors"
            >
              ✨ Reveal Wisdom
            </button>
          )}
        </div>

        {isInsightLoading ? (
          <div className="flex items-center gap-2 text-slate-400 text-sm py-2">
            <Loader2 size={16} className="animate-spin" /> Communing with the
            growth spirits...
          </div>
        ) : insight ? (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <p className="text-slate-300 text-sm italic leading-relaxed">
              "{insight}"
            </p>
            <button
              onClick={() => setInsight("")}
              className="text-[10px] text-slate-500 mt-2 hover:text-slate-300 underline"
            >
              Dismiss
            </button>
          </div>
        ) : (
          <p className="text-slate-500 text-sm">
            Tap the button to receive personalized guidance based on your recent
            logs.
          </p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => setShowLogModal(true)}
          className="group relative overflow-hidden bg-white text-slate-900 p-4 rounded-2xl font-bold text-lg shadow-lg shadow-white/10 flex items-center justify-center gap-3 transition-transform active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          <Plus className="relative z-10" strokeWidth={3} />
          <span className="relative z-10">Log Daily Growth</span>
        </button>
      </div>

      {/* Recent History */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-bold text-white">Recent Wins</h3>
          <button
            onClick={() => setView("timeline")}
            className="text-indigo-400 text-sm flex items-center hover:underline"
          >
            View Map <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-3">
          {recentLogs.length > 0 ? (
            recentLogs.map((log) => {
              const CatIcon =
                CATEGORIES.find((c) => c.id === log.category)?.icon || Star;
              return (
                <div
                  key={log.id}
                  className="bg-slate-800 p-4 rounded-xl border border-slate-700/50 flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        CATEGORIES.find((c) => c.id === log.category)?.bg
                      }`}
                    >
                      <CatIcon
                        size={18}
                        className={
                          CATEGORIES.find((c) => c.id === log.category)?.color
                        }
                      />
                    </div>
                    <div>
                      <p className="font-medium text-white">{log.title}</p>
                      <p className="text-xs text-slate-500 capitalize">
                        {log.category} •{" "}
                        {new Date(log.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="text-indigo-400 font-bold text-sm">
                    +{log.gp} GP
                  </span>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-slate-500 text-sm bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
              No logs yet. Start your journey today!
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderTimeline = () => (
    <div className="animate-in slide-in-from-right duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Monthly Growth Map</h2>
        <button
          onClick={() => setView("monthly")}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-3 py-1.5 rounded-full font-bold transition-colors"
        >
          📊 Summary
        </button>
      </div>
      <div className="relative border-l-2 border-slate-700 ml-3 space-y-8 pl-6 pb-10">
        {logs
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .map((log, idx) => (
            <div key={log.id} className="relative">
              {/* Dot */}
              <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-indigo-600 border-4 border-slate-900" />

              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    {new Date(log.timestamp).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="bg-slate-700 text-xs px-2 py-1 rounded text-slate-300">
                    +{log.gp} GP
                  </span>
                </div>
                <h4 className="text-white font-medium text-lg mb-1">
                  {log.title}
                </h4>
                <div className="flex gap-2 mb-2">
                  <span className="text-xs bg-slate-900/50 px-2 py-1 rounded text-slate-400 capitalize border border-slate-700">
                    {log.category}
                  </span>
                  <span className="text-xs bg-slate-900/50 px-2 py-1 rounded text-slate-400 capitalize border border-slate-700">
                    {log.difficulty}
                  </span>
                </div>
                {log.note && (
                  <p className="text-sm text-slate-400 italic">"{log.note}"</p>
                )}
              </div>
            </div>
          ))}
        {logs.length === 0 && (
          <p className="text-slate-500">
            Map is empty. Log your first achievement!
          </p>
        )}
      </div>
    </div>
  );

  const renderMonthlySummary = () => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Filter logs for current month
    const monthlyLogs = logs.filter((log) => {
      const logDate = new Date(log.timestamp);
      return logDate >= monthStart && logDate <= monthEnd;
    });

    // Calculate monthly GP
    const monthlyGP = monthlyLogs.reduce((acc, log) => acc + log.gp, 0);

    // Calculate badges/achievements
    const badges = [];
    const skillLogs = monthlyLogs.filter((l) => l.category === "skill").length;
    const careerLogs = monthlyLogs.filter((l) => l.category === "career").length;
    const healthLogs = monthlyLogs.filter((l) => l.category === "health").length;
    const mindsetLogs = monthlyLogs.filter((l) => l.category === "mindset").length;
    const personalLogs = monthlyLogs.filter((l) => l.category === "personal").length;

    if (skillLogs >= 5) badges.push("🧠 Skill Learner — completed 5+ learning tasks");
    if (healthLogs >= 5) badges.push("🦾 Discipline Mode — 5+ fitness activities");
    if (careerLogs >= 3) badges.push("💼 Career Catalyst — 3+ professional wins");
    if (mindsetLogs >= 4) badges.push("✨ Mindset Master — 4+ mindset breakthroughs");
    if (personalLogs >= 5) badges.push("💝 Life Lover — 5+ personal wins");
    if (monthlyLogs.length >= 10) badges.push("🔥 Consistency Starter — 10+ logs this month");

    // Evolution progress (start vs end of month)
    const startOfMonthLogs = logs.filter((l) => {
      const logDate = new Date(l.timestamp);
      return logDate < monthStart;
    });
    const startGP = startOfMonthLogs.reduce((acc, log) => acc + log.gp, 0);
    const endGP = startGP + monthlyGP;

    const startStage = [...STAGES].reverse().find((s) => startGP >= s.minGP) || STAGES[0];
    const endStage = [...STAGES].reverse().find((s) => endGP >= s.minGP) || STAGES[0];

    // Top 3 wins
    const topWins = monthlyLogs
      .sort((a, b) => b.gp - a.gp)
      .slice(0, 3)
      .map((log) => `🏆 ${log.title}`);

    return (
      <div className="animate-in fade-in duration-300">
        <button
          onClick={() => setView("timeline")}
          className="text-indigo-400 text-sm flex items-center gap-1 mb-6 hover:underline"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
          Monthly Growth Summary
        </h2>
        <p className="text-slate-400 text-sm mb-8">
          {monthStart.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
        </p>

        <div className="space-y-6">
          {/* 1. Monthly Growth Score */}
          <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-6 rounded-2xl border border-indigo-700/50">
            <div className="flex items-center gap-2 text-indigo-300 mb-2 text-xs uppercase font-bold">
              <Sparkles size={16} /> Monthly Growth Score
            </div>
            <div className="text-5xl font-black text-indigo-300 mb-2">
              +{monthlyGP} <span className="text-lg text-slate-400">GP</span>
            </div>
            <p className="text-slate-400 text-sm">
              {monthlyLogs.length} achievements logged this month
            </p>
          </div>

          {/* 2. Achievements Unlocked */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
            <div className="flex items-center gap-2 text-yellow-300 mb-4 text-xs uppercase font-bold">
              <Award size={16} /> Achievements Unlocked ({badges.length})
            </div>
            {badges.length > 0 ? (
              <div className="space-y-2">
                {badges.map((badge, idx) => (
                  <div key={idx} className="text-slate-300 text-sm p-2 bg-slate-900/50 rounded-lg border border-slate-700/30">
                    {badge}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm italic">
                Keep logging to unlock badges! 🚀
              </p>
            )}
          </div>

          {/* 3. Evolution Progress */}
          <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 p-6 rounded-2xl border border-cyan-700/50">
            <div className="flex items-center gap-2 text-cyan-300 mb-4 text-xs uppercase font-bold">
              <Zap size={16} /> Evolution Progress
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-sm text-slate-400 mb-2">Start of Month</div>
                  <div className="text-lg font-bold text-slate-300">{startStage.name}</div>
                  <div className="text-xs text-slate-500">{startGP} GP</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-400 mb-2">End of Month</div>
                  <div className="text-lg font-bold text-slate-300">{endStage.name}</div>
                  <div className="text-xs text-slate-500">{endGP} GP</div>
                </div>
              </div>
              <ProgressBar
                current={monthlyGP}
                max={Math.max(100, monthlyGP)}
                colorClass="bg-cyan-500"
              />
              {endStage.level > startStage.level && (
                <div className="text-center text-green-400 font-bold text-sm">
                  ✨ Level Up! {startStage.name} → {endStage.name}
                </div>
              )}
            </div>
          </div>

          {/* 4. Top 3 Wins */}
          <div className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 p-6 rounded-2xl border border-amber-700/50">
            <div className="flex items-center gap-2 text-amber-300 mb-4 text-xs uppercase font-bold">
              <Trophy size={16} /> Top 3 Wins of the Month
            </div>
            {topWins.length > 0 ? (
              <div className="space-y-2">
                {topWins.map((win, idx) => (
                  <div key={idx} className="text-slate-300 text-sm p-2 bg-slate-900/50 rounded-lg border border-slate-700/30">
                    {win}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm italic">
                Your first win is just a log away! 💪
              </p>
            )}
          </div>

          {/* 5. Monthly Reflection */}
          <div className="bg-gradient-to-br from-rose-900/50 to-pink-900/50 p-6 rounded-2xl border border-rose-700/50">
            <div className="flex items-center gap-2 text-rose-300 mb-4 text-xs uppercase font-bold">
              <Heart size={16} /> Your Reflection
            </div>
            {!showReflectionInput && monthlyReflection ? (
              <div className="space-y-3">
                <p className="text-slate-300 text-sm italic">"{monthlyReflection}"</p>
                <button
                  onClick={() => setShowReflectionInput(true)}
                  className="text-xs text-rose-400 hover:text-rose-300 underline"
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  placeholder="✨ What are you most proud of this month?"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-sm h-16 focus:ring-2 focus:ring-rose-500 outline-none resize-none"
                  value={monthlyReflection}
                  onChange={(e) => setMonthlyReflection(e.target.value)}
                />
                <button
                  onClick={() => setShowReflectionInput(false)}
                  className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 rounded-lg transition-colors text-sm"
                >
                  Save Reflection
                </button>
              </div>
            )}
          </div>

          {/* Footer CTA - Dynamic based on growth */}
          <div className="text-center py-8 px-4">
            <p className="text-slate-400 text-sm italic">
              {monthlyGP === 0 
                ? "🌱 Every journey starts with a single step. Log your first achievement today!"
                : monthlyGP < 50
                ? "💪 You're building momentum! Keep this consistency going."
                : monthlyGP < 100
                ? "� Amazing dedication this month! You're unstoppable."
                : endStage.level > startStage.level
                ? `⭐ You leveled up to ${endStage.name}! Your growth is extraordinary.`
                : badges.length >= 5
                ? "🏆 You earned 5+ badges this month—that's legendary status!"
                : "�💫 You grew more than you think. Next month is yours."}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderVault = () => {
    const starredLogs = logs.filter((log) => starredIds.has(log.id));
    const allLogs = [...logs].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    return (
      <div className="animate-in fade-in duration-300">
        <h2 className="text-2xl font-bold text-white mb-2">Achievement Vault</h2>
        <p className="text-slate-400 text-sm mb-6">
          All your growth achievements in one place
        </p>

        {/* Starred Section */}
        {starredLogs.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-yellow-400 flex items-center gap-2 mb-4">
              <Star size={20} className="fill-yellow-400" /> Starred ({starredLogs.length})
            </h3>
            <div className="space-y-3">
              {starredLogs.map((log) => {
                const CatIcon =
                  CATEGORIES.find((c) => c.id === log.category)?.icon || Star;
                return (
                  <div
                    key={log.id}
                    className="bg-gradient-to-r from-yellow-900/30 to-amber-900/20 p-4 rounded-xl border border-yellow-700/50 flex justify-between items-start"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className={`p-2 rounded-lg ${
                          CATEGORIES.find((c) => c.id === log.category)?.bg
                        } flex-shrink-0`}
                      >
                        <CatIcon
                          size={18}
                          className={
                            CATEGORIES.find((c) => c.id === log.category)?.color
                          }
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white">{log.title}</p>
                        <p className="text-xs text-slate-400 capitalize">
                          {log.category} • {log.difficulty} • {new Date(log.timestamp).toLocaleDateString()}
                        </p>
                        {log.note && (
                          <p className="text-sm text-slate-300 italic mt-2">
                            "{log.note}"
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-indigo-400 font-bold text-sm">
                        +{log.gp} GP
                      </span>
                      <button
                        onClick={() => toggleStar(log.id)}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors"
                      >
                        <Star size={20} className="fill-yellow-400" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All Achievements Section */}
        <div>
          <h3 className="text-lg font-bold text-slate-300 mb-4">
            All Achievements ({allLogs.length})
          </h3>
          <div className="space-y-3">
            {allLogs.length > 0 ? (
              allLogs.map((log) => {
                const CatIcon =
                  CATEGORIES.find((c) => c.id === log.category)?.icon || Star;
                const isStarred = starredIds.has(log.id);
                return (
                  <div
                    key={log.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isStarred
                        ? "bg-slate-800/50 border-slate-600"
                        : "bg-slate-800/30 border-slate-700"
                    } flex justify-between items-start hover:bg-slate-800/70`}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className={`p-2 rounded-lg ${
                          CATEGORIES.find((c) => c.id === log.category)?.bg
                        } flex-shrink-0`}
                      >
                        <CatIcon
                          size={18}
                          className={
                            CATEGORIES.find((c) => c.id === log.category)?.color
                          }
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white">{log.title}</p>
                        <p className="text-xs text-slate-400 capitalize">
                          {log.category} • {log.difficulty} • {new Date(log.timestamp).toLocaleDateString()}
                        </p>
                        {log.note && (
                          <p className="text-sm text-slate-300 italic mt-2">
                            "{log.note}"
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-indigo-400 font-bold text-sm">
                        +{log.gp} GP
                      </span>
                      <button
                        onClick={() => toggleStar(log.id)}
                        className={`transition-colors ${
                          isStarred
                            ? "text-yellow-400 hover:text-yellow-300"
                            : "text-slate-600 hover:text-slate-400"
                        }`}
                      >
                        <Star
                          size={20}
                          className={isStarred ? "fill-yellow-400" : ""}
                        />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-slate-500">
                <p className="text-sm">
                  No achievements yet. Log your first growth moment!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderYearEndStory = () => {
    // Calculate progress and countdown
    const totalLogs = logs.length;
    const daysLeftInYear = Math.ceil(
      (new Date(new Date().getFullYear(), 11, 31).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    return (
      <div className="animate-in fade-in duration-500 space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Year-End Story</h2>
          <p className="text-slate-400 text-sm">Locked until December 31st</p>
        </div>

        {/* MAIN LOCKED PREVIEW CARD */}
        <div className="relative group">
          {/* Glowing aura background on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-cyan-600/40 to-purple-600/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

          {/* Main Card with Frosted Glass Effect */}
          <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-8 rounded-3xl border border-purple-500/20 overflow-hidden">
            
            {/* FROSTED GLASS BLUR OVERLAY */}
            <div className="absolute inset-0 backdrop-blur-xl rounded-3xl z-20 pointer-events-none" />

            {/* BLURRED CONTENT - Silhouettes visible beneath */}
            <div className="relative z-10 space-y-6">
              {/* Title */}
              <div>
                <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300 mb-2">
                  Year-End Story
                </h3>
                <p className="text-slate-400 text-lg font-medium italic">
                  Your journey is becoming something incredible.
                </p>
              </div>

              {/* Story Preview Section - Placeholder Silhouettes */}
              <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 p-6 rounded-2xl border border-purple-500/20 space-y-3">
                <div className="h-8 bg-slate-700/50 rounded-lg w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-slate-700/40 rounded w-full" />
                  <div className="h-4 bg-slate-700/40 rounded w-5/6" />
                </div>
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-20 bg-slate-700/50 rounded-full" />
                  <div className="h-6 w-20 bg-slate-700/50 rounded-full" />
                </div>
              </div>

              {/* Stats Preview - Blurred Silhouettes */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/30 space-y-2">
                  <div className="h-3 bg-slate-700/40 rounded w-1/2" />
                  <div className="h-6 bg-slate-700/50 rounded w-2/3" />
                </div>
                <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/30 space-y-2">
                  <div className="h-3 bg-slate-700/40 rounded w-1/2" />
                  <div className="h-6 bg-slate-700/50 rounded w-2/3" />
                </div>
              </div>

              {/* CTA Button - Disabled */}
              <button
                disabled
                className="w-full bg-gradient-to-r from-purple-600/40 to-cyan-600/40 hover:from-purple-600/60 hover:to-cyan-600/60 disabled:opacity-50 disabled:cursor-not-allowed text-purple-200/70 font-bold py-3 rounded-xl border border-purple-500/30 transition-all flex items-center justify-center gap-2 mt-4 group/btn relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-cyan-500/0 opacity-0 group-hover/btn:opacity-100 transition-opacity rounded-xl" />
                <span className="text-lg relative z-10">✨ Keep Growing to Unlock</span>
              </button>
            </div>

            {/* GLOWING LOCK ICON OVERLAY - Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
              {/* Glowing Ring Background */}
              <div className="absolute w-32 h-32 rounded-full border-2 border-cyan-400/40 animate-pulse" />
              <div className="absolute w-40 h-40 rounded-full border border-purple-500/20 animate-[spin_4s_linear_infinite]" />
              
              {/* Lock Emoji with Bounce */}
              <div className="text-8xl animate-bounce drop-shadow-[0_0_30px_rgba(34,197,94,0.6)]">
                🔒
              </div>
            </div>
          </div>
        </div>

        {/* COUNTDOWN SECTION - Eye-catching */}
        <div className="bg-gradient-to-r from-cyan-900/60 to-purple-900/60 p-6 rounded-2xl border border-cyan-500/40 backdrop-blur-sm relative overflow-hidden group">
          {/* Animated glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10 space-y-3 text-center">
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
              {daysLeftInYear} days
            </div>
            <p className="text-cyan-200 font-semibold text-lg">Unlocks in</p>
            <p className="text-slate-300 text-sm italic">
              Every streak, win and milestone is shaping your story… keep going.
            </p>
            
            {/* Progress dots animation */}
            <div className="flex justify-center gap-2 mt-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* TEASER INFO CARDS */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-5 rounded-2xl border border-purple-500/20 group hover:border-purple-500/40 transition-all">
            <div className="text-2xl mb-2">📖</div>
            <div className="text-xs uppercase font-bold text-slate-400 mb-2 group-hover:text-purple-300 transition-colors">
              Storytelling
            </div>
            <div className="text-sm text-slate-300 font-medium">
              Your year in narrative form
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-5 rounded-2xl border border-purple-500/20 group hover:border-purple-500/40 transition-all">
            <div className="text-2xl mb-2">🏆</div>
            <div className="text-xs uppercase font-bold text-slate-400 mb-2 group-hover:text-purple-300 transition-colors">
              Milestones
            </div>
            <div className="text-sm text-slate-300 font-medium">
              All your biggest wins
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-5 rounded-2xl border border-purple-500/20 group hover:border-purple-500/40 transition-all">
            <div className="text-2xl mb-2">✨</div>
            <div className="text-xs uppercase font-bold text-slate-400 mb-2 group-hover:text-purple-300 transition-colors">
              Evolution
            </div>
            <div className="text-sm text-slate-300 font-medium">
              How far you've grown
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-5 rounded-2xl border border-purple-500/20 group hover:border-purple-500/40 transition-all">
            <div className="text-2xl mb-2">🎁</div>
            <div className="text-xs uppercase font-bold text-slate-400 mb-2 group-hover:text-purple-300 transition-colors">
              Rewards
            </div>
            <div className="text-sm text-slate-300 font-medium">
              Exclusive unlockables
            </div>
          </div>
        </div>

        {/* MOTIVATIONAL FOOTER */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50 text-center">
          <p className="text-slate-400 text-sm leading-relaxed">
            "The best time to plant a tree was 20 years ago. The second best time is now."
            <br />
            <span className="text-cyan-400 font-semibold mt-2 block">
              Your story begins with a single log. Make it count.
            </span>
          </p>
        </div>
      </div>
    );
  };

  const WrappedView = () => {
    const [step, setStep] = useState(0);

    // Wrapped Stats
    const totalLogs = logs.length;
    const mostActiveCategory = Object.entries(
      logs.reduce((acc, log) => {
        acc[log.category] = (acc[log.category] || 0) + 1;
        return acc;
      }, {})
    ).sort((a, b) => b[1] - a[1])[0];

    const favoriteCat = CATEGORIES.find(
      (c) => c.id === (mostActiveCategory?.[0] || "skill")
    );

    const steps = [
      {
        content: (
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-400">
              Your Year
              <br />
              In Growth
            </h1>
            <p className="text-slate-400">Let's see how much you've evolved.</p>
          </div>
        ),
      },
      {
        content: (
          <div className="text-center space-y-6">
            <div className="text-6xl font-black text-white">{totalLogs}</div>
            <p className="text-xl text-slate-300">Meaningful moments logged</p>
            <div className="text-sm text-slate-500">
              That's {totalLogs} times you chose to grow.
            </div>
          </div>
        ),
      },
      {
        content: (
          <div className="text-center space-y-6">
            <p className="text-slate-400">You focused most on...</p>
            {favoriteCat && (
              <div
                className={`inline-block p-8 rounded-full ${favoriteCat.bg} mb-4`}
              >
                <favoriteCat.icon size={64} className={favoriteCat.color} />
              </div>
            )}
            <h2 className="text-3xl font-bold text-white capitalize">
              {favoriteCat?.label || "Everything!"}
            </h2>
          </div>
        ),
      },
      {
        content: (
          <div className="text-center space-y-6">
            <p className="text-slate-400">And your companion reached...</p>
            <Companion gp={totalGP} />
          </div>
        ),
      },
      {
        content: (
          <div className="text-center w-full">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 w-full mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Crown className="text-yellow-400" />{" "}
                <span className="font-bold text-white">
                  Growth Certificate 2025
                </span>
              </div>
              <div className="text-left space-y-2 text-sm text-slate-300">
                <p>
                  Total GP:{" "}
                  <span className="text-white font-bold">{totalGP}</span>
                </p>
                <p>
                  Top Focus:{" "}
                  <span className="text-white font-bold capitalize">
                    {favoriteCat?.label}
                  </span>
                </p>
                <p>
                  Level: <span className="text-white font-bold">Legendary</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setView("dashboard")}
              className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl"
            >
              Close Story
            </button>
          </div>
        ),
      },
    ];

    return (
      <div className="fixed inset-0 bg-slate-950 z-[60] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm animate-in zoom-in duration-500">
          {steps[step].content}

          {step < steps.length - 1 && (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="mt-12 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Next
            </button>
          )}
        </div>

        {/* Progress Dots */}
        <div className="absolute top-8 left-0 w-full flex justify-center gap-2 px-8">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 flex-1 rounded-full ${
                idx <= step ? "bg-white" : "bg-slate-800"
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 pb-24">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <TrendingUp size={18} className="text-white" />
          </div>
          <h1 className="font-bold text-lg tracking-tight text-white">
            Achievement Vault
          </h1>
        </div>
        <div className="flex gap-2">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400">{user.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition-colors"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setShowAuthModal(true);
                setAuthMode("login");
              }}
              className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-lg mx-auto p-4">
        {view === "dashboard" && renderDashboard()}
        {view === "timeline" && renderTimeline()}
        {view === "monthly" && renderMonthlySummary()}
        {view === "vault" && renderVault()}
        {view === "wrapped" && renderYearEndStory()}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-800 px-6 py-3 pb-6 z-40">
        <div className="max-w-lg mx-auto flex justify-between items-center">
          <button
            onClick={() => setView("dashboard")}
            className={`flex flex-col items-center gap-1 ${
              view === "dashboard" ? "text-indigo-400" : "text-slate-500"
            }`}
          >
            <Activity size={20} strokeWidth={view === "dashboard" ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Dashboard</span>
          </button>

          <button
            onClick={() => setView("timeline")}
            className={`flex flex-col items-center gap-1 ${
              view === "timeline" ? "text-indigo-400" : "text-slate-500"
            }`}
          >
            <Calendar size={20} strokeWidth={view === "timeline" ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Map</span>
          </button>

          <button
            onClick={() => setShowLogModal(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full -mt-12 shadow-lg shadow-indigo-500/40 transition-transform active:scale-95"
          >
            <Plus size={28} strokeWidth={3} />
          </button>

          <button
            onClick={() => setView("vault")}
            className={`flex flex-col items-center gap-1 ${
              view === "vault" ? "text-indigo-400" : "text-slate-500"
            }`}
          >
            <Award size={20} strokeWidth={view === "vault" ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Vault</span>
          </button>

          <button
            onClick={() => setView("wrapped")}
            className={`flex flex-col items-center gap-1 ${
              view === "wrapped" ? "text-indigo-400" : "text-slate-500"
            }`}
          >
            <Trophy size={20} strokeWidth={view === "wrapped" ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Stats</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      {showLogModal && renderLogModal()}
      {showAuthModal && renderAuthModal()}
    </div>
  );
}
