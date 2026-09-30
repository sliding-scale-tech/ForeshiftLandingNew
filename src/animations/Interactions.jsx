import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initChallengeParallax } from './lib/challengeParallax'
import { initLenis } from './lib/lenisSetup'
import { initMobileNav } from './lib/mobileNav'
import { initNavScrollSpy } from './lib/navScrollSpy'

// Mount point for Lenis smooth scroll, the Challenge-section circle parallax and the navbar
// behaviour. Renders nothing — it only wires side effects against the DOM that Navbar/Footer/section
// components already rendered.
//
// Client review: content must be visible without waiting for scroll animations, so the Webflow
// IX3 reveal timelines (fade/slide-in on load and on scroll) and the visibility:hidden pre-paint
// guard that went with them were removed — every section renders in its final state. What's left
// is decorative/behavioural and honours prefers-reduced-motion: with reduced motion set, Lenis
// smooth-scroll and the circle parallax are skipped entirely.
//
// Re-runs on every route change (`pathname` dependency) because the <Route> elements it targets
// are unmounted/remounted on navigation. Every setup function returns its own teardown so this is
// safe under React StrictMode's dev double-invoke.
export default function Interactions() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const teardowns = []

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!reduceMotion) {
      // Continuous-scroll parallax (Challenge-Section circles), then Lenis smooth scroll wired to
      // GSAP's ticker.
      teardowns.push(initChallengeParallax())
      teardowns.push(initLenis())
    }

    // Mobile nav (data-collapse="medium" hamburger menu).
    teardowns.push(initMobileNav())

    // Nav scroll-spy (Webflow `links` module) — highlights the current
    //    section's nav link with its `w--current` pill background.
    teardowns.push(initNavScrollSpy())

    return () => {
      for (const teardown of teardowns) teardown?.()
    }
  }, [pathname])

  return null
}
