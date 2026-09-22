// Self-host the exact Google Fonts binaries the Webflow export loads.
// Fetches the SAME css v1 URL that index.html's <link> requested (with a Chrome UA, so the
// woff2 + unicode-range variant Chrome receives), downloads the referenced woff2 files byte-for-byte
// into public/fonts/, and writes public/fonts/fonts.css with the URLs rewritten to /fonts/….
// vite.config.js inlines that CSS into <head> (no render-blocking third-party request), and
// scripts/prerender.mjs preloads only the above-the-fold faces per the single route.
//
// Kept: the faces this single-page site actually renders, audited with Playwright across every
// breakpoint (1440/991/767/479), computed styles on every element with direct text (incl. content
// hidden pre-hydration by the ix3-ready no-flash guard, which still gets computed styles):
//   Plus Jakarta Sans normal 400/500/600/700, Montserrat normal 600.
// Dropped: every other declared weight (100-900, all italics — WebFont's Google Fonts <link> loads
// every variant regardless of use) and latin-ext/cyrillic/greek/vietnamese subsets.
// Re-run: node scripts/fetch-fonts.mjs
import fs from 'node:fs'
import path from 'node:path'

const GOOGLE_URL =
  'https://fonts.googleapis.com/css?family=Montserrat:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic|Plus+Jakarta+Sans:300,400,500,600,700'
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'
const KEEP_STYLES = new Set(['normal'])
const KEEP_SUBSETS = new Set(['latin'])
// family -> Set of weights actually rendered (from the computed-style audit above).
const KEEP = new Map([
  ['Montserrat', new Set([600])],
  ['Plus Jakarta Sans', new Set([400, 500, 600, 700])],
])
const OUT = path.join('public', 'fonts')

const css = await (await fetch(GOOGLE_URL, { headers: { 'User-Agent': UA } })).text()
const blocks = [...css.matchAll(/\/\* ([\w-]+) \*\/\s*@font-face \{([^}]*)\}/g)]
if (!blocks.length) throw new Error('Unexpected Google Fonts response')

fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })
const faces = []
const files = new Map()
for (const [, subset, body] of blocks) {
  const family = body.match(/font-family: '([^']+)'/)[1]
  const fontStyle = body.match(/font-style: (\w+)/)[1]
  const weight = Number(body.match(/font-weight: (\d+)/)[1])
  const keepWeights = KEEP.get(family)
  if (!keepWeights || !keepWeights.has(weight) || !KEEP_STYLES.has(fontStyle) || !KEEP_SUBSETS.has(subset)) continue
  const url = body.match(/url\((https:[^)]+)\)/)[1]
  // e.g. https://fonts.gstatic.com/s/montserrat/v31/JTUS….woff2 -> montserrat-v31-JTUS….woff2
  const [, fam, ver, name] = url.match(/\/s\/([^/]+)\/([^/]+)\/(.+)$/)
  const local = `${fam}-${ver}-${name}`
  files.set(url, local)
  const range = body.match(/unicode-range: ([^;]+)/)[1]
  // No font-display, exactly like the Google css v1 response the export used (UA default = block).
  faces.push(
    `@font-face{font-family:'${family}';font-style:${fontStyle};font-weight:${weight};src:url(/fonts/${local}) format('woff2');unicode-range:${range.replace(/, /g, ',')}}`,
  )
}
for (const [url, local] of files) {
  const buf = Buffer.from(await (await fetch(url, { headers: { 'User-Agent': UA } })).arrayBuffer())
  fs.writeFileSync(path.join(OUT, local), buf)
}
fs.writeFileSync(path.join(OUT, 'fonts.css'), faces.join('\n') + '\n')
console.log(`${faces.length} @font-face rules, ${files.size} woff2 files -> ${OUT}`)
