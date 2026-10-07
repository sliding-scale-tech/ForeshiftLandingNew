import { CTA_LABEL, EXTERNAL } from '../../config/site'

export default function Hero() {
  return (
    <section id="Hero-Section" className="hero-wrapper">
      <div className="hero-content">
        <p className="hero-eyebrow">Demand intelligence for restaurants</p>
        <h1 className="hero-title">
          Know <span className="text-span-2">demand</span> before you <span className="text-span">open.</span>
        </h1>
        <p className="hero-subtitle">
          Know what to expect before you open. ForeShift forecasts expected demand for your concept and location,
          and how nearby events and weather may shift it, so you can plan around what&rsquo;s coming, not
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
    </section>
  )
}
