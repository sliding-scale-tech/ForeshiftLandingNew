import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { PAGE_META, SITE_URL } from '../config/site'

// Keeps <title>, meta description, canonical and og:* in step with the route after client-side
// navigation. The first paint's values are baked into each route's static HTML by
// scripts/prerender.mjs from the same PAGE_META, so crawlers never depend on this effect.
export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = PAGE_META[pathname]
    if (!meta) return
    const url = `${SITE_URL}${pathname}`
    document.title = meta.title
    const set = (selector, attr, value) => document.head.querySelector(selector)?.setAttribute(attr, value)
    set('meta[name="description"]', 'content', meta.description)
    set('link[rel="canonical"]', 'href', url)
    set('meta[property="og:title"]', 'content', meta.title)
    set('meta[property="og:description"]', 'content', meta.description)
    set('meta[property="og:url"]', 'content', url)
  }, [pathname])

  return null
}
