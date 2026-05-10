import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/14034985666?text=Hi%20Sam!%20I'd%20love%20to%20order%20a%20custom%20cake."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        background: '#25D366',
        borderRadius: '50%',
        width: 60,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(37, 211, 102, 0.5)',
        textDecoration: 'none',
      }}
    >
      <FaWhatsapp size={32} color="#ffffff" aria-hidden />
    </a>
  )
}
