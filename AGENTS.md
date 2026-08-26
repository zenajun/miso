# AGENTS.md — miso

A searchable, personal recipe diary. Local UI talks to a real backend;
a SharedWorker adds a live cross-tab shopping list on top.

## Stack
- React 19 + Vite (frontend)
- MUI for UI components
- Redux Toolkit for state
- AG-Grid for the searchable recipe list
- Node/Express + MongoDB Atlas (backend API + database)
- SharedWorker for the cross-tab shopping list (session-only, not persisted to Mongo)

## Data shape: Recipe
\`\`\`js
{
  id: 'r1',
  title: 'Miso-glazed salmon',
  mealType: 'dinner', // breakfast | lunch | dinner | snack | sweet
  prepTimeMinutes: 20,
  ingredients: [
    { name: 'salmon fillet', quantity: 2, unit: 'pcs', costPerUnit: 4.50 },
    { name: 'miso paste', quantity: 2, unit: 'tbsp', costPerUnit: 0.30 },
  ],
  instructions: 'Whisk miso, mirin, and soy. Marinate salmon 15 min. Air fry at 200°C for 10 min.',
  tags: ['seafood', 'quick', 'Japanese'],
}
\`\`\`

## Commands
- `npm run dev` — start local dev server (frontend)
- `npm run build` — production build (frontend)
- Backend commands to be added once the Express server exists (Week 3)

## Project structure
- `/src/components` — presentational UI (MUI-based)
- `/src/features` — Redux slices, one folder per domain (e.g. `recipes/`)
- `/src/worker` — SharedWorker script + data provider abstraction (shopping list only)
- `/src/store.js` — Redux store setup
- `/server` — Express API + MongoDB models (added Week 3, separate from the Vite app)

## Conventions
- Redux slices live next to the feature they belong to
- Never call `postMessage` or `fetch` directly from a component — always go through a data provider
- The SharedWorker manages the shopping list only. Recipe data lives in MongoDB via the API — the two are not the same store, don't conflate them
- Keep components under ~150 lines; extract subcomponents past that
- The MongoDB connection string lives in a `.env` file and is never committed

## Current status
- [x] Vite + React 19 scaffolded
- [ ] MUI installed
- [ ] Redux Toolkit installed
- [ ] Express + MongoDB Atlas backend
- [ ] SharedWorker shopping list