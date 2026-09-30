// Native <details> accordion: works without JS, keyboard-accessible, and every answer is in the
// DOM (and the prerendered HTML) so crawlers and screen readers see it all.
import { Link } from 'react-router-dom'

export default function FaqList({ items }) {
  return (
    <div className="faq-list">
      {items.map(({ q, a, more }) => (
        <details key={q} className="faq-item">
          <summary className="faq-question">{q}</summary>
          <div className="faq-answer">
            <p>{a}</p>
            {more && (
              <Link to={more.to} className="info-link">
                {more.label}
              </Link>
            )}
          </div>
        </details>
      ))}
    </div>
  )
}
