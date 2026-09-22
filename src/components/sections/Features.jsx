const cards = [
  {
    wrapperTarget: null,
    wrapperClass: 'featured-card-wrapper',
    imageFirst: false,
    titleTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","98746839-578f-50ee-2363-b3447e793966"],[]]]',
    title: (
      <>
        <span className="text-span-27">Real-world</span> signals shape the forecast.
      </>
    ),
    textTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","a17466c3-9942-6550-f519-0664ade9edae"],[]]]',
    text: 'ForeShift factors in nearby events and changing weather conditions to understand what’s actually influencing demand, so your forecast reflects what’s happening around your restaurant, not just historical averages.',
    btnContainerTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","ee9102ab-06fd-3043-825d-daea219f42dd"],[]]]',
    leftContainerClass: 'w-layout-blockcontainer featured-card-left-container w-container',
    imageTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","15d5c981-b5d1-e73b-8615-1d009566d220"],[]]]',
    imageSrc: '/images/ChatGPT-Image-Sep-15-2026-06_17_44-PM.avif',
    imageSrcSet:
      '/images/cd70bfa49f0b1a6648994eb547a79f0e_ChatGPT-Image-Sep-15-2026-06_17_44-PM-p-500.avif 500w, /images/cd70bfa49f0b1a6648994eb547a79f0e_ChatGPT-Image-Sep-15-2026-06_17_44-PM-p-800.avif 800w, /images/cd70bfa49f0b1a6648994eb547a79f0e_ChatGPT-Image-Sep-15-2026-06_17_44-PM-p-1080.avif 1080w, /images/ChatGPT-Image-Sep-15-2026-06_17_44-PM.avif 1254w',
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
        Built around where you <span className="text-span-28">Operate.</span>
      </>
    ),
    textTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","9200e114-d3c5-1be7-ace2-84bbd457067e"],[]]]',
    text: 'ForeShift adapts forecasts to your restaurant’s concept and local trade area, so a coffee shop, sports bar, or fine-dining venue isn’t treated the same, even within the same city.',
    btnContainerTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","543884fb-9ccf-8ad8-cfbe-7c30e3ef6ca4"],[]]]',
    leftContainerClass: 'w-layout-blockcontainer featured-card-left-container card2 w-container',
    imageTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","9200e114-d3c5-1be7-ace2-84bbd4570683"],[]]]',
    imageSrc: '/images/ChatGPT-Image-Sep-15-2026-08_23_12-PM-1.avif',
    imageSrcSet:
      '/images/ChatGPT-Image-Sep-15-2026-08_23_12-PM-1-p-500.avif 500w, /images/ChatGPT-Image-Sep-15-2026-08_23_12-PM-1-p-800.avif 800w, /images/ChatGPT-Image-Sep-15-2026-08_23_12-PM-1-p-1080.avif 1080w, /images/ChatGPT-Image-Sep-15-2026-08_23_12-PM-1.avif 1312w',
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
        Run every <span className="text-span-18">Shift</span> with fewer surprises.
      </>
    ),
    textTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","7eeae2a1-3bf1-0a4c-5351-39be08d006ca"],[]]]',
    text: 'ForeShift gives operators a clearer view of the week ahead, helping teams make better decisions around staffing, prep, hours, promotions, and event readiness before the shift arrives.',
    btnContainerTarget: null,
    leftContainerClass: 'w-layout-blockcontainer featured-card-left-container card3 w-container',
    imageTarget:
      '[[["6aa935b3aacd1b5b9fc5d716","7eeae2a1-3bf1-0a4c-5351-39be08d006cf"],[]]]',
    imageSrc: '/images/ChatGPT-Image-Sep-15-2026-08_31_28-PM-1.avif',
    imageSrcSet:
      '/images/ChatGPT-Image-Sep-15-2026-08_31_28-PM-1-p-500.avif 500w, /images/ChatGPT-Image-Sep-15-2026-08_31_28-PM-1-p-800.avif 800w, /images/ChatGPT-Image-Sep-15-2026-08_31_28-PM-1-p-1080.avif 1080w, /images/ChatGPT-Image-Sep-15-2026-08_31_28-PM-1.avif 1254w',
  },
]

function ImageBlock({ card }) {
  return (
    <div className="w-layout-blockcontainer featured-card-right-container w-container">
      <img
        src={card.imageSrc}
        loading="lazy"
        data-wf-target={card.imageTarget}
        sizes="(max-width: 767px) 100vw, (max-width: 991px) 95vw, 940px"
        alt=""
        srcSet={card.imageSrcSet}
        className="featured-card-image"
      />
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
