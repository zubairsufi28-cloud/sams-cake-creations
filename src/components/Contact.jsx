import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from 'emailjs-com'

// ⚠️ Replace these with your real EmailJS credentials from emailjs.com
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

const EVENTS = ['Wedding', 'Birthday', 'Baby Shower', 'Anniversary', 'Corporate', 'Cookies', 'Other']

export default function Contact() {
  const formRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', event: '', date: '', guests: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          event_type: form.event,
          event_date: form.date,
          guests: form.guests,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm({ name: '', email: '', phone: '', event: '', date: '', guests: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const inputClass = "w-full bg-cake-card border border-cake-line rounded-xl px-5 py-4 font-body text-sm text-cake-ink placeholder:text-cake-muted/40 outline-none focus:border-gold-500 transition-colors duration-300"
  const inputStyle = { borderColor: '#f5c0d5' }

  return (
    <section id="contact" className="section-pad bg-cake-bg relative">
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

            {[
              { icon: '📍', label: 'Location', val: '274 Seton Villas SE', sub: 'Calgary, AB' },
              { icon: '📱', label: 'WhatsApp', val: '(403) 498-5666', sub: 'Text or call' },
              { icon: '📧', label: 'Email', val: 'samiabakedcreation@gmail.com', sub: 'We reply within 24hrs' },
              { icon: '📸', label: 'Instagram', val: '@samscakecreations_', sub: 'Follow for inspo' },
              { icon: '🕐', label: 'Hours', val: 'Mon–Sat', sub: '9:00 AM – 7:00 PM' },
            ].map((item) => (
              <div key={item.label} className="glass-card rounded-2xl p-5 flex items-center gap-4 bg-cake-card">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-cake-bg"
                  style={{ border: '1px solid #f5c0d5' }}>
                  {item.icon}
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
              style={{ background: '#25d366' }}
            >
              <span className="text-xl">💬</span>
              Order Directly on WhatsApp
            </motion.a>

            {/* Payment note */}
            <div className="glass-card rounded-2xl p-5 bg-cake-card">
              <div className="font-body text-xs text-gold-600 tracking-widest uppercase mb-2">💳 Payment</div>
              <p className="font-body text-xs text-cake-muted leading-relaxed font-light">
                We accept <span className="text-cake-ink font-medium">Cash</span> & <span className="text-cake-ink font-medium">e-Transfer</span>. A non-refundable deposit is required to secure your booking date.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 flex flex-col gap-5 bg-cake-card">
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
                  <label className="block font-body text-xs text-cake-muted tracking-widest uppercase mb-2">Number of Guests</label>
                  <input
                    name="guests" value={form.guests} onChange={handleChange}
                    placeholder="e.g. 50–80 guests"
                    className={inputClass} style={inputStyle}
                  />
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
                disabled={status === 'sending'}
                whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-body text-sm tracking-widest uppercase font-semibold text-cake-ink transition-all duration-300"
                style={{
                  background: status === 'success'
                    ? 'linear-gradient(135deg, #4caf7d, #2e7d52)'
                    : status === 'error'
                    ? 'linear-gradient(135deg, #e57373, #c62828)'
                    : 'linear-gradient(135deg, #f0d080, #c9a84c, #a8852a)',
                  opacity: status === 'sending' ? 0.7 : 1,
                  color: status === 'success' || status === 'error' ? '#ffffff' : '#2a0a18',
                }}
              >
                {status === 'idle' && '✨ Send My Request'}
                {status === 'sending' && '⏳ Sending...'}
                {status === 'success' && '✓ Request Sent! We\'ll be in touch soon.'}
                {status === 'error' && '✗ Something went wrong. Try WhatsApp instead.'}
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
