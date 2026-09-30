import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import CallToAction from '../components/sections/CallToAction'
import { ROUTES } from '../config/site'

const DETAIL_STEPS = [
  {
    title: 'Add your location and concept',
    provide: 'Your restaurant’s address and its concept type.',
    happens:
      'ForeShift places your address in the right part of the city — a defined trade area, or zone — and uses your concept type to pick the demand pattern that fits you. A fast-casual counter and a fine-dining room are not treated the same, even on the same street.',
  },
  {
    title: 'Set your operating hours',
    provide: 'The days and hours you are open.',
    happens:
      'Your hours shape which service periods appear, so the outlook is organized around the shifts you actually run instead of a generic day.',
  },
  {
    title: 'Explore your demand outlook',
    provide: 'Nothing more — the outlook is ready.',
    happens:
      'Open the week ahead, compare service periods, and see the weather and nearby events behind each one. An optional AI Intelligence Pass lets you ask questions about the outlook in plain English.',
  },
]

const OUTLOOK_PARTS = [
  {
    title: 'The week ahead',
    text: 'Expected demand for each day, so you can see the busy and quiet stretches before the week starts.',
  },
  {
    title: 'Service periods',
    text: 'Compare periods within a day to see where demand is expected to build or ease.',
  },
  {
    title: 'The reasons behind it',
    text: 'Forecast weather and nearby events, such as sports, concerts, festivals and tradeshows, shown next to the outlook they influence.',
  },
  {
    title: 'A plain-language explanation',
    text: 'AI explains the outlook in everyday words, helping you understand what may drive a busy or quiet period.',
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        title={
          <>
            How <span className="text-span-4">ForeShift</span> works
          </>
        }
        subtitle="From your address to a demand outlook in three steps. No POS connection required."
      />

      <section className="info-section">
        <div className="info-container">
          <ol className="detail-steps">
            {DETAIL_STEPS.map((s, i) => (
              <li key={s.title} className="info-card detail-step">
                <span className="step-number" aria-hidden="true">{i + 1}</span>
                <div>
                  <h2 className="info-card-title">{s.title}</h2>
                  <p className="info-card-text">
                    <strong>You provide:</strong> {s.provide}
                  </p>
                  <p className="info-card-text">{s.happens}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="info-section info-section--alt">
        <div className="info-container info-container--center">
          <h2 className="info-heading">
            What&rsquo;s in your <span className="text-span-19">outlook.</span>
          </h2>
          <p className="info-lead">Everything below appears together, so the &ldquo;why&rdquo; is never a separate hunt.</p>
          <div className="info-grid info-grid--two">
            {OUTLOOK_PARTS.map((p) => (
              <div key={p.title} className="info-card">
                <h3 className="info-card-title">{p.title}</h3>
                <p className="info-card-text">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="info-container info-container--narrow">
          <h2 className="info-heading info-heading--left">
            What the outlook is, and <span className="text-span-19">isn&rsquo;t.</span>
          </h2>
          <p className="info-body">
            ForeShift forecasts demand for your concept type in your part of the city, by day and service period. It is an
            estimate about your area, not a prediction of your own restaurant&rsquo;s sales or covers, and it can be wrong.
          </p>
          <p className="info-body">
            Use it alongside your team&rsquo;s experience. Staffing, ordering, hours and promotions remain your decisions.
          </p>
          <p className="info-links-row info-links-row--left">
            <Link to={ROUTES.noPos} className="info-link">See what ForeShift needs (and doesn&rsquo;t) from you</Link>
            <Link to={ROUTES.coverage} className="info-link">Check coverage for your address</Link>
          </p>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
