import { Link } from 'react-router-dom'
import { CONTACT_LINKS, FOOTER_LINKS, LEGAL_LINKS, LOGO, ROUTES } from '../config/site'

export default function Footer() {
  return (
    <section className="footer">
      <div className="footer-wrapper">
        <div className="footer-columns">
          <Link to={ROUTES.home} aria-label="ForeShift home" className="w-inline-block">
            <img
              sizes="(max-width: 1343px) 100vw, 1343px"
              srcSet={LOGO.srcSet}
              alt=""
              loading="lazy"
              src={LOGO.src}
              className="foot-logo"
            />
          </Link>
        </div>
        <div className="foot-column-links">
          <h3 className="foot-header">Quick Links</h3>
          <div className="foot-link-wrapper">
            {FOOTER_LINKS.map((l) => (
              <Link key={l.label} to={`${ROUTES.home}#${l.id}`} className="foot-link">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="foot-column-links">
          <h3 className="foot-header">Legal</h3>
          <div className="foot-link-wrapper">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="foot-link">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="foot-column-links">
          <h3 className="foot-header">Get In Touch</h3>
          <div className="foot-link-wrapper">
            {CONTACT_LINKS.map((c) => (
              <a key={c.label} href={c.href} className="foot-link">
                {c.label}
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
