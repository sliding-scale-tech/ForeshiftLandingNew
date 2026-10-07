// Contact-form rules shared by the browser (inline errors) and the serverless function (the real
// gate). The server never trusts the client: it re-runs validateContact on the raw body.

export const LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMax: 254,
  restaurantMax: 100,
  messageMin: 20,
  messageMax: 2000,
}

export const TOPICS = ['General question', 'Pricing', 'Coverage or my city', 'Support', 'Partnership']

// Letters (any language), marks, spaces, apostrophes, periods and hyphens. No digits or symbols.
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M} .'’-]*$/u
// Pragmatic address check: one @, a dotted domain, no spaces or quotes. Not the full RFC.
const EMAIL_RE =
  /^[A-Za-z0-9.!#$%&*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/
// Control characters other than tab and newline (blocks header injection and invisible junk).
const CONTROL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/
const URLISH_RE = /(https?:\/\/|www\.)/gi

const clean = (v) => (typeof v === 'string' ? v.replace(/\r\n?/g, '\n').trim() : '')

export function validateContact(input) {
  const raw = input && typeof input === 'object' ? input : {}
  const values = {
    name: clean(raw.name).replace(/\s+/g, ' '),
    email: clean(raw.email),
    restaurant: clean(raw.restaurant).replace(/\s+/g, ' '),
    topic: clean(raw.topic),
    message: clean(raw.message),
  }
  const errors = {}

  for (const [key, val] of Object.entries(values)) {
    if (CONTROL_RE.test(val)) errors[key] = 'Contains characters we cannot accept.'
  }

  if (!errors.name) {
    if (values.name.length < LIMITS.nameMin) errors.name = 'Enter your name.'
    else if (values.name.length > LIMITS.nameMax) errors.name = `Keep your name under ${LIMITS.nameMax} characters.`
    else if (!NAME_RE.test(values.name)) errors.name = 'Use letters, spaces, apostrophes, periods or hyphens only.'
  }

  if (!errors.email) {
    if (!values.email) errors.email = 'Enter your email address.'
    else if (values.email.length > LIMITS.emailMax) errors.email = 'That email address is too long.'
    else if (!EMAIL_RE.test(values.email) || values.email.includes('..'))
      errors.email = 'Enter a valid email address, like name@example.com.'
  }

  if (!errors.restaurant && values.restaurant.length > LIMITS.restaurantMax) {
    errors.restaurant = `Keep this under ${LIMITS.restaurantMax} characters.`
  }

  if (!TOPICS.includes(values.topic)) errors.topic = 'Choose a topic.'

  if (!errors.message) {
    if (values.message.length < LIMITS.messageMin)
      errors.message = `Write at least ${LIMITS.messageMin} characters so we can help.`
    else if (values.message.length > LIMITS.messageMax)
      errors.message = `Keep your message under ${LIMITS.messageMax} characters.`
    else if ((values.message.match(URLISH_RE) || []).length > 2) errors.message = 'Please include no more than two links.'
  }

  return { ok: Object.keys(errors).length === 0, values, errors }
}
