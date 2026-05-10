import { motion } from 'framer-motion'
import { FaInstagram, FaFacebook, FaWhatsapp, FaTiktok } from 'react-icons/fa'

const NAV_LINKS = ['Home', 'Gallery', 'Services', 'About', 'Testimonials', 'FAQ', 'Contact']

const SOCIAL_LINKS = [
  { href: 'https://www.instagram.com/samscakecreations_', icon: FaInstagram, label: 'Instagram', brand: 'instagram' },
  { href: 'https://wa.me/14034985666', icon: FaWhatsapp, label: 'WhatsApp', brand: 'whatsapp' },
  { href: 'https://www.facebook.com/profile.php?id=100094201780906', icon: FaFacebook, label: 'Facebook', brand: 'facebook' },
  { href: 'https://www.tiktok.com/@samscakecreations', icon: FaTiktok, label: 'TikTok', brand: 'tiktok' },
]

const BRAND_ICON_COLOR = {
  whatsapp: '#25D366',
  facebook: '#1877F2',
  tiktok: '#000000',
}

const scrollTo = (section) => {
  document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="relative bg-cake-section border-t border-cake-line">
      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #f5c0d5, transparent)' }} />

      <svg className="pointer-events-none absolute h-0 w-0 overflow-hidden" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="footer-insta-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#833ab4" />
            <stop offset="35%" stopColor="#d6249f" />
            <stop offset="65%" stopColor="#fd5949" />
            <stop offset="100%" stopColor="#fcb045" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Sam's Cake Creations" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid #c9a84c' }} />
              <div>
                <div className="font-display text-2xl italic font-bold gold-text">Sam's Cake Creations</div>
                <div className="font-body text-xs tracking-widest text-gold-600/80 uppercase">Calgary, Alberta</div>
              </div>
            </div>
            <p className="font-body text-cake-muted text-sm leading-relaxed mb-6 font-light max-w-xs">
              Handcrafted luxury cakes for weddings, birthdays, and every celebration worth remembering. Made with love in Calgary, AB.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((s) => {
                const Icon = s.icon
                const iconProps =
                  s.brand === 'instagram'
                    ? { size: 22, style: { fill: 'url(#footer-insta-grad)' } }
                    : { size: 22, color: BRAND_ICON_COLOR[s.brand] }
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.08 }}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-cake-line/90 bg-white shadow-sm transition-shadow hover:shadow-md"
                    title={s.label}
                    aria-label={s.label}
                  >
                    <Icon aria-hidden {...iconProps} />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="font-body text-xs tracking-[0.2em] uppercase text-gold-600/90 mb-5">Navigation</div>
            <ul className="flex flex-col gap-3 list-none">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link)}
                    className="font-body text-sm text-cake-muted hover:text-gold-600 transition-colors font-light"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <div className="font-body text-xs tracking-[0.2em] uppercase text-gold-600/90 mb-5">Info</div>
            <div className="flex flex-col gap-4">
              {[
                { icon: '📍', text: '274 Seton Villas SE\nCalgary, AB' },
                { icon: '🕐', text: 'Mon–Sat\n9:00 AM – 7:00 PM' },
                { icon: '💳', text: 'Cash & e-Transfer\nDeposit required' },
                { icon: '✅', text: '100% Halal\nCustom made to order' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-base mt-0.5">{item.icon}</span>
                  <span className="font-body text-xs text-cake-muted/90 leading-relaxed font-light whitespace-pre-line">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px w-full mb-8 bg-cake-line" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-cake-muted/70">
            © {new Date().getFullYear()} Sam's Cake Creations. All rights reserved.
          </p>
          <p className="font-body text-xs text-cake-muted/70">
            Made with 💛 in Calgary, Alberta 🇨🇦
          </p>
        </div>
      </div>
    </footer>
  )
}
