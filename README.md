# 🎂 Sam's Cake Creations — Website

Luxury 3D website for Sam's Cake Creations, Calgary AB.

## Tech Stack
- React + Vite
- Three.js + React Three Fiber (3D cake)
- Tailwind CSS
- Framer Motion + GSAP
- EmailJS (contact form)
- Vercel (hosting)

---

## 🚀 Getting Started (Cursor AI)

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm run dev
```
Open http://localhost:5173

---

## ✅ Things to Update Before Going Live

### WhatsApp Number
Site links use `https://wa.me/14034985666` (update in `Footer.jsx`, `Navbar.jsx`, `Hero.jsx`, etc. if your number changes).

### Email (EmailJS Setup)
1. Go to https://www.emailjs.com and create a free account
2. Create a Service (Gmail works great)
3. Create an Email Template
4. Copy your Service ID, Template ID, and Public Key
5. Open `src/components/Contact.jsx` and replace:
   - `YOUR_SERVICE_ID`
   - `YOUR_TEMPLATE_ID`
   - `YOUR_PUBLIC_KEY`

### Real Cake Photos
In `src/components/Gallery.jsx`, each cake card has a placeholder emoji.
To add real photos:
1. Add your photo files to `public/images/`
2. In each cake object, add: `img: '/images/your-photo.jpg'`
3. In `CakeCard`, replace the emoji div with: `<img src={cake.img} className="w-full h-full object-cover" />`

### Logo
Place your logo file at `public/logo.png`

---

## 📦 Deploy to Vercel

### Option 1 — GitHub + Vercel (Recommended)
1. Push this folder to a GitHub repo
2. Go to https://vercel.com
3. Click "New Project" → Import your GitHub repo
4. Vercel auto-detects Vite → click Deploy
5. Done! Your site is live in ~60 seconds ✅

### Option 2 — Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx         — Sticky navigation
│   ├── Hero.jsx           — 3D rotating cake hero
│   ├── Gallery.jsx        — Filterable cake gallery
│   ├── Services.jsx       — Service cards with 3D hover
│   ├── About.jsx          — About Sam section
│   ├── Testimonials.jsx   — Customer reviews
│   ├── FAQ.jsx            — Accordion FAQ
│   ├── Contact.jsx        — Order form + info
│   ├── Footer.jsx         — Footer with links
│   └── WhatsAppFloat.jsx  — Floating WhatsApp button
├── App.jsx                — Main app
├── main.jsx               — Entry point
└── index.css              — Global styles + animations
```

---

## 🎨 Customization

### Colors (tailwind.config.js)
- Gold: `#c9a84c` — primary accent
- Dark: `#0a0608` — background
- Cream: `#fdf6ee` — text

### Fonts
- Display: Cormorant Garamond (headings)
- Body: Jost (paragraphs, labels)

---

Built with ❤️ for Sam's Cake Creations
