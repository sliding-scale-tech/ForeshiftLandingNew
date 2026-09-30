import PageHero from './PageHero'

// Shared template for the 4 legal pages (Terms, Privacy, Refunds, Eligibility). Added for
// Stripe's website checklist (docs.stripe.com/get-started/checklist/website), which requires a
// privacy policy and fulfillment/refund/cancellation policies to be reachable on the site — none
// of this exists in the Webflow export or the live site. Content is adapted from the sibling
// ForeShift port's own legal pages (same real business — see that project's PORTING_RULES.md);
// the markup/CSS below is new, built to match THIS site's design system (its own Challenge-
// Section hero pattern + :root tokens), not copied from the sibling project's Webflow classes,
// which don't exist in this project's stylesheet.
export default function LegalPage({ title, subtitle, children }) {
  return (
    <>
      <PageHero title={title} subtitle={subtitle} />
      <div className="legal-body">
        <div className="legal-body-container">{children}</div>
      </div>
    </>
  )
}
