'use client'

import { motion, useReducedMotion } from 'framer-motion'
import BranchCards from '@/components/branches/BranchCards'
import { useUIStore } from '@/lib/store'
import { branches } from '@/lib/data'

/**
 * Where to find PASTATARAM. The cards themselves come from
 * components/branches/BranchCards so /contact and the homepage can never
 * describe a branch differently, and so the count is always whatever
 * lib/data.ts actually lists.
 */
export default function BranchesSection() {
  const language = useUIStore((s) => s.language)
  const isAr = language === 'ar'
  const reduce = useReducedMotion()

  return (
    <section
      className="section relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #120C10 0%, #1F1419 100%)' }}
      aria-labelledby="branches-heading"
    >
      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-11 text-center"
        >
          <span className="eyebrow">{isAr ? 'زورونا' : 'Visit Us'}</span>
          <h2 id="branches-heading" className="mt-3 font-display display-lg font-bold text-brand-cream">
            {isAr ? 'فروعنا في جدة' : 'Our branches in Jeddah'}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-8 text-brand-cream-dim">
            {isAr
              ? `${branches.length === 2 ? 'فرعان' : `${branches.length} فروع`} في خدمتكم يومياً.`
              : `${branches.length} branches, open every day.`}
          </p>
        </motion.div>

        <BranchCards />
      </div>
    </section>
  )
}
