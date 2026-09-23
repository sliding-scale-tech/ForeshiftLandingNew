import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollManager from './components/ScrollManager'
import Interactions from './animations/Interactions'
import { ROUTES } from './config/site'
import Home from './pages/Home'

// Code-split: legal pages are lazy so their JS (react-router route code + content) doesn't add to
// Home's initial bundle — most visitors never load these, and Home is the page Lighthouse/LCP
// performance was tuned against.
const Terms = lazy(() => import('./pages/Terms'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Refunds = lazy(() => import('./pages/Refunds'))
const Eligibility = lazy(() => import('./pages/Eligibility'))

export default function App() {
  return (
    <>
      <ScrollManager />
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
          <Suspense fallback={null}>
            <Routes>
              <Route path={ROUTES.home} element={<Home />} />
              <Route path={ROUTES.terms} element={<Terms />} />
              <Route path={ROUTES.privacy} element={<Privacy />} />
              <Route path={ROUTES.refunds} element={<Refunds />} />
              <Route path={ROUTES.eligibility} element={<Eligibility />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </section>
    </>
  )
}
