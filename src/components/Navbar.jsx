import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

const NAV_LINKS = ['Home', 'Gallery', 'Services', 'About', 'Testimonials', 'FAQ', 'Contact']
const ADMIN_PASSWORD = 'Sam2024Admin'

export default function Navbar() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('Home')
  const [adminModalOpen, setAdminModalOpen] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [adminError, setAdminError] = useState('')

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

  const openAdminModal = () => {
    setAdminModalOpen(true)
    setAdminPassword('')
    setAdminError('')
    setMenuOpen(false)
  }

  const closeAdminModal = () => {
    setAdminModalOpen(false)
    setAdminPassword('')
    setAdminError('')
  }

  const handleAdminSubmit = (e) => {
    e.preventDefault()
    if (adminPassword === ADMIN_PASSWORD) {
      closeAdminModal()
      navigate('/admin')
    } else {
      setAdminError('Incorrect password')
    }
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
          <div className="flex items-center gap-2 md:gap-4">
            <motion.button
              type="button"
              onClick={openAdminModal}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-2 font-body text-[10px] tracking-widest uppercase transition-colors md:px-3.5 md:py-2.5 md:text-xs ${
                scrolled
                  ? 'border-cake-line/80 text-cake-muted hover:border-gold-400/50 hover:text-gold-700 bg-white/40'
                  : 'border-white/35 text-white/75 hover:border-gold-300/60 hover:text-gold-200 bg-white/5'
              }`}
              aria-haspopup="dialog"
              aria-expanded={adminModalOpen}
            >
              <span className="text-sm leading-none" aria-hidden>
                🔒
              </span>
              <span className="hidden sm:inline">Admin</span>
            </motion.button>

            <motion.a
              href="https://wa.me/14034985666"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-xs tracking-widest uppercase font-semibold text-white transition-all duration-300"
              style={{ background: '#25D366' }}
            >
              <FaWhatsapp size={18} className="shrink-0" aria-hidden />
              Order Now
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
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                onClick={openAdminModal}
                className="mt-2 w-full rounded-full border border-white/25 bg-white/5 px-6 py-3 font-body text-xs tracking-widest uppercase text-white/80 hover:border-gold-400/40 hover:text-gold-200 transition-colors"
              >
                🔒 Admin
              </motion.button>
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                href="https://wa.me/14034985666"
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-body text-sm tracking-widest uppercase font-semibold text-white"
                style={{ background: '#25D366' }}
              >
                <FaWhatsapp size={20} className="shrink-0" aria-hidden />
                Order on WhatsApp
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin password modal */}
      <AnimatePresence>
        {adminModalOpen ? (
          <motion.div
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            style={{ background: 'rgba(42, 10, 24, 0.55)' }}
            onClick={closeAdminModal}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="admin-modal-title"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-3xl border border-cake-line bg-cake-card p-8 shadow-2xl"
              style={{ boxShadow: '0 24px 80px rgba(245, 192, 213, 0.25)' }}
            >
              <button
                type="button"
                onClick={closeAdminModal}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-cake-line text-cake-muted transition hover:border-gold-400 hover:text-cake-ink"
                aria-label="Close"
              >
                ×
              </button>
              <div className="mb-6 flex items-center justify-center gap-2">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold-400" />
                <span className="text-lg" aria-hidden>
                  🔒
                </span>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold-400" />
              </div>
              <h2 id="admin-modal-title" className="font-display text-center text-2xl italic font-bold text-cake-ink mb-1">
                Admin
              </h2>
              <p className="font-body text-center text-xs text-cake-muted mb-6 tracking-wide">Enter password to continue</p>
              <form onSubmit={handleAdminSubmit} className="flex flex-col gap-4">
                <label className="block">
                  <span className="font-body text-xs text-cake-muted tracking-widest uppercase mb-2 block">Password</span>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => {
                      setAdminPassword(e.target.value)
                      setAdminError('')
                    }}
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-cake-line bg-white px-4 py-3.5 font-body text-cake-ink outline-none focus:border-gold-500 min-h-[48px]"
                    placeholder="••••••••"
                  />
                </label>
                {adminError ? <p className="font-body text-sm text-red-600 text-center">{adminError}</p> : null}
                <button
                  type="submit"
                  className="min-h-[48px] w-full rounded-full font-body text-xs font-semibold tracking-widest uppercase text-dark-900 transition-opacity active:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #f0d080, #c9a84c, #a8852a)' }}
                >
                  Submit
                </button>
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
