// Webflow `links` module (webflow.js) without jQuery: toggles `w--current` on
// same-page nav-menu links while their target section is in the middle band
// of the viewport — this is what gives the active nav item its pill
// background (see `.nav-link.w--current` in site.css). Webflow's own scoping
// is `document.links` site-wide; this single-page site only has in-page
// anchors in `.nav-menu`, so we scope to those directly.

const HASH = /^#[a-zA-Z0-9][\w:.-]*$/
const CURRENT = 'w--current'

function onScrollThrottled(fn) {
  let queued = false
  const handler = () => {
    if (queued) return
    queued = true
    requestAnimationFrame(() => {
      queued = false
      fn()
    })
  }
  const events = ['scroll', 'resize', 'orientationchange', 'load']
  events.forEach((e) => window.addEventListener(e, handler))
  return () => events.forEach((e) => window.removeEventListener(e, handler))
}

export function initNavScrollSpy() {
  const links = Array.from(document.querySelectorAll('.nav-menu .nav-link'))
  const entries = []
  for (const link of links) {
    const href = link.getAttribute('href') || ''
    if (!HASH.test(href)) continue
    const section = document.getElementById(href.slice(1))
    if (section) entries.push({ link, section, active: false })
  }
  if (!entries.length) return () => {}

  const update = () => {
    const scrollTop = window.scrollY
    const viewport = window.innerHeight
    for (const entry of entries) {
      const { link, section } = entry
      const top = section.getBoundingClientRect().top + scrollTop
      const height = section.offsetHeight
      const half = 0.5 * viewport
      const visible = section.getClientRects().length > 0
      const active = visible && top + height - half >= scrollTop && top + half <= scrollTop + viewport
      if (entry.active === active) continue
      entry.active = active
      link.classList.toggle(CURRENT, active)
    }
  }

  const off = onScrollThrottled(update)
  update()
  return () => {
    off()
    entries.forEach(({ link }) => link.classList.remove(CURRENT))
  }
}
