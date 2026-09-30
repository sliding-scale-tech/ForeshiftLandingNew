import FaqList from '../FaqList'
import { FAQ } from '../../config/content'

export default function Faq() {
  return (
    <section id="FAQ-Section" className="info-section">
      <div className="info-container info-container--narrow">
        <h2 className="info-heading">
          Frequently asked <span className="text-span-19">questions.</span>
        </h2>
        <FaqList items={FAQ} />
      </div>
    </section>
  )
}
