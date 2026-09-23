import { EXTERNAL } from '../../config/site'

const rowA = [
  { plain: 'Trade ', emph: 'Smart' },
  { plain: 'Staff ', emph: 'better' },
  { plain: 'Prep ', emph: 'Ahead' },
  { plain: 'WASTE ', emph: 'Less' },
]

const rowB = [
  { span: true, plain: 'Demand', rest: ' Signals' },
  { plain: 'Weather ', emph: 'Ready' },
  { plain: 'Event ', emph: 'Aware' },
  { plain: 'Smarter ', emph: 'Shifts' },
]

function LogoRowA() {
  return (
    <div className="integration-logo">
      {rowA.map((item, i) => (
        <div key={i} className="rt-marquee-left-text rt-heading-one rt-color-black rt-no-wrap">
          {item.plain}
          <span className="rt-change-font">{item.emph}</span>
        </div>
      ))}
    </div>
  )
}

function LogoRowB() {
  return (
    <div className="integration-logo--1">
      {rowB.map((item, i) => (
        <div key={i} className="rt-marquee-left-text rt-heading-one rt-color-black rt-no-wrap">
          {item.span ? (
            <>
              <span className="text-span-3">{item.plain}</span>
              {item.rest}
            </>
          ) : (
            <>
              {item.plain}
              <span className="rt-change-font">{item.emph}</span>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default function Integrations() {
  return (
    <section className="integration-wrapper">
      <div
        data-wf-target='[[["6aa935b3aacd1b5b9fc5d716","f07ece68-3db4-5158-c34a-abf1066f67c0"],[]]]'
        className="integration-logo-wrapper"
      >
        <h2
          data-wf-target='[[["6aa935b3aacd1b5b9fc5d716","f07ece68-3db4-5158-c34a-abf1066f67c3"],[]]]'
          className="integration-heading"
        >
          Everything your <span className="text-span-19">Business</span> needs, before it starts.
        </h2>
        <p
          data-wf-target='[[["6aa935b3aacd1b5b9fc5d716","f07ece68-3db4-5158-c34a-abf1066f67c5"],[]]]'
          className="integration-text"
        >
          ForeShift connects demand, weather, events and operational signals so your team can staff
          smarter, prep ahead and waste less.
        </p>
        <div
          data-wf-target='[[["6aa935b3aacd1b5b9fc5d716","cfce0429-b2ba-8f79-8393-e6fbbadb3e51"],[]]]'
          className="integration-content"
        >
          <LogoRowA />
          <LogoRowA />
        </div>
        <div
          data-wf-target='[[["6aa935b3aacd1b5b9fc5d716","97522c1b-d8ed-537d-d688-128d932b440b"],[]]]'
          className="integration-content-1"
        >
          <LogoRowB />
          <LogoRowB />
        </div>
      </div>
      <section
        data-wf-target='[[["6aa935b3aacd1b5b9fc5d716","ae8b4b08-4f8f-a62e-6dbe-7b3b8df5e9a8"],[]]]'
        className="btn-container"
      >
        <a href={EXTERNAL.signUp} target="_blank" rel="noopener" className="get-started w-button">
          Explore in Action
        </a>
      </section>
    </section>
  )
}
