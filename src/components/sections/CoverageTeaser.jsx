// Home coverage summary. Detail (concepts, unsupported addresses) lives on /coverage.
import { Link } from 'react-router-dom'
import { ROUTES } from '../../config/site'
import { COVERAGE } from '../../config/content'

export default function CoverageTeaser() {
  const [market] = COVERAGE.markets
  return (
    <section id="Coverage-Section" className="info-section">
      <div className="info-container info-container--center">
        <h2 className="info-heading">
          Available in <span className="text-span-19">{market.name}.</span>
        </h2>
        <p className="info-lead">
          ForeShift works for restaurants with a Detroit address today. We cover verified markets only, and we don&rsquo;t
          imply availability beyond them.
        </p>
        <p className="info-links-row">
          <Link to={ROUTES.coverage} className="info-link">See coverage and supported concepts</Link>
        </p>
      </div>
    </section>
  )
}
