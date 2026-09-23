import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initIx3Timelines } from './lib/buildIx3Timelines'
import { initChallengeParallax } from './lib/challengeParallax'
import { initLenis } from './lib/lenisSetup'
import { initMobileNav } from './lib/mobileNav'
import { initNavScrollSpy } from './lib/navScrollSpy'

// Mount point for the Webflow IX2/IX3 engines + Lenis smooth scroll + navbar
// behaviour. Renders nothing — it only wires side effects against the DOM
// that Navbar/Footer/section components already rendered (data-w-id /
// data-wf-target attributes kept verbatim, per PORTING_RULES.md).
//
// Runs in useLayoutEffect (before paint) so ScrollTriggers/timelines exist,
// and the `ix3-ready` class flips off src/styles/interactions.css's
// visibility:hidden guard, before the browser paints a frame — matching
// Webflow's own w-mod-ix3 no-flash mechanism. Every setup function returns
// its own teardown so this is safe under React StrictMode's dev double-invoke.
//
// Re-runs on every route change (`pathname` dependency): this component sits
// outside <Routes> in App.jsx and is never unmounted, but the <Route>
// elements it targets (Home's sections, the legal-page hero circles) ARE
// unmounted/remounted on navigation — a stale one-time init would leave a
// freshly-mounted Home with no animations after navigating away and back.
// Only Lenis and the mobile nav (both keyed to permanent DOM: <html>,
// Navbar) don't need this, but re-running them is harmless (each tears down
// its own previous instance first).
export default function Interactions() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const html = document.documentElement
    const teardowns = []

    // 1) IX3 (GSAP timelines: load + scroll-triggered reveals, marquee loops).
    teardowns.push(initIx3Timelines())

    // 2) Legacy IX2 continuous-scroll parallax (Challenge-Section circles —
    //    the one interaction IX3 doesn't cover, see lib/challengeParallax.js).
    teardowns.push(initChallengeParallax())

    // 3) Lenis smooth scroll wired to GSAP's ticker + ScrollTrigger.
    teardowns.push(initLenis())

    // 4) Mobile nav (data-collapse="medium" hamburger menu).
    teardowns.push(initMobileNav())

    // 5) Nav scroll-spy (Webflow `links` module) — highlights the current
    //    section's nav link with its `w--current` pill background.
    teardowns.push(initNavScrollSpy())

    // Reveal: flips off the visibility:hidden pre-paint guard now that every
    // ScrollTrigger/timeline above has been registered against the DOM.
    html.classList.add('ix3-ready')

    return () => {
      html.classList.remove('ix3-ready')
      for (const teardown of teardowns) teardown?.()
    }
  }, [pathname])

  return null
}
