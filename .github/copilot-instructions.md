<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Achievement Vault - Copilot Instructions

## Project Overview

This is a gamified growth tracking application built with React, TypeScript, Vite, and Tailwind CSS. Users can log personal achievements, earn growth points (GP), and evolve a companion through different cosmic stages.

## Key Technologies

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: localStorage for persistence
- **AI Integration**: Google Gemini API (optional, for smart log filling)

## Project Structure

```
src/
  ├── App.tsx          # Main application component with all features
  ├── main.tsx         # React DOM entry point
  └── index.css        # Tailwind directives and global styles
```

## Key Features

1. **Dashboard** - View total GP, streak, and companion evolution
2. **Log Modal** - Create growth logs with AI-powered auto-fill
3. **Timeline View** - Monthly growth map of all logged achievements
4. **Year-End Wrapped** - Anniversary view of growth statistics
5. **Local Persistence** - All data persists to localStorage

## Development Guidelines

- Keep components in `App.tsx` for simplicity; refactor to separate files if it grows beyond 800 lines
- Use Tailwind for all styling—no external CSS libraries
- Leverage `lucide-react` for all icons
- Use `useState`, `useEffect`, `useMemo` for state management
- Handle API calls with proper error handling and retry logic (already implemented for Gemini)
- Test data generation via the "Demo Year-End" button to verify features

## Gemini API Integration

- The `callGemini()` function handles:
  - Automatic retry with exponential backoff
  - JSON response parsing for structured log extraction
  - System prompts for reliable output
- API key should be provided via environment (currently empty string in code)
- Two main uses:
  1. **Magic Auto-Fill**: User describes action → AI extracts title, category, difficulty, note
  2. **Companion Insights**: AI analyzes recent logs → provides motivation + daily quest

## Common Tasks

- **Add a new log category**: Update `CATEGORIES` array (icon, color, label)
- **Add a new companion stage**: Update `STAGES` array (minGP thresholds, visuals)
- **Customize colors**: All color classes use Tailwind's slate, indigo, purple, etc.
- **Modify GP values**: Change `gpBase` in `handleAddLog()` or difficulty mappings

## Future Enhancements

- Export logs as JSON or PDF
- Social sharing (share wrapped results)
- Photo/voice proof upload (UI exists, backend needed)
- Cloud sync with backend
- Notifications/reminders
- More companion animations and evolution paths
