const cards = [
  {
    wrapperTarget: null,
    wrapperClass: 'featured-card-wrapper',
    imageFirst: false,
    titleTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","98746839-578f-50ee-2363-b3447e793966"],[]]]',
    title: (
      <>
        Better Staffing <span className="text-span-27">Decisions</span>
      </>
    ),
    textTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","a17466c3-9942-6550-f519-0664ade9edae"],[]]]',
    text: 'Use your demand outlook to plan staffing with greater confidence, helping reduce the risk of overstaffing or being caught short during a busy shift.',
    imageAlt: 'Illustration: weather, events and holidays feeding into tomorrow’s demand outlook',
    btnContainerTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","ee9102ab-06fd-3043-825d-daea219f42dd"],[]]]',
    leftContainerClass: 'w-layout-blockcontainer featured-card-left-container w-container',
    imageTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","15d5c981-b5d1-e73b-8615-1d009566d220"],[]]]',
    imageSrc: '/images/Better%20_Staffing%20_Decisions.svg',
    // Match the corner radius baked into the "Better Data" SVG (rx 130 / 1200 wide ≈ 10.83% of width);
    // vertical % scaled by this image's 1536×1024 aspect so the corners stay circular.
    imageStyle: { borderRadius: '10.83% / 16.25%' },
  },
  {
    wrapperTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","9200e114-d3c5-1be7-ace2-84bbd4570678"],[]]]',
    wrapperClass: 'featured-card-wrapper',
    imageFirst: true,
    titleTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","9200e114-d3c5-1be7-ace2-84bbd457067c"],[]]]',
    title: (
      <>
        Better Data. <span className="text-span-28">Better Insight.</span>
      </>
    ),
    textTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","9200e114-d3c5-1be7-ace2-84bbd457067e"],[]]]',
    text: 'Compare your demand outlook with actual activity at your restaurant. Foreshift tracks patterns over time to better understand how local demand translates into business at your location.',
    imageAlt: 'Illustration: a weekly demand outlook built from weather, events and local context',
    btnContainerTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","543884fb-9ccf-8ad8-cfbe-7c30e3ef6ca4"],[]]]',
    leftContainerClass: 'w-layout-blockcontainer featured-card-left-container card2 w-container',
    imageTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","9200e114-d3c5-1be7-ace2-84bbd4570683"],[]]]',
    imageSrc: '/images/Better_Data_Better%20_Insight.svg',
    // Same radius as card 1, vertical % scaled by this image's 1479×1064 aspect.
    imageStyle: { borderRadius: '10.83% / 15.06%' },
  },
  {
    wrapperTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","7eeae2a1-3bf1-0a4c-5351-39be08d006c4"],[]]]',
    wrapperClass: 'featured-card-wrapper',
    imageFirst: false,
    titleTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","7eeae2a1-3bf1-0a4c-5351-39be08d006c8"],[]]]',
    title: (
      <>
        Turn Local Demand into <span className="text-span-18">Opportunity.</span>
      </>
    ),
    textTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","7eeae2a1-3bf1-0a4c-5351-39be08d006ca"],[]]]',
    text: 'See when nearby events and local activity may create opportunities for your concept. Use those insights to plan promotions, adjust hours, and attract more of the customers around you.',
    imageAlt: 'Illustration: a next-shift demand outlook next to the previous day',
    btnContainerTarget: null,
    leftContainerClass: 'w-layout-blockcontainer featured-card-left-container card3 w-container',
    imageTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","7eeae2a1-3bf1-0a4c-5351-39be08d006cf"],[]]]',
    imageSrc: '/images/Turn%20_Local%20_Demand%20_into%20_Opportunity.svg',
    // Same radius as card 1, vertical % scaled by this image's 1600×1062 aspect.
    imageStyle: { borderRadius: '10.83% / 16.32%' },
  },
]

function ImageBlock({ card }) {
  return (
    <div className="w-layout-blockcontainer featured-card-right-container w-container">
      <img
        src={card.imageSrc}
        loading="lazy"
        data-wf-target={card.imageTarget}
        alt={card.imageAlt}
        className="featured-card-image"
        style={card.imageStyle}
      />
      <p className="illustration-caption">Illustrative example.</p>
    </div>
  )
}

function TextBlock({ card }) {
  return (
    <div className={card.leftContainerClass}>
      <h3 data-wf-target={card.titleTarget} className="featured-card-title">
        {card.title}
      </h3>
      <p data-wf-target={card.textTarget} className="featured-card-text">
        {card.text}
      </p>
      {card.btnContainerTarget !== null && (
        <section data-wf-target={card.btnContainerTarget} className="btn-container"></section>
      )}
    </div>
  )
}

export default function Features() {
  return (
    <section id="Features-Section" className="featured-wrapper">
      <section
        data-wf-target='[[["6aa935b3aacd1b5b9fc5d716","88bf6f3c-090b-0b9c-a91e-dfedf485d5ea"],[]]]'
        className="featured-card-container"
      >
        {cards.map((card, i) =>
          card.wrapperTarget === null ? (
            <div key={i} className={card.wrapperClass}>
              {card.imageFirst ? (
                <>
                  <ImageBlock card={card} />
                  <TextBlock card={card} />
                </>
              ) : (
                <>
                  <TextBlock card={card} />
                  <ImageBlock card={card} />
                </>
              )}
            </div>
          ) : (
            <div key={i} data-wf-target={card.wrapperTarget} className={card.wrapperClass}>
              {card.imageFirst ? (
                <>
                  <ImageBlock card={card} />
                  <TextBlock card={card} />
                </>
              ) : (
                <>
                  <TextBlock card={card} />
                  <ImageBlock card={card} />
                </>
              )}
            </div>
          )
        )}
      </section>
    </section>
  )
}
