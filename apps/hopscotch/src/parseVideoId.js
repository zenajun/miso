const ID_PATTERN = /^[\w-]{11}$/

// Pull the 11-character video ID out of any common YouTube link, or a bare ID.
// Returns null if nothing usable is found.
export function parseVideoId(input) {
  const text = input.trim()
  if (ID_PATTERN.test(text)) return text

  let url
  try {
    url = new URL(text)
  } catch {
    return null
  }

  const host = url.hostname.replace(/^(www\.|m\.)/, '')
  let id = null

  if (host === 'youtu.be') {
    id = url.pathname.slice(1)
  } else if (host === 'youtube.com' || host === 'music.youtube.com') {
    id = url.searchParams.get('v')
    if (!id) {
      const match = url.pathname.match(/^\/(shorts|embed|live)\/([^/]+)/)
      if (match) id = match[2]
    }
  }

  return id && ID_PATTERN.test(id) ? id : null
}
