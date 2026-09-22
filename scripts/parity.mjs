// Visual parity check: original Webflow export vs React build, single page.
// Usage: node scripts/parity.mjs [--widths=1440,479] [--no-settle]
import { chromium } from 'playwright'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'
import fs from 'node:fs'
import path from 'node:path'

const ORIGINAL_BASE = process.env.ORIGINAL_BASE || 'http://localhost:5500'
const REACT_BASE = process.env.REACT_BASE || 'http://localhost:4173'
const args = process.argv.slice(2)
const widthsArg = args.find((a) => a.startsWith('--widths='))
const widths = widthsArg ? widthsArg.split('=')[1].split(',').map(Number) : [1440, 991, 767, 479]
const settle = !args.includes('--no-settle')

const FREEZE = `*,*::before,*::after{caret-color:transparent!important}`

async function capture(browser, url, width) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'load', timeout: 60000 })
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {})
  await page.addStyleTag({ content: FREEZE })
  await page.evaluate(() => document.fonts.ready)
  if (settle) {
    const h = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < h; y += 300) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y)
      await page.waitForTimeout(120)
    }
    await page.waitForTimeout(2500)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(2500)
  }
  const buf = await page.screenshot({ fullPage: true, animations: 'disabled' })
  await ctx.close()
  return PNG.sync.read(buf)
}

function crop(png, w, h) {
  const out = new PNG({ width: w, height: h })
  PNG.bitblt(png, out, 0, 0, w, h, 0, 0)
  return out
}

const browser = await chromium.launch()
const report = []
for (const width of widths) {
  const dir = path.join('parity', String(width))
  fs.mkdirSync(dir, { recursive: true })
  const [a, b] = await Promise.all([
    capture(browser, `${ORIGINAL_BASE}/index.html`, width),
    capture(browser, `${REACT_BASE}/`, width),
  ])
  const w = Math.min(a.width, b.width)
  const h = Math.min(a.height, b.height)
  const ca = crop(a, w, h), cb = crop(b, w, h)
  const diff = new PNG({ width: w, height: h })
  const px = pixelmatch(ca.data, cb.data, diff.data, w, h, { threshold: 0.1 })
  fs.writeFileSync(path.join(dir, 'original.png'), PNG.sync.write(a))
  fs.writeFileSync(path.join(dir, 'react.png'), PNG.sync.write(b))
  fs.writeFileSync(path.join(dir, 'diff.png'), PNG.sync.write(diff))
  const row = {
    width, originalHeight: a.height, reactHeight: b.height, heightMatch: a.height === b.height,
    diffPixels: px, diffPct: +((px / (w * h)) * 100).toFixed(4),
  }
  report.push(row)
  console.log(`${row.heightMatch && px === 0 ? 'PASS' : 'DIFF'}  ${String(width).padEnd(5)} height ${a.height}/${b.height}  diff ${px}px (${row.diffPct}%)`)
}
await browser.close()
fs.writeFileSync('parity/report.json', JSON.stringify(report, null, 2))
