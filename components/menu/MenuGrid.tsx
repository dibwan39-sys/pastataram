'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ProductCard from './ProductCard'
import { useUIStore } from '@/lib/store'
import { menuItems } from '@/lib/data'

/**
 * ════════════════════════════════════════════════════════════════
 *  The menu — ONE continuous collection
 * ════════════════════════════════════════════════════════════════
 *
 *  Every approved product lives in a single grid. The menu used to be split
 *  into a stack of per-category sections, each with its own heading, rule and
 *  count, and one product in four was promoted to a full-width card. That read
 *  as a run of unrelated landing-page blocks rather than a restaurant's menu:
 *  the customer had to jump between islands instead of scanning one list, and
 *  the promoted cards broke the proportion that makes a grid scannable at all.
 *
 *  Now the order declared in lib/data.ts is the order on the page — pasta,
 *  then sides, then drinks, flowing through the same columns without a break.
 *  Category filters narrow THIS collection; they never navigate away from it,
 *  and `all` simply shows the whole menu.
 *
 *  Columns: one on a phone, two on a tablet, three from `lg` up. Three keeps
 *  each photograph around 440px wide on a 1440px screen, which is the point
 *  where a plate still reads as food rather than a thumbnail.
 */

interface MenuGridProps {
  /** Ignore the active category filter — used by the homepage preview. */
  showAllCategories?: boolean
  className?: string
}

export default function MenuGrid({ showAllCategories = false, className = '' }: MenuGridProps) {
  const language = useUIStore((s) => s.language)
  const activeCategory = useUIStore((s) => s.activeCategory)
  const isAr = language === 'ar'
  const reduce = useReducedMotion()

  const items =
    showAllCategories || activeCategory === 'all'
      ? menuItems
      : menuItems.filter((m) => m.category === activeCategory)

  if (items.length === 0) {
    return (
      <p className="py-16 text-center text-brand-cream-dim">
        {isAr ? 'لا توجد أصناف في هذا القسم.' : 'No items in this category.'}
      </p>
    )
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={showAllCategories ? 'all' : activeCategory}
          initial={reduce ? undefined : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6"
          role="list"
          aria-label={isAr ? 'أصناف القائمة' : 'Menu items'}
        >
          {items.map((item, i) => (
            <ProductCard key={item.id} item={item} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
