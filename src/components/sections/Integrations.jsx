import { CTA_LABEL, EXTERNAL } from '../../config/site'
import SampleOutlookFrame from './SampleOutlookFrame'

export default function Integrations() {
  return (
    <section className="integration-wrapper">
      <div className="integration-logo-wrapper">
        <h2 className="integration-heading">
          Foreshift. Demand insights for the <span className="text-span-19">decisions</span> ahead.
        </h2>
        <p className="integration-text">
          Explore demand by time of day, look ahead across the week, and see the daily weather and nearby events shaping your outlook.
        </p>
      </div>
      <SampleOutlookFrame />
      <section className="btn-container">
        <a href={EXTERNAL.signUp} target="_blank" rel="noopener" className="get-started w-button">
          {CTA_LABEL}
        </a>
      </section>
    </section>
  )
}
