# Growth App Environment Setup

## Prerequisites

- Node.js 16.x or higher
- npm or yarn

## Installation Steps

1. Navigate to the project directory:

```bash
cd /Users/mssrihaari17/Saas
```

2. Install dependencies:

```bash
npm install
```

This will install:

- React 18.3.1
- React DOM 18.3.1
- TypeScript 5.2.2
- Vite 5.0.8
- Tailwind CSS 3.4.1
- PostCSS & Autoprefixer
- Lucide React 0.344.0

3. (Optional) Add Gemini API Key:
   - Get free key from: https://aistudio.google.com
   - Edit `src/App.tsx` line 31 and replace `const apiKey = "";` with your key

## Development

Start the dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (TypeScript check + Vite build)
- `npm run preview` - Preview production build locally

## Project Overview

**Achievement Vault** is a gamified growth tracker with:

✨ Features:

- Log achievements in 5 categories (Skill, Career, Health, Mindset, Personal)
- Earn Growth Points (GP): Easy (5) | Medium (10) | Hard (20)
- Watch cosmic companion evolve through 5 stages (0→1000+ GP)
- AI-powered auto-fill for logs (using Google Gemini API)
- Companion insights & daily quests
- Timeline view of all achievements
- Beautiful year-end wrapped stats
- Full local persistence via localStorage

📁 Structure:

```
src/
  ├── App.tsx       - Main app (all-in-one component)
  ├── main.tsx      - React entry point
  └── index.css     - Tailwind + global styles
```

🎨 Styling:

- Tailwind CSS (dark theme: slate-950/900/800)
- Lucide React icons
- Smooth animations & transitions

## Troubleshooting

**Port 5173 already in use?**

```bash
npm run dev -- --port 3000
```

**TypeScript errors after npm install?**

```bash
npm install
npx tsc --noEmit
```

**Clear node_modules and reinstall:**

```bash
rm -rf node_modules package-lock.json
npm install
```

---

For more detailed documentation, see README.md
