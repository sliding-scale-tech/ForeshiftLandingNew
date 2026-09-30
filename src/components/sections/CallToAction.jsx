// "See the demand ahead." section, between How it Works and the footer.
// Missing from the exported reference/original/index.html (the export was stale — this section
// was added to the live Webflow site after the export was taken, replacing the old Early Access
// form entirely) — ported by reading the live DOM at https://foreshift-v1-0-2f24de.webflow.io/.
// Its reveal animation is a Webflow COMPONENT-scoped IX3 interaction (id 77fe5cb1-d7b1-9585-f861-
// a1158ff54eb8) rather than a page-scoped one; data-w-id below is that component-instance id,
// used only to resolve the scroll-trigger's watch element (see scripts/extract-ix3.mjs).
import { CTA_LABEL, EXTERNAL } from '../../config/site'

export default function CallToAction() {
  return (
    <section className="call-to-action-wrapper" data-w-id="77fe5cb1-d7b1-9585-f861-a1158ff54eb8">
      <div className="customer-engagement-content">
        <h2 className="cta-title">
          See the <span className="text-span-26">demand ahead.</span>
        </h2>
        <p className="cta-text">
          Explore your restaurant&rsquo;s outlook and the local signals behind it.
        </p>
        <section className="cta-button-container">
          <a href={EXTERNAL.signUp} target="_blank" rel="noopener" className="cta-button w-button">
            {CTA_LABEL}
          </a>
        </section>
      </div>
    </section>
  )
}
