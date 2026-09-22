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
        <Hero />
        <Challenge />
        <TestimonialSlider />
        <Features />
        <Integrations />
        <HowItWorks />
        <EarlyAccessForm />
        <Footer />
      </section>
    </>
  )
}
