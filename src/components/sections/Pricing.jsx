// Pricing section — not present in the Webflow export/live site at all. Content (tiers, prices,
// feature lists) matches what's shown in the actual app at app.foreshift.ai and what the legal
// pages already state (src/pages/FulfillmentPolicyBody.jsx); styled to THIS site's own design
// system (light section, white cards, --color-primary accent) rather than the app dashboard's
// dark-navy card look. No per-tier buttons — every real signup CTA on this page already points to
// EXTERNAL.signUp (Hero, Navbar, Integrations, CallToAction); this section is informational.
const TIERS = [
  {
    name: 'Event Intelligence',
    tagline: 'Know your city.',
    price: 99,
    features: [
      'Weather forecast for the week',
      'Sports — all Detroit teams',
      'Concerts, tradeshows, festivals, 5Ks',
      'Demand signal per event for your zone',
      'Thirty seconds to start — zone and type only',
    ],
  },
  {
    name: 'Dynamic Scheduling',
    tagline: 'Know your schedule.',
    price: 199,
    features: [
      'Everything in Event Intelligence',
      'Shift-level staffing recommendations',
      'Estimated covers per daypart',
      'Server and kitchen crew counts',
      'Revenue estimate per shift',
    ],
  },
  {
    name: 'Sales Forecasting',
    tagline: 'Know your numbers.',
    price: 299,
    features: [
      'Everything in Dynamic Scheduling',
      'Thirty-day forward revenue projection',
      'POS or CSV historical data upload',
      'Variance tracking: predicted vs actual',
      'Market intelligence for expansion',
    ],
  },
]

function CheckIcon() {
  return (
    <svg className="pricing-check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Pricing() {
  return (
    <section id="Pricing-Section" className="pricing-wrapper">
      <div className="pricing-header">
        <h2 className="chatbot-heading">
          Simple <span className="text-span-19">Pricing</span>, built to grow with you.
        </h2>
        <p className="spark-hero-sub-paragraph-2">
          Each tier includes everything in the tier below it. All prices are in US Dollars (USD), billed monthly.
        </p>
      </div>
      <div className="pricing-grid">
        {TIERS.map((tier) => (
          <div key={tier.name} className="pricing-card">
            <h3 className="pricing-card-name">{tier.name}</h3>
            <p className="pricing-card-tagline">{tier.tagline}</p>
            <p className="pricing-card-price">
              <span className="pricing-card-price-amount">${tier.price}</span>
              <span className="pricing-card-price-period"> / month</span>
            </p>
            <ul className="pricing-card-features">
              {tier.features.map((f) => (
                <li key={f}>
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
