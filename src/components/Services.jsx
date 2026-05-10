import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Heart, Cake, Baby, Sparkles, Building2, Cookie } from 'lucide-react'

const SERVICES = [
  { icon: Cake, title: 'Wedding Cakes', desc: 'Bespoke multi-tier masterpieces crafted to match your theme, colour palette, and vision. Every petal, every tier — perfect.', detail: 'Consultation included' },
  { icon: Sparkles, title: 'Birthday Cakes', desc: 'From princess tiers to themed novelty designs — custom cakes for every age, every personality, every celebration.', detail: 'All ages welcome' },
  { icon: Baby, title: 'Baby Showers', desc: 'Dreamy gender-reveal and baby shower cakes with soft, whimsical aesthetics that make the moment unforgettable.', detail: 'Gender reveals available' },
  { icon: Heart, title: 'Anniversary Cakes', desc: 'Celebrate your milestones with elegant, personalized cakes that honour your love story with artistry and warmth.', detail: 'Personalised designs' },
  { icon: Building2, title: 'Corporate & Events', desc: 'Branded cakes and cupcake towers for product launches, galas, and corporate celebrations that leave an impression.', detail: 'Bulk orders available' },
  { icon: Cookie, title: 'Custom Cookies', desc: 'Hand-decorated royal icing sugar cookies — perfect as favours, gifts, or dessert table centrepieces.', detail: 'Min. 1 dozen' },
]

function ServiceCard({ service, index }) {
  const cardRef = useRef(null)
  const Icon = service.icon

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15
    cardRef.current.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0)'
      cardRef.current.style.boxShadow = '0 4px 24px rgba(201,168,76,0.1)'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-card rounded-2xl h-full group cursor-default bg-cake-card"
        style={{
          padding: 40,
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 24px rgba(201,168,76,0.1)',
          border: '1px solid rgba(201,168,76,0.2)',
          transformStyle: 'preserve-3d',
        }}
        onMouseEnter={() => {
          if (cardRef.current) cardRef.current.style.boxShadow = '0 12px 40px rgba(201,168,76,0.22)'
        }}
      >
        <div
          className="group-hover:scale-110 transition-transform duration-300"
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: 'linear-gradient(135deg, #f0d080, #c9a84c, #a8852a)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
            boxShadow: '0 8px 24px rgba(201,168,76,0.35)',
          }}
        >
          <Icon size={30} strokeWidth={1.5} className="text-white" aria-hidden />
        </div>

        <h3
          className="font-display italic text-cake-ink mb-3"
          style={{ fontSize: 24, fontWeight: 700 }}
        >
          {service.title}
        </h3>

        {/* Desc */}
        <p className="font-body text-cake-muted text-sm leading-relaxed mb-6 font-light">{service.desc}</p>

        {/* Footer */}
        <div className="flex items-center gap-2 mt-auto">
          <div className="h-px flex-1 bg-cake-line" />
          <span
            className="font-body text-xs tracking-widest uppercase italic"
            style={{ color: '#c9a84c' }}
          >
            {service.detail}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="section-pad bg-cake-bg relative">
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
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold-600">What We Offer</span>
            <div className="h-px w-10 bg-gold-500" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold italic mb-4 text-cake-ink">
            <span className="text-cake-ink">Our </span>
            <span className="gold-shimmer">Specialties</span>
          </h2>
          <p className="font-body text-cake-muted font-light max-w-md mx-auto">
            Every occasion deserves something extraordinary
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl p-10 text-center relative overflow-hidden bg-cake-card border border-cake-line"
          style={{
            boxShadow: '0 20px 50px rgba(245, 192, 213, 0.25)',
          }}
        >
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 50%, #c9a84c, transparent 70%)' }} />
          <h3 className="font-display text-3xl md:text-4xl italic font-bold text-cake-ink mb-3 relative z-10">
            Don't see what you're looking for?
          </h3>
          <p className="font-body text-cake-muted mb-6 relative z-10 font-light">
            Every cake is fully custom. Tell us your vision and we'll bring it to life.
          </p>
          <motion.a
            href="https://wa.me/14034985666?text=Hi%20Sam!%20I%20have%20a%20custom%20cake%20idea."
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(201,168,76,0.4)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-body text-sm tracking-widest uppercase font-semibold text-cake-ink relative z-10"
            style={{ background: 'linear-gradient(135deg, #f0d080, #c9a84c, #a8852a)' }}
          >
            💬 Let's Chat on WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
