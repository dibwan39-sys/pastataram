import type { Config } from 'tailwindcss'

/**
 * ════════════════════════════════════════════════════════════════
 *  PASTATARAM — LUXURY PINK DESIGN SYSTEM
 * ════════════════════════════════════════════════════════════════
 *
 *  Single source of truth for brand colour. Every value below is
 *  sampled from the official logo (public/images/logo.png) rather
 *  than invented:
 *
 *    wordmark / heart ... #FD657D   hsl(351, 97%, 69%)
 *    pasta + halo ....... #F8C8C8   hsl(0, 77%, 88%)
 *    warm nude .......... #F8D0C8   hsl(10, 77%, 88%)
 *    fork + ring ........ #EFBF9B   hsl(26, 72%, 77%)
 *    cream highlight .... #F8E8E0   hsl(20, 63%, 93%)
 *
 *  The identity is LUXURY PINK on a DARK CINEMATIC base: a warm
 *  near-black carrying a rose undertone (never neutral grey, never
 *  blue), rose as the signature accent, champagne as the secondary,
 *  and cream for type. Food photography is the hero; these colours
 *  frame it and never compete with it.
 * ════════════════════════════════════════════════════════════════
 */
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
          // ── Cinematic base — rose-black ──
          // Mirrors the --brand-* custom properties in app/globals.css.
          // Tailwind cannot read those directly without giving up the `/opacity`
          // modifier, which 176 class names rely on, so the two lists are kept
          // in sync by hand. Change a value here and there, never only one.
          ink: '#1E0713',
          noir: '#330C1E',
          'noir-2': '#421126',
          surface: '#52162F',
          'surface-2': '#631B39',
          'surface-3': '#742043',
          line: '#94305A',

          // ── Signature rose (the logo wordmark) ──
          rose: '#FD657D',
          'rose-deep': '#C43E57',
          'rose-dark': '#8E2A3D',
          'rose-soft': '#FF8B9D',
          'rose-mist': '#FFB3BF',

          // ── Blush / nude (the logo's dominant family) ──
          blush: '#F8C8C8',
          'blush-soft': '#F8D8D8',
          nude: '#F8D0C8',
          'nude-warm': '#F8E0D8',

          // ── Champagne (the logo's fork + ring) ──
          champagne: '#E7C6A4',
          'champagne-light': '#F0D3B0',
          gold: '#F6E0C4',

          // ── Cream typography ──
          cream: '#FFF3EE',
          'cream-soft': '#F3E2DC',
          'cream-dim': '#D8C2BD',
          muted: '#A88E8E',

          /**
           * ── COMPATIBILITY ALIASES ──────────────────────────────
           * These names predate this system and are still referenced
           * by pages not yet migrated (admin, account, about …).
           * They are mapped by ROLE, not by literal name, so the UI
           * stays correct while the migration finishes.
           *
           * Do not use these in new markup. Use the tokens above.
           * Remove an alias only once its usages reach zero.
           * ──────────────────────────────────────────────────────
           */
          espresso: '#FFF3EE',      // primary type on dark  → cream
          ivory: '#FFF3EE',         // primary type on dark  → cream
          brown: '#F3E2DC',         // secondary type        → cream-soft
          mocha: '#D8C2BD',         // muted type            → cream-dim
          latte: '#A88E8E',         // placeholder type      → muted
          pearl: '#330C1E',         // page background       → noir
          'cream-beige': '#631B39', // raised surface        → surface-2
          'rose-gold': '#FD657D',   // primary accent        → rose
          wine: '#C43E57',          // deep accent           → rose-deep
          copper: '#E7C6A4',        // secondary accent      → champagne
        },
      },
      fontFamily: {
        // Bound to the next/font CSS variables declared in app/layout.tsx
        arabic: ['var(--font-cairo)', 'Cairo', 'Noto Kufi Arabic', 'sans-serif'],
        display: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(160deg, #330C1E 0%, #421126 55%, #52162F 100%)',
        'hero-gradient': 'linear-gradient(180deg, rgba(30, 7, 19,0) 0%, rgba(51,12,30,0.55) 58%, #330C1E 100%)',
        'card-gradient': 'linear-gradient(145deg, #52162F 0%, #421126 100%)',
        'rose-gradient': 'linear-gradient(135deg, #C43E57 0%, #FD657D 55%, #FF8B9D 100%)',
        'champagne-gradient': 'linear-gradient(135deg, #E7C6A4 0%, #F0D3B0 50%, #F6E0C4 100%)',
        'dark-gradient': 'linear-gradient(135deg, #1E0713 0%, #330C1E 40%, #52162F 100%)',
      },
      boxShadow: {
        brand: '0 12px 40px rgba(0,0,0,0.45)',
        'brand-lg': '0 24px 70px rgba(0,0,0,0.55)',
        card: '0 8px 30px rgba(0,0,0,0.40)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.55)',
        rose: '0 10px 30px rgba(253,101,125,0.32)',
        'rose-lg': '0 18px 48px rgba(253,101,125,0.38)',
        champagne: '0 10px 30px rgba(231,198,164,0.26)',
        // Referenced by Navbar's hover state, previously undefined (a no-op).
        glow: '0 0 0 1px rgba(253,101,125,0.35), 0 12px 34px rgba(253,101,125,0.34)',
      },
      animation: {
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        shimmer: 'shimmer 2s linear infinite',
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
