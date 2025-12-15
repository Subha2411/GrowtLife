# Achievement Vault 🏆

A gamified growth tracking application that celebrates personal achievements through cosmic companion evolution.

## Features

✨ **Gamified Tracking** - Earn Growth Points (GP) for achievements in 5 categories:

- 📚 Skill (learning, growth, knowledge)
- 💼 Career (job, opportunities, income)
- 🏃 Health (fitness, nutrition, wellness)
- 😊 Mindset (confidence, emotions, mental health)
- 💕 Personal (relationships, hobbies, fun)

🌟 **Companion Evolution** - Watch your cosmic companion grow from "Stardust Mote" to "Universal Entity" as you accumulate GP:

1. Stardust Mote (0 GP) - A tiny speck of potential
2. Lunar Wisp (100 GP) - Reflecting your first achievements
3. Astral Spirit (300 GP) - A conscious entity formed from habits
4. Solar Guardian (600 GP) - Burning bright with consistency
5. Universal Entity (1000+ GP) - Boundless growth

🤖 **AI-Powered Auto-Fill** - Describe what you did, and Google Gemini extracts the details automatically (title, category, difficulty, reflection)

💬 **Companion Insights** - AI analyzes your recent logs and provides personalized motivation + daily quests

📅 **Timeline View** - Browse your growth history month by month

🎉 **Year-End Wrapped** - Beautiful stats showing your total logs, favorite focus area, companion level, and more

💾 **Auto-Save** - All data persists locally via localStorage

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Clone or navigate to the project:**

```bash
cd /Users/mssrihaari17/Saas
```

2. **Install dependencies:**

```bash
npm install
```

3. **(Optional) Add Gemini API Key:**
   - Get a free API key from [Google AI Studio](https://aistudio.google.com)
   - Open `src/App.tsx` and replace the empty `apiKey` constant:
   ```typescript
   const apiKey = "YOUR_API_KEY_HERE";
   ```

### Development

Start the dev server:

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
├── index.html              # HTML entry point
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── vite.config.ts          # Vite configuration
└── src/
    ├── main.tsx            # React DOM mount
    ├── App.tsx             # Main application
    └── index.css           # Global styles + Tailwind directives
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful SVG icons
- **Google Gemini API** - AI-powered features (optional)

## Usage

### Logging an Achievement

1. Tap the **+** button at the bottom center
2. Choose **Magic Auto-Fill**: describe what you did (e.g., "Ran 5km in 25 mins")
3. Or manually fill in the form with title, category, difficulty, and reflection
4. Tap **Claim Growth Points**

### Viewing Progress

- **Dashboard** - See total GP, active streak, companion status, recent wins
- **Map (Timeline)** - Browse all achievements chronologically
- **Year-End** - Generate beautiful stats by tapping "Demo Year-End" button (uses sample data for demo)

### Tips

- Difficulty levels award different GP: Easy (5), Medium (10), Hard (20)
- Your companion evolves visually as you reach GP milestones
- Use the AI insight feature for personalized motivation
- Share your wrapped stats with friends!

## API Integration (Gemini)

The app includes optional AI features powered by Google's Gemini 2.5 Flash API:

### Magic Auto-Fill

- User input: Natural language description of an achievement
- AI extracts: structured data (title, category, difficulty, note)
- No API key? Just fill in the form manually

### Companion Insights

- Analyzes your recent 10 logs
- Generates motivational message + daily challenge
- Keeps you engaged and accountable

_Note: API calls include exponential backoff retry logic for reliability._

## Known Limitations / Future Work

- Photo/voice proof features (UI ready, backend needed)
- Cloud sync (currently localStorage only)
- Social sharing (export wrapped stats)
- More customization options (themes, companion appearances)
- Streak reset/recovery logic
- Batch import/export

## Tips for Extended Development

1. **Component Refactor**: If `App.tsx` exceeds 1000 lines, extract into:

   - `components/Companion.tsx`
   - `components/LogModal.tsx`
   - `components/WrappedView.tsx`
   - `hooks/useGrowthLogs.ts`

2. **State Management**: Consider Zustand or Redux if complexity grows

3. **Backend**: To add cloud sync:

   - Set up a simple Node/Express server
   - Use Supabase or Firebase for quick auth + database
   - Replace localStorage with API calls

4. **Analytics**: Track which categories users focus on, engagement metrics

5. **Notifications**: Browser notifications for daily reminders or milestones

## License

MIT - Feel free to use, modify, and share!

---

**Made with ✨ for personal growth enthusiasts**
