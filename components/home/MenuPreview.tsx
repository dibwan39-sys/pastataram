'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react'
import MenuImageSection from '@/components/menu/MenuImageSection'
import { useUIStore } from '@/lib/store'
import { menuItems } from '@/lib/data'
import { menuCategories, CATEGORY_LABELS } from '@/components/menu/CategoryNav'

/**
 * The homepage's window onto the menu: a short editorial intro, the official
 * menu artwork, and a route into the interactive ordering experience.
 *
 * The official menu image (public/images/menu-final-v2.webp) is the complete
 * visual reference and is presented as its own considered moment, not dropped
 * into a generic image box. It complements the interactive products — it does
 * not replace them, and a customer never has to zoom into artwork to find out
 * what is orderable.
 */
export default function MenuPreview() {
  const language = useUIStore((s) => s.language)
  const isAr = language === 'ar'
  const reduce = useReducedMotion()
  const Arrow = isAr ? ArrowLeft : ArrowRight

  const categories = menuCategories()

  return (
    <section
      className="section relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--brand-noir) 0%, var(--brand-noir-2) 100%)' }}
      aria-labelledby="menu-preview-heading"
    >
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={reduce ? { opacity: 1, y: 0, x: 0, scale: 1, scaleX: 1 } : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center"
        >
          <span className="eyebrow inline-flex items-center gap-2">
            <BookOpen className="h-3.5 w-3.5" aria-hidden />
            {isAr ? 'القائمة الكاملة' : 'The Full Menu'}
          </span>
          <h2 id="menu-preview-heading" className="mt-3 font-display display-lg font-bold text-brand-cream">
            {isAr ? 'قائمة باستاتارام' : 'The PASTATARAM Menu'}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-8 text-brand-cream-dim">
            {isAr
              ? 'اختر طبقك، أضف لمستك، واستمتع بتجربة باستا مختلفة.'
              : 'Choose your plate, add your touch, and enjoy pasta done differently.'}
          </p>

          {/* Category names come from the products themselves */}
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-semibold text-brand-cream-dim">
            {categories.map((c, i) => (
              <li key={c} className="inline-flex items-center gap-3">
                {i > 0 && <span aria-hidden className="text-brand-line">·</span>}
                <span>
                  {CATEGORY_LABELS[c] ? (isAr ? CATEGORY_LABELS[c].ar : CATEGORY_LABELS[c].en) : c}
                  <span className="ms-1.5 text-brand-muted tabular-nums">
                    {menuItems.filter((m) => m.category === c).length}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* The approved menu artwork, with zoom and fullscreen */}
        <MenuImageSection showHeading={false} compact />

        <motion.div
          initial={reduce ? { opacity: 1, y: 0, x: 0, scale: 1, scaleX: 1 } : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 text-center"
        >
          <Link href="/menu" className="btn-primary inline-flex items-center gap-2 py-3.5 text-sm">
            {isAr ? 'اطلب من القائمة التفاعلية' : 'Order from the interactive menu'}
            <Arrow className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
