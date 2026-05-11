import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import { Link } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import { uploadCakeImage } from '../lib/uploadToCloudinary'
import { FIXED_SLOTS, mergeSlot } from '../data/galleryDefaults'

const ADMIN_PASSWORD = 'Sam2024Admin'
const AUTH_KEY = 'sam_cake_admin_ok'

const CATEGORIES = ['Wedding', 'Birthday', 'Baby Shower', 'Anniversary', 'Cookies', 'Other']

/** @typedef {{ kind: 'empty' } | { kind: 'url'; url: string } | { kind: 'file'; file: File }} PhotoSlot */

function emptyPhotoSlots() {
  /** @type {PhotoSlot[]} */
  const slots = []
  for (let i = 0; i < 5; i += 1) slots.push({ kind: 'empty' })
  return slots
}

function photoSlotsFromUrls(urls) {
  const list = (urls || []).filter(Boolean).slice(0, 5)
  const slots = emptyPhotoSlots()
  for (let i = 0; i < list.length; i += 1) {
    slots[i] = { kind: 'url', url: list[i] }
  }
  return slots
}

const FileThumb = memo(function FileThumb({ file }) {
  const [url, setUrl] = useState('')
  useEffect(() => {
    const u = URL.createObjectURL(file)
    setUrl(u)
    return () => URL.revokeObjectURL(u)
  }, [file])
  if (!url) return <div className="h-full w-full animate-pulse bg-cake-section" />
  return <img src={url} alt="" className="h-full w-full object-cover" />
})

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [cakes, setCakes] = useState([])

  const [editingSlotIndex, setEditingSlotIndex] = useState(null)
  const [name, setName] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [description, setDescription] = useState('')
  const [sizeInches, setSizeInches] = useState('')
  /** @type {[PhotoSlot[], React.Dispatch<React.SetStateAction<PhotoSlot[]>>]} */
  const [photoSlots, setPhotoSlots] = useState(() => emptyPhotoSlots())

  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [saveErr, setSaveErr] = useState('')

  const loadCakes = useCallback(async () => {
    if (!isSupabaseConfigured() || !supabase) return
    const { data, error } = await supabase
      .from('gallery_cakes')
      .select('*')
      .order('slot_index', { ascending: true })
    if (!error && Array.isArray(data)) {
      setCakes(data)
    }
  }, [])

  useEffect(() => {
    if (authed) loadCakes()
  }, [authed, loadCakes])

  const rowsBySlot = useMemo(() => {
    const m = new Map()
    for (const r of cakes) {
      if (r.slot_index != null) m.set(Number(r.slot_index), r)
    }
    return m
  }, [cakes])

  const slotList = useMemo(
    () =>
      FIXED_SLOTS.map((slot) => {
        const row = rowsBySlot.get(slot.slot_index) || null
        const merged = mergeSlot(slot, row)
        return { slot, row, merged }
      }),
    [rowsBySlot]
  )

  const resetForm = () => {
    setEditingSlotIndex(null)
    setName('')
    setCategory(CATEGORIES[0])
    setDescription('')
    setSizeInches('')
    setPhotoSlots(emptyPhotoSlots())
    setSaveMsg('')
    setSaveErr('')
  }

  const startEdit = (slotIndex) => {
    const { slot, row } = slotList.find((e) => e.slot.slot_index === slotIndex) || {}
    if (!slot) return
    const merged = mergeSlot(slot, row)
    setEditingSlotIndex(slotIndex)
    setName(merged.name || '')
    setCategory(CATEGORIES.includes(merged.category) ? merged.category : CATEGORIES[0])
    setDescription(merged.desc || '')
    setSizeInches(merged.size_inches || '')
    setPhotoSlots(photoSlotsFromUrls(merged.photos))
    setSaveMsg('')
    setSaveErr('')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setLoginError('')
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, '1')
      setAuthed(true)
      setPassword('')
    } else {
      setLoginError('Incorrect password.')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY)
    setAuthed(false)
    resetForm()
  }

  const setSlotAt = (index, value) => {
    setPhotoSlots((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  const handlePickFile = (index, file) => {
    if (!file) return
    setSlotAt(index, { kind: 'file', file })
  }

  const handleRemoveSlot = (index) => {
    setSlotAt(index, { kind: 'empty' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaveMsg('')
    setSaveErr('')

    if (editingSlotIndex == null) {
      setSaveErr('Choose a slot to edit.')
      return
    }

    if (!isSupabaseConfigured() || !supabase) {
      setSaveErr('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env')
      return
    }
    if (!name.trim()) {
      setSaveErr('Please enter a cake name.')
      return
    }

    const slotTemplate = FIXED_SLOTS.find((s) => s.slot_index === editingSlotIndex)
    if (!slotTemplate) {
      setSaveErr('Invalid slot.')
      return
    }

    setSaving(true)
    try {
      const imageUrls = []
      for (const s of photoSlots) {
        if (s.kind === 'url' && s.url.trim()) imageUrls.push(s.url.trim())
        else if (s.kind === 'file') {
          const url = await uploadCakeImage(s.file)
          imageUrls.push(url)
        }
      }
      const capped = imageUrls.slice(0, 5)
      const defaultFirst = slotTemplate.photos[0] || '/images/cake1.jpg'
      const image_url = capped[0] || defaultFirst

      const payload = {
        slot_index: editingSlotIndex,
        name: name.trim(),
        category,
        description: description.trim(),
        size_inches: sizeInches.trim(),
        image_urls: capped.length > 0 ? capped : [],
        image_url,
      }

      const row = rowsBySlot.get(editingSlotIndex)
      if (row?.id) {
        const { error } = await supabase.from('gallery_cakes').update(payload).eq('id', row.id)
        if (error) throw error
        setSaveMsg('Updated.')
      } else {
        const { error } = await supabase.from('gallery_cakes').insert(payload)
        if (error) throw error
        setSaveMsg('Saved! The gallery will update automatically.')
      }

      resetForm()
      await loadCakes()
    } catch (err) {
      setSaveErr(err.message || 'Something went wrong.')
    } finally {
      setSaving(false)
    }
  }

  const missingEnv = (() => {
    const missing = []
    if (!import.meta.env.VITE_SUPABASE_URL) missing.push('VITE_SUPABASE_URL')
    if (!import.meta.env.VITE_SUPABASE_ANON_KEY) missing.push('VITE_SUPABASE_ANON_KEY')
    if (!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME) missing.push('VITE_CLOUDINARY_CLOUD_NAME')
    if (!import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET) missing.push('VITE_CLOUDINARY_UPLOAD_PRESET')
    return missing
  })()

  if (!authed) {
    return (
      <div className="min-h-[100dvh] bg-cake-bg flex flex-col items-center justify-center px-5 py-10">
        <div className="w-full max-w-md rounded-3xl border border-cake-line bg-cake-card p-8 shadow-lg">
          <h1 className="font-display text-2xl md:text-3xl italic font-bold text-cake-ink text-center mb-2">
            Admin login
          </h1>
          <p className="font-body text-sm text-cake-muted text-center mb-6">Sam&apos;s Cake Creations</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <label className="block">
              <span className="font-body text-xs text-cake-muted tracking-widest uppercase mb-2 block">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full rounded-xl border border-cake-line bg-white px-4 py-3.5 font-body text-cake-ink outline-none focus:border-gold-500 min-h-[48px]"
                placeholder="Enter password"
              />
            </label>
            {loginError ? <p className="font-body text-sm text-red-600">{loginError}</p> : null}
            <button
              type="submit"
              className="min-h-[48px] rounded-xl font-body text-sm font-semibold tracking-widest uppercase text-white transition-opacity active:opacity-90"
              style={{ background: '#25D366' }}
            >
              Sign in
            </button>
          </form>
          <Link to="/" className="mt-6 block text-center font-body text-sm text-gold-600 hover:text-gold-700">
            ← Back to site
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[100dvh] bg-cake-bg pb-10">
      <header className="sticky top-0 z-10 border-b border-cake-line bg-cake-card/95 backdrop-blur-md px-4 py-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-lg md:text-xl italic font-bold text-cake-ink">Gallery admin</h1>
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="font-body text-xs tracking-widest uppercase text-gold-600 px-3 py-2 rounded-full border border-cake-line min-h-[44px] inline-flex items-center"
          >
            View site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="font-body text-xs tracking-widest uppercase text-cake-muted px-3 py-2 min-h-[44px]"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 pt-8">
        {missingEnv.length > 0 ? (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 font-body text-sm text-amber-950">
            <strong className="block mb-1">Configuration needed</strong>
            Set in <code className="text-xs">.env</code>: {missingEnv.join(', ')}. See <code>.env.example</code> and{' '}
            <code>supabase/schema.sql</code>.
          </div>
        ) : null}

        <section className="mb-10">
          <h2 className="font-body text-xs text-cake-muted tracking-widest uppercase mb-3">Gallery slots (9)</h2>
          <ul className="flex flex-col gap-3">
            {slotList.map(({ slot, merged }) => {
              const thumb = merged.photos?.[0] || slot.photos[0]
              const count = (merged.photos || []).filter(Boolean).length
              return (
                <li
                  key={slot.slot_index}
                  className="flex items-center gap-3 rounded-2xl border border-cake-line bg-cake-card p-3"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cake-section border border-cake-line">
                    {thumb ? (
                      <img src={thumb} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-body text-xs text-cake-muted">
                        —
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-body text-sm font-semibold text-cake-ink truncate">{merged.name}</div>
                    <div className="font-body text-xs text-cake-muted">
                      {merged.category} · {count} photo{count === 1 ? '' : 's'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => startEdit(slot.slot_index)}
                    className="shrink-0 rounded-full border border-cake-line bg-cake-bg px-3 py-2 font-body text-xs font-semibold uppercase tracking-wider text-cake-ink min-h-[40px]"
                  >
                    Edit
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        {editingSlotIndex != null ? (
          <>
            <div className="mb-4 flex items-center justify-between gap-2">
              <h2 className="font-body text-xs text-cake-muted tracking-widest uppercase">Edit slot {editingSlotIndex}</h2>
              <button type="button" onClick={resetForm} className="font-body text-sm text-gold-600 underline">
                Close editor
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <span className="font-body text-xs text-cake-muted tracking-widest uppercase mb-2 block">Photos (up to 5)</span>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {photoSlots.map((s, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square overflow-hidden rounded-xl border border-cake-line bg-cake-section"
                    >
                      {s.kind === 'empty' ? (
                        <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1 p-2 min-h-[88px]">
                          <span className="text-2xl leading-none text-gold-600">+</span>
                          <span className="font-body text-[10px] uppercase tracking-wider text-cake-muted text-center">
                            Add
                          </span>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/heic"
                            className="sr-only"
                            onChange={(e) => handlePickFile(idx, e.target.files?.[0] || null)}
                          />
                        </label>
                      ) : (
                        <>
                          {s.kind === 'url' ? (
                            <img src={s.url} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <FileThumb file={s.file} />
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveSlot(idx)}
                            className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-sm font-bold text-white hover:bg-black/70 min-h-[44px] min-w-[44px] sm:min-h-[28px] sm:min-w-[28px]"
                            aria-label="Remove photo"
                          >
                            ×
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="font-body text-xs text-cake-muted tracking-widest uppercase mb-2 block">Cake name *</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-cake-line bg-white px-4 py-3.5 font-body text-cake-ink outline-none focus:border-gold-500 min-h-[48px]"
                  placeholder="Cake name"
                />
              </label>

              <label className="block">
                <span className="font-body text-xs text-cake-muted tracking-widest uppercase mb-2 block">Category *</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-cake-line bg-white px-4 py-3.5 font-body text-sm text-cake-ink outline-none focus:border-gold-500 min-h-[48px]"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="font-body text-xs text-cake-muted tracking-widest uppercase mb-2 block">Size (inches)</span>
                <input
                  type="text"
                  value={sizeInches}
                  onChange={(e) => setSizeInches(e.target.value)}
                  className="w-full rounded-xl border border-cake-line bg-white px-4 py-3.5 font-body text-cake-ink outline-none focus:border-gold-500 min-h-[48px]"
                  placeholder='e.g. 8"'
                />
              </label>

              <label className="block">
                <span className="font-body text-xs text-cake-muted tracking-widest uppercase mb-2 block">
                  Flavours &amp; Design Notes
                </span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-cake-line bg-white px-4 py-3.5 font-body text-sm text-cake-ink outline-none focus:border-gold-500 resize-y min-h-[120px]"
                  placeholder="Flavours, design notes…"
                />
              </label>

              {saveErr ? <p className="font-body text-sm text-red-600">{saveErr}</p> : null}
              {saveMsg ? <p className="font-body text-sm text-green-700">{saveMsg}</p> : null}

              <button
                type="submit"
                disabled={saving}
                className="min-h-[52px] rounded-full font-body text-sm font-semibold tracking-widest uppercase text-white disabled:opacity-60 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #f0d080, #c9a84c, #a8852a)' }}
              >
                {saving ? 'Saving…' : 'Save slot'}
              </button>
            </form>
          </>
        ) : (
          <p className="font-body text-sm text-cake-muted">Tap Edit on any slot above to update photos and details.</p>
        )}
      </div>
    </div>
  )
}
