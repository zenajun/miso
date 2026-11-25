# AGENTS.md

A pnpm monorepo that houses all my apps. Plain JavaScript, no TypeScript.

## Layout

- `apps/` : runnable apps, all served by the root `vite.config.js` on one port (5170), one URL path per folder
  - `apps/home` (`/home/`, also `/`) : homepage linking to every app. App list lives in `packages/app-nav/apps.js`
  - `apps/weather` (`/weather/`), `apps/hopscotch` (`/hopscotch/`), `apps/fetch-lab` (`/fetch-lab/`)
- `packages/` : shared code used by apps
  - `weather-advice` : rain, UV and heat tips from forecast data
  - `app-nav` : side panel for switching apps (plain JS, add with `import 'app-nav'` in an app's entry file) and the shared app list

## Commands

Run all of these from the repo root.

### Getting it running

1. `pnpm install` : install everything (first time, or after a `package.json` changes)
2. `pnpm dev` : start one Vite server for every app
3. Open http://localhost:5170 (it redirects to the homepage at `/home/`)
   - Weather: http://localhost:5170/weather/
   - Hopscotch (YouTube player with ±10s skip): http://localhost:5170/hopscotch/
   - Fetch Lab (practice space for the fetching-data lessons): http://localhost:5170/fetch-lab/
4. Stop the server with `Ctrl+C`

Apps can't be started on their own any more (`pnpm --filter weather dev` is gone): they all run together.

### Other commands

- `pnpm build` : build every app into `dist/` at the repo root
- `pnpm preview` : serve that build locally to check it
- `pnpm --filter weather-advice test` : run the weather-advice tests

### If something goes wrong

- "Port 5170 is already in use": an old server is still running. Close that terminal or stop the process, then run `pnpm dev` again.
- A page loads blank or its CSS/JS 404s: check that its `index.html` uses `./` relative paths (`./src/main.jsx`), not `/src/main.jsx`.

## Conventions

- JavaScript only. React with function components and hooks.
- Apps can import from `packages/`, never the other way around.
- Keep logic that doesn't need React (like `getAdvice`) in plain functions.
- Never commit secrets or `.env` files.
- New app: create `apps/<name>/index.html` (use `./` relative paths), add `<name>` to `appNames` in the root `vite.config.js`, add it to `packages/app-nav/apps.js`, add `"app-nav": "workspace:*"` to its dependencies, and `import 'app-nav'` in its entry file.

## Decisions and limits
- Forecast is requested for one day starting at midnight, so index = hour of day. This breaks if forecast_days changes.
- "Later today" includes the current hour.
- Default city is Toronto, used whenever geolocation is unavailable.
- Fetching lives in loadForecast(); the data is validated once there.

## Status

- [x] Workspace and weather app scaffolded
- [x] Weather data fetch
- [x] packages/weather-advice
- [x] weather screen

## Planned apps (after weather)

- [x] YouTube player with rewind and fast-forward controls (`apps/hopscotch`)
- [ ] Price tracker
