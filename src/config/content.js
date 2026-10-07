// Page copy that more than one place needs (home sections, dedicated pages, JSON-LD). Every claim
// here is taken from what the product/legal pages already state, see the notes on each block.
import { EXTERNAL, ROUTES } from './site'

// Pricing, identical to the legal pages (Terms §4, fulfillment policy): USD, billed monthly, each
// tier includes the one below it.
export const TIERS = [
  {
    name: 'Event Intelligence',
    tagline: 'Know your city.',
    price: 99,
    features: [
      'Weather forecast for the week',
      'Sports: all Detroit teams',
      'Concerts, tradeshows, festivals, 5Ks',
      'Demand signal per event for your zone',
      'Thirty seconds to start: zone and type only',
    ],
  },
  {
    name: 'Dynamic Scheduling',
    tagline: 'Know your schedule.',
    price: 199,
    features: [
      'Everything in Event Intelligence',
      'Shift-level staffing recommendations',
      'Estimated covers per daypart',
      'Server and kitchen crew counts',
      'Revenue estimate per shift',
    ],
  },
  {
    name: 'Sales Forecasting',
    tagline: 'Know your numbers.',
    price: 299,
    features: [
      'Everything in Dynamic Scheduling',
      'Thirty-day forward revenue projection',
      'POS or CSV historical data upload',
      'Variance tracking: predicted vs actual',
      'Market intelligence for expansion',
    ],
  },
]

// Coverage, the fulfillment policy says "Detroit, Michigan is the only market available today".
// Concept types: the app's own list (confirmed from its concept table). A venue must have a Detroit
// address to use the app.
export const COVERAGE = {
  markets: [{ name: 'Detroit, Michigan', status: 'Available now' }],
  concepts: [
    'Breakfast / Brunch Cafe',
    'Casual Dining',
    'Cocktail Lounge',
    'Coffee Shop',
    'Fast Casual',
    'Fine Dining',
    'Neighborhood / Casual Bar',
    'Sports Bar',
    'Upscale Casual',
  ],
}

export const STEPS = [
  {
    title: 'Add your location and concept',
    text: 'Enter your Detroit restaurant’s address and choose your concept type, so ForeShift can place you in the right part of the city.',
  },
  {
    title: 'Set your operating hours',
    text: 'Tell us when you’re open, so the outlook is organized around the service periods you actually run.',
  },
  {
    title: 'Explore your demand outlook',
    text: 'See expected demand by day and service period, and the weather and nearby events behind it.',
  },
]

// Answers are plain strings on purpose: they also feed the FAQPage JSON-LD, which must match the
// visible text exactly. `more` renders as a link under the answer.
export const FAQ = [
  {
    q: 'Do I need a POS connection?',
    a: 'No. ForeShift works from your address, concept type and operating hours, plus weather and nearby-event data. Uploading a POS export or CSV is optional, and only adds the revenue projections and predicted-versus-actual tracking in the Sales Forecasting plan.',
    more: { label: 'How insights work without a POS', to: ROUTES.noPos },
  },
  {
    q: 'What does ForeShift forecast?',
    a: 'ForeShift forecasts expected demand for your concept type in your part of the city, by day and service period, along with the weather and event signals behind it. It is an outlook for your area, not a prediction of your own restaurant’s sales or covers.',
    more: { label: 'See how it works', to: ROUTES.howItWorks },
  },
  {
    q: 'How do weather and events affect the outlook?',
    a: 'Forecast weather and nearby events, such as sports, concerts, festivals and tradeshows, are among the signals behind the outlook. A large event close to you or a rainy evening may move expected demand up or down. ForeShift shows what is behind each outlook so you can weigh it against your own experience.',
  },
  {
    q: 'How does AI help?',
    a: 'AI explains the demand outlook in plain language, helping you understand what may drive a busy or quiet period for your restaurant. An optional AI Intelligence Pass also lets you ask questions about your forecasts in plain English. The forecast itself comes from the demand model; AI explains it.',
  },
  {
    q: 'Where is ForeShift available?',
    a: 'ForeShift is available today in Detroit, Michigan, and you need a Detroit address to use it. We list a market only once it is supported, and we do not offer nationwide coverage yet.',
    more: { label: 'See coverage', to: ROUTES.coverage },
  },
  {
    q: 'What does it cost?',
    a: 'Plans are billed monthly in US dollars: Event Intelligence is $99, Dynamic Scheduling is $199 and Sales Forecasting is $299. Each plan includes everything in the one below it, and you can cancel at any time.',
    more: { label: 'See pricing', to: ROUTES.pricing },
  },
]

export const SIGN_UP = EXTERNAL.signUp
