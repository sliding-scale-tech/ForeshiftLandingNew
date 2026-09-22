import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Mirrors the export's own inline script verbatim (see the <script> right
// before </body> in reference/original/index.html):
//   const lenis = new Lenis({ duration: 1.0, smoothWheel: true, smoothTouch: false })
//   lenis.on('scroll', ScrollTrigger.update)
//   gsap.ticker.add((time) => lenis.raf(time * 1000))
//   gsap.ticker.lagSmoothing(0)
export function initLenis() {
  const lenis = new Lenis({
    duration: 1.0,
    smoothWheel: true,
    smoothTouch: false,
  })

  lenis.on('scroll', ScrollTrigger.update)

  const tick = (time) => {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(tick)
    lenis.destroy()
  }
}
