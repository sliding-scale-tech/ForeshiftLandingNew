// Home "How it works": three steps, one line each. The full walkthrough lives on /how-it-works.
import { Link } from 'react-router-dom'
import { ROUTES } from '../../config/site'
import { STEPS } from '../../config/content'

export default function Steps() {
  return (
    <section id="How-it-Works-Section" className="info-section info-section--alt">
      <div className="info-container info-container--center">
        <h2 className="info-heading">
          From address to outlook in <span className="text-span-19">three steps.</span>
        </h2>
        <p className="info-lead">No POS connection, no integration work &mdash; just your restaurant&rsquo;s details.</p>
        <ol className="steps-grid">
          {STEPS.map((s, i) => (
            <li key={s.title} className="info-card step-card">
              <span className="step-number" aria-hidden="true">{i + 1}</span>
              <h3 className="info-card-title">{s.title}</h3>
              <p className="info-card-text">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="info-links-row">
          <Link to={ROUTES.howItWorks} className="info-link">See the full walkthrough</Link>
          <Link to={ROUTES.noPos} className="info-link">Insights without a POS connection</Link>
        </p>
      </div>
    </section>
  )
}
