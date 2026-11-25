# apps-monorepo

A pnpm monorepo for my apps. Plain JavaScript and React.

## Apps

- `apps/weather`: shows today's forecast and what to bring (umbrella, sunscreen, water).

## Packages

- `packages/weather-advice`: pure function that turns a forecast into reminders.

## Commands

- `pnpm install`
- `pnpm --filter weather dev`
- `pnpm --filter weather-advice test`

## Notes

- Forecast data comes from Open-Meteo (no API key).
- Geolocation only works on localhost or HTTPS.
