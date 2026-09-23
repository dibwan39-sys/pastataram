'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Clock, Navigation, ShoppingBag } from 'lucide-react'
import { branches, branchMapsUrl, workingHours } from '@/lib/data'
import { getOpenStatus, type OpenStatus } from '@/lib/utils'
import { useUIStore } from '@/lib/store'
import DepthCard from '@/components/motion/DepthCard'

/**
 * The one place branch cards are rendered. Home and /contact both use it, so a
 * branch is described identically everywhere and adding or retiring one is a
 * single edit in lib/data.ts.
 *
 * Each card links to a Google Maps *search* for the branch name. No place ID
 * or coordinate is published, because none is verified for these locations —
 * the previous /contact map embed carried a null place ID (0x0:0x0) and
 * placeholder coordinates, which pointed customers at the wrong place.
 */
export default function BranchCards({ className = '' }: { className?: string }) {
  const language = useUIStore((s) => s.language)
  const isAr = language === 'ar'
  const reduce = useReducedMotion()

  // Rendered only after mount: the open/closed state depends on the current
  // time, which the server cannot know without producing a hydration mismatch.
  const [status, setStatus] = useState<OpenStatus | null>(null)
  useEffect(() => {
    const tick = () => setStatus(getOpenStatus(language))
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [language])

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {branches.map((branch, i) => (
        /* Two locations of the same restaurant, so they share one treatment.
           The tilt gives each card a surface the pointer can feel; it is off
           on touch, where there is no pointer to feel it with. */
        <DepthCard key={branch.id} className="h-full" maxTilt={2.5} lift={18}>
        <motion.article
          initial={reduce ? { opacity: 1, y: 0, x: 0, scale: 1, scaleX: 1 } : { opacity: 0, y: 28 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="group relative overflow-hidden rounded-[1.75rem] p-7 md:p-8"
          style={{
            background: 'linear-gradient(150deg, var(--brand-surface) 0%, var(--brand-noir-2) 100%)',
            border: '1px solid rgba(231,198,164,0.16)',
          }}
        >
          {/* Ambient rose bloom, kept behind the content */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -end-24 h-56 w-56 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
            style={{ background: 'radial-gradient(circle, rgba(253,101,125,0.34) 0%, transparent 70%)' }}
          />

          <div className="relative">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-start gap-3">
                <span
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
                  style={{ background: 'linear-gradient(135deg, #C43E57, #FD657D)' }}
                >
                  <MapPin className="h-5 w-5 text-white" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-brand-cream">
                    {isAr ? branch.nameAr : branch.nameEn}
                  </h3>
                  <p className="mt-0.5 text-sm text-brand-cream-dim">
                    {isAr ? branch.detailAr : branch.detailEn}
                  </p>
                </div>
              </div>

              {status && (
                <span
                  className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold"
                  style={{
                    background: status.open ? 'rgba(34,77,46,0.45)' : 'rgba(196,62,87,0.24)',
                    color: status.open ? '#7FD89A' : '#FFB3BF',
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: status.open ? '#4FCB6F' : '#C0566A' }}
                    aria-hidden
                  />
                  {status.label}
                </span>
              )}
            </div>

            <p className="mb-6 flex items-center gap-2 text-sm text-brand-cream-soft">
              <Clock className="h-4 w-4 flex-shrink-0 text-brand-champagne" aria-hidden />
              {isAr ? workingHours.ar : workingHours.en}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={branchMapsUrl(branch)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors"
                style={{ background: 'rgba(231,198,164,0.12)', border: '1px solid rgba(231,198,164,0.4)', color: '#F0D3B0' }}
              >
                <Navigation className="h-4 w-4" aria-hidden />
                {isAr ? 'الاتجاهات' : 'Directions'}
                <span className="sr-only">
                  {isAr ? `إلى فرع ${branch.nameAr}` : `to ${branch.nameEn}`}
                </span>
              </a>

              <Link
                href="/menu"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-[#2A0A12]"
                style={{ background: 'linear-gradient(135deg, #C43E57, #FD657D)' }}
              >
                <ShoppingBag className="h-4 w-4" aria-hidden />
                {isAr ? 'اطلب الآن' : 'Order Now'}
              </Link>
            </div>
          </div>
        </motion.article>
        </DepthCard>
      ))}
    </div>
  )
}
