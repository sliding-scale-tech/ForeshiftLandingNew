import { CTA_LABEL, EXTERNAL } from '../../config/site'

// Client review: the two moving slogan ribbons ("Trade Smart", "Staff Better", …) are gone and the
// space now holds a readable product example. The example is deliberately HTML (real text, no
// baked-in numbers) and carries the "illustrative data" label the review asks for on staged data.
const WEEK = [
  { day: 'Mon', level: 2 },
  { day: 'Tue', level: 2 },
  { day: 'Wed', level: 3 },
  { day: 'Thu', level: 3 },
  { day: 'Fri', level: 5 },
  { day: 'Sat', level: 4 },
  { day: 'Sun', level: 3 },
]

const DRIVERS = [
  { label: 'Forecast weather', text: 'Rain expected Friday evening' },
  { label: 'Nearby event', text: 'Large event close to your location on Saturday' },
  { label: 'Your concept', text: 'Full-service dining, dinner-led week' },
]

function SampleOutlook() {
  return (
    <figure id="Sample-Outlook" className="sample-outlook">
      <figcaption className="sample-outlook-label">Sample outlook: illustrative data</figcaption>
      <div className="sample-outlook-body">
        <div className="sample-outlook-week">
          <h3 className="sample-outlook-title">Week ahead</h3>
          <ol className="sample-outlook-bars">
            {WEEK.map(({ day, level }) => (
              <li key={day} className="sample-outlook-day">
                <span className={`sample-outlook-bar sample-outlook-bar--l${level}`} aria-hidden="true"></span>
                <span className="sample-outlook-day-name">{day}</span>
              </li>
            ))}
          </ol>
          <p className="sample-outlook-note">Taller bars mean higher expected demand.</p>
        </div>
        <div className="sample-outlook-drivers">
          <h3 className="sample-outlook-title">What&rsquo;s behind it</h3>
          <ul>
            {DRIVERS.map(({ label, text }) => (
              <li key={label}>
                <strong>{label}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  )
}

export default function Integrations() {
  return (
    <section className="integration-wrapper">
      <div className="integration-logo-wrapper">
        <h2 className="integration-heading">
          Demand insights for the <span className="text-span-19">decisions</span> ahead.
        </h2>
        <p className="integration-text">
          Compare service periods, explore the week ahead, and understand the weather and events behind the outlook.
        </p>
        <SampleOutlook />
      </div>
      <section className="btn-container">
        <a href={EXTERNAL.signUp} target="_blank" rel="noopener" className="get-started w-button">
          {CTA_LABEL}
        </a>
      </section>
    </section>
  )
}
