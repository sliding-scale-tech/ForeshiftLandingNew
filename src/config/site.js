// Single source of truth for shared content (nav, footer, links, assets).
// Components read from here — never hardcode these values elsewhere.

export const SECTIONS = [
  { label: 'Home', id: 'Hero-Section' },
  { label: 'Challenges', id: 'Challenge-Section' },
  { label: 'Features', id: 'Features-Section' },
  { label: 'How it Works', id: 'How-it-Works-Section' },
]

export const FOOTER_LINKS = [
  { label: 'Challenges', id: 'Challenge-Section' }, // fixed: source href says "Challenges-Section" (no such id exists — a typo present on the live Webflow site too), the real section id is "Challenge-Section"
  { label: 'Features', id: 'Features-Section' },
  { label: 'How it Works', id: 'How-it-Works-Section' },
]

// The product app lives on its own subdomain. Every CTA on this page ("Get Started", "Sign Up",
// "Try Now", "Explore in Action", "Try Yourself") sends a new visitor there — none of them are a
// "log in" link, so EXTERNAL.signUp is what they all use; EXTERNAL.signIn is kept for the day a
// returning-user link is added.
export const EXTERNAL = {
  signUp: 'https://app.foreshift.ai/sign-up',
  signIn: 'https://app.foreshift.ai/sign-in',
}

export const LOGO = {
  src: '/images/Foreshift_logo-dark1.avif',
  srcSet:
    '/images/Foreshift_logo-dark1-p-500.avif 500w, /images/Foreshift_logo-dark1-p-800.avif 800w, /images/Foreshift_logo-dark1.avif 1343w',
}

export const WF_PAGE_ID = '6aa935b3aacd1b5b9fc5d716'
export const WF_SITE_ID = '6aa935b1aacd1b5b9fc5d695'

export const SITE = {
  title: 'Foreshift - Restaurant Intelligence System',
  description:
    "ForeShift helps restaurants predict demand before each shift by combining historical performance with weather, local events, and operating conditions, so teams can plan staffing, prep, inventory, and service with greater confidence.",
}
