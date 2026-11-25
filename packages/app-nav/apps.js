// Every app in the monorepo. Each path is the app's folder name in apps/,
// because the root vite.config.js serves every app from one port.
export const apps = [
  {
    name: 'Weather',
    description: "Today's forecast, plus tips like when to bring an umbrella.",
    emoji: '⛅',
    path: '/weather/',
  },
  {
    name: 'Hopscotch',
    description: 'YouTube player with 10-second skip buttons.',
    emoji: '⏩',
    path: '/hopscotch/',
  },
  {
    name: 'Fetch Lab',
    description: 'Practice space for the fetching-data lessons: fetch vs axios.',
    emoji: '🧪',
    path: '/fetch-lab/',
  },
]
