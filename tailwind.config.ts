import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep':    '#09111F',
        'card':    '#0D1826',
        'light':   '#111E2F',
        'gold':    '#C9A84C',
        'gold-light': '#E2C06A',
        'gold-dim':   '#9A7A34',
        'off-white':  '#F5F0E8',
        'muted':      '#8A97A8',
        'border':     'rgba(201,168,76,0.18)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #09111F 0%, #0D1826 60%, #091522 100%)',
        'card-gradient': 'linear-gradient(135deg, #111E2F 0%, #162233 100%)',
      },
    },
  },
  plugins: [],
}

export default config
