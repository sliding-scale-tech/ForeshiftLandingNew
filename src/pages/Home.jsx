import Hero from '../components/sections/Hero'
import Challenge from '../components/sections/Challenge'
import TestimonialSlider from '../components/sections/TestimonialSlider'
import Features from '../components/sections/Features'
import Integrations from '../components/sections/Integrations'
import HowItWorks from '../components/sections/HowItWorks'
import Pricing from '../components/sections/Pricing'
import CallToAction from '../components/sections/CallToAction'

export default function Home() {
  return (
    <>
      <Hero />
      <Challenge />
      <TestimonialSlider />
      <Features />
      <Integrations />
      <HowItWorks />
      <Pricing />
      <CallToAction />
    </>
  )
}
