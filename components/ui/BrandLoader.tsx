'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

/**
 * The branded full-screen loader.
 *
 * It used to live at app/loading.tsx. A loading file at the app ROOT wraps
 * every route in a Suspense boundary, which flushes the HTTP response before
 * the route finishes rendering — so any notFound() thrown inside a route
 * resolved after the 200 had already been sent, turning every intentional 404
 * into a soft 404 that search engines index as a real page.
 *
 * All routes in this app are statically prerendered and prefetched, so their
 * HTML arrives complete and this loader almost never had a chance to show.
 * It is kept here for any future segment that genuinely loads slowly: drop a
 * loading.tsx into THAT segment rendering <BrandLoader />, never at the root.
 */
export default function BrandLoader() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #120C10 0%, #1F1419 50%, #120C10 100%)' }}>
      {/* Ambient glow */}
      <div className="absolute w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(253,101,125,0.3)' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative text-center z-10"
      >
        {/* Outer ring */}
        <motion.div
          className="absolute inset-[-20%] rounded-full"
          style={{ border: '1px solid rgba(231,198,164,0.25)' }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Logo */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], y: [0, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-32 h-32 mx-auto mb-5 drop-shadow-2xl"
        >
          <Image
            src="/images/logo.png"
            alt="PASTATARAM"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </motion.div>

        {/* Brand name */}
        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#FD657D' }}>
          PASTATARAM
        </p>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#E7C6A4' }}
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
