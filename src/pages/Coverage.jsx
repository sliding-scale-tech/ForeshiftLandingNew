import CheckIcon from '../components/CheckIcon'
import PageHero from '../components/PageHero'
import CallToAction from '../components/sections/CallToAction'
import { CONTACT_LINKS } from '../config/site'
import { COVERAGE } from '../config/content'

const hello = CONTACT_LINKS.find((c) => c.href === 'mailto:hello@foreshift.ai')

export default function Coverage() {
  return (
    <>
      <PageHero
        title={
          <>
            Where <span className="text-span-4">ForeShift</span> is available
          </>
        }
        subtitle="We list a market only once it is supported. We don’t claim nationwide availability."
      />

      <section className="info-section">
        <div className="info-container info-container--center">
          <h2 className="info-heading">
            Supported <span className="text-span-19">markets.</span>
          </h2>
          <div className="info-grid info-grid--one">
            {COVERAGE.markets.map((m) => (
              <div key={m.name} className="info-card coverage-market">
                <h3 className="info-card-title">{m.name}</h3>
                <p className="coverage-status">{m.status}</p>
              </div>
            ))}
          </div>
          <p className="info-lead">
            To use ForeShift today, your restaurant needs a Detroit address. More markets will be listed here as they become
            available.
          </p>
        </div>
      </section>

      <section className="info-section info-section--alt">
        <div className="info-container info-container--center">
          <h2 className="info-heading">
            Supported restaurant <span className="text-span-19">concepts.</span>
          </h2>
          <p className="info-lead">
            You choose one of these concept types when you add your location, and the outlook is built for that concept.
          </p>
          <ul className="concept-list">
            {COVERAGE.concepts.map((c) => (
              <li key={c}>
                <CheckIcon />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="info-section">
        <div className="info-container info-container--narrow">
          <h2 className="info-heading info-heading--left">
            How your address is <span className="text-span-19">matched.</span>
          </h2>
          <p className="info-body">
            ForeShift places your address in a defined city trade area, called a zone, and forecasts demand for your concept
            type in that zone. Coverage is a matter of zones: an address needs to fall inside one we support.
          </p>
          <h2 className="info-heading info-heading--left">
            If your address is <span className="text-span-19">outside a supported market.</span>
          </h2>
          <p className="info-body">
            ForeShift can&rsquo;t produce an outlook for it. Coverage is limited to the markets listed above, so buying a plan
            does not extend it to a market we don&rsquo;t serve.
          </p>
          <p className="info-body">
            Tell us where you operate at{' '}
            <a href={hello.href} className="info-link">{hello.label}</a>{' '}
            &mdash; it helps us understand where restaurants need this next.
          </p>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
