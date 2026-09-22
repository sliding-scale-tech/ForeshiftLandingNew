export default function Hero() {
  return (
    <section id="Hero-Section" className="hero-wrapper">
      <div className="hero-content">
        <h1 className="hero-title">
          Know the <span className="text-span-2">Rush</span> before it <span className="text-span">Hits.</span>
        </h1>
        <p className="hero-subtitle">ForeShift helps restaurants see what demand is coming before the shift begins.</p>
      </div>
      <div className="hero-button-wrapper">
        <a href="#" className="get-started w-button">Get Started</a>
        <a href="#" className="contact-us w-button">Try Now</a>
      </div>
      <img
        src="/images/ChatGPT-Image-Sep-15-2026-06_09_36-PM.avif"
        // LCP element (above-the-fold hero image): the Webflow export marks this `loading="lazy"`
        // (a known export quirk — Webflow lazy-loads even above-the-fold images by default), but
        // that hurts LCP badly with no visual benefit since it's always in the initial viewport.
        // Perf-only deviation approved by PORTING_RULES.md's performance-agent scope; pixels unchanged.
        loading="eager"
        fetchPriority="high"
        sizes="(max-width: 1774px) 100vw, 1774px"
        srcSet="/images/3c85473359d0a924b589e383275fec77_ChatGPT-Image-Sep-15-2026-06_09_36-PM-p-500.avif 500w, /images/3c85473359d0a924b589e383275fec77_ChatGPT-Image-Sep-15-2026-06_09_36-PM-p-800.avif 800w, /images/3c85473359d0a924b589e383275fec77_ChatGPT-Image-Sep-15-2026-06_09_36-PM-p-1080.avif 1080w, /images/3c85473359d0a924b589e383275fec77_ChatGPT-Image-Sep-15-2026-06_09_36-PM-p-1600.avif 1600w, /images/ChatGPT-Image-Sep-15-2026-06_09_36-PM.avif 1774w"
        alt=""
        className="hero-image"
      />
    </section>
  )
}
