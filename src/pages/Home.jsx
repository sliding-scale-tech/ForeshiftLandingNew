import Hero from '../components/sections/Hero'
import Challenge from '../components/sections/Challenge'
import ProblemExamples from '../components/sections/ProblemExamples'
import Features from '../components/sections/Features'
import Integrations from '../components/sections/Integrations'
import ProductOverview from '../components/sections/ProductOverview'
import Steps from '../components/sections/Steps'
import CoverageTeaser from '../components/sections/CoverageTeaser'
import Pricing from '../components/sections/Pricing'
import Faq from '../components/sections/Faq'
import CallToAction from '../components/sections/CallToAction'

export default function Home() {
  return (
    <>
      <Hero />
      <Challenge />
      <ProblemExamples />
      <Features />
      <Integrations />
      <ProductOverview />
      <Steps />
      <CoverageTeaser />
      <Pricing />
      <Faq />
      <CallToAction />
    </>
  )
}
