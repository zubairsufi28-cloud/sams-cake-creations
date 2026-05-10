import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

const FAQS = [
  { q: 'How far in advance should I order?', a: 'We recommend 2–4 weeks for custom cakes, and at least 4–6 weeks for wedding cakes. Rush orders may be available depending on availability — send us a message to check.' },
  { q: 'Is a deposit required to book?', a: 'Yes, a non-refundable deposit is required to secure your booking date. This covers material sourcing and reserves your slot in our schedule. The remaining balance is due before delivery.' },
  { q: 'Can I request a fully custom design?', a: 'Absolutely — every cake we make is custom. Share your inspiration photos, colour palette, theme, and any specific details and we\'ll bring your vision to life exactly as you imagined.' },
  { q: 'Do you deliver, or is it pickup only?', a: 'We offer local delivery within Calgary, AB. Delivery fees vary by distance. Pickup is also available at our Calgary location. Please mention your preference when ordering.' },
  { q: 'Are your cakes Halal?', a: 'Yes, all our cakes are made with 100% Halal-certified ingredients. We take dietary requirements seriously and are happy to discuss any specific needs.' },
  { q: 'Can you accommodate allergies?', a: 'We can accommodate some dietary needs including gluten-free and dairy-free options. Please mention all allergies at the time of ordering so we can advise you accordingly and take necessary precautions.' },
  { q: 'How do I pay?', a: 'We accept cash and e-Transfer (very common in Canada). A non-refundable deposit is required at booking to confirm your date. The remaining balance is collected before or at delivery.' },
  { q: 'How are cakes priced?', a: 'Pricing is based on size, number of tiers, design complexity, and flavour. Every cake gets a personalised quote — message us with your details for a free estimate with no obligation.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="section-pad bg-cake-section relative">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #f5c0d5, transparent)' }} />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gold-500" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold-600">Questions?</span>
            <div className="h-px w-10 bg-gold-500" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold italic mb-4 text-cake-ink">
            <span className="text-cake-ink">Frequently </span>
            <span className="gold-shimmer">Asked</span>
          </h2>
          <p className="font-body text-cake-muted font-light">
            Everything you need to know before placing your order
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-2xl overflow-hidden bg-cake-card"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
              >
                <span className="font-display text-lg italic font-semibold text-cake-ink">{faq.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: open === i ? 'linear-gradient(135deg, #f0d080, #c9a84c, #a8852a)' : 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)' }}
                >
                  <span className="font-body font-light text-lg leading-none" style={{ color: open === i ? '#2a0a18' : '#c9a84c' }}>+</span>
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="h-px w-full mb-4 bg-cake-line" />
                      <p className="font-body text-cake-muted text-sm leading-relaxed font-light">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="font-body text-cake-muted/80 text-sm mb-4">Still have a question?</p>
          <motion.a
            href="https://wa.me/14034985666?text=Hi%20Sam!%20I%20have%20a%20question%20about%20ordering."
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-xs tracking-widest uppercase font-semibold text-white transition-all duration-300"
            style={{ background: '#25D366' }}
          >
            <FaWhatsapp size={18} color="#ffffff" className="shrink-0" aria-hidden />
            Ask on WhatsApp
          </motion.a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #f5c0d5, transparent)' }} />
    </section>
  )
}
