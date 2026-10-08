import { useEffect, useRef, useState } from 'react'
import PageHero from '../components/PageHero'
import { CONTACT_LINKS } from '../config/site'
import { LIMITS, TOPICS, validateContact } from '../../shared/contact'

const EMPTY = { name: '', email: '', restaurant: '', topic: '', message: '', website: '' }

function Field({ id, label, optional, error, hint, children }) {
  return (
    <div className="contact-field">
      <label htmlFor={id} className="contact-label">
        {label}
        {optional && <span className="contact-optional"> (optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="contact-hint">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="contact-error">
          {error}
        </p>
      )}
    </div>
  )
}

// Custom dropdown: a native <select> popup is drawn by the OS and cannot be styled. Same semantics:
// button + listbox, arrow keys, Home/End, Enter/Space to pick, Escape to close, type-ahead by letter.
function TopicSelect({ id, value, onChange, onBlur, invalid, describedBy }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const wrap = useRef(null)

  useEffect(() => {
    if (!open) return
    const away = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', away)
    return () => document.removeEventListener('mousedown', away)
  }, [open])

  const openList = () => {
    setActive(Math.max(0, TOPICS.indexOf(value)))
    setOpen(true)
  }
  const pick = (i) => {
    onChange(TOPICS[i])
    setOpen(false)
  }
  const onKeyDown = (e) => {
    if (e.key === 'Escape') return open && (e.preventDefault(), setOpen(false))
    if (e.key === 'Tab') return setOpen(false)
    const moves = { ArrowDown: 1, ArrowUp: -1 }
    if (e.key in moves || e.key === 'Home' || e.key === 'End') {
      e.preventDefault()
      if (!open) return openList()
      setActive((a) => (e.key === 'Home' ? 0 : e.key === 'End' ? TOPICS.length - 1 : (a + moves[e.key] + TOPICS.length) % TOPICS.length))
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (open) pick(active)
      else openList()
    } else if (e.key.length === 1) {
      const i = TOPICS.findIndex((t) => t.toLowerCase().startsWith(e.key.toLowerCase()))
      if (i >= 0 && open) setActive(i)
      else if (i >= 0) onChange(TOPICS[i])
    }
  }

  return (
    <div className="contact-select" ref={wrap}>
      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        aria-invalid={invalid ? 'true' : undefined}
        aria-describedby={describedBy}
        className={`contact-input contact-select-button${value ? '' : ' is-placeholder'}`}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      >
        <span>{value || 'Choose a topic'}</span>
        <svg className="contact-select-chevron" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul id={`${id}-list`} role="listbox" aria-label="Topic" className="contact-select-list">
          {TOPICS.map((t, i) => (
            <li
              key={t}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={t === value}
              className={`contact-select-option${i === active ? ' is-active' : ''}${t === value ? ' is-selected' : ''}`}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => pick(i)}
            >
              <span>{t}</span>
              {t === value && (
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8.5l3.2 3.2L13 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed
  const [serverError, setServerError] = useState('')

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }))
  const blur = (key) => () => {
    const { errors: found } = validateContact(values)
    setErrors((prev) => ({ ...prev, [key]: found[key] }))
  }
  const aria = (key, hint) => ({
    'aria-invalid': errors[key] ? 'true' : undefined,
    'aria-describedby': errors[key] ? `${key}-error` : hint ? `${key}-hint` : undefined,
  })

  async function onSubmit(e) {
    e.preventDefault()
    if (status === 'sending') return
    const result = validateContact(values)
    setErrors(result.errors)
    if (!result.ok) {
      document.getElementById(Object.keys(result.errors)[0])?.focus()
      return
    }
    setStatus('sending')
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...result.values, website: values.website }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setStatus('sent')
        setValues(EMPTY)
        return
      }
      if (res.status === 422 && data.errors) setErrors(data.errors)
      setServerError(data.error || 'We could not send your message. Please email us directly.')
      setStatus('failed')
    } catch {
      setServerError('We could not reach the server. Check your connection or email us directly.')
      setStatus('failed')
    }
  }

  return (
    <>
      <PageHero
        title={
          <>
            Contact <span className="text-span-4">us</span>
          </>
        }
        subtitle="Questions about ForeShift, pricing or coverage? Send us a message and we will reply by email."
      />

      <section className="info-section">
        <div className="info-container contact-layout">
          {status === 'sent' ? (
            <div className="info-card contact-success" role="status">
              <h2 className="info-card-title">Message sent</h2>
              <p className="info-card-text">
                Thank you. We have your message and will reply to the email address you gave us.
              </p>
              <button type="button" className="contact-us w-button" onClick={() => setStatus('idle')}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="info-card contact-form" onSubmit={onSubmit} noValidate>
              <Field id="name" label="Your name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={LIMITS.nameMax}
                  className="contact-input"
                  value={values.name}
                  onChange={set('name')}
                  onBlur={blur('name')}
                  {...aria('name')}
                />
              </Field>

              <Field id="email" label="Email address" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  maxLength={LIMITS.emailMax}
                  className="contact-input"
                  value={values.email}
                  onChange={set('email')}
                  onBlur={blur('email')}
                  {...aria('email')}
                />
              </Field>

              <Field id="restaurant" label="Restaurant name" optional error={errors.restaurant}>
                <input
                  id="restaurant"
                  name="restaurant"
                  type="text"
                  autoComplete="organization"
                  maxLength={LIMITS.restaurantMax}
                  className="contact-input"
                  value={values.restaurant}
                  onChange={set('restaurant')}
                  onBlur={blur('restaurant')}
                  {...aria('restaurant')}
                />
              </Field>

              <Field id="topic" label="Topic" error={errors.topic}>
                <TopicSelect
                  id="topic"
                  value={values.topic}
                  onChange={(v) => {
                    setValues((s) => ({ ...s, topic: v }))
                    setErrors((er) => ({ ...er, topic: undefined }))
                  }}
                  onBlur={blur('topic')}
                  invalid={!!errors.topic}
                  describedBy={errors.topic ? 'topic-error' : undefined}
                />
              </Field>

              <Field
                id="message"
                label="Message"
                error={errors.message}
                hint={`${values.message.length} of ${LIMITS.messageMax} characters. Please do not include passwords or card details.`}
              >
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  maxLength={LIMITS.messageMax}
                  className="contact-input contact-textarea"
                  value={values.message}
                  onChange={set('message')}
                  onBlur={blur('message')}
                  {...aria('message', true)}
                />
              </Field>

              {/* Honeypot: hidden from people and assistive tech; bots fill it and are dropped server-side. */}
              <div className="contact-trap" aria-hidden="true">
                <label htmlFor="website">Leave this field empty</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={set('website')}
                />
              </div>

              {status === 'failed' && (
                <p className="contact-alert" role="alert">
                  {serverError}
                </p>
              )}

              <button type="submit" className="get-started w-button contact-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send message'}
              </button>
            </form>
          )}

          <aside className="info-card contact-aside">
            <h2 className="info-card-title">Prefer to reach us directly?</h2>
            <p className="info-card-text">Call or write to us and we will get back to you.</p>
            <ul className="contact-emails">
              {CONTACT_LINKS.map((c) => (
                <li key={c.href}>
                  <a href={c.href} className="info-link">
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  )
}
