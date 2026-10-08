// Pricing tiers (data in src/config/content.js — same figures as the legal pages). Two forms:
//  - compact (home): name, tagline, price and a link to the full page — no feature lists, so the
//    home page doesn't repeat what /pricing already says.
//  - full (/pricing): feature lists plus a "Get started" button per plan.
// Styled to this site's own design system (light section, white cards, --color-primary accent).
import { Link } from 'react-router-dom'
import CheckIcon from '../CheckIcon'
import { CTA_LABEL, EXTERNAL, ROUTES } from '../../config/site'
import { TIERS } from '../../config/content'
import PaymentNote from '../PaymentNote'

export function TierCards({ compact = false }) {
  return (
    <div className={`pricing-grid${compact ? ' pricing-grid--compact' : ''}`}>
      {TIERS.map((tier) => (
        <div key={tier.name} className="pricing-card">
          <h3 className="pricing-card-name">{tier.name}</h3>
          <p className="pricing-card-tagline">{tier.tagline}</p>
          <p className="pricing-card-price">
            <span className="pricing-card-price-amount">${tier.price}</span>
            <span className="pricing-card-price-period"> USD / month</span>
          </p>
          {!compact && (
            <>
              <ul className="pricing-card-features">
                {tier.features.map((f) => (
                  <li key={f}>
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href={EXTERNAL.signUp} target="_blank" rel="noopener" className="get-started w-button pricing-card-cta">
                {CTA_LABEL}
              </a>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

// Home-page pricing summary.
export default function Pricing() {
  return (
    <section id="Pricing-Section" className="pricing-wrapper">
      <div className="pricing-header">
        <h2 className="chatbot-heading">
          Simple <span className="text-span-19">pricing</span>, built to grow with you.
        </h2>
        <p className="spark-hero-sub-paragraph-2">
          Three plans, billed monthly in US dollars. Each includes everything in the plan below it.
        </p>
      </div>
      <TierCards compact />
      <PaymentNote />
      <Link to={ROUTES.pricing} className="info-link pricing-more">
        Compare plans and features
      </Link>
    </section>
  )
}
