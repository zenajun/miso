# AGENTS.md

A pnpm monorepo that houses all my apps. Plain JavaScript, no TypeScript.

## Layout

- `apps/` : runnable apps, each with its own Vite setup (first app: `apps/weather`)
- `packages/` : shared code used by apps (empty for now)

## Commands

- `pnpm install` : install everything, run from the repo root
- `pnpm --filter weather dev` : run the weather app
- `pnpm --filter weather-advice test` : run the weather-advice tests

## Conventions

- JavaScript only. React with function components and hooks.
- Apps can import from `packages/`, never the other way around.
- Keep logic that doesn't need React (like `getAdvice`) in plain functions.
- Never commit secrets or `.env` files.

## Status

- [x] Workspace and weather app scaffolded
- [x] Weather data fetch
- [x] packages/weather-advice

## Planned apps (after weather)

- [ ] YouTube player with rewind and fast-forward controls
- [ ] Price tracker
