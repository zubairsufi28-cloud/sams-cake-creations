import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const CATEGORIES = ['All', 'Wedding', 'Birthday', 'Baby Shower', 'Anniversary', 'Cookies']

const CAKES = [
  { id: 1, name: 'White Rose Elegance', category: 'Wedding', photos: ['/images/cake1.jpg', '/images/cake1.jpg'], desc: 'Stunning white tier cake with delicate rose arrangements' },
  { id: 2, name: 'Floral Cascade', category: 'Wedding', photos: ['/images/cake2.jpg', '/images/cake2.jpg'], desc: 'Romantic multi-tier cake with cascading fresh florals' },
  { id: 3, name: 'Golden Wedding Tier', category: 'Wedding', photos: ['/images/cake3.jpg', '/images/cake3.jpg'], desc: 'Elegant wedding cake with gold accents and floral crown' },
  { id: 4, name: 'Princess Birthday', category: 'Birthday', photos: ['/images/cake4.jpg'], desc: 'Magical birthday cake with personalized name and themed design' },
  { id: 5, name: 'Character Dream', category: 'Birthday', photos: ['/images/cake5.jpg'], desc: 'Fun themed birthday cake with custom character decorations' },
  { id: 6, name: 'Cloud Nine', category: 'Baby Shower', photos: ['/images/cake6.jpg'], desc: 'Dreamy baby shower cake with soft pastel cloud details' },
  { id: 7, name: 'Golden Anniversary', category: 'Anniversary', photos: ['/images/cake7.jpg'], desc: 'Elegant anniversary cake with gold details and romantic finish' },
  { id: 8, name: 'Modern Artisan', category: 'Birthday', photos: ['/images/cake8.jpg'], desc: 'Contemporary cake design with unique artistic decorations' },
  { id: 9, name: 'Artisan Cookies', category: 'Cookies', photos: ['/images/cake9.jpg'], desc: 'Hand-decorated luxury cookies perfect for any occasion' },
]

function CakeCard({ cake, index }) {
  const cardRef = useRef(null)
  const photos = cake.photos
  const [photoIndex, setPhotoIndex] = useState(0)

  useEffect(() => {
    setPhotoIndex(0)
  }, [cake.id])

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20
    cardRef.current.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
  }

  const showCarousel = photos.length > 1
  const goPrev = (e) => {
    e.stopPropagation()
    setPhotoIndex((i) => (i - 1 + photos.length) % photos.length)
  }
  const goNext = (e) => {
    e.stopPropagation()
    setPhotoIndex((i) => (i + 1) % photos.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-card rounded-2xl overflow-hidden cursor-pointer group bg-cake-card"
        style={{ transition: 'transform 0.15s ease, box-shadow 0.3s ease', transformStyle: 'preserve-3d' }}
        onMouseEnter={() => {
          if (cardRef.current) cardRef.current.style.boxShadow = '0 24px 60px rgba(245, 192, 213, 0.45)'
        }}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: '#fff5f7' }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={`${cake.id}-${photoIndex}`}
              src={photos[photoIndex]}
              alt={`${cake.name} — photo ${photoIndex + 1} of ${photos.length}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-body tracking-widest uppercase pointer-events-none z-[1]"
            style={{ background: 'rgba(201,168,76,0.9)', color: '#2a0a18' }}>
            {cake.category}
          </span>

          {showCarousel && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:bg-black/50 group-hover:opacity-100"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:bg-black/50 group-hover:opacity-100"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
              </button>
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Show photo ${i + 1}`}
                    aria-current={i === photoIndex}
                    onClick={(e) => {
                      e.stopPropagation()
                      setPhotoIndex(i)
                    }}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === photoIndex ? '1.25rem' : '0.375rem',
                      background: i === photoIndex ? 'rgba(240,208,128,0.95)' : 'rgba(255,255,255,0.45)',
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="font-display text-xl italic font-bold text-cake-ink mb-2">{cake.name}</h3>
          <p className="font-body text-sm text-cake-muted leading-relaxed mb-4 font-light">{cake.desc}</p>
          <div className="flex items-center justify-end">
            <a
              href={`https://wa.me/14034985666?text=Hi%20Sam!%20I'm%20interested%20in%20the%20${encodeURIComponent(cake.name)}%20cake.%20Can%20I%20get%20a%20quote%3F`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full text-xs font-body font-semibold tracking-widest uppercase text-dark-900"
              style={{ background: 'linear-gradient(135deg, #f0d080, #c9a84c)' }}
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? CAKES : CAKES.filter(c => c.category === active)

  return (
    <section id="gallery" className="section-pad bg-cake-section relative" style={{ marginTop: 0 }}>
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #f5c0d5, transparent)' }} />

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
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold-600">Our Work</span>
            <div className="h-px w-10 bg-gold-500" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold italic mb-4 text-cake-ink">
            <span className="text-cake-ink">Cake </span>
            <span className="gold-shimmer">Gallery</span>
          </h2>
          <p className="font-body text-cake-muted font-light max-w-md mx-auto">
            Every cake is a one-of-a-kind creation — made to match your vision
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-full font-body text-xs tracking-widest uppercase transition-all duration-300"
              style={{
                background: active === cat ? 'linear-gradient(135deg, #f0d080, #c9a84c, #a8852a)' : 'transparent',
                border: active === cat ? '1px solid transparent' : '1px solid #f5c0d5',
                color: active === cat ? '#2a0a18' : 'rgba(107, 48, 80, 0.85)',
                fontWeight: active === cat ? 600 : 400,
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((cake, i) => (
              <CakeCard key={cake.id} cake={cake} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Instagram link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="font-body text-cake-muted/80 text-sm mb-4">See hundreds more on our Instagram</p>
          <motion.a
            href="https://www.instagram.com/samscakecreations_"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-body text-sm tracking-widest uppercase font-semibold border border-cake-line text-cake-ink bg-cake-card/80 hover:border-gold-500/40 transition-colors"
          >
            📸 Follow @samscakecreations_
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #f5c0d5, transparent)' }} />
    </section>
  )
}
