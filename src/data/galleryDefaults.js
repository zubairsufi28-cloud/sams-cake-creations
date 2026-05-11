/** Nine permanent gallery slots — Sam edits content only; slots are fixed. */

export const FIXED_SLOTS = [
  {
    slot_index: 1,
    name: 'White Rose Elegance',
    category: 'Wedding',
    photos: ['/images/cake1.jpg'],
    desc: 'Stunning white tier cake with delicate rose arrangements',
    size_inches: '',
  },
  {
    slot_index: 2,
    name: 'Floral Cascade',
    category: 'Wedding',
    photos: ['/images/cake2.jpg'],
    desc: 'Romantic multi-tier cake with cascading fresh florals',
    size_inches: '',
  },
  {
    slot_index: 3,
    name: 'Golden Wedding Tier',
    category: 'Wedding',
    photos: ['/images/cake3.jpg'],
    desc: 'Elegant wedding cake with gold accents and floral crown',
    size_inches: '',
  },
  {
    slot_index: 4,
    name: 'Princess Birthday',
    category: 'Birthday',
    photos: ['/images/cake4.jpg'],
    desc: 'Magical birthday cake with personalized name and themed design',
    size_inches: '',
  },
  {
    slot_index: 5,
    name: 'Character Dream',
    category: 'Birthday',
    photos: ['/images/cake5.jpg'],
    desc: 'Fun themed birthday cake with custom character decorations',
    size_inches: '',
  },
  {
    slot_index: 6,
    name: 'Cloud Nine',
    category: 'Baby Shower',
    photos: ['/images/cake6.jpg'],
    desc: 'Dreamy baby shower cake with soft pastel cloud details',
    size_inches: '',
  },
  {
    slot_index: 7,
    name: 'Golden Anniversary',
    category: 'Anniversary',
    photos: ['/images/cake7.jpg'],
    desc: 'Elegant anniversary cake with gold details and romantic finish',
    size_inches: '',
  },
  {
    slot_index: 8,
    name: 'Modern Artisan',
    category: 'Birthday',
    photos: ['/images/cake8.jpg'],
    desc: 'Contemporary cake design with unique artistic decorations',
    size_inches: '',
  },
  {
    slot_index: 9,
    name: 'Artisan Cookies',
    category: 'Cookies',
    photos: ['/images/cake9.jpg'],
    desc: 'Hand-decorated luxury cookies perfect for any occasion',
    size_inches: '',
  },
]

function normalizePhotos(photos) {
  if (!Array.isArray(photos)) return []
  return photos.filter(Boolean).slice(0, 5)
}

function photosFromRow(row, slot) {
  const fallback = normalizePhotos(slot.photos)
  if (!row) return fallback

  if (Array.isArray(row.image_urls) && row.image_urls.length > 0) {
    const fromUrls = row.image_urls.map((u) => (u != null ? String(u).trim() : '')).filter(Boolean).slice(0, 5)
    if (fromUrls.length > 0) return fromUrls
  }
  if (row.image_url && String(row.image_url).trim()) {
    return [String(row.image_url).trim()]
  }
  return fallback
}

/**
 * Merge a Supabase `gallery_cakes` row into a fixed slot template.
 * Prefers `image_urls` (array), then `image_url` (single), then slot defaults.
 */
export function mergeSlot(slot, row) {
  const photos = photosFromRow(row, slot)
  if (!row) {
    return {
      ...slot,
      id: null,
      photos,
      desc: slot.desc,
      name: slot.name,
      category: slot.category,
      size_inches: slot.size_inches || '',
    }
  }

  const name = row.name && String(row.name).trim() ? String(row.name).trim() : slot.name
  const category = row.category && String(row.category).trim() ? String(row.category).trim() : slot.category
  const desc =
    row.description != null && String(row.description).trim() !== ''
      ? String(row.description)
      : slot.desc
  const size_inches =
    row.size_inches != null && String(row.size_inches).trim() !== ''
      ? String(row.size_inches).trim()
      : slot.size_inches || ''

  return {
    ...slot,
    id: row.id ?? null,
    slot_index: slot.slot_index,
    name,
    category,
    desc,
    photos,
    size_inches,
  }
}
