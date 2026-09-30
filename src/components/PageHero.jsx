// Page-top hero shared by every non-home page (legal pages and the informational pages). Reuses the
// Challenge-Section's own classes verbatim — same pale background, centered heading with a blue
// accent word, decorative circles — so all pages read as one site.
export default function PageHero({ title, subtitle, className = '' }) {
  return (
    <section className={`spark-section-7 spark-overflow-hidden-2 legal-hero ${className}`.trim()}>
      <div className="spark-container-5 spark-centered-content w-container">
        <h1 className="chatbot-heading">{title}</h1>
        {subtitle && <p className="spark-hero-sub-paragraph-2">{subtitle}</p>}
      </div>
      <div className="spark-hold-circles-2">
        <div className="spark-big-circle-2"></div>
        <div className="spark-big-circle-2 spark-circle-two"></div>
        <div className="spark-big-circle-2 spark-circle-three"></div>
      </div>
      <div className="spark-hold-circles-2 spark-right-side">
        <div className="spark-big-circle-2 spark-circle-static"></div>
        <div className="spark-big-circle-2 spark-circle-right-two"></div>
        <div className="spark-big-circle-2 spark-circle-three-right"></div>
      </div>
    </section>
  )
}
