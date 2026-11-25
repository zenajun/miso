import { useEffect, useRef, useState } from 'react'

let apiPromise = null

// Load YouTube's IFrame API script once and resolve with window.YT when ready.
// Rejects if the script can't be downloaded (e.g. offline).
function loadYouTubeApi() {
  if (apiPromise) return apiPromise
  apiPromise = new Promise((resolve, reject) => {
    if (window.YT?.Player) return resolve(window.YT)
    window.onYouTubeIframeAPIReady = () => resolve(window.YT)
    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    script.onerror = () => {
      // Forget the failed attempt so the next call tries again.
      script.remove()
      apiPromise = null
      reject(new Error('Could not load YouTube'))
    }
    document.head.appendChild(script)
  })
  return apiPromise
}

// Mounts a YouTube player inside containerRef for the given videoId.
// The player keeps YouTube's own controls (speed, quality, captions, fullscreen).
export function useYouTubePlayer(containerRef, videoId) {
  const playerRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!videoId) return
    let cancelled = false

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled) return
        // YT.Player replaces the element it's given, so give it a fresh child.
        const target = document.createElement('div')
        containerRef.current.replaceChildren(target)
        playerRef.current = new YT.Player(target, {
          videoId,
          playerVars: { controls: 1, playsinline: 1 },
          events: { onReady: () => !cancelled && setReady(true) },
        })
      })
      .catch((err) => {
        if (!cancelled) setError(err)
      })

    return () => {
      cancelled = true
      setReady(false)
      setError(null)
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [containerRef, videoId])

  return { playerRef, ready, error }
}
