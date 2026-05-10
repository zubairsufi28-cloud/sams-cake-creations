export default function Hero() {
  return (
    <section
      id="home"
      style={{ position: 'relative', overflow: 'hidden', marginBottom: 0, minHeight: '100dvh', height: '100dvh' }}
    >
      {/* Full background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', minHeight: '100dvh', objectFit: 'cover', zIndex: 0 }}
      >
        <source src="/cake-video.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.45)', zIndex: 1 }} />
      {/* Pink gold gradient overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,182,193,0.3) 0%, rgba(201,168,76,0.15) 100%)', zIndex: 2 }} />
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-center" style={{ paddingTop: 100, paddingBottom: 40 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10 bg-gold-400" />
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold-300">Calgary's Finest Custom Cakes</span>
          <div className="h-px w-10 bg-gold-400" />
        </div>
        <h1 className="font-display font-bold leading-tight mb-6 text-white" style={{ fontSize: 'clamp(44px, 7vw, 90px)' }}>
          Every Cake<br />
          <span className="gold-shimmer italic">Tells a Story</span><br />
          <span className="italic text-white/80" style={{ fontSize: '0.75em' }}>Worth Savoring</span>
        </h1>
        <p className="font-body text-white/80 text-base leading-relaxed mb-10 max-w-lg font-light">
          Handcrafted luxury cakes for weddings, birthdays & celebrations. Each tier is made with love, premium ingredients, and meticulous attention to detail.
        </p>
        <div className="flex flex-wrap gap-4 mb-12">
          <a href="https://wa.me/14034985666?text=Hi%20Sam!" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-full font-body text-sm tracking-widest uppercase font-semibold text-cake-ink"
            style={{ background: 'linear-gradient(135deg, #f0d080, #c9a84c, #a8852a)' }}>
            💬 Order on WhatsApp
          </a>
          <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 px-8 py-4 rounded-full font-body text-sm tracking-widest uppercase font-semibold text-white border border-white/40 hover:border-gold-400 transition-colors">
            View Gallery ✨
          </button>
        </div>
        <div className="flex gap-10 flex-wrap">
          {[['213+', 'Cakes Created'], ['5.0★', 'Rating'], ['100%', 'Custom Made']].map(([val, lbl]) => (
            <div key={lbl}>
              <div className="font-display text-3xl font-bold gold-text italic">{val}</div>
              <div className="font-body text-xs text-white/60 tracking-widest uppercase mt-1">{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
