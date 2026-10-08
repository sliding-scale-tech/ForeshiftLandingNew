// SSR entry used ONLY at build time by scripts/prerender.mjs (never shipped to the browser).
// Renders the exact same <App /> tree main.jsx renders on the client, wrapped in StaticRouter at
// the requested location — one call per route in PAGE_META, so every page ships its own static
// HTML (own title/description/canonical, real content for crawlers) instead of the home page's
// shell. Also re-exports the site config the build script needs for the sitemap and JSON-LD.
import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import App from '../../src/App.jsx'
import { ADDRESS, CONTACT_LINKS, PAGE_META, SITE_URL } from '../../src/config/site.js'
import { FAQ, TIERS } from '../../src/config/content.js'

export { ADDRESS, CONTACT_LINKS, FAQ, PAGE_META, SITE_URL, TIERS }

export async function render(location = '/') {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={location}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
  const chunks = []
  for await (const chunk of prelude) chunks.push(chunk)
  return Buffer.concat(chunks).toString('utf8')
}
