const FLAKE_COUNT = 32

// Spread flakes out with simple index math instead of Math.random, so renders stay stable.
const flakes = Array.from({ length: FLAKE_COUNT }, (_, i) => ({
  '--x': `${(i * 37) % 100}%`,
  '--size': `${2 + ((i * 7) % 4)}px`,
  '--dur': `${14 + ((i * 5) % 12)}s`,
  '--delay': `-${(i * 3.7) % 20}s`,
  '--drift': `${((i % 5) - 2) * 14}px`,
  '--o': 0.25 + (i % 4) * 0.12,
}))

// Decorative background snow. Hidden from screen readers and for reduced-motion users (in CSS).
export function Snowfall() {
  return (
    <div className="snowfall" aria-hidden="true">
      {flakes.map((style, i) => (
        <span key={i} style={style} />
      ))}
    </div>
  )
}
