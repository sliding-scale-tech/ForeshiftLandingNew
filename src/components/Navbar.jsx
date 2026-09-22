import { LOGO, SECTIONS } from '../config/site'

/**
 * Webflow `w-nav` navbar (single-page site: all links are in-page anchors).
 * Markup mirrors the export 1:1 so the global stylesheet applies unchanged.
 * Mobile menu behaviour lives in src/animations (owned by the interactions layer).
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
          <a href="#Hero-Section" aria-current="page" aria-label="ForeShift home" className="brand w-nav-brand w--current">
            <img
              sizes="(max-width: 479px) 98vw, (max-width: 1343px) 100vw, 1343px"
              srcSet={LOGO.srcSet}
              alt=""
              src={LOGO.src}
              loading="lazy"
              className="image"
            />
          </a>
          <nav role="navigation" className="nav-menu w-nav-menu">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="nav-link w-nav-link">
                {s.label}
              </a>
            ))}
            <a href="#" className="rt-main-button-2 w-button">
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
