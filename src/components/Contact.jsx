import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaWhatsapp, FaGoogle, FaInstagram, FaClock, FaCreditCard } from 'react-icons/fa'

const CONTACT_INFO_ITEMS = [
  { kind: 'location', label: 'Location', val: '274 Seton Villas SE', sub: 'Calgary, AB' },
  { kind: 'whatsapp', label: 'WhatsApp', val: '(403) 498-5666', sub: 'Text or call' },
  { kind: 'email', label: 'Email', val: 'samiabakedcreation@gmail.com', sub: 'We reply within 24hrs' },
  { kind: 'instagram', label: 'Instagram', val: '@samscakecreations_', sub: 'Follow for inspo' },
  { kind: 'hours', label: 'Hours', val: 'Mon–Sat', sub: '9:00 AM – 7:00 PM', goldTile: true },
]

function ContactInfoIcon({ kind }) {
  const size = 20
  switch (kind) {
    case 'location':
      return <FaMapMarkerAlt size={size} color="#DC2626" aria-hidden />
    case 'whatsapp':
      return <FaWhatsapp size={size} color="#25D366" aria-hidden />
    case 'email':
      return <FaGoogle size={size} color="#EA4335" aria-hidden />
    case 'instagram':
      return <FaInstagram size={size} style={{ fill: 'url(#contact-insta-grad)' }} aria-hidden />
    case 'hours':
      return (
        <FaClock
          size={size}
          className="shrink-0"
          style={{ color: '#c9a84c' }}
          aria-hidden
        />
      )
    default:
      return null
  }
}

const EVENTS = ['Wedding', 'Birthday', 'Baby Shower', 'Anniversary', 'Corporate', 'Cookies', 'Other']

