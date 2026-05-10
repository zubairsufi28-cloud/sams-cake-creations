import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Services from './components/Services'
import About from './components/About'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

const Admin = lazy(() => import('./pages/Admin'))

function PublicSite() {
  return (
    <div className="grain" style={{ margin: 0, padding: 0 }}>
      <Navbar />
      <main style={{ margin: 0, padding: 0 }}>
        <Hero />
        <Gallery />
        <Services />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <Suspense fallback={<div className="min-h-[100dvh] bg-cake-bg flex items-center justify-center font-body text-cake-muted">Loading…</div>}>
            <Admin />
          </Suspense>
        }
      />
      <Route path="/" element={<PublicSite />} />
    </Routes>
  )
}
