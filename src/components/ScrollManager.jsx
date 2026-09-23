import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const MAX_MS = 3000
const POLL_MS = 50

/**
 * On a route change: scroll to the #hash target (e.g. a legal page's footer link back to
 * "/#Features-Section") once it exists in the DOM, or to the top when there's no hash. The
 * target may not be mounted yet on the very first tick (React commits the new route's tree after
 * this effect's first run), so this polls briefly rather than assuming it's already there.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = hash.slice(1)
    let elapsed = 0
    const timer = setInterval(() => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView()
        clearInterval(timer)
        return
      }
      elapsed += POLL_MS
      if (elapsed >= MAX_MS) clearInterval(timer)
    }, POLL_MS)
    return () => clearInterval(timer)
  }, [pathname, hash])

  return null
}
