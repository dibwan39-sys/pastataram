import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blush: '#F7D6DF',
          rose: '#E9B7C7',
          nude: '#EFD4CC',
          cream: '#FFF8F5',
          pearl: '#FDF7F2',
          'rose-gold': '#CFA18D',
          champagne: '#D8B38A',
          copper: '#B9856F',
          ivory: '#F7EBDD',
          mocha: '#D8C1B3',
          latte: '#B89E90',
          'cream-beige': '#F4E7DF',
          espresso: '#4A342B',
          brown: '#6A4E45',
        },
      },
      fontFamily: {
        arabic: ['Cairo', 'Noto Kufi Arabic', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #FFF8F5 0%, #F7D6DF 30%, #EFD4CC 60%, #FDF7F2 100%)',
        'hero-gradient': 'linear-gradient(160deg, #FFF8F5 0%, #F7D6DF 40%, #E9B7C7 70%, #EFD4CC 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(255,248,245,0.9) 0%, rgba(247,214,223,0.8) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #CFA18D 0%, #D8B38A 50%, #B9856F 100%)',
        'dark-gradient': 'linear-gradient(135deg, #2A1F1C 0%, #3D2B26 40%, #4A342B 100%)',
      },
      boxShadow: {
        'brand': '0 8px 32px rgba(207,161,141,0.25)',
        'brand-lg': '0 20px 60px rgba(207,161,141,0.35)',
        'card': '0 4px 24px rgba(74,52,43,0.08)',
        'card-hover': '0 12px 40px rgba(74,52,43,0.16)',
        'glow': '0 0 30px rgba(207,161,141,0.4)',
        'glow-lg': '0 0 60px rgba(207,161,141,0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'steam': 'steam 3s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        steam: {
          '0%, 100%': { opacity: '0.3', transform: 'translateY(0) scaleX(1)' },
          '50%': { opacity: '0.7', transform: 'translateY(-15px) scaleX(1.1)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}

export default config
