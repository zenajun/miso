import { useEffect, useState } from 'react'

const STORAGE_KEY = 'hopscotch-theme'

// index.html sets the starting theme on <html>; this keeps it in sync and saves changes.
export function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || 'light',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage can be blocked (private mode); the theme just won't be remembered.
    }
  }

  return { theme, toggleTheme }
}
