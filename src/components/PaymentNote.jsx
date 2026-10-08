import { CARD_BRANDS } from '../config/site'

// Stripe website checklist: say how payment data is handled and show the cards accepted.
// Statement mirrors the Privacy Policy ("handled by Stripe ... We never receive or store your full
// card number"). The chips are plain text labels, not brand logos; swap in the networks' official
// marks (per their brand guidelines) if you want logos.
export default function PaymentNote({ showCards = true, className = '' }) {
  return (
    <div className={`payment-note ${className}`.trim()}>
      <p className="payment-note-text">
        Payments are processed securely by Stripe. ForeShift never sees or stores your full card number.
      </p>
      {showCards && (
        <ul className="payment-cards" aria-label="Accepted cards">
          {CARD_BRANDS.map((b) => (
            <li key={b} className="payment-card-chip">{b}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
