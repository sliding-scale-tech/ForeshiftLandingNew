// Build-time static prerender (SSG) of every route in src/config/site.js PAGE_META, run after
// `vite build` (npm run build chains `vite build && node scripts/prerender.mjs`).
//
// Why: the SPA shipped an empty <div id="root">, so nothing painted until the JS bundle
// downloaded and executed — a bad LCP/FCP, and nothing for crawlers to read. Prerendering emits
// real markup per route: `/` -> dist/index.html, `/privacy-policy` -> dist/privacy-policy/index.html
// (served extensionless by vercel.json's cleanUrls), each with its own <title>, meta description,
// canonical and og:* baked in. main.jsx then renders the same tree client-side.
//
// It also owns the crawl/indexing files, because they depend on WHICH deployment this is:
//   production (VERCEL_ENV unset or "production"): canonical URLs point at SITE_URL, sitemap.xml is
//     written, robots.txt allows crawling and links the sitemap, JSON-LD is embedded on `/`.
//   anything else (Vercel preview/staging builds, or SITE_ENV=staging): every page gets
//     <meta name="robots" content="noindex, nofollow">, robots.txt disallows everything and there
//     is no sitemap — so staging can never compete with production in search results.
//
// The full compiled stylesheet is inlined into <head> as a single <style> (not linked) so there is
// no render-blocking external CSS request. The two self-hosted font files (public/fonts, see
// scripts/fetch-fonts.mjs) are preloaded so text paints in its final face on first paint.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'vite'

const DIST = 'dist'
const SSR_OUT = path.join('node_modules', '.cache', 'prerender')

await build({
  logLevel: 'warn',
  build: { ssr: 'scripts/prerender/entry-server.jsx', outDir: SSR_OUT, emptyOutDir: true, minify: false },
})

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

const { render, PAGE_META, SITE_URL, CONTACT_LINKS, FAQ, TIERS, ADDRESS } = await import(pathToFileURL(path.resolve(SSR_OUT, 'entry-server.js')).href)

const vercelEnv = process.env.VERCEL_ENV
const isProduction = process.env.SITE_ENV !== 'staging' && (!vercelEnv || vercelEnv === 'production')

const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Structured data describes only what the home page visibly says: what the product is, who makes
// it, the three plan prices shown in the Pricing section, the FAQ answers, and the support address
// in the footer.
// No ratings/reviews (none exist) and no sameAs profiles (none verified).
function jsonLd() {
  const email = CONTACT_LINKS.find((c) => c.href.startsWith('mailto:'))?.href.replace('mailto:', '')
  const plan = (name, price) => ({
    '@type': 'Offer',
    name,
    price: String(price),
    priceCurrency: 'USD',
    priceSpecification: { '@type': 'UnitPriceSpecification', price: String(price), priceCurrency: 'USD', unitText: 'MONTH' },
    url: `${SITE_URL}/pricing`,
  })
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'ForeShift',
        url: `${SITE_URL}/`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: ADDRESS.street,
          addressLocality: ADDRESS.city,
          addressRegion: ADDRESS.region,
          postalCode: ADDRESS.postalCode,
          addressCountry: ADDRESS.countryCode,
        },
        ...(email && { contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email } }),
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#software`,
        name: 'ForeShift',
        url: `${SITE_URL}/`,
        description: PAGE_META['/'].description,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        inLanguage: 'en',
        publisher: { '@id': `${SITE_URL}/#organization` },
        offers: TIERS.map((t) => plan(t.name, t.price)),
      },
      // Mirrors the visible FAQ section on the home page word for word. Markup only — it is not a
      // ranking lever and carries no promise of rich results.
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }
  return `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`
}

function outFile(route) {
  return route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route.slice(1), 'index.html')
}

for (const route of Object.keys(PAGE_META)) {
  const { title, description } = PAGE_META[route]
  const url = `${SITE_URL}${route}`
  const body = await render(route)

  const html = template
    .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`)
    .replace(
      '<meta content="width=device-width, initial-scale=1" name="viewport" />',
      (m) => `${m}\n    ${fontPreloads}`,
    )
    .replace(/<title>[^<]*<\/title>/, () => `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, (_, a, b) => `${a}${esc(description)}${b}`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, (_, a, b) => `${a}${url}${b}`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, (_, a, b) => `${a}${esc(title)}${b}`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, (_, a, b) => `${a}${esc(description)}${b}`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, (_, a, b) => `${a}${url}${b}`)
    .replace('<!--robots-->', isProduction ? '' : '<meta name="robots" content="noindex, nofollow" />')
    .replace('<!--jsonld-->', route === '/' && isProduction ? jsonLd() : '')
    // Inline the full stylesheet so there is no render-blocking external CSS request.
    .replace(cssTag[0], () => `<style>${fullCss.replace(/<\/style/gi, '<\\/style')}</style>`)

  fs.mkdirSync(path.dirname(outFile(route)), { recursive: true })
  fs.writeFileSync(outFile(route), html)
  console.log(
    `prerendered ${route} -> ${outFile(route)} ${(Buffer.byteLength(html) / 1024).toFixed(1)} KiB`,
  )
}

if (isProduction) {
  const urls = Object.keys(PAGE_META)
    .map((r) => `  <url><loc>${SITE_URL}${r === '/' ? '/' : r}</loc></url>`)
    .join('\n')
  fs.writeFileSync(
    path.join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  )
  fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
} else {
  fs.writeFileSync(path.join(DIST, 'robots.txt'), 'User-agent: *\nDisallow: /\n')
  fs.rmSync(path.join(DIST, 'sitemap.xml'), { force: true })
}
console.log(`indexing: ${isProduction ? 'production (indexable, sitemap written)' : 'non-production (noindex, robots disallow all)'}`)

// Build-only artifacts must not ship.
fs.rmSync(path.join(DIST, '.vite'), { recursive: true, force: true })
