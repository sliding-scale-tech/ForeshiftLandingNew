// Dumps the ORIGINAL page's DOM after webflow.js/lenis/gsap ran, for reference during porting.
import { chromium } from 'playwright'
import fs from 'node:fs'
const ORIGINAL_BASE = process.env.ORIGINAL_BASE || 'http://localhost:5500'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(`${ORIGINAL_BASE}/index.html`, { waitUntil: 'load' })
await page.waitForTimeout(1500)
fs.mkdirSync('reference/rendered', { recursive: true })
fs.writeFileSync('reference/rendered/index.html', await page.evaluate(() => document.documentElement.outerHTML))
console.log('dumped')
await browser.close()
