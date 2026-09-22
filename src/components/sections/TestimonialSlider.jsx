import useWebflowSlider from './useWebflowSlider'

// Webflow native slider (`data-animation="slide"`, 2 slides x 2 cards). Behaviour: useWebflowSlider,
// a port of webflow.js's slider module (tram-based transitions, infinite wrap, a11y attrs).

const SLIDES = [
  [
    {
      icon: '/images/calendar-error_17628454.png',
      cardClass: ' polymer-card',
      headingClass: 'polymergpt-heading',
      heading: 'An event you didn’t account for.',
      text: 'A normal night suddenly becomes anything but normal.',
    },
    {
      icon: '/images/transport_14632509.png',
      headingClass: 'chemical--heading',
      heading: (
        <>
          Too little inventory.
          <br />
        </>
      ),
      text: 'You run out when customers actually want to buy.',
    },
  ],
  [
    {
      icon: '/images/fermented_13195522.png',
      headingClass: 'chemical--heading',
      heading: 'Too much prep.',
      text: 'Food, time and margin go to waste.',
    },
    {
      icon: '/images/work-time_18741883.png',
      headingClass: 'chemical--heading',
      heading: 'Too little staff during a rush.',
      text: 'Service slows down exactly when demand is highest.',
    },
  ],
]

const ARROW_PATHS = {
  left: 'M11.828 12.0001L14.657 14.8281L13.243 16.2431L9 12.0001L13.243 7.75708L14.657 9.17208L11.828 12.0001Z',
  right: 'M12.1718 12.0001L9.34277 9.17208L10.7568 7.75708L14.9998 12.0001L10.7568 16.2431L9.34277 14.8281L12.1718 12.0001Z',
}

function ArrowIcon({ path }) {
  return (
    <div className="f-icon-regular w-embed">
      <svg width="420" height="420" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={path} fill="currentColor"></path>
      </svg>
    </div>
  )
}

export default function TestimonialSlider() {
  const { rootProps, maskProps, liveProps, leftProps, rightProps, dots } = useWebflowSlider(0)
  return (
    <div className="f-section-regular">
      <div className="f-testimonial-background"></div>
      <div className="f-container-large">
        <div
          data-delay="4000"
          data-animation="slide"
          className="f-testimonial-slider-regular w-slider"
          data-autoplay="false"
          data-easing="ease"
          data-hide-arrows="false"
          data-disable-swipe="false"
          data-autoplay-limit="0"
          data-nav-spacing="3"
          data-duration="500"
          data-infinite="true"
          {...rootProps}
        >
          <div className="f-testimonial-mask w-slider-mask" {...maskProps}>
            {SLIDES.map((cards, i) => (
              <div key={i} className="w-slide">
                <div className="w-layout-grid f-testimonial-slider-grid-large">
                  {cards.map(({ icon, cardClass = '', headingClass, heading, text }) => (
                    <div key={icon} className={`f-testimonial-card${cardClass}`}>
                      <img src={icon} loading="lazy" width="60" alt="" className="image-5" />
                      <p className={`f-paragraph-small-2 ${headingClass}`}>{heading}</p>
                      <p className="f-paragraph-small-2">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div {...liveProps}></div>
          </div>
          <div className="f-testimonial-l-arrow w-slider-arrow-left" {...leftProps}>
            <ArrowIcon path={ARROW_PATHS.left} />
          </div>
          <div className="f-testimonial-r-arrow w-slider-arrow-right" {...rightProps}>
            <ArrowIcon path={ARROW_PATHS.right} />
          </div>
          <div className="f-slide-nav-hidden w-slider-nav w-round">
            {dots.map(({ key, ...dot }) => (
              <div key={key} {...dot}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
