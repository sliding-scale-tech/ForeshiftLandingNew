// Replicates the ONE legacy IX2 interaction that still applies to this page:
// "Circles move in CTA Section 2" (event e-203, action list "a-6" in
// reference/ix-data.js) — a SCROLLING_IN_VIEW continuous-parameter animation
// on the Challenge-Section circles. IX3 (GSAP timelines) doesn't cover it;
// it's Webflow's older scroll-progress engine, driven by a per-frame
// exponential-smoothing loop over the element's own bounding rect. The exact
// math below is taken from reference/original/js/webflow.js's continuous
// scroll-parameter handler:
//
//   a = startsEntering ? startOffset : 1-startOffset   (startOffset=0 here)
//   s = startsExiting  ? endOffset   : 1-endOffset      (endOffset=0.3 here)
//   l = rect.top + min(rect.height*a, clientHeight)
//   f = min(clientHeight + (rect.top + rect.height*s - l), scrollHeight)
//   raw = clamp(clientHeight - l, 0, f) / f
//
// then smoothed every rAF tick with an EMA: current += (raw-current) * T,
// T = max(1 - smoothing/100, .01) — smoothing:90 here, so T = 0.1/frame,
// exactly like the source (frame-rate driven, not delta-time scaled).

const SECTION_ID = 'dd19f3e5-c044-453f-2687-24f8ad84bc8a'
const SMOOTHING_T = 0.1 // max(1 - 90/100, .01)
const START_OFFSET = 0 // addStartOffset:false -> 0
const END_OFFSET = 0.3 // addEndOffset:true, endOffsetValue:30 -> 0.3

// Each circle's x-transform keyframes: [0%: from] -> [endKeyframe%: 0]. The
// three circles per side finish at keyframe 25 / 50 / 75 respectively, exactly
// like action list "a-6"'s keyframe groups (see file header).
const CIRCLES = [
  { id: 'dd19f3e5-c044-453f-2687-24f8ad84bc93', from: -100, endKeyframe: 25 },
  { id: 'dd19f3e5-c044-453f-2687-24f8ad84bc94', from: -100, endKeyframe: 50 },
  { id: 'dd19f3e5-c044-453f-2687-24f8ad84bc95', from: -100, endKeyframe: 75 },
  { id: 'dd19f3e5-c044-453f-2687-24f8ad84bc97', from: 100, endKeyframe: 25 },
  { id: 'dd19f3e5-c044-453f-2687-24f8ad84bc98', from: 100, endKeyframe: 50 },
  { id: 'dd19f3e5-c044-453f-2687-24f8ad84bc99', from: 100, endKeyframe: 75 },
]
const OPACITY_END_KEYFRAME = 75

function ease(t) {
  // Approximates GSAP/CSS "ease" (power1-ish) closely enough for a decorative parallax.
  return t * (2 - t)
}

function segmentValue(progressPct, startKeyframe, endKeyframe, from, to) {
  if (progressPct <= startKeyframe) return from
  if (progressPct >= endKeyframe) return to
  const t = (progressPct - startKeyframe) / (endKeyframe - startKeyframe)
  return from + (to - from) * ease(t)
}

export function initChallengeParallax(root = document) {
  const section = root.querySelector(`[data-w-id="${SECTION_ID}"]`)
  if (!section) return () => {}

  const circleEls = CIRCLES.map((c) => ({ ...c, el: root.querySelector(`[data-w-id="${c.id}"]`) })).filter(
    (c) => c.el,
  )
  const wrapperEls = [...root.querySelectorAll('.spark-hold-circles-2')]
  if (!circleEls.length && !wrapperEls.length) return () => {}

  let current = 0
  let rafId = null

  function computeRaw() {
    const rect = section.getBoundingClientRect()
    const clientHeight = window.innerHeight
    const scrollHeight = document.documentElement.scrollHeight
    const a = START_OFFSET // startsEntering true
    const s = END_OFFSET // startsExiting true
    const l = rect.top + Math.min(rect.height * a, clientHeight)
    const f = Math.min(clientHeight + (rect.top + rect.height * s - l), scrollHeight) || 1
    const raw = Math.min(Math.max(0, clientHeight - l), f) / f
    return raw
  }

  function render() {
    const raw = computeRaw()
    current += (raw - current) * SMOOTHING_T
    const pct = current * 100

    for (const c of circleEls) {
      const x = segmentValue(pct, 0, c.endKeyframe, c.from, 0)
      c.el.style.willChange = 'transform'
      c.el.style.transform = `translate3d(${x}%, 0px, 0px)`
    }
    for (const el of wrapperEls) {
      el.style.opacity = String(segmentValue(pct, 0, OPACITY_END_KEYFRAME, 0, 1))
    }

    rafId = requestAnimationFrame(render)
  }

  rafId = requestAnimationFrame(render)

  return () => {
    if (rafId) cancelAnimationFrame(rafId)
  }
}
