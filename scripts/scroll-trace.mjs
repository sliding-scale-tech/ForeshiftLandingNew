// Compares Lenis smooth-scroll deceleration curves between the original
// export and the React dev server: dispatch a fixed wheel delta, sample
// window.scrollY every ~16ms for 1.5s on both, and compare the curves.
// Usage: node scripts/scroll-trace.mjs [--width=1440]
import { chromium } from 'playwright'

const ORIGINAL_BASE = process.env.ORIGINAL_BASE || 'http://localhost:5500'
const REACT_BASE = process.env.REACT_BASE || 'http://localhost:5173'
const args = process.argv.slice(2)
const widthArg = args.find((a) => a.startsWith('--width='))
const width = widthArg ? Number(widthArg.split('=')[1]) : 1440
const SAMPLE_MS = 1500
const STEP_MS = 16
const WHEEL_DELTA = 1200

async function traceCurve(browser, base, path) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(base + path, { waitUntil: 'load', timeout: 60000 })
  await page.waitForTimeout(1000) // let Lenis + fonts settle
  await page.mouse.move(width / 2, 450)
  await page.mouse.wheel(0, WHEEL_DELTA)

  const samples = []
  const start = Date.now()
  while (Date.now() - start < SAMPLE_MS) {
    const y = await page.evaluate(() => window.scrollY)
    samples.push({ t: Date.now() - start, y })
    await page.waitForTimeout(STEP_MS)
  }
  await ctx.close()
  return samples
}

function summarize(label, samples) {
  const final = samples[samples.length - 1].y
  // Time to reach 90% of the final displacement — a simple, robust
  // deceleration-curve fingerprint that doesn't require frame-for-frame
  // alignment between two independently-sampled runs.
  const target = final * 0.9
  const t90 = samples.find((s) => s.y >= target)?.t ?? null
  const t50 = samples.find((s) => s.y >= final * 0.5)?.t ?? null
  console.log(`[${label}] final=${final.toFixed(1)}px  t50%=${t50}ms  t90%=${t90}ms`)
  return { final, t50, t90 }
}

const browser = await chromium.launch()
console.log(`Dispatching wheel(deltaY=${WHEEL_DELTA}) at width=${width}, sampling scrollY every ${STEP_MS}ms for ${SAMPLE_MS}ms\n`)

const origSamples = await traceCurve(browser, ORIGINAL_BASE, '/index.html')
const reactSamples = await traceCurve(browser, REACT_BASE, '/')
await browser.close()

const orig = summarize('ORIGINAL (:5500)', origSamples)
const react = summarize('REACT    (:5173)', reactSamples)

console.log('\nt/ms  orig-y  react-y')
for (let i = 0; i < origSamples.length; i += 4) {
  const o = origSamples[i]
  const r = reactSamples[i]
  if (!o || !r) continue
  console.log(`${o.t.toString().padStart(5)}  ${o.y.toFixed(0).padStart(6)}  ${r.y.toFixed(0).padStart(6)}`)
}

const finalDelta = Math.abs(orig.final - react.final)
const t90Delta = orig.t90 != null && react.t90 != null ? Math.abs(orig.t90 - react.t90) : null
console.log(
  `\nfinal displacement delta: ${finalDelta.toFixed(1)}px  |  t90% delta: ${t90Delta != null ? t90Delta + 'ms' : 'n/a'}`,
)
console.log(
  finalDelta < 80 && (t90Delta == null || t90Delta < 250)
    ? 'PASS: deceleration curves match closely (Lenis config verified equivalent).'
    : 'REVIEW: curves diverge more than expected — inspect samples above.',
)
