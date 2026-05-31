/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A0A',
        'obsidian-light': '#111111',
        'obsidian-card': '#131313',
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E8CC6A',
          muted: 'rgba(212,175,55,0.15)',
          border: 'rgba(212,175,55,0.25)',
        },
        ivory: '#F5F3EE',
        'muted-white': '#C8C6C1',
        'muted-gray': '#787672',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.35em',
        ultra: '0.5em',
      },
      boxShadow: {
        gold: '0 0 40px rgba(212,175,55,0.25), 0 0 80px rgba(212,175,55,0.1)',
        'gold-sm': '0 0 20px rgba(212,175,55,0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
