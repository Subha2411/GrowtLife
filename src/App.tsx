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
  User as UserIcon,
  Hexagon,
  Gem,
  Diamond,
} from "lucide-react";

// --- Types ---
interface GrowthLog {
  id: number;
  timestamp: string;
  title: string;
  category: string;
  difficulty: string;
  note: string;
  gp: number;
}

interface UserProfile {
  email: string;
  uid: string;
}

// --- Constants & Config ---

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
    name: "The Rough",
    minGP: 0,
    icon: Hexagon,
    color: "text-slate-400",
    desc: "A raw stone with hidden potential.",
  },
  {
    level: 2,
    name: "The Grind",
    minGP: 100,
    icon: Gem,
    color: "text-indigo-400",
    desc: "Shaping and polishing through hard work.",
  },
  {
    level: 3,
    name: "The Glow",
    minGP: 250,
    icon: Diamond,
    color: "text-cyan-400",
    desc: "A brilliant gem reflecting your dedication.",
  },
];

// --- Helper Functions ---

// --- Helper Components ---

const ProgressBar = ({ current, max, colorClass = "bg-indigo-500" }: { current: number; max: number; colorClass?: string }) => {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));
  return (
    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
      <div
        className={`h-full ${colorClass} transition-all duration-1000 ease-out`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// --- Main Application ---

export default function GrowthApp() {
  // Authentication State
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "signup"
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // App State
  const [logs, setLogs] = useState<GrowthLog[]>([]);
  const [starredIds, setStarredIds] = useState(new Set<number>());
  const [showLogModal, setShowLogModal] = useState(false);
  const [view, setView] = useState("home"); // home, map, profile
  const [newLogData, setNewLogData] = useState({
    title: "",
    category: "skill",
    difficulty: "medium",
    note: "",
  });

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

    // For now, just set auth as complete
    setIsAuthLoading(false);
  }, []);

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
    const uniqueDays = new Set(
      logs.map((l) => new Date(l.timestamp).toDateString())
    );
    return uniqueDays.size;
  }, [logs]);

  const recentLogs = useMemo(() => {
    return [...logs]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);
  }, [logs]);

  // Actions
  const handleAddLog = () => {
    if (!newLogData.title) return;

    let gpBase = 0;
    if (newLogData.difficulty === "easy") gpBase = 5;
    if (newLogData.difficulty === "medium") gpBase = 15;
    if (newLogData.difficulty === "hard") gpBase = 25;

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
  };

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
      await new Promise((resolve) => setTimeout(resolve, 1500));
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setShowAuthModal(false);
      setAuthEmail("");
      setAuthPassword("");
      setUser({ email: authEmail, uid: "demo-user" });
    } catch (error: any) {
      setAuthError(error.message || "Failed to login");
      setAuthSubmitting(false);
    }
  };

  const handleLogout = async () => {
    setUser(null);
    setShowAuthModal(false);
    setView("home");
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
              <>{authMode === "login" ? "Sign In" : "Create Account"}</>
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
      </div>
    </div>
  );

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
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${newLogData.category === cat.id
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
                  className={`p-2 rounded-lg text-center capitalize text-sm font-medium transition-all ${newLogData.difficulty === lvl
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

  const renderHome = () => {
    const stage = [...STAGES].reverse().find((s) => totalGP >= s.minGP) || STAGES[0];
    const nextStage = STAGES.find((s) => s.minGP > totalGP);
    const progressToNext = nextStage ? totalGP - stage.minGP : 100;
    const rangeToNext = nextStage ? nextStage.minGP - stage.minGP : 100;
    const Icon = stage.icon;

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Header Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-slate-500 mb-2 text-[10px] uppercase font-bold tracking-wider">
              <Trophy size={14} className="text-slate-400" /> Growth Points
            </div>
            <div className="text-4xl font-black text-white">{totalGP}</div>
            <div className="text-[10px] text-slate-500 mt-1">Evidence of progress</div>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-slate-500 mb-2 text-[10px] uppercase font-bold tracking-wider">
              <Flame size={14} className="text-orange-500" /> Active Streak
            </div>
            <div className="text-4xl font-black text-white">
              {streak} <span className="text-sm font-normal text-slate-500">days</span>
            </div>
          </div>
        </div>

        {/* Stage Section */}
        <div className="flex flex-col items-center py-4">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full scale-150" />
            <div className="relative w-32 h-32 rounded-full border border-slate-800 flex items-center justify-center bg-slate-900/80">
              <div className="absolute inset-0 border border-dashed border-slate-700 rounded-full animate-[spin_20s_linear_infinite]" />
              <Icon size={48} className={stage.color} />
            </div>
          </div>
          <h2 className="text-3xl font-black text-white mb-1">{stage.name}</h2>
          <p className="text-slate-400 text-sm mb-4">Current growth stage</p>

          <div className="w-full max-w-xs text-center space-y-4">
            <p className="text-xs text-slate-500">You're ahead of where you were yesterday</p>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
              <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">
                <span>Lvl {stage.level}</span>
                <span className="text-indigo-400">
                  {nextStage ? `${nextStage.minGP - totalGP} GP TO EVOLVE` : "MAX LEVEL"}
                </span>
                <span>Lvl {nextStage ? nextStage.level : stage.level}</span>
              </div>
              <ProgressBar
                current={progressToNext}
                max={rangeToNext}
                colorClass={stage.color.replace("text-", "bg-")}
              />
            </div>
          </div>
        </div>

        {/* Recent Wins */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Recent Wins</h3>
            <button onClick={() => setView("map")} className="text-indigo-400 text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {recentLogs.length > 0 ? (
              recentLogs.map((log) => {
                const CatIcon = CATEGORIES.find((c) => c.id === log.category)?.icon || Star;
                return (
                  <div key={log.id} className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/50 flex justify-between items-center group hover:bg-slate-800/40 transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${CATEGORIES.find((c) => c.id === log.category)?.bg}`}>
                        <CatIcon size={18} className={CATEGORIES.find((c) => c.id === log.category)?.color} />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{log.title}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
                          {log.category}
                        </p>
                      </div>
                    </div>
                    <span className="text-indigo-400 font-black text-sm">+{log.gp} GP</span>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl">
                <p className="text-slate-500 text-sm">Start your journey today! 💎</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderMap = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-black text-white">Your Growth Journey</h2>
      <div className="space-y-4">
        {logs.length > 0 ? (
          logs.map((log) => {
            const CatIcon = CATEGORIES.find((c) => c.id === log.category)?.icon || Star;
            return (
              <div key={log.id} className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${CATEGORIES.find((c) => c.id === log.category)?.bg}`}>
                    <CatIcon size={18} className={CATEGORIES.find((c) => c.id === log.category)?.color} />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{log.title}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">
                      {new Date(log.timestamp).toLocaleDateString()} • {log.category}
                    </p>
                  </div>
                </div>
                <span className="text-indigo-400 font-black text-sm">+{log.gp} GP</span>
              </div>
            );
          })
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500">No logs yet. Go back home and log your first win!</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-black text-white">Your Profile</h2>

      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700/50 shadow-2xl flex flex-col items-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full" />
          <div className="relative w-24 h-24 rounded-full border-4 border-indigo-500/30 flex items-center justify-center bg-slate-900 text-4xl font-black text-white">
            {user?.email?.charAt(0).toUpperCase() || "G"}
          </div>
        </div>

        <h3 className="text-2xl font-black text-white mb-8">
          {user?.email?.split('@')[0] || "Grower"}
        </h3>

        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 text-center">
            <Trophy size={20} className="text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-black text-white">{totalGP}</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">GP</div>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 text-center">
            <Flame size={20} className="text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-black text-white">{streak}</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">Streak</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-2xl border border-slate-700 transition-all flex items-center justify-center gap-2"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 pb-24">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-6 py-4 flex items-center gap-3">
        <div className="bg-indigo-600 p-1.5 rounded-lg">
          <Activity size={18} className="text-white" />
        </div>
        <h1 className="font-bold text-lg tracking-tight text-white">GrowtLife</h1>
      </div>

      {/* Main Content Area */}
      <main className="max-w-lg mx-auto p-6">
        {view === "home" && renderHome()}
        {view === "map" && renderMap()}
        {view === "profile" && renderProfile()}
      </main>

      {/* FAB */}
      {view === "home" && (
        <button
          onClick={() => setShowLogModal(true)}
          className="fixed bottom-28 right-6 bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-2xl shadow-indigo-500/40 transition-all active:scale-95 z-40"
        >
          <Plus size={32} strokeWidth={3} />
        </button>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 px-8 py-4 pb-8 z-40">
        <div className="max-w-lg mx-auto flex justify-between items-center">
          <button
            onClick={() => setView("home")}
            className={`flex flex-col items-center gap-1 transition-colors ${view === "home" ? "text-indigo-400" : "text-slate-500 hover:text-slate-400"
              }`}
          >
            <Activity size={24} strokeWidth={view === "home" ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
          </button>

          <button
            onClick={() => setView("map")}
            className={`flex flex-col items-center gap-1 transition-colors ${view === "map" ? "text-indigo-400" : "text-slate-500 hover:text-slate-400"
              }`}
          >
            <Calendar size={24} strokeWidth={view === "map" ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Map</span>
          </button>

          <button
            onClick={() => setView("profile")}
            className={`flex flex-col items-center gap-1 transition-colors ${view === "profile" ? "text-indigo-400" : "text-slate-500 hover:text-slate-400"
              }`}
          >
            <UserIcon size={24} strokeWidth={view === "profile" ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      {showLogModal && renderLogModal()}
      {showAuthModal && renderAuthModal()}
      {!user && !showAuthModal && (
        <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-indigo-600 p-4 rounded-3xl mb-6 shadow-2xl shadow-indigo-500/20">
            <Activity size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-black text-white mb-2">GrowtLife</h1>
          <p className="text-slate-400 mb-12 max-w-xs">Track your evolution, one win at a time.</p>
          <button
            onClick={() => {
              setShowAuthModal(true);
              setAuthMode("login");
            }}
            className="w-full max-w-xs bg-white text-slate-950 font-black py-4 rounded-2xl shadow-xl transition-all active:scale-95 mb-4"
          >
            Get Started
          </button>
        </div>
      )}
    </div>
  );
}
