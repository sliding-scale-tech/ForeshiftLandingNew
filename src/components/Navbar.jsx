import { Link, useLocation } from 'react-router-dom'
import { CTA_LABEL, EXTERNAL, LOGO, NAV_LINKS, ROUTES } from '../config/site'

/**
 * Webflow `w-nav` navbar. Markup mirrors the export 1:1 so the global stylesheet applies
 * unchanged. Mobile menu behaviour lives in src/animations (owned by the interactions layer).
 *
 * Every NAV_LINKS entry is a react-router <Link> to a route (optionally with a #section on Home),
 * so it works the same from any page. A link to a page of its own gets `w--current` while that page
 * is open — the same pill highlight the export used for the in-page scroll-spy.
 */
export default function Navbar() {
  const { pathname } = useLocation()
  return (
    <section className="navbar-wrapper">
      <div
        data-animation="default"
        data-collapse="medium"
        data-duration="400"
        data-easing="ease"
        data-easing2="ease"
        data-doc-height="1"
        role="banner"
        className="navbar w-nav"
      >
        <div className="navbar-container">
          <Link to={ROUTES.home} aria-label="ForeShift home" className="brand w-nav-brand">
            <img
              sizes="(max-width: 479px) 98vw, (max-width: 1343px) 100vw, 1343px"
              srcSet={LOGO.srcSet}
              alt=""
              src={LOGO.src}
              loading="lazy"
              className="image"
            />
          </Link>
          <nav role="navigation" className="nav-menu w-nav-menu">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className={`nav-link w-nav-link${l.to === pathname ? ' w--current' : ''}`}
                aria-current={l.to === pathname ? 'page' : undefined}
              >
                {l.label}
              </Link>
            ))}
            <a href={EXTERNAL.signIn} target="_blank" rel="noopener" className="nav-link w-nav-link">
              Sign in
            </a>
            <a href={EXTERNAL.signUp} target="_blank" rel="noopener" className="rt-main-button-2 w-button">
              {CTA_LABEL}
            </a>
          </nav>
          <div className="menu-button w-nav-button">
            <div className="icon w-icon-nav-menu"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
