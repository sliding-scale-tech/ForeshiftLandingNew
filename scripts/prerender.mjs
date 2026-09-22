// Build-time static prerender (SSG) of the single route `/`, run after `vite build`
// (npm run build chains `vite build && node scripts/prerender.mjs`).
//
// Why: the SPA shipped an empty <div id="root">, so nothing painted until the JS bundle
// downloaded and executed — a bad LCP/FCP on a content-heavy single page. Prerendering restores
// server-rendered markup so the browser paints real content immediately; main.jsx then
// hydrateRoot()s the same tree (no visual change, since the DOM it adopts is identical to what
// it would have rendered client-side).
//
// This page's animation no-flash guard (src/styles/interactions.css, `html:not(.ix3-ready) { ... }`)
// is pure CSS keyed off a class the Interactions engine adds post-hydration — it does not depend on
// any inline per-element style baked into the export's HTML, so prerendering needs no extra work to
// avoid a flash of the final (revealed) animation state: hidden-by-default is the correct pre-JS look
// in the export too.
//
// The full compiled stylesheet is inlined into <head> as a single <style> (not linked) so there is no
// render-blocking external CSS request — reasonable for a one-route site where nothing else could
// reuse a cached, separate CSS file anyway. The two self-hosted font files (public/fonts, see
// scripts/fetch-fonts.mjs) are preloaded so text paints in its final face on first paint.
import fs from 'node:fs'
import path from 'node:path'
import { build } from 'vite'

const DIST = 'dist'
const SSR_OUT = path.join('node_modules', '.cache', 'prerender')

await build({
  logLevel: 'warn',
  build: { ssr: 'scripts/prerender/entry-server.jsx', outDir: SSR_OUT, emptyOutDir: true, minify: false },
})
const { render } = await import(path.resolve(SSR_OUT, 'entry-server.js'))

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')
if (!template.includes('<div id="root"></div>')) throw new Error('dist/index.html is not a fresh vite build')

const cssTag = template.match(/<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/)
if (!cssTag) throw new Error('unexpected vite html output: no built stylesheet link found')
const fullCss = fs.readFileSync(path.join(DIST, cssTag[1]), 'utf8')

const FONT_FILES = fs
  .readFileSync(path.join('public', 'fonts', 'fonts.css'), 'utf8')
  .match(/url\(\/fonts\/([^)]+)\)/g)
  .map((m) => m.match(/url\(\/fonts\/([^)]+)\)/)[1])
const uniqueFontFiles = [...new Set(FONT_FILES)]
const fontPreloads = uniqueFontFiles
  .map((f) => `<link rel="preload" href="/fonts/${f}" as="font" type="font/woff2" crossorigin>`)
  .join('\n    ')

const body = await render()

const html = template
  .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`)
  .replace(
    '<meta content="width=device-width, initial-scale=1" name="viewport" />',
    (m) => `${m}\n    ${fontPreloads}`,
  )
  // Inline the full stylesheet (single route -> nothing else can share/cache it separately) so
  // there is no render-blocking external CSS request on top of the prerendered markup.
  .replace(cssTag[0], () => `<style>${fullCss.replace(/<\/style/gi, '<\\/style')}</style>`)

fs.writeFileSync(path.join(DIST, 'index.html'), html)
console.log(
  `prerendered / -> ${path.join(DIST, 'index.html')} ${(Buffer.byteLength(html) / 1024).toFixed(1)} KiB ` +
    `(css inlined ${(fullCss.length / 1024).toFixed(1)} KiB, ${uniqueFontFiles.length} font preloads)`,
)

// Build-only artifacts must not ship.
fs.rmSync(path.join(DIST, '.vite'), { recursive: true, force: true })
