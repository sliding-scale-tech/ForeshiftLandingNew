// SSR entry used ONLY at build time by scripts/prerender.mjs (never shipped to the browser).
// Renders the exact same <App /> tree main.jsx renders on the client, so the client can
// hydrateRoot() the static markup without a mismatch. Single-page site — no router needed.
import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import App from '../../src/App.jsx'

export async function render() {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  const chunks = []
  for await (const chunk of prelude) chunks.push(chunk)
  return Buffer.concat(chunks).toString('utf8')
}
