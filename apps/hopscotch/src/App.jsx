import { useEffect, useRef, useState } from 'react'
import { parseVideoId } from './parseVideoId.js'
import { useYouTubePlayer } from './useYouTubePlayer.js'
import { useTheme } from './useTheme.js'
import { Snowfall } from './Snowfall.jsx'
import { MoonIcon, SkipIcon, SnowflakeIcon, SunIcon } from './icons.jsx'
import './App.css'

const SKIP_SECONDS = 10

function App() {
  const [input, setInput] = useState('')
  const [videoId, setVideoId] = useState(null)
  const [error, setError] = useState('')
  // Shows a brief "10s" bubble over the video; `id` restarts the animation on every skip.
  const [flash, setFlash] = useState(null)
  const containerRef = useRef(null)
  const { playerRef, ready, error: loadError } = useYouTubePlayer(containerRef, videoId)
  const { theme, toggleTheme } = useTheme()

  function handleSubmit(event) {
    event.preventDefault()
    const id = parseVideoId(input)
    if (id) {
      setVideoId(id)
      setError('')
    } else {
      setError("That doesn't look like a YouTube link.")
    }
  }

  function skip(seconds) {
    const player = playerRef.current
    if (!player || !ready) return
    const target = player.getCurrentTime() + seconds
    player.seekTo(Math.min(Math.max(target, 0), player.getDuration()), true)
    setFlash({ seconds, id: Date.now() })
  }

  // Arrow keys skip too, unless you're typing in the URL box.
  useEffect(() => {
    function handleKey(event) {
      if (event.target.tagName === 'INPUT') return
      if (event.key === 'ArrowLeft') skip(-SKIP_SECONDS)
      if (event.key === 'ArrowRight') skip(SKIP_SECONDS)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  const isDark = theme === 'dark'

  return (
    <>
      <Snowfall />
      <div className="app">
        <header className="topbar">
          <div className="brand">
            <SnowflakeIcon />
            Hopscotch
          </div>
          <button
            className="icon-button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </header>

        <section className="hero">
          <h1>
            Hop through any <span>YouTube video</span>
          </h1>
          <p>
            Paste a link, keep all of YouTube&apos;s settings, and jump{' '}
            {SKIP_SECONDS} seconds with one tap.
          </p>
        </section>

        <form className="url-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="https://youtube.com/watch?v=…"
            aria-label="YouTube link"
          />
          <button type="submit" className="primary-button">
            Load
          </button>
        </form>
        {error && <p className="error">{error}</p>}

        {videoId ? (
          <section className="stage">
            <div className="player-frame">
              <div className="player" ref={containerRef} />
              {loadError && (
                <div className="load-error">
                  <h2>Couldn&apos;t reach YouTube</h2>
                  <p>Check your connection, then refresh the page.</p>
                </div>
              )}
              {flash && (
                <div
                  key={flash.id}
                  className={`skip-flash ${flash.seconds < 0 ? 'back' : 'forward'}`}
                  onAnimationEnd={() => setFlash(null)}
                >
                  {flash.seconds < 0 ? '−' : '+'}
                  {SKIP_SECONDS}s
                </div>
              )}
            </div>

            <div className="controls">
              <button
                className="skip-button"
                onClick={() => skip(-SKIP_SECONDS)}
                disabled={!ready}
                aria-label={`Back ${SKIP_SECONDS} seconds`}
              >
                <span className="disc">
                  <SkipIcon seconds={SKIP_SECONDS} />
                </span>
                Back
              </button>

              <div className="key-hint">
                <kbd>←</kbd>
                <kbd>→</kbd>
              </div>

              <button
                className="skip-button"
                onClick={() => skip(SKIP_SECONDS)}
                disabled={!ready}
                aria-label={`Forward ${SKIP_SECONDS} seconds`}
              >
                <span className="disc">
                  <SkipIcon seconds={SKIP_SECONDS} mirrored />
                </span>
                Forward
              </button>
            </div>
          </section>
        ) : (
          <section className="empty">
            <div>
              <SnowflakeIcon />
              <h2>Nothing playing yet</h2>
              <p>Works with watch, youtu.be, Shorts and embed links.</p>
            </div>
          </section>
        )}
      </div>
    </>
  )
}

export default App