/** Inch rounds, tier stacks, and custom — replaces legacy “number of guests” free-text field. */
const CAKE_SIZE_OPTIONS = [
  { value: '6 inch (serves 8–10)', label: '6 inch (serves 8–10)' },
  { value: '8 inch (serves 15–20)', label: '8 inch (serves 15–20)' },
  { value: '10 inch (serves 25–30)', label: '10 inch (serves 25–30)' },
  { value: '12 inch (serves 35–40)', label: '12 inch (serves 35–40)' },
  { value: '2 tier (serves 30–45)', label: '2 tier (serves 30–45)' },
  { value: '3 tier (serves 50–75)', label: '3 tier (serves 50–75)' },
  { value: '4 tier (serves 80–120)', label: '4 tier (serves 80–120)' },
  { value: 'Custom size (servings on request)', label: 'Custom size (servings on request)' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', event: '', date: '', size: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const message = `Hi Sam! I'd like to request a quote.

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Event: ${form.event}
Date: ${form.date}
Cake size: ${form.size}
Message: ${form.message}`
    window.open(`https://wa.me/14034985666?text=${encodeURIComponent(message)}`, '_blank')
  }

  const inputClass = "w-full bg-cake-card border border-cake-line rounded-xl px-5 py-4 font-body text-sm text-cake-ink placeholder:text-cake-muted/40 outline-none focus:border-gold-500 transition-colors duration-300"
  const inputStyle = { borderColor: '#f5c0d5' }

  return (
    <section id="contact" className="section-pad bg-cake-bg relative">
      <svg className="pointer-events-none absolute h-0 w-0 overflow-hidden" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="contact-insta-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#833ab4" />
            <stop offset="35%" stopColor="#d6249f" />
            <stop offset="65%" stopColor="#fd5949" />
            <stop offset="100%" stopColor="#fcb045" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gold-500" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold-600">Let's Create</span>
            <div className="h-px w-10 bg-gold-500" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold italic mb-4 text-cake-ink">
            <span className="text-cake-ink">Order Your </span>
            <span className="gold-shimmer">Dream Cake</span>
          </h2>
          <p className="font-body text-cake-muted font-light max-w-md mx-auto">
            Fill out the form below or reach us directly on WhatsApp. We respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <h3 className="font-display text-2xl italic font-bold text-cake-ink">Get in Touch</h3>

            {CONTACT_INFO_ITEMS.map((item) => (
              <div key={item.label} className="glass-card rounded-2xl p-5 flex items-center gap-4 bg-cake-card">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                  style={
                    item.goldTile
                      ? {
                          background: 'linear-gradient(145deg, rgba(240, 208, 128, 0.45), rgba(201, 168, 76, 0.28))',
                          border: '1px solid rgba(201, 168, 76, 0.85)',
                          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                        }
                      : { background: '#fff5f7', border: '1px solid #f5c0d5' }
                  }
                >
                  <ContactInfoIcon kind={item.kind} />
                </div>
                <div>
                  <div className="font-body text-xs text-gold-600/90 tracking-widest uppercase mb-0.5">{item.label}</div>
                  <div className="font-body text-sm font-semibold text-cake-ink">{item.val}</div>
                  <div className="font-body text-xs text-cake-muted/80">{item.sub}</div>
                </div>
              </div>
            ))}

            {/* WhatsApp direct */}
            <motion.a
              href="https://wa.me/14034985666?text=Hi%20Sam!%20I'd%20love%20to%20order%20a%20custom%20cake."
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 p-5 rounded-2xl font-body text-sm font-semibold tracking-widest uppercase text-white"
              style={{ background: '#25D366' }}
            >
              <FaWhatsapp size={18} color="#ffffff" className="shrink-0" aria-hidden />
              Order Directly on WhatsApp
            </motion.a>

            {/* Payment note */}
            <div className="glass-card rounded-2xl p-5 flex items-start gap-4 bg-cake-card">
              <div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-cake-bg"
                style={{ border: '1px solid #f5c0d5' }}
              >
                <FaCreditCard size={20} color="#c9a84c" aria-hidden />
              </div>
              <div>
                <div className="font-body text-xs text-gold-600 tracking-widest uppercase mb-2">Payment</div>
                <p className="font-body text-xs text-cake-muted leading-relaxed font-light">
                  We accept <span className="text-cake-ink font-medium">Cash</span> & <span className="text-cake-ink font-medium">e-Transfer</span>. A non-refundable deposit is required to secure your booking date.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 flex flex-col gap-5 bg-cake-card">
              <h3 className="font-display text-2xl italic font-bold text-cake-ink mb-2">Request a Quote</h3>

              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body text-xs text-cake-muted tracking-widest uppercase mb-2">Full Name *</label>
                  <input
                    name="name" value={form.name} onChange={handleChange} required
                    placeholder="Nadia Rahman"
                    className={inputClass} style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block font-body text-xs text-cake-muted tracking-widest uppercase mb-2">Email *</label>
                  <input
                    name="email" type="email" value={form.email} onChange={handleChange} required
                    placeholder="samiabakedcreation@gmail.com"
                    className={inputClass} style={inputStyle}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body text-xs text-cake-muted tracking-widest uppercase mb-2">WhatsApp / Phone</label>
                  <input
                    name="phone" value={form.phone} onChange={handleChange}
                    placeholder="+1 (403) 498-5666"
                    className={inputClass} style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block font-body text-xs text-cake-muted tracking-widest uppercase mb-2">Event Type *</label>
                  <select
                    name="event" value={form.event} onChange={handleChange} required
                    className={inputClass} style={{ ...inputStyle, color: form.event ? '#2a0a18' : 'rgba(107, 48, 80, 0.45)' }}
                  >
                    <option value="" disabled>Select event</option>
                    {EVENTS.map(e => <option key={e} value={e} style={{ background: '#ffffff', color: '#2a0a18' }}>{e}</option>)}
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body text-xs text-cake-muted tracking-widest uppercase mb-2">Event Date *</label>
                  <input
                    name="date" type="date" value={form.date} onChange={handleChange} required
                    className={inputClass} style={{ ...inputStyle, colorScheme: 'light' }}
                  />
                </div>
                <div>
                  {/* Cake size dropdown only — no “number of guests” text field */}
                  <label htmlFor="contact-cake-size" className="block font-body text-xs text-cake-muted tracking-widest uppercase mb-2">Cake Size</label>
                  <select
                    id="contact-cake-size"
                    name="size"
                    value={form.size}
                    onChange={handleChange}
                    className={inputClass}
                    style={{ ...inputStyle, color: form.size ? '#2a0a18' : 'rgba(107, 48, 80, 0.45)' }}
                  >
                    <option value="">Select cake size</option>
                    {CAKE_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} style={{ background: '#ffffff', color: '#2a0a18' }}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block font-body text-xs text-cake-muted tracking-widest uppercase mb-2">Your Vision / Message *</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange} required
                  placeholder="Describe your dream cake — theme, colours, tier count, design inspirations, flavour preferences..."
                  rows={4}
                  className={inputClass} style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-body text-sm tracking-widest uppercase font-semibold text-cake-ink transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #f0d080, #c9a84c, #a8852a)',
                }}
              >
                ✨ Send My Request
              </motion.button>

              <p className="font-body text-xs text-cake-muted/70 text-center">
                We respond within 24 hours • Deposit required to confirm booking
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
