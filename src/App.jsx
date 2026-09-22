import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Interactions from './animations/Interactions'
import Hero from './components/sections/Hero'
import Challenge from './components/sections/Challenge'
import TestimonialSlider from './components/sections/TestimonialSlider'
import Features from './components/sections/Features'
import Integrations from './components/sections/Integrations'
import HowItWorks from './components/sections/HowItWorks'
import EarlyAccessForm from './components/sections/EarlyAccessForm'

// Single-page site — mirrors the Webflow export's one `index.html`.
export default function App() {
  return (
    <>
      <Interactions />
      <Navbar />
      <section className="smooth-scroll">
        {/* a11y: page content sits in a <main> landmark (axe `landmark-one-main`). `main` is
            `display:block` in normalize.css with no other rules, and Footer stays a sibling
            outside it (not nested in main) so it keeps its own `contentinfo` landmark — same
            layout as before, zero pixel change, no effect on `.smooth-scroll`'s own CSS (which
            targets that class, not element depth) or Lenis (which drives scroll off the
            document, not this wrapper). */}
        <main>
          <Hero />
          <Challenge />
          <TestimonialSlider />
          <Features />
          <Integrations />
          <HowItWorks />
          <EarlyAccessForm />
        </main>
        <Footer />
      </section>
    </>
  )
}
