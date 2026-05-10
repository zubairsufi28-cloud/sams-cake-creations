/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#f0d080',
          400: '#e0b84a',
          500: '#c9a84c',
          600: '#a8852a',
          700: '#7a5e18',
        },
        cake: {
          bg: '#fff0f5',
          section: '#ffe4ef',
          card: '#ffffff',
          ink: '#2a0a18',
          muted: '#6b3050',
          line: '#f5c0d5',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Jost"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
