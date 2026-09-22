import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ix3Data from '../data/ix3-page.json'
import { resolveWatch, resolveActionTargets } from './resolveTargets'

gsap.registerPlugin(ScrollTrigger)

// Webflow's own convention: a `null` "to" means "animate to the element's
// natural/rest style" (no override). webflow.js implements that via GSAP's
// .from()/runBackwards, but that path turned out unreliable for a .from()
// tween nested inside a ScrollTrigger-driven, initially-paused timeline in
// this app (verified empirically with scripts/anim-trace.mjs: gsap reports
// the tween at progress 1 yet the DOM keeps showing the "from" values — a
// stuck render). Sidestepping it entirely by resolving every "null" to an
// explicit rest value and always using .fromTo()/.to() produces identical
// end states and is what actually renders correctly.
const NATURAL_DEFAULTS = {
  opacity: 1,
  x: '0%',
  y: '0%',
  z: 0,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  rotation: '0deg',
  rotationX: '0deg',
  rotationY: '0deg',
  rotationZ: '0deg',
  skew: '0deg',
  skewX: '0deg',
  skewY: '0deg',
}

// Webflow stores opacity as a percentage string ("0%", "100%") like every
// other animatable value, but gsap/CSS opacity is unitless 0-1 — mixing a
// "%" string with a plain-number natural-default target (e.g. from:"0%" to
// numeric 1) confuses gsap's unit parser and the tween silently saturates
// around 0.01 instead of reaching 1 (verified empirically). Normalize just
// this one property to a 0-1 float; every other property's "%" is a
// legitimate, meaningful unit (percent of the element's own size) and is
// passed through untouched.
function normalizeValue(prop, value) {
  if (prop === 'opacity' && typeof value === 'string' && value.trim().endsWith('%')) {
    return parseFloat(value) / 100
  }
  return value
}

// Splits an action's `properties` map ({propName: [from, to]}) into gsap
// `from`/`to` var objects. A `null` entry resolves to the element's natural
// rest value (see NATURAL_DEFAULTS above) rather than being dropped, so
// every action can be built with .fromTo()/.to() (see addActionToTimeline).
function splitProps(properties) {
  const from = {}
  const to = {}
  for (const [prop, pair] of Object.entries(properties || {})) {
    const [fromVal, toVal] = pair
    from[prop] = normalizeValue(prop, fromVal !== null && fromVal !== undefined ? fromVal : NATURAL_DEFAULTS[prop])
    to[prop] = normalizeValue(prop, toVal !== null && toVal !== undefined ? toVal : NATURAL_DEFAULTS[prop])
  }
  return { from, to }
}

// Mirrors webflow.js's tt (transition type) switch, minus tt:1's .from()
// (see the NATURAL_DEFAULTS comment above for why that's resolved to an
// explicit .fromTo() here instead — the visible result is the same):
//   0 -> .to()     1/2 -> .fromTo()     3 -> .set()
function addActionToTimeline(tl, action, elements, position) {
  if (!elements.length) return
  const { from, to } = splitProps(action.properties)
  const base = {
    duration: action.timing.duration,
    ease: action.timing.ease,
  }
  if (action.timing.stagger) base.stagger = action.timing.stagger
  if (action.timing.repeat != null) base.repeat = action.timing.repeat
  if (action.timing.repeatDelay != null) base.repeatDelay = action.timing.repeatDelay
  if (action.timing.yoyo != null) base.yoyo = action.timing.yoyo

  const tt = action.tt ?? 0
  if ((tt === 1 || tt === 2) && Object.keys(from).length) {
    tl.fromTo(elements, { ...from }, { ...to, ...base, immediateRender: true }, position)
  } else if (tt === 3) {
    tl.set(elements, { ...to }, position)
  } else if (Object.keys(to).length) {
    tl.to(elements, { ...to, ...base }, position)
  }
}

function buildActions(interaction, triggerEl) {
  const tl = gsap.timeline({ paused: true })
  for (const action of interaction.actions) {
    const elements = resolveActionTargets(action.target, triggerEl)
    addActionToTimeline(tl, action, elements, action.timing.position)
  }
  return tl
}

// Registers every page-scoped IX3 interaction (extracted from
// reference/ix-data.js, filtered to page 6aa935b3aacd1b5b9fc5d716 — see
// scripts/extract-ix3.mjs) against the live DOM. Returns a cleanup function
// that reverts every ScrollTrigger + timeline it created, safe to call twice
// (StrictMode double-invoke).
export function initIx3Timelines(root = document) {
  const scrollTriggers = []
  const loadTimelines = []

  for (const interaction of ix3Data) {
    if (interaction.trigger.type === 'wf:load') {
      const settings = interaction.settings || {}
      const parent = gsap.timeline({
        repeat: settings.repeat ?? 0,
        yoyo: settings.yoyo ?? false,
      })
      for (const action of interaction.actions) {
        const elements = resolveActionTargets(action.target, null, root)
        addActionToTimeline(parent, action, elements, action.timing.position)
      }
      loadTimelines.push(parent)
      continue
    }

    if (interaction.trigger.type === 'wf:scroll') {
      const triggerEls = resolveWatch(interaction.trigger.watch, root)
      const cfg = interaction.trigger.scrollTriggerConfig || {}
      const toggleActions = `${cfg.enter || 'play'} ${cfg.leave || 'none'} ${cfg.enterBack || 'none'} ${cfg.leaveBack || 'none'}`

      for (const triggerEl of triggerEls) {
        const tl = buildActions(interaction, triggerEl)
        const st = ScrollTrigger.create({
          trigger: triggerEl,
          start: cfg.start || 'top bottom',
          end: cfg.end || 'bottom top',
          scrub: cfg.scrub ?? false,
          toggleActions: cfg.scrub == null ? toggleActions : undefined,
          animation: tl,
        })
        scrollTriggers.push(st)
      }
    }
  }

  if (import.meta.env.DEV) window.__ix3Debug = { ScrollTrigger, scrollTriggers, ix3Data }

  // useLayoutEffect runs before webfonts/lazy above-the-fold images finish
  // decoding, so the very first ScrollTrigger start/end measurement can be
  // stale (page shorter than its final layout). Re-measure once, one frame
  // after mount — same idea as webflow.js's own readystatechange-driven
  // (re)init. Deliberately a single early refresh, not a standing
  // ResizeObserver: refreshing again later, once a reveal may already be
  // mid-playback, can visibly snap an in-flight/just-finished tween back to
  // its start — worse than the rare stale first measurement it would fix.
  const raf1 = requestAnimationFrame(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh())
  })
  // Webfont swap (fallback -> Montserrat/Plus Jakarta Sans) reflows text and
  // is the single biggest source of a stale first measurement; refresh once
  // more when it's actually done, same idea as webflow.js waiting on
  // readystatechange before its own IX2/IX3 init.
  document.fonts?.ready?.then(() => ScrollTrigger.refresh())

  return () => {
    cancelAnimationFrame(raf1)
    for (const st of scrollTriggers) st.kill()
    for (const tl of loadTimelines) tl.kill()
  }
}
