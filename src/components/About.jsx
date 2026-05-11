import { motion } from 'framer-motion'

const VALUES = [
  { icon: '✦', label: '100% Halal', desc: 'All ingredients certified halal' },
  { icon: '✦', label: 'Premium Quality', desc: 'Only the finest ingredients used' },
  { icon: '✦', label: 'Custom Designs', desc: 'Every cake uniquely yours' },
  { icon: '✦', label: 'On-Time Delivery', desc: 'Your celebration, never delayed' },
]

export default function About() {
  return (
    <section id="about" className="section-pad bg-cake-section relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 -translate-y-1/2 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ffb6c1, transparent)' }} />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main card */}
            <div className="relative rounded-3xl overflow-hidden aspect-square bg-cake-card border border-cake-line"
              style={{
                boxShadow: '0 24px 60px rgba(245, 192, 213, 0.3)',
              }}
            >
              <img
                src="/images/about.jpg"
                alt="Sam's Cake Creations"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 24 }}
              />

              {/* Ornament corners */}
              {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-8 h-8 opacity-50`}
                  style={{
                    borderTop: i < 2 ? '1px solid #c9a84c' : 'none',
                    borderBottom: i >= 2 ? '1px solid #c9a84c' : 'none',
                    borderLeft: i % 2 === 0 ? '1px solid #c9a84c' : 'none',
                    borderRight: i % 2 === 1 ? '1px solid #c9a84c' : 'none',
                  }}
                />
              ))}
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-4 glass-card rounded-2xl p-5 gold-glow"
            >
              <div className="font-display text-3xl italic font-bold gold-text mb-1">3+</div>
              <div className="font-body text-xs text-cake-muted tracking-widest uppercase">Years of</div>
              <div className="font-body text-xs text-gold-600 tracking-widest uppercase">Crafting Love</div>
            </motion.div>

            {/* Second badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -top-4 -right-4 glass-card rounded-2xl p-4"
            >
              <div className="font-body text-xs text-gold-600 tracking-widest uppercase mb-1">Based in</div>
              <div className="font-display text-sm italic text-cake-ink font-bold">Calgary, AB 🇨🇦</div>
            </motion.div>
          </motion.div>

          {/* Right — content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-gold-500" />
              <span className="font-body text-xs tracking-[0.3em] uppercase text-gold-600">The Baker Behind It All</span>
            </div>

            <h2 className="font-display text-5xl md:text-6xl font-bold italic mb-6 leading-tight text-cake-ink">
              <span className="text-cake-ink">Baked with </span>
              <span className="gold-shimmer">Heart</span>
            </h2>

            <p className="font-body text-cake-muted text-base leading-relaxed mb-5 font-light">
              Hi, I'm Sam — a passionate cake artist based in Calgary, Alberta. What started as a deep love for baking evolved into a business built on one simple promise: <span className="text-gold-600 italic">every cake is a work of edible art.</span>
            </p>

            <p className="font-body text-cake-muted text-base leading-relaxed mb-8 font-light">
              Working from my home kitchen means small batches, personal attention, and a product made with genuine care. No factory lines — just me, my tools, and your vision brought to life one tier at a time.
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {VALUES.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-start gap-3"
                >
                  <span className="text-gold-500 mt-0.5 text-lg">{v.icon}</span>
                  <div>
                    <div className="font-body text-sm font-semibold text-cake-ink">{v.label}</div>
                    <div className="font-body text-xs text-cake-muted/80 font-light">{v.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px w-full mb-8 bg-cake-line" />

            {/* Quote */}
            <div className="flex gap-4 items-start">
              <span className="font-display text-5xl text-gold-500/30 leading-none mt-1">"</span>
              <p className="font-display text-lg italic text-cake-muted leading-relaxed">
                Every celebration deserves a cake that takes your breath away. That's what I wake up to create every day.
              </p>
            </div>
            <div className="mt-3 ml-12 font-body text-xs text-gold-600 tracking-widest uppercase">
              — Sam, Founder & Cake Artist
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
