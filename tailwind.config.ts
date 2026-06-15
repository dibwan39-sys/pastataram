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
        // ════════════════════════════════════════════
        //  PASTATARAM premium identity
        //  Dark charcoal base · wine accents · copper highlights · cream type
        //
        //  NOTE: the original (pink) token NAMES are preserved and simply
        //  re-valued to the new palette, so every existing `*-brand-*` class
        //  across the app recolors automatically with no markup changes.
        //  Semantic roles after the flip:
        //    surfaces → charcoal · accents → wine/copper · text → cream
        // ════════════════════════════════════════════
        brand: {
          // — New, explicit palette names (for new markup) —
          ink: '#0F0D0B',
          charcoal: '#14110F',
          'charcoal-2': '#1A1614',
          surface: '#211C19',
          'surface-2': '#2B2521',
          line: '#3A322C',
          wine: '#7B1E2B',
          'wine-deep': '#5E1521',
          'wine-soft': '#8C2D3D',
          copper: '#B87333',
          'copper-bright': '#CD8A3E',
          'copper-light': '#D8A24A',
          gold: '#E0B566',
          'cream-soft': '#E8DCC8',
          'cream-dim': '#C9BBA8',
          muted: '#9A8B7C',

          // — Legacy token names, re-valued (DO NOT remove: ~1000 usages) —
          espresso: '#F2E8DA', // was darkest text → now cream text
          brown: '#E8DCC8',    // secondary text → soft cream
          ivory: '#F2E8DA',    // light text on dark areas → cream
          mocha: '#C9BBA8',    // muted text → dim cream
          latte: '#9A8B7C',    // muted text / placeholder
          cream: '#14110F',    // light surface → charcoal base
          pearl: '#14110F',    // lightest surface → charcoal base
          blush: '#211C19',    // light surface → raised charcoal
          nude: '#211C19',     // light surface → raised charcoal
          'cream-beige': '#2B2521',
          rose: '#8C2D3D',         // pink accent → wine
          'rose-gold': '#B87333',  // primary accent → copper
          champagne: '#D8A24A',    // highlight → copper-light
        },
      },
      fontFamily: {
        arabic: ['Cairo', 'Noto Kufi Arabic', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(160deg, #14110F 0%, #1A1614 55%, #211C19 100%)',
        'hero-gradient': 'linear-gradient(180deg, rgba(15,13,11,0) 0%, rgba(15,13,11,0.55) 60%, #14110F 100%)',
        'card-gradient': 'linear-gradient(145deg, #211C19 0%, #1A1614 100%)',
        'wine-gradient': 'linear-gradient(135deg, #5E1521 0%, #7B1E2B 55%, #8C2D3D 100%)',
        'copper-gradient': 'linear-gradient(135deg, #B87333 0%, #D8A24A 50%, #E0B566 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0F0D0B 0%, #14110F 40%, #211C19 100%)',
      },
      boxShadow: {
        'brand': '0 12px 40px rgba(0,0,0,0.45)',
        'brand-lg': '0 24px 70px rgba(0,0,0,0.55)',
        'card': '0 8px 30px rgba(0,0,0,0.4)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.55)',
        'wine': '0 10px 30px rgba(123,30,43,0.45)',
        'copper': '0 10px 30px rgba(184,115,51,0.35)',
      },
      animation: {
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
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
