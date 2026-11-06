// Three static examples under the Challenge heading (replaces the rotating Webflow slider, which
// hid two of four cards behind arrows — client review asked for static examples).
const EXAMPLES = [
  {
    icon: '/images/calendar-error_17628454.png',
    heading: 'Unexpected Event Activity',
    text: 'A nearby sporting event, conference or concert can turn a normal night into a busy one before you see it coming.',
  },
  {
    icon: '/images/weather-impact.svg',
    heading: 'Weather impact',
    text: 'See the forecast and how a sunny day or rainy night may influence demand in your area.',
  },
  {
    icon: '/images/integrated-ai.svg',
    heading: 'Integrated AI',
    text: 'Ask ForeShift AI Pass questions to understand demand for your restaurant’s concept, location, and time of day.',
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
        <div className="problem-driving">
          <h3 className="problem-driving-title">Understand What&rsquo;s Driving Demand</h3>
          <p className="problem-driving-text">
            Your personalized dashboard brings weather, nearby events, and insights from ForeShift&rsquo;s patent-pending
            demand technology into one place. Explore an outlook tailored to your restaurant&rsquo;s concept and location,
            and ask AI Pass questions to help plan the shift ahead.
          </p>
        </div>
      </div>
    </div>
  )
}
