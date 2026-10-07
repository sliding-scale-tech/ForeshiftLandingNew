// Single source of truth for shared content (nav, footer, links, assets).
// Components read from here — never hardcode these values elsewhere.

export const ROUTES = {
  home: '/',
  howItWorks: '/how-it-works',
  noPos: '/demand-insights-without-pos',
  coverage: '/coverage',
  pricing: '/pricing',
  contact: '/contact',
  terms: '/terms-and-conditions',
  privacy: '/privacy-policy',
  refunds: '/refunds-cancellation',
  eligibility: '/eligibility-restrictions',
}

// Client review (Marketing Page Design Review & Feedback): nav is Product · How it works · Coverage ·
// FAQ · Contact us · Sign in · Get started. `to` is a route, optionally with a #section — every link lands on a
// real destination.
export const NAV_LINKS = [
  { label: 'Product', to: `${ROUTES.home}#Product-Section` },
  { label: 'How it works', to: ROUTES.howItWorks },
  { label: 'Coverage', to: ROUTES.coverage },
  { label: 'FAQ', to: `${ROUTES.home}#FAQ-Section` },
  { label: 'Contact us', to: ROUTES.contact },
]

export const FOOTER_LINKS = [
  { label: 'Product', to: `${ROUTES.home}#Product-Section` },
  { label: 'How it works', to: ROUTES.howItWorks },
  { label: 'Demand insights without a POS', to: ROUTES.noPos },
  { label: 'Coverage', to: ROUTES.coverage },
  { label: 'Pricing', to: ROUTES.pricing },
  { label: 'FAQ', to: `${ROUTES.home}#FAQ-Section` },
  { label: 'Contact us', to: ROUTES.contact },
]

// Added for Stripe's website checklist (docs.stripe.com/get-started/checklist/website) —
// customer-service contact info and links to the fulfillment/privacy policies it requires. These
// pages don't exist in the Webflow export/live site at all; content is adapted from the sibling
// ForeShift port's own legal pages (same real business), restyled to this site's design system.
export const LEGAL_LINKS = [
  { label: 'Terms & Conditions', to: ROUTES.terms },
  { label: 'Privacy Policy', to: ROUTES.privacy },
  { label: 'Refunds & Cancellations', to: ROUTES.refunds },
  { label: 'Eligibility & Restrictions', to: ROUTES.eligibility },
]

export const CONTACT_LINKS = [
  { label: '(888)2345-6789', href: 'tel:+18882345689' }, // placeholder digits, same as the sibling port — this is template contact info, not a real ForeShift number
  { label: 'support@foreshift.ai', href: 'mailto:support@foreshift.ai' },
  { label: 'hello@foreshift.ai', href: 'mailto:hello@foreshift.ai' },
]

// The product app lives on its own subdomain. Every "Get started" CTA sends a new visitor to
// EXTERNAL.signUp; the navbar's "Sign in" link uses EXTERNAL.signIn.
export const EXTERNAL = {
  signUp: 'https://app.foreshift.ai/sign-up',
  signIn: 'https://app.foreshift.ai/sign-in',
  sampleOutlook: 'https://app.foreshift.ai/sample-outlook',
}

export const LOGO = {
  src: '/images/Foreshift_logo-dark1.avif',
  srcSet:
    '/images/Foreshift_logo-dark1-p-500.avif 500w, /images/Foreshift_logo-dark1-p-800.avif 800w, /images/Foreshift_logo-dark1.avif 1343w',
}

export const WF_PAGE_ID = '6aa935b3aacd1b5b9fc5d716'
export const WF_SITE_ID = '6aa935b1aacd1b5b9fc5d695'

export const SITE = {
  title: 'ForeShift | Restaurant Demand Intelligence',
  description:
    'Understand expected restaurant demand with insights tailored to your concept and location, informed by weather and nearby events. No POS connection required.',
}

// Single label for every signup CTA (client review: "Get started" consistently).
export const CTA_LABEL = 'Get started'

// Production origin — canonical URLs and the sitemap are built from this. The legal pages already
// state the site lives at foreshift.ai. Override with VITE_SITE_URL only if production moves.
export const SITE_URL = (import.meta.env?.VITE_SITE_URL || 'https://foreshift.ai').replace(/\/$/, '')

// Per-route <title>/description, used by <Seo> on the client and by scripts/prerender.mjs to bake
// the right head into each route's static HTML. Add an entry here for every new page.
export const PAGE_META = {
  [ROUTES.home]: { title: SITE.title, description: SITE.description },
  [ROUTES.howItWorks]: {
    title: 'How ForeShift Works | ForeShift',
    description:
      'Add your location and concept, set your operating hours, and explore a demand outlook shaped by weather and nearby events. No POS connection required.',
  },
  [ROUTES.noPos]: {
    title: 'Demand Insights Without a POS Connection | ForeShift',
    description:
      'See what ForeShift needs to forecast restaurant demand, and why it works without a POS connection. A POS export or CSV upload is optional.',
  },
  [ROUTES.coverage]: {
    title: 'Coverage and Supported Markets | ForeShift',
    description:
      'Where ForeShift is available, which restaurant concepts it supports, and what happens if your address is outside a supported market.',
  },
  [ROUTES.pricing]: {
    title: 'Pricing | ForeShift',
    description:
      'ForeShift plans start at $99 per month, billed monthly in US dollars. Compare Event Intelligence, Dynamic Scheduling and Sales Forecasting.',
  },
  [ROUTES.contact]: {
    title: 'Contact Us | ForeShift',
    description: 'Questions about ForeShift, pricing or coverage? Send us a message and we will reply by email.',
  },
  [ROUTES.terms]: {
    title: 'Terms and Conditions | ForeShift',
    description: 'The terms that govern your use of the ForeShift website and product.',
  },
  [ROUTES.privacy]: {
    title: 'Privacy Policy | ForeShift',
    description: 'How ForeShift collects, uses and protects your information.',
  },
  [ROUTES.refunds]: {
    title: 'Refunds and Cancellations | ForeShift',
    description: 'ForeShift refund, cancellation and billing conditions.',
  },
  [ROUTES.eligibility]: {
    title: 'Eligibility and Restrictions | ForeShift',
    description: 'Who can use ForeShift and where it is available.',
  },
}
