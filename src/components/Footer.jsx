import { FOOTER_LINKS, LOGO } from '../config/site'

export default function Footer() {
  return (
    <section className="footer">
      <div className="footer-wrapper">
        <div className="footer-columns">
          <a href="#Hero-Section" aria-current="page" aria-label="ForeShift home" className="w-inline-block w--current">
            <img
              sizes="(max-width: 1343px) 100vw, 1343px"
              srcSet={LOGO.srcSet}
              alt=""
              loading="lazy"
              src={LOGO.src}
              className="foot-logo"
            />
          </a>
        </div>
        <div className="foot-column-links">
          <h3 className="foot-header">Quick Links</h3>
          <div className="foot-link-wrapper">
            {FOOTER_LINKS.map((l) => (
              <a key={l.label} href={`#${l.id}`} className="foot-link">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="copyright">
          <p className="foot-text">Developed by </p>
          <a target="_blank" href="https://www.slidingscale.xyz/" className="foot-link">
            Sliding Scale Technologies
          </a>
        </div>
      </div>
    </section>
  )
}
