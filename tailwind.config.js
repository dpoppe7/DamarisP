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
        'dim-gray': '#686868',
        'dark-bg': '#000000',
        'card-bg': '#2A2825',
        'border-color': '#2a2f3e',
        'pastel-yellow': '#fcf577',

        'green-bright': '#64ffda', // For folder icons and accents
        'lightest-navy': '#1e2332', // For hover states
        'light-navy': '#1a1f2e', // Already exists as card-bg
        'lightest-slate': '#ffffff', // For primary text
        'slate': '#a2aabc', // Already exists as light-gray


        // 'pastel-orange': '#ffae57',
        
        // 'pastel-green': '#bae67e',
        // 'pastel-cyan': '#5ccfe6',
        // 'pastel-blue': '#9cc6f4',
        // 'pastel-purple': '#aa72c5'
      },
      fontFamily: {
        'pixel': ['"Jersey 15"', 'monospace'],
        'roboto': ['Roboto', 'sans-serif'],
        'inria': ['"Inria Sans"', 'sans-serif']
      },
      animation: {
        'fade-in-out': 'fadeInOut 5s ease-in-out infinite',
        'spin-gradient': 'spinGradient 2s linear infinite',
      },
      keyframes: {
        fadeInOut: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        spinGradient: {
          to: { transform: 'rotate(360deg)' }
        }
      },
      spacing: {
        '25': '6.25rem', // 100px equivalent for pt-25
      },
      boxShadow: {
        '2xl': '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)',
      }
    },
  },
  plugins: [],
}