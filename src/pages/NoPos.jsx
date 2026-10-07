import { Link } from 'react-router-dom'
import CheckIcon from '../components/CheckIcon'
import PageHero from '../components/PageHero'
import CallToAction from '../components/sections/CallToAction'
import { ROUTES } from '../config/site'

const YOU_PROVIDE = [
  'Your restaurant’s address',
  'Your concept type',
  'Your operating hours',
]

const FORESHIFT_BRINGS = [
  'The week’s weather forecast',
  'Nearby sports, concerts, tradeshows, festivals and 5Ks',
  'A demand signal per event for your part of the city',
  'Context for your concept type and area',
]

export default function NoPos() {
  return (
    <>
      <PageHero
        title={
          <>
            Demand insights <span className="text-span-4">without</span> a POS connection
          </>
        }
        subtitle="Most restaurant tools start with an integration. ForeShift starts with your address."
      />

      <section className="info-section">
        <div className="info-container info-container--center">
          <h2 className="info-heading">
            A short list in, an outlook <span className="text-span-19">out.</span>
          </h2>
          <div className="info-grid info-grid--two">
            <div className="info-card">
              <h3 className="info-card-title">You provide</h3>
              <ul className="info-checklist">
                {YOU_PROVIDE.map((t) => (
                  <li key={t}><CheckIcon /><span>{t}</span></li>
                ))}
              </ul>
              <p className="info-card-text">Setup takes about thirty seconds.</p>
            </div>
            <div className="info-card">
              <h3 className="info-card-title">ForeShift brings</h3>
              <ul className="info-checklist">
                {FORESHIFT_BRINGS.map((t) => (
                  <li key={t}><CheckIcon /><span>{t}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section info-section--alt">
        <div className="info-container info-container--narrow">
          <h2 className="info-heading info-heading--left">
            Why no connection is <span className="text-span-19">needed.</span>
          </h2>
          <p className="info-body">
            The outlook is about demand in your area, how busy a concept like yours is expected to be in your part of
            the city, given the weather and what is happening nearby. That doesn&rsquo;t depend on your till, so there is
            nothing to install, no access to grant and no waiting on an integration.
          </p>
          <p className="info-body">
            It also means the outlook is not a prediction of your own sales. Read it as context for your plan, alongside what
            your team already knows about your regulars and your room.
          </p>
        </div>
      </section>

      <section className="info-section">
        <div className="info-container info-container--narrow">
          <h2 className="info-heading info-heading--left">
            Optional: bring your <span className="text-span-19">own history.</span>
          </h2>
          <p className="info-body">
            If you want more, the Sales Forecasting plan accepts a POS export or CSV of your historical data. With it you get a
            thirty-day forward revenue projection and a view of predicted versus actual. It is a file you upload, there is
            no live connection to your POS, and it is never required to see your demand outlook.
          </p>
          <p className="info-links-row info-links-row--left">
            <Link to={ROUTES.pricing} className="info-link">Compare plans</Link>
            <Link to={ROUTES.howItWorks} className="info-link">See how it works</Link>
          </p>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
