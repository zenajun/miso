// Small inline SVG icons. They use currentColor, so CSS `color` sets their colour.

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function SnowflakeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 12 12)`}>
          <path d="M12 12V2M9.5 4.5 12 6.5l2.5-2" />
        </g>
      ))}
    </svg>
  )
}

// A circular arrow around a number. `mirrored` flips the arrow (not the number) for forward.
export function SkipIcon({ seconds, mirrored = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <g transform={mirrored ? 'translate(24 0) scale(-1 1)' : undefined}>
        <path d="M12 5V2L8 5.5 12 9V7a6 6 0 1 1-6 6" />
      </g>
      <text
        x="12"
        y="15.6"
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
      >
        {seconds}
      </text>
    </svg>
  )
}

export function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

export function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  )
}
