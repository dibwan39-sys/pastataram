'use client'

import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { useUIStore } from '@/lib/store'

/**
 * Keeps <html lang/dir> in step with the language the customer picked.
 *
 * The server already renders lang="ar" dir="rtl", so the default Arabic
 * experience needs no correction after hydration — this only runs when
 * someone switches to English and back. That removed the LTR flash that
 * every visitor used to see on first paint.
 */
function LanguageSync() {
  const language = useUIStore((s) => s.language)

  useEffect(() => {
    const root = document.documentElement
    const dir = language === 'ar' ? 'rtl' : 'ltr'
    if (root.lang !== language) root.lang = language
    if (root.dir !== dir) root.dir = dir
  }, [language])

  return null
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    /**
     * `reducedMotion="user"` makes every Framer Motion animation in the app
     * respect the OS "reduce motion" setting without each component asking.
     * globals.css covers the CSS-driven animations; together they satisfy the
     * motion-sensitivity requirement the site previously ignored entirely.
     *
     * next-themes used to wrap this tree purely to force `class="dark"`, which
     * the server already renders on <html>. It has been removed rather than
     * kept as a dependency that ships a theme system the site never offers.
     */
    <MotionConfig reducedMotion="user">
      <LanguageSync />
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--brand-surface)',
            color: '#FFF3EE',
            border: '1px solid rgba(253,101,125,0.35)',
            borderRadius: '16px',
            fontFamily: "var(--font-cairo), 'Cairo', sans-serif",
            fontWeight: '600',
            padding: '12px 20px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
          },
        }}
      />
    </MotionConfig>
  )
}
