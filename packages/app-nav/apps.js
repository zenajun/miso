// Every app in the monorepo. Paths start with Vite's base ("/miso/"),
// so links work both locally and on GitHub Pages.
const base = import.meta.env.BASE_URL;

export const apps = [
    {
        name: 'Weather',
        description:
            "Today's forecast, plus tips like when to bring an umbrella.",
        emoji: '⛅',
        path: `${base}weather/`,
    },
    {
        name: 'Hopscotch',
        description: 'YouTube player with 10-second skip buttons.',
        emoji: '⏩',
        path: `${base}hopscotch/`,
    },
    {
        name: 'Fetch Lab',
        description:
            'Practice space for the fetching-data lessons: fetch vs axios.',
        emoji: '🧪',
        path: `${base}fetch-lab/`,
    },
];
