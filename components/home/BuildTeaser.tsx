'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { menuItems } from '@/lib/data'
import { BUILD_BASE_PRICE } from '@/lib/buildYourPasta'
import { useUIStore } from '@/lib/store'

/**
 * An invitation into /build-your-pasta. The starting price is imported from
 * the builder's own configuration rather than written out here, so the two can
 * never disagree.
 */
export default function BuildTeaser() {
  const language = useUIStore((s) => s.language)
  const isAr = language === 'ar'
  const reduce = useReducedMotion()
  const Arrow = isAr ? ArrowLeft : ArrowRight

  const plate = menuItems.find((m) => m.id === '13') ?? menuItems[0]

  return (
    <section
      className="section relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--brand-noir-2) 0%, var(--brand-noir) 100%)' }}
      aria-labelledby="build-heading"
    >
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 28 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="grid items-center gap-8 overflow-hidden rounded-[2rem] md:grid-cols-2"
          style={{
            background: 'linear-gradient(150deg, rgba(58, 27, 42,0.95) 0%, rgba(46, 21, 33,0.95) 100%)',
            border: '1px solid rgba(253,101,125,0.24)',
          }}
        >
          <div className="order-2 p-8 md:order-none md:p-11">
            <span className="eyebrow inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {isAr ? 'تجربة خاصة' : 'Make it yours'}
            </span>

            <h2 id="build-heading" className="mt-3 font-display text-3xl font-bold leading-tight text-brand-cream md:text-4xl">
              {isAr ? 'صمّم باستاتك الخاصة' : 'Build your own pasta'}
            </h2>

            <p className="mt-4 max-w-md text-[15px] leading-8 text-brand-cream-dim">
              {isAr
                ? 'اختر نوع الباستا والصوص والبروتين والجبن والإضافات — ونحضّرها كما تحب تمامًا.'
                : 'Pick the pasta, the sauce, the protein, the cheese and the toppings — and we make it exactly your way.'}
            </p>

            <p className="mt-6 text-sm text-brand-cream-soft">
              {isAr ? 'تبدأ من' : 'Starts at'}{' '}
              <span className="text-lg font-black text-brand-rose tabular-nums">{BUILD_BASE_PRICE}</span>{' '}
              <span className="font-bold text-brand-champagne">{isAr ? 'ر.س' : 'SAR'}</span>
            </p>

            <Link href="/build-your-pasta" className="btn-primary mt-7 inline-flex items-center gap-2 py-3.5 text-sm">
              {isAr ? 'ابدأ التصميم' : 'Start building'}
              <Arrow className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="relative order-1 aspect-[4/3] md:order-none md:aspect-auto md:h-full md:min-h-[24rem]">
            <Image
              src={plate.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(46, 21, 33,0.7) 0%, transparent 60%)' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
