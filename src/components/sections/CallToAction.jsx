// "Plan ahead with Confidence." section, between How it Works and the footer.
// Missing from the exported reference/original/index.html (the export was stale — this section
// was added to the live Webflow site after the export was taken, replacing the old Early Access
// form entirely) — ported by reading the live DOM at https://foreshift-v1-0-2f24de.webflow.io/.
// Its reveal animation is a Webflow COMPONENT-scoped IX3 interaction (id 77fe5cb1-d7b1-9585-f861-
// a1158ff54eb8) rather than a page-scoped one; data-w-id below is that component-instance id,
// used only to resolve the scroll-trigger's watch element (see scripts/extract-ix3.mjs).
export default function CallToAction() {
  return (
    <section className="call-to-action-wrapper" data-w-id="77fe5cb1-d7b1-9585-f861-a1158ff54eb8">
      <div className="customer-engagement-content">
        <h2 className="cta-title">
          Plan ahead with <span className="text-span-26">Confidence.</span>
        </h2>
        <p className="cta-text">
          ForeShift turns tomorrow&rsquo;s demand into a clearer plan for staffing, prep, inventory, and
          service.
        </p>
        <section className="cta-button-container">
          <a href="#" className="cta-button w-button">
            Try Yourself
          </a>
        </section>
      </div>
    </section>
  )
}
