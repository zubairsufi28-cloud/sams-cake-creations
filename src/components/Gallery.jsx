import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaInstagram, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { FIXED_SLOTS, mergeSlot } from '../data/galleryDefaults'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

const CATEGORIES = ['All', 'Wedding', 'Birthday', 'Baby Shower', 'Anniversary', 'Cookies', 'Other']

const DESC_MAX = 120

function truncateDesc(text) {
  if (!text || text.length <= DESC_MAX) return text || ''
  return `${text.slice(0, DESC_MAX).trimEnd()}…`
}

function CakeCard({ cake, index }) {
  const cardRef = useRef(null)
  const [photoIndex, setPhotoIndex] = useState(0)
  const slides = useMemo(() => (cake.photos || []).filter(Boolean).slice(0, 5), [cake.photos])
  const slideSig = useMemo(() => slides.join('|'), [slides])

  useEffect(() => {
    setPhotoIndex(0)
  }, [cake.slot_index, slideSig])

  const safeIndex = Math.min(photoIndex, Math.max(0, slides.length - 1))
  const currentSrc = slides.length > 0 ? slides[safeIndex] : cake.photos?.[0] || '/images/cake1.jpg'

  const goPrev = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (slides.length <= 1) return
    setPhotoIndex((i) => (i - 1 + slides.length) % slides.length)
  }
  const goNext = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (slides.length <= 1) return
    setPhotoIndex((i) => (i + 1) % slides.length)
  }

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
          <img
            src={currentSrc}
            alt={cake.name}
            className="pointer-events-none w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          <span
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-body tracking-widest uppercase pointer-events-none z-[1]"
            style={{ background: 'rgba(201,168,76,0.9)', color: '#2a0a18' }}
          >
            {cake.category}
          </span>

          {slides.length > 1 ? (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-2 top-1/2 z-[2] -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50 min-h-[44px] min-w-[44px]"
                aria-label="Previous photo"
              >
                <FaChevronLeft className="text-sm" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-2 top-1/2 z-[2] -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50 min-h-[44px] min-w-[44px]"
                aria-label="Next photo"
              >
                <FaChevronRight className="text-sm" />
              </button>
              <div className="absolute bottom-3 left-0 right-0 z-[2] flex justify-center gap-1.5 pointer-events-auto">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setPhotoIndex(i)
                    }}
                    className="h-2 w-2 rounded-full transition-all min-h-[8px] min-w-[8px]"
                    style={{
                      background: i === safeIndex ? 'rgba(201,168,76,0.95)' : 'rgba(255,255,255,0.45)',
                      transform: i === safeIndex ? 'scale(1.15)' : 'scale(1)',
                    }}
                    aria-label={`Photo ${i + 1} of ${slides.length}`}
                    aria-current={i === safeIndex ? 'true' : undefined}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>

        <div className="p-5">
          <h3 className="font-display text-xl italic font-bold text-cake-ink mb-2">{cake.name}</h3>
          {cake.size_inches ? (
            <p className="font-body text-xs text-gold-700 tracking-wide mb-2">
              Size: {cake.size_inches}&quot;
            </p>
          ) : null}
          <p className="font-body text-sm text-cake-muted leading-relaxed mb-4 font-light">{truncateDesc(cake.desc)}</p>
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
  const [rows, setRows] = useState([])

  const loadRemote = useCallback(async () => {
    if (!isSupabaseConfigured() || !supabase) return
    const { data, error } = await supabase
      .from('gallery_cakes')
      .select('*')
      .order('slot_index', { ascending: true })
    if (!error && Array.isArray(data)) {
      setRows(data)
    }
  }, [])

  useEffect(() => {
    loadRemote()
    if (!supabase) return undefined
    const channel = supabase
      .channel('gallery_cakes_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_cakes' }, () => {
        loadRemote()
      })
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [loadRemote])

  const merged = useMemo(() => {
    const bySlot = new Map()
    for (const row of rows) {
      if (row.slot_index != null) bySlot.set(Number(row.slot_index), row)
    }
    return FIXED_SLOTS.map((slot) => mergeSlot(slot, bySlot.get(slot.slot_index)))
  }, [rows])

  const filtered = useMemo(
    () => (active === 'All' ? merged : merged.filter((c) => c.category === active)),
    [merged, active]
  )

  return (
    <section id="gallery" className="section-pad bg-cake-section relative" style={{ marginTop: 0 }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #f5c0d5, transparent)' }}
      />

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
              <CakeCard key={cake.slot_index} cake={cake} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

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

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #f5c0d5, transparent)' }}
      />
    </section>
  )
}
