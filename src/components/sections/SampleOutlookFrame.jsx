import { useState } from 'react'
import { EXTERNAL } from '../../config/site'

// Interactive sample outlook, embedded from the product app (staged data), between the feature
// rows and "Demand insights for the decisions ahead." Replaces the static screenshot. The browser
// chrome is decorative; the real controls live inside the iframe. The app page opens with a
// "Sample" banner holding a Sign in button; the iframe is shifted up inside a clipping viewport so
// that banner sits outside the visible area (see .sample-frame-viewport in globals.css).
//
// All screens: an iframe under the pointer captures scrolling, so the page cannot be scrolled with
// a finger or mouse wheel while over it. The frame therefore starts behind a "Click / Tap to
// explore" gate that lets the page scroll normally; once activated the sample is live and the bar
// shows "Done" to hand scrolling back to the page.
export default function SampleOutlookFrame() {
  const [live, setLive] = useState(false)
  return (
    <section className="sample-frame" aria-label="Interactive sample outlook">
      <div className="sample-frame-window">
        <div className="sample-frame-bar">
          <span className="sample-frame-dot" aria-hidden="true"></span>
          <span className="sample-frame-dot" aria-hidden="true"></span>
          <span className="sample-frame-dot" aria-hidden="true"></span>
          <span className="sample-frame-url" aria-hidden="true">app.foreshift.ai/sample-outlook</span>
          {live && (
            <button type="button" className="sample-frame-done" onClick={() => setLive(false)}>
              Done
            </button>
          )}
        </div>
        <div className="sample-frame-viewport">
          <iframe
            src={EXTERNAL.sampleOutlook}
            title="ForeShift sample outlook: an interactive example of the daily demand forecast"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            className="sample-frame-iframe"
          ></iframe>
          {!live && (
            <button type="button" className="sample-frame-gate" onClick={() => setLive(true)}>
              <span className="sample-frame-gate-label">
                <span className="gate-click">Click to explore the sample</span>
                <span className="gate-tap">Tap to explore the sample</span>
              </span>
            </button>
          )}
        </div>
      </div>
      <p className="illustration-caption">
        Sample outlook: illustrative data. Try it above, or{' '}
        <a href={EXTERNAL.sampleOutlook} target="_blank" rel="noopener" className="info-link">
          open it in a new tab
        </a>
        .
      </p>
    </section>
  )
}
