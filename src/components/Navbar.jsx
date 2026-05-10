import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = ['Home', 'Gallery', 'Services', 'About', 'Testimonials', 'FAQ', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (section) => {
    document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setActive(section)
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-gold-200 shadow-sm'
            : 'bg-transparent'
        }`}
        style={{ height: 90 }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo('Home')}
            whileHover={{ scale: 1.02 }}
            className="flex items-center"
          >
            <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', border: '2px solid #c9a84c' }}>
              <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.button>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollTo(link)}
                  className={`font-body text-xs tracking-widest uppercase transition-all duration-300 relative ${
                    active === link
                      ? scrolled ? 'text-gold-500' : 'text-gold-300'
                      : scrolled ? 'text-cake-ink hover:text-gold-500' : 'text-white/80 hover:text-gold-300'
                  }`}
                >
                  {link}
                  {active === link && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gold-500"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://wa.me/14034985666"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-xs tracking-widest uppercase font-semibold text-gray-900 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #f0d080, #c9a84c, #a8852a)' }}
            >
              <span>💬</span> Order Now
            </motion.a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            >
              <span className={`block w-5 h-px transition-all duration-300 ${scrolled ? 'bg-cake-ink' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-px transition-all duration-300 ${scrolled ? 'bg-cake-ink' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-px transition-all duration-300 ${scrolled ? 'bg-cake-ink' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[90px] left-0 right-0 z-40 backdrop-blur-xl border-b border-white/10"
            style={{ background: 'rgba(20,10,15,0.85)' }}
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link)}
                  className="font-display text-3xl italic text-left text-white/90 hover:text-gold-400 transition-colors"
                >
                  {link}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                href="https://wa.me/14034985666"
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-body text-sm tracking-widest uppercase font-semibold text-cake-ink"
                style={{ background: 'linear-gradient(135deg, #f0d080, #c9a84c, #a8852a)' }}
              >
                💬 Order on WhatsApp
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
