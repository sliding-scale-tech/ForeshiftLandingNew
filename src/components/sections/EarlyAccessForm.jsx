import { useRef, useState } from 'react'

// This Webflow form has no real backend (no `action`, method="get") — submitting it
// simulates Webflow's own static-form success toggle: hide the form, show
// `.success-message.w-form-done`, focus it. No fetch call.
export default function EarlyAccessForm() {
  const [submitted, setSubmitted] = useState(false)
  const doneRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'form_submission_success',
      form_id: 'wf-form-Contact-Form-2',
      form_type: 'webflow-native',
    })
    requestAnimationFrame(() => {
      doneRef.current?.focus()
    })
  }

  return (
    <div id="Form" className="f-section-large-3">
      <div className="f-contact-content">
        <div className="f-margin-bottom-68">
          <div className="f-title-wrapper-center-2">
            <div className="f-margin-bottom-67">
              <h1 className="f-h3-heading-3">
                Get Ahead of Next<span className="text-span-11"> Week</span>
              </h1>
            </div>
            <p className="f-paragraph-large-3">
              ForeShift is live in Detroit and opening more markets next. Tell us where you operate and we'll get
              you in, or put your city on the list.
            </p>
          </div>
        </div>
        <div className="form-block-2 w-form">
          {!submitted && (
            <form
              id="wf-form-Contact-Form-2"
              name="wf-form-Contact-Form-2"
              data-name="Contact Form"
              method="get"
              className="f-contact-form"
              data-wf-page-id="6aa935b3aacd1b5b9fc5d716"
              data-wf-element-id="27d1d181-7d0a-a57b-7593-b9dc2811bc00"
              onSubmit={handleSubmit}
            >
              <div className="f-margin-bottom-67">
                <label htmlFor="Email" className="f-field-label">
                  Work Email
                </label>
                <input
                  className="f-field-input w-input"
                  maxLength={256}
                  name="Email"
                  data-name="Email"
                  placeholder=""
                  type="email"
                  id="Email"
                  required
                />
              </div>
              <div className="f-margin-bottom-67">
                <label htmlFor="Phone-Number" className="f-field-label">
                  Your City
                </label>
                <input
                  className="f-field-input w-input"
                  maxLength={256}
                  name="Phone-Number"
                  data-name="Phone Number"
                  placeholder=""
                  type="tel"
                  id="Phone-Number"
                  required
                />
              </div>
              <div className="f-margin-bottom-67">
                <label htmlFor="Company-Name" className="f-field-label">
                  Restaurant Name <span className="text-span-42">(optional)</span>
                </label>
                <input
                  className="f-field-input w-input"
                  maxLength={256}
                  name="Company-Name"
                  data-name="Company Name"
                  placeholder=""
                  type="text"
                  id="Company-Name"
                  required
                />
              </div>
              <input type="submit" data-wait="Submitting..." className="f-button-neutral-2 w-button" value="Get early access" />
            </form>
          )}
          {submitted && (
            <div className="success-message w-form-done" tabIndex={-1} ref={doneRef}>
              <div className="text-block-12">Thank you! Your submission has been received!</div>
            </div>
          )}
          <div className="w-form-fail">
            <div>Oops! Something went wrong while submitting the form.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
