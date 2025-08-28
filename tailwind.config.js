// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,html}",
    "./index.html",
    "./*.html"
  ],
  theme: {
    extend: {
      colors: {
        'pink-accent': '#edabd2',
        'light-gray': '#a2aabc',
        'dark-bg': '#13161E',
        'card-bg': '#1a1f2e',
        'border-color': '#2a2f3e',

        // 'pastel-orange': '#ffae57',
        // 'pastel-yellow': '#fcf577',
        // 'pastel-green': '#bae67e',
        // 'pastel-cyan': '#5ccfe6',
        // 'pastel-blue': '#9cc6f4',
        // 'pastel-purple': '#aa72c5'
      },
      fontFamily: {
        'pixel': ['Jersey 15', 'monospace'],
        'roboto': ['Roboto', 'sans-serif']
      },
      animation: {
        'fade-in-out': 'fadeInOut 5s ease-in-out infinite',
      },
      keyframes: {
        fadeInOut: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}