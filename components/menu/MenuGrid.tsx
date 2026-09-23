'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ProductCard from './ProductCard'
import { CATEGORY_LABELS } from './CategoryNav'
import { useUIStore } from '@/lib/store'
import { menuItems } from '@/lib/data'
import type { MenuItem } from '@/lib/types'

/**
 * Groups the menu into category sections, keeping the order declared in
 * lib/data.ts — both the order of the categories and of the items inside them.
 * Reordering the data reorders the page; nothing here needs to change.
 */
function groupByCategory(items: MenuItem[]) {
  const groups: { category: string; items: MenuItem[] }[] = []
  for (const item of items) {
    const group = groups.find((g) => g.category === item.category)
    if (group) group.items.push(item)
    else groups.push({ category: item.category, items: [item] })
  }
  return groups
}

/**
 * Visual rhythm.
 *
 * A long run of identical upright cards reads as an e-commerce catalogue. Every
 * fourth product is promoted to a full-width horizontal card instead, which
 * breaks the grid and gives one dish a larger photograph — the way a printed
 * menu gives a page to a plate.
 *
 * The rule is positional, so it adapts to however many products a category
 * holds and never leaves an empty slot: with five items a category reads as
 * three cards, one wide feature, then one card.
 */
const isWideSlot = (index: number, total: number) => total >= 4 && index % 4 === 3

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

  const filtered =
    showAllCategories || activeCategory === 'all'
      ? menuItems
      : menuItems.filter((m) => m.category === activeCategory)

  const groups = groupByCategory(filtered)

  if (groups.length === 0) {
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
        >
          {groups.map((group, gi) => {
            const label = CATEGORY_LABELS[group.category]
            const total = group.items.length

            return (
              <section key={group.category} className={gi > 0 ? 'mt-16' : ''} aria-labelledby={`cat-${group.category}`}>
                <div className="mb-7 flex items-center gap-4">
                  <h3
                    id={`cat-${group.category}`}
                    className="whitespace-nowrap font-display text-2xl font-bold text-brand-cream md:text-[1.75rem]"
                  >
                    {label ? (isAr ? label.ar : label.en) : group.category}
                  </h3>
                  <span className="rule-fade flex-1" aria-hidden />
                  <span className="text-xs font-semibold tabular-nums text-brand-muted">
                    {total} {isAr ? 'صنف' : total === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
                  {group.items.map((item, i) => {
                    const wide = isWideSlot(i, total)
                    return (
                      <div key={item.id} className={wide ? 'sm:col-span-2 lg:col-span-3' : ''}>
                        <ProductCard item={item} index={i} variant={wide ? 'wide' : 'standard'} />
                      </div>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
