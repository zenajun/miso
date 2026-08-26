# CLAUDE.md — Assistant Rules

- Use UK English in all UI copy ("colour", "organise", "favourite")
- Prefer functional components with hooks — no class components
- Don't introduce new dependencies without flagging them first
- When touching Redux, follow the existing slice pattern in `/src/features`
- Recipe persistence goes through the Express API — never write directly to MongoDB from a component
- Shopping list state goes through the SharedWorker data provider — never `postMessage` directly from a component
- When changing the SharedWorker's message protocol (message `type` values), explain the change before applying it
- Keep commit messages short; longer reasoning belongs in code comments only where genuinely non-obvious