import { CTA_LABEL, EXTERNAL } from '../../config/site'

export default function Hero() {
  return (
    <section id="Hero-Section" className="hero-wrapper">
      <div className="hero-content">
        <p className="hero-eyebrow">Demand intelligence for restaurants</p>
        <h1 className="hero-title">
          Know <span className="text-span-2">Demand</span> before you <span className="text-span">Open.</span>
        </h1>
        <p className="hero-subtitle">
          Know what to expect before you open. ForeShift forecasts expected demand for your concept and location
          &mdash; and how nearby events and weather may shift it &mdash; so you can plan around what&rsquo;s coming, not
          react to it.
        </p>
        <p className="hero-pos-note">No POS connection required.</p>
      </div>
      <div className="hero-button-wrapper">
        <a href={EXTERNAL.signUp} target="_blank" rel="noopener" className="get-started w-button">{CTA_LABEL}</a>
        <a href={EXTERNAL.sampleOutlook} target="_blank" rel="noopener" className="contact-us w-button">
          See a sample outlook
        </a>
      </div>
      <img
        src="/images/hero-outlook-screenshot.webp"
        // LCP element (above-the-fold hero image): eager + high priority so it isn't lazy-loaded
        // like the Webflow export did. Close-up of the app's Daily Outlook screen (client review:
        // "clear, close-up product screenshot showing demand by period and its drivers").
        loading="eager"
        fetchPriority="high"
        width="1282"
        height="1223"
        sizes="(max-width: 991px) 92vw, 960px"
        srcSet="/images/hero-outlook-screenshot-p-500.webp 500w, /images/hero-outlook-screenshot-p-800.webp 800w, /images/hero-outlook-screenshot.webp 1282w"
        alt="ForeShift Daily Outlook: expected demand for each daypart, with a demand chart and the top drivers behind it"
        className="hero-image hero-image--screenshot"
      />
      <p className="illustration-caption">Sample outlook &mdash; illustrative data.</p>
    </section>
  )
}
