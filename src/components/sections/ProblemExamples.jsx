// Three static examples under the Challenge heading (replaces the rotating Webflow slider, which
// hid two of four cards behind arrows — client review asked for static examples).
const EXAMPLES = [
  {
    icon: '/images/calendar-error_17628454.png',
    heading: 'Unexpected event activity',
    text: 'A nearby event can turn a normal night into a busy one before you see it coming.',
  },
  {
    icon: '/images/fermented_13195522.png',
    heading: 'Excess prep',
    text: 'Prep built for a busier night can leave food, time and margin going to waste.',
  },
  {
    icon: '/images/work-time_18741883.png',
    heading: 'Quieter service',
    text: 'A slower shift is easier to plan for when you know it may be coming.',
  },
]

export default function ProblemExamples() {
  return (
    <div className="f-section-regular problem-examples">
      <div className="f-testimonial-background"></div>
      <div className="f-container-large">
        <ul className="problem-examples-grid">
          {EXAMPLES.map(({ icon, heading, text }) => (
            <li key={heading} className="f-testimonial-card">
              <img src={icon} loading="lazy" width="60" alt="" className="image-5" />
              <h3 className="f-paragraph-small-2 chemical--heading">{heading}</h3>
              <p className="f-paragraph-small-2">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
