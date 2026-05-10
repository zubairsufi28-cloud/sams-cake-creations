/**
 * Browser upload via Cloudinary unsigned preset (no API secret in the client).
 * Create an unsigned upload preset in Cloudinary Dashboard → Settings → Upload.
 */
export async function uploadCakeImage(file) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

  if (!cloudName || !uploadPreset) {
    throw new Error(
      'Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET (unsigned preset).'
    )
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  formData.append('folder', 'sam-cake-creations')

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error?.message || `Upload failed (${res.status})`)
  }
  if (!data.secure_url) {
    throw new Error('Upload succeeded but no image URL returned')
  }
  return data.secure_url
}
