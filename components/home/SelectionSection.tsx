'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react'
import { menuItems } from '@/lib/data'
import { useUIStore } from '@/lib/store'
import type { MenuItem } from '@/lib/types'
import ProductSheet from '@/components/menu/ProductSheet'
import { Price } from '@/components/menu/OrderControls'

/**
 * A curated row of dishes, presented as tall editorial plates rather than the
 * upright cards used on the menu page — the homepage should not look like the
 * menu repeated.
 *
 * Deliberately titled "مختارات باستاتارام" / "The PASTATARAM Selection" and
 * not "Best Sellers". Nothing in this project records sales, so a popularity
 * claim would be invented. `featured` and `bestseller` in lib/data.ts are
 * curation flags set by hand, and this section presents them as exactly that.
 */
export default function SelectionSection() {
  const language = useUIStore((s) => s.language)
  const isAr = language === 'ar'
  const reduce = useReducedMotion()
  const [active, setActive] = useState<MenuItem | null>(null)

  // Curated first, then whatever else is needed to fill the row — never padded
  // with an empty slot, never duplicated.
  const curated = menuItems.filter((m) => m.featured || m.bestseller)
  const selection = (curated.length >= 4 ? curated : [...curated, ...menuItems.filter((m) => !curated.includes(m))]).slice(0, 4)

  const Arrow = isAr ? ArrowLeft : ArrowRight

  return (
    <section
      className="section relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--brand-surface) 0%, var(--brand-noir) 100%)' }}
      aria-labelledby="selection-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <span className="eyebrow">{isAr ? 'مختاراتنا' : 'Our Selection'}</span>
          <h2 id="selection-heading" className="mt-3 font-display display-lg font-bold text-brand-cream">
            {isAr ? 'مختارات باستاتارام' : 'The PASTATARAM Selection'}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-8 text-brand-cream-dim">
            {isAr
              ? 'أطباق اخترناها بعناية لتبدأ منها تجربتك معنا.'
              : 'A few plates we would put in front of you first.'}
          </p>
        </motion.div>

        {/* Scroll-snap rail on a phone, grid from tablet up */}
        <ul className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [scrollbar-width:none]">
          {selection.map((item, i) => (
            <motion.li
              key={item.id}
              initial={reduce ? undefined : { opacity: 0, y: 28 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="w-[74vw] flex-shrink-0 snap-start sm:w-auto"
            >
              <button
                type="button"
                onClick={() => setActive(item)}
                className="group block w-full text-start"
              >
                <div
                  className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem]"
                  style={{ border: '1px solid rgba(231,198,164,0.16)' }}
                >
                  <Image
                    src={item.image}
                    alt={isAr ? item.nameAr : item.name}
                    fill
                    sizes="(max-width: 640px) 74vw, (max-width: 1024px) 45vw, 23vw"
                    className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.08]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(22, 7, 13,0.9) 0%, rgba(22, 7, 13,0.15) 55%, transparent 100%)' }}
                  />

                  {/* Hover affordance */}
                  <span
                    aria-hidden
                    className="absolute end-3 top-3 flex h-9 w-9 items-center justify-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                    style={{ background: 'linear-gradient(135deg, #C43E57, #FD657D)' }}
                  >
                    <Plus className="h-4 w-4 text-white" />
                  </span>

                  <div className="absolute bottom-4 start-4 end-4">
                    <h3 className="font-display text-lg font-bold leading-tight text-brand-cream drop-shadow">
                      {isAr ? item.nameAr : item.name}
                    </h3>
                    <div className="mt-1.5">
                      <Price value={item.price} isAr={isAr} size="sm" />
                    </div>
                  </div>
                </div>
              </button>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={reduce ? undefined : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link href="/menu" className="btn-primary inline-flex items-center gap-2 py-3.5 text-sm">
            {isAr ? 'تصفّح القائمة كاملة' : 'Browse the full menu'}
            <Arrow className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>
      </div>

      <ProductSheet item={active} open={active !== null} onClose={() => setActive(null)} />
    </section>
  )
}
