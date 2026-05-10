import { useState, useEffect, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import { uploadCakeImage } from '../lib/uploadToCloudinary'

const ADMIN_PASSWORD = 'Sam2024Admin'
const AUTH_KEY = 'sam_cake_admin_ok'

const CATEGORIES = ['Wedding', 'Birthday', 'Baby Shower', 'Anniversary', 'Cookies', 'Other']

function thumbUrl(row) {
  if (row.image_url) return row.image_url
  if (Array.isArray(row.image_urls) && row.image_urls[0]) return row.image_urls[0]
  return null
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [cakes, setCakes] = useState([])

  const [editingId, setEditingId] = useState(null)
  const [name, setName] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [description, setDescription] = useState('')
  const [photoFile, setPhotoFile] = useState(null)

  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [saveErr, setSaveErr] = useState('')

  const previewBlob = useMemo(() => (photoFile ? URL.createObjectURL(photoFile) : null), [photoFile])
  useEffect(() => {
    return () => {
      if (previewBlob) URL.revokeObjectURL(previewBlob)
    }
  }, [previewBlob])

  const loadCakes = useCallback(async () => {
    if (!isSupabaseConfigured() || !supabase) return
    const { data, error } = await supabase
      .from('gallery_cakes')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && Array.isArray(data)) {
      setCakes(data)
    }
  }, [])

  useEffect(() => {
    if (authed) loadCakes()
  }, [authed, loadCakes])

  const resetForm = () => {
    setEditingId(null)
    setName('')
    setCategory(CATEGORIES[0])
    setDescription('')
    setPhotoFile(null)
  }

  const startEdit = (row) => {
    setEditingId(row.id)
    setName(row.name || '')
    setCategory(CATEGORIES.includes(row.category) ? row.category : CATEGORIES[0])
    setDescription(row.description || '')
    setPhotoFile(null)
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
  }

  const handleDelete = async (row) => {
    const label = row.name || 'this cake'
    if (!window.confirm(`Delete "${label}" from the gallery? This cannot be undone.`)) return
    if (!supabase) return
    const { error } = await supabase.from('gallery_cakes').delete().eq('id', row.id)
    if (error) {
      window.alert(error.message || 'Delete failed')
      return
    }
    if (editingId === row.id) resetForm()
    await loadCakes()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaveMsg('')
    setSaveErr('')

    if (!isSupabaseConfigured() || !supabase) {
      setSaveErr('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env')
      return
    }
    if (!name.trim()) {
      setSaveErr('Please enter a cake name.')
      return
    }

    const isNew = !editingId
    if (isNew && !photoFile) {
      setSaveErr('Please choose a photo for a new cake.')
      return
    }

    setSaving(true)
    try {
      let imageUrl
      if (photoFile) {
        imageUrl = await uploadCakeImage(photoFile)
      }

      if (editingId) {
        const payload = {
          name: name.trim(),
          category,
          description: description.trim(),
        }
        if (imageUrl) payload.image_url = imageUrl
        const { error } = await supabase.from('gallery_cakes').update(payload).eq('id', editingId)
        if (error) throw error
        setSaveMsg('Updated.')
      } else {
        const { error } = await supabase.from('gallery_cakes').insert({
          name: name.trim(),
          category,
          description: description.trim(),
          image_url: imageUrl,
        })
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

  const editingRow = editingId ? cakes.find((c) => c.id === editingId) : null
  const photoPreview = previewBlob || (editingRow ? thumbUrl(editingRow) : null)

  if (!authed) {
    return (
      <div className="min-h-[100dvh] bg-cake-bg flex flex-col items-center justify-center px-5 py-10">
        <div className="w-full max-w-md rounded-3xl border border-cake-line bg-cake-card p-8 shadow-lg">
          <h1 className="font-display text-2xl md:text-3xl italic font-bold text-cake-ink text-center mb-2">
            Admin login
          </h1>
          <p className="font-body text-sm text-cake-muted text-center mb-6">
            Sam&apos;s Cake Creations
          </p>
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
            {loginError ? (
              <p className="font-body text-sm text-red-600">{loginError}</p>
            ) : null}
            <button
              type="submit"
              className="min-h-[48px] rounded-xl font-body text-sm font-semibold tracking-widest uppercase text-white transition-opacity active:opacity-90"
              style={{ background: '#25D366' }}
            >
              Sign in
            </button>
          </form>
          <Link
            to="/"
            className="mt-6 block text-center font-body text-sm text-gold-600 hover:text-gold-700"
          >
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
          <h2 className="font-body text-xs text-cake-muted tracking-widest uppercase mb-3">Your cakes</h2>
          {cakes.length === 0 ? (
            <p className="font-body text-sm text-cake-muted">No cakes in the database yet.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {cakes.map((row) => {
                const thumb = thumbUrl(row)
                return (
                  <li
                    key={row.id}
                    className="flex items-center gap-3 rounded-2xl border border-cake-line bg-cake-card p-3"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cake-section border border-cake-line">
                      {thumb ? (
                        <img src={thumb} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-body text-xs text-cake-muted">—</div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-body text-sm font-semibold text-cake-ink truncate">{row.name}</div>
                      <div className="font-body text-xs text-cake-muted">{row.category}</div>
                    </div>
                    <div className="flex shrink-0 flex-col gap-1 sm:flex-row sm:gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(row)}
                        className="rounded-full border border-cake-line bg-cake-bg px-3 py-2 font-body text-xs font-semibold uppercase tracking-wider text-cake-ink min-h-[40px]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(row)}
                        className="rounded-full border border-red-200 bg-red-50 px-3 py-2 font-body text-xs font-semibold uppercase tracking-wider text-red-700 min-h-[40px]"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </section>

        <h2 className="font-body text-xs text-cake-muted tracking-widest uppercase mb-4">
          {editingId ? 'Edit cake' : 'Add new cake'}
        </h2>

        {editingId ? (
          <button
            type="button"
            onClick={resetForm}
            className="mb-4 font-body text-sm text-gold-600 underline"
          >
            Cancel edit — add new instead
          </button>
        ) : null}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label className="block">
            <span className="font-body text-xs text-cake-muted tracking-widest uppercase mb-2 block">
              Photo {editingId ? '(optional — keep current if unchanged)' : '*'}
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic"
              onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
              className="w-full font-body text-sm text-cake-ink file:mr-3 file:rounded-lg file:border-0 file:bg-gold-500 file:px-4 file:py-2.5 file:font-body file:text-xs file:font-semibold file:text-cake-ink min-h-[48px]"
            />
            {photoPreview ? (
              <img src={photoPreview} alt="" className="mt-3 w-full max-h-64 rounded-xl object-contain bg-cake-section border border-cake-line" />
            ) : null}
          </label>

          <label className="block">
            <span className="font-body text-xs text-cake-muted tracking-widest uppercase mb-2 block">Cake name *</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-cake-line bg-white px-4 py-3.5 font-body text-cake-ink outline-none focus:border-gold-500 min-h-[48px]"
              placeholder="e.g. Rose Garden Tier"
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
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="font-body text-xs text-cake-muted tracking-widest uppercase mb-2 block">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-cake-line bg-white px-4 py-3.5 font-body text-sm text-cake-ink outline-none focus:border-gold-500 resize-y min-h-[120px]"
              placeholder="Flavours, design notes, servings…"
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
            {saving ? 'Saving…' : editingId ? 'Save changes' : 'Save to gallery'}
          </button>
        </form>
      </div>
    </div>
  )
}
