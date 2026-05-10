import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'
import { DEFAULT_GALLERY_CAKES } from '../data/galleryDefaults'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

const CATEGORIES = ['All', 'Wedding', 'Birthday', 'Baby Shower', 'Anniversary', 'Cookies', 'Other']

function photosFromRow(row) {
  if (Array.isArray(row.image_urls) && row.image_urls.length > 0) {
    return row.image_urls.filter((u) => typeof u === 'string' && u.length > 0)
  }
  // Legacy single column (if migration not run yet)
  if (row.image_url) {
    return [row.image_url]
  }
  return []
}

function mapGalleryRow(row) {
  const photos = photosFromRow(row)
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    desc: row.description || '',
    photos,
  }
}

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
              className="pointer-events-none w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
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
                className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gold-600/50 text-cake-ink shadow-md transition-transform hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #f0d080, #c9a84c, #a8852a)' }}
              >
                <ChevronLeft className="h-5 w-5 shrink-0" strokeWidth={2.5} aria-hidden />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gold-600/50 text-cake-ink shadow-md transition-transform hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #f0d080, #c9a84c, #a8852a)' }}
              >
                <ChevronRight className="h-5 w-5 shrink-0" strokeWidth={2.5} aria-hidden />
              </button>
              <div
                className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full px-2 py-1"
                style={{ background: 'rgba(42, 10, 24, 0.35)' }}
              >
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
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: i === photoIndex ? '1.35rem' : '0.45rem',
                      background: i === photoIndex ? '#f0d080' : 'rgba(255,255,255,0.55)',
                      boxShadow: i === photoIndex ? '0 0 0 1px rgba(168, 133, 42, 0.8)' : 'none',
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
  const [remoteCakes, setRemoteCakes] = useState([])

  const loadRemote = useCallback(async () => {
    if (!isSupabaseConfigured() || !supabase) return
    const { data, error } = await supabase
      .from('gallery_cakes')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && Array.isArray(data)) {
      setRemoteCakes(data.map(mapGalleryRow).filter((c) => c.photos.length > 0))
    }
  }, [])

  useEffect(() => {
    loadRemote()
    if (!supabase) return undefined
    const channel = supabase
      .channel('gallery_cakes_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'gallery_cakes' },
        () => {
          loadRemote()
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [loadRemote])

  const cakes = useMemo(
    () => [...remoteCakes.filter((c) => c.photos.length > 0), ...DEFAULT_GALLERY_CAKES],
    [remoteCakes]
  )

  const filtered = active === 'All' ? cakes : cakes.filter(c => c.category === active)

  return (
    <section id="gallery" className="section-pad bg-cake-section relative" style={{ marginTop: 0 }}>
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #f5c0d5, transparent)' }} />

      <svg className="pointer-events-none absolute h-0 w-0 overflow-hidden" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="gallery-insta-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="25%" stopColor="#fd5949" />
            <stop offset="55%" stopColor="#d6249f" />
            <stop offset="100%" stopColor="#833ab4" />
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
            className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-body text-sm tracking-widest uppercase font-semibold border border-cake-line text-cake-ink bg-cake-card/80 hover:border-gold-500/40 transition-colors"
          >
            <FaInstagram
              className="shrink-0 drop-shadow-sm"
              size={32}
              aria-hidden
              style={{ fill: 'url(#gallery-insta-grad)' }}
            />
            Follow @samscakecreations_
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #f5c0d5, transparent)' }} />
    </section>
  )
}
