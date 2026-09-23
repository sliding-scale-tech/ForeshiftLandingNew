import { Link } from 'react-router-dom'
import { EXTERNAL, LOGO, ROUTES, SECTIONS } from '../config/site'

/**
 * Webflow `w-nav` navbar. Markup mirrors the export 1:1 so the global stylesheet applies
 * unchanged. Mobile menu behaviour lives in src/animations (owned by the interactions layer).
 *
 * SECTIONS are in-page anchors on Home — from any other route (a legal page) they need to
 * navigate back to "/" first, so every link goes through react-router's <Link> to "/#id"; on
 * Home itself this is the same client-side transition, just with an unchanged pathname.
 */
export default function Navbar() {
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
            {SECTIONS.map((s) => (
              <Link key={s.id} to={`${ROUTES.home}#${s.id}`} className="nav-link w-nav-link">
                {s.label}
              </Link>
            ))}
            <a href={EXTERNAL.signUp} target="_blank" rel="noopener" className="rt-main-button-2 w-button">
              Sign Up
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
