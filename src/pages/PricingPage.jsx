import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import CallToAction from '../components/sections/CallToAction'
import { TierCards } from '../components/sections/Pricing'
import PaymentNote from '../components/PaymentNote'
import { ROUTES } from '../config/site'

const BILLING = [
  'All prices are in US dollars (USD), billed monthly.',
  'Plans renew automatically each month until you cancel.',
  'You can cancel at any time; cancellation takes effect at the end of the paid period.',
  'We give notice before any price change takes effect for an existing subscription.',
]

export default function PricingPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Simple <span className="text-span-4">pricing</span>, built to grow with you
          </>
        }
        subtitle="Three plans, billed monthly in US dollars. Each includes everything in the plan below it."
      />

      <section className="info-section">
        <div className="info-container info-container--wide">
          <TierCards />
          <PaymentNote />
        </div>
      </section>

      <section className="info-section info-section--alt">
        <div className="info-container info-container--narrow">
          <h2 className="info-heading info-heading--left">
            How billing <span className="text-span-19">works.</span>
          </h2>
          <ul className="info-plainlist">
            {BILLING.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="info-body">
            No POS connection is needed on any plan. Delivery, cancellations and refunds are covered in our{' '}
            <Link to={ROUTES.refunds} className="info-link">refunds and cancellation policy</Link>, and the full terms are in our{' '}
            <Link to={ROUTES.terms} className="info-link">terms and conditions</Link>.
          </p>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
