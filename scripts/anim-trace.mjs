// Compares computed opacity/transform of every [data-w-id]/[data-wf-target]
// element between the original Webflow export and the React dev server, at
// fixed times after load and at fixed scroll positions, across widths.
// Usage: node scripts/anim-trace.mjs [--widths=1440,991,767,479]
import { chromium } from 'playwright'

const ORIGINAL_BASE = process.env.ORIGINAL_BASE || 'http://localhost:5500'
const REACT_BASE = process.env.REACT_BASE || 'http://localhost:5173'
const args = process.argv.slice(2)
const widthsArg = args.find((a) => a.startsWith('--widths='))
const widths = widthsArg ? widthsArg.split('=')[1].split(',').map(Number) : [1440, 991, 479]

const OPACITY_TOL = 0.03
const TRANSLATE_TOL = 2 // px

function parseTranslate(transformStr) {
  // matrix(a,b,c,d,tx,ty) or matrix3d(16 values, tx=13th, ty=14th)
  if (!transformStr || transformStr === 'none') return { tx: 0, ty: 0 }
  const m3d = transformStr.match(/^matrix3d\(([^)]+)\)$/)
  if (m3d) {
    const v = m3d[1].split(',').map(Number)
    return { tx: v[12], ty: v[13] }
  }
  const m2d = transformStr.match(/^matrix\(([^)]+)\)$/)
  if (m2d) {
    const v = m2d[1].split(',').map(Number)
    return { tx: v[4], ty: v[5] }
  }
  return { tx: 0, ty: 0 }
}

async function snapshot(page) {
  return page.evaluate(() => {
    const els = [...document.querySelectorAll('[data-w-id], [data-wf-target]')]
    return els.map((el) => {
      const cs = getComputedStyle(el)
      const rect = el.getBoundingClientRect()
      return {
        key: el.getAttribute('data-w-id') || el.getAttribute('data-wf-target'),
        tag: el.tagName,
        cls: el.className && el.className.toString().slice(0, 40),
        opacity: parseFloat(cs.opacity),
        transform: cs.transform,
        visible: rect.width > 0 && rect.height > 0,
      }
    })
  })
}

async function run(browser, base, width, scrollY, settleMs) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(base === REACT_BASE ? base + '/' : base + '/index.html', {
    waitUntil: 'load',
    timeout: 60000,
  })
  await page.waitForTimeout(800) // let IX3/Lenis/webflow.js register + layout/ScrollTrigger.refresh settle
  if (scrollY > 0) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY)
    await page.waitForTimeout(300)
  }
  await page.waitForTimeout(settleMs)
  const snap = await snapshot(page)
  await ctx.close()
  return snap
}

function compare(label, a, b) {
  const byKeyA = new Map(a.map((e) => [e.key + '|' + e.tag, e]))
  const byKeyB = new Map(b.map((e) => [e.key + '|' + e.tag, e]))
  let maxOpacityDelta = 0
  let maxTxDelta = 0
  let maxTyDelta = 0
  let compared = 0
  let missingInReact = []
  for (const [k, ea] of byKeyA) {
    const eb = byKeyB.get(k)
    if (!eb) {
      missingInReact.push(k)
      continue
    }
    compared++
    const od = Math.abs(ea.opacity - eb.opacity)
    maxOpacityDelta = Math.max(maxOpacityDelta, od)
    const ta = parseTranslate(ea.transform)
    const tb = parseTranslate(eb.transform)
    maxTxDelta = Math.max(maxTxDelta, Math.abs(ta.tx - tb.tx))
    maxTyDelta = Math.max(maxTyDelta, Math.abs(ta.ty - tb.ty))
  }
  const pass = maxOpacityDelta <= OPACITY_TOL && maxTxDelta <= TRANSLATE_TOL && maxTyDelta <= TRANSLATE_TOL
  console.log(
    `[${label}] compared=${compared} missingInReact=${missingInReact.length} maxOpacityDelta=${maxOpacityDelta.toFixed(3)} maxTxDelta=${maxTxDelta.toFixed(1)}px maxTyDelta=${maxTyDelta.toFixed(1)}px -> ${pass ? 'PASS' : 'FAIL'}`,
  )
  if (missingInReact.length) console.log('  missing in react:', missingInReact.slice(0, 10))
  return pass
}

const SCENARIOS = [
  { name: 'load-settled', scrollY: 0, settleMs: 3000 },
  { name: 'scroll-mid-settled', scrollY: 2200, settleMs: 2500 },
  { name: 'scroll-deep-settled', scrollY: 5200, settleMs: 2500 },
]

const browser = await chromium.launch()
let allPass = true
for (const width of widths) {
  console.log(`\n=== width ${width} ===`)
  for (const scenario of SCENARIOS) {
    const [origSnap, reactSnap] = await Promise.all([
      run(browser, ORIGINAL_BASE, width, scenario.scrollY, scenario.settleMs),
      run(browser, REACT_BASE, width, scenario.scrollY, scenario.settleMs),
    ])
    const pass = compare(`${width}px / ${scenario.name}`, origSnap, reactSnap)
    allPass = allPass && pass
  }
}
await browser.close()
console.log(`\nOVERALL: ${allPass ? 'PASS' : 'SOME FAILURES (see above)'}`)
process.exit(allPass ? 0 : 1)
