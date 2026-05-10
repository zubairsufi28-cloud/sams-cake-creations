import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  { name: 'Nadia R.', event: 'Wedding Cake', text: "Sam's work is pure artistry. Our wedding cake was a complete showstopper — every single guest was asking who made it. The taste matched the beauty perfectly. I still can't believe how stunning it was.", stars: 5, avatar: 'N', location: 'Calgary, AB' },
  { name: 'Fatima K.', event: 'Birthday Cake', text: "Ordered the butterfly cake for my daughter's 5th birthday and she was in absolute tears of joy. The detail was unreal — it looked like it belonged in a magazine. Sam is incredibly talented and so easy to work with.", stars: 5, avatar: 'F', location: 'Calgary, AB' },
  { name: 'Priya M.', event: 'Baby Shower', text: "The cloud and balloon cake was absolutely dreamy. Everyone at the shower kept complimenting it. Delivery was on time, packaging was immaculate, and the fondant work was flawless. Highly recommend!", stars: 5, avatar: 'P', location: 'Airdrie, AB' },
  { name: 'Sara T.', event: 'Anniversary Cake', text: "Sam nailed the gold monogram cake exactly as I envisioned it. She was so professional, so responsive, and genuinely talented. Will absolutely be ordering again for every occasion.", stars: 5, avatar: 'S', location: 'Calgary, AB' },
  { name: 'Layla H.', event: 'Baby Shower Cake', text: "From the first DM to the delivery, the experience was flawless. The cake was even more beautiful in person than in the photos. Our guests couldn't stop talking about it. Thank you Sam!", stars: 5, avatar: 'L', location: 'Calgary, AB' },
  { name: 'Maryam A.', event: 'Birthday Cake', text: "I've ordered from Sam twice now and each time she exceeds my expectations. The cakes are beautiful, delicious, and always ready on time. She truly cares about her customers.", stars: 5, avatar: 'M', location: 'Chestermere, AB' },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <section id="testimonials" className="section-pad bg-cake-bg relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.12] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ffb6c1, transparent)' }} />

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
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold-600">Client Love</span>
            <div className="h-px w-10 bg-gold-500" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold italic mb-4 text-cake-ink">
            <span className="text-cake-ink">What They're </span>
            <span className="gold-shimmer">Saying</span>
          </h2>
          <p className="font-body text-cake-muted font-light">Real stories from real celebrations</p>
        </motion.div>

        {/* Featured testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          {/* Main */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-3 glass-card rounded-3xl p-10 relative bg-cake-card"
            >
              {/* Quote mark */}
              <div className="font-display text-8xl text-gold-500/20 leading-none absolute top-6 left-8 select-none">"</div>

              {/* Stars */}
              <div className="flex gap-1 mb-6 mt-4">
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i} className="text-gold-500 text-xl">{s}</span>
                ))}
              </div>

              <p className="font-display text-xl md:text-2xl italic text-cake-muted leading-relaxed mb-8 relative z-10">
                {TESTIMONIALS[active].text}
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-display text-xl font-bold text-cake-ink"
                  style={{ background: 'linear-gradient(135deg, #f0d080, #c9a84c, #a8852a)' }}>
                  {TESTIMONIALS[active].avatar}
                </div>
                <div>
                  <div className="font-body font-semibold text-cake-ink">{TESTIMONIALS[active].name}</div>
                  <div className="font-body text-xs text-gold-600">{TESTIMONIALS[active].event}</div>
                  <div className="font-body text-xs text-cake-muted/80">{TESTIMONIALS[active].location}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Sidebar list */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                whileHover={{ x: 4 }}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ${
                  active === i ? 'glass-card bg-cake-card' : 'hover:bg-cake-section/80 border border-transparent'
                }`}
                style={{ border: active === i ? '1px solid #f5c0d5' : '1px solid transparent' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm text-cake-ink flex-shrink-0"
                    style={{ background: active === i ? 'linear-gradient(135deg, #f0d080, #c9a84c, #a8852a)' : 'rgba(201,168,76,0.15)', color: active === i ? '#2a0a18' : '#c9a84c' }}>
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-body text-sm font-semibold text-cake-ink truncate">{t.name}</div>
                    <div className="font-body text-xs text-cake-muted/80 truncate">{t.event}</div>
                  </div>
                  <div className="text-gold-500 text-xs">{'★'.repeat(t.stars)}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-6"
        >
          {[
            { val: '5.0', label: 'Average Rating', sub: 'Across all reviews' },
            { val: '213+', label: 'Happy Clients', sub: 'And counting' },
            { val: '100%', label: 'Custom Made', sub: 'Every single cake' },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 text-center bg-cake-card">
              <div className="font-display text-4xl italic font-bold gold-text mb-1">{stat.val}</div>
              <div className="font-body text-sm text-cake-muted font-semibold">{stat.label}</div>
              <div className="font-body text-xs text-cake-muted/70 mt-1">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
