// SSR entry used ONLY at build time by scripts/prerender.mjs (never shipped to the browser).
// Renders the exact same <App /> tree main.jsx renders on the client (wrapped in StaticRouter
// instead of BrowserRouter, fixed at "/" — this project prerenders only the home route; the
// legal pages added for Stripe's website checklist render client-side only, served by
// vercel.json's SPA fallback) so the client can hydrateRoot() the static markup without a
// mismatch.
import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import App from '../../src/App.jsx'

export async function render() {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location="/">
        <App />
      </StaticRouter>
    </StrictMode>,
  )
  const chunks = []
  for await (const chunk of prelude) chunks.push(chunk)
  return Buffer.concat(chunks).toString('utf8')
}
