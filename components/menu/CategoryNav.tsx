'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { menuItems } from '@/lib/data'
import { useUIStore } from '@/lib/store'

/**
 * Category labels. Only categories that actually occur in lib/data.ts are ever
 * offered — the list below is a lookup, not a definition, so a category with
 * no products simply never appears.
 */
export const CATEGORY_LABELS: Record<string, { ar: string; en: string }> = {
  pasta: { ar: 'الباستا', en: 'Pasta' },
  sides: { ar: 'المقبلات', en: 'Sides' },
  drinks: { ar: 'المشروبات', en: 'Drinks' },
}

/** Categories present in the data, in the order the data declares them. */
export function menuCategories() {
  const seen: string[] = []
  for (const item of menuItems) if (!seen.includes(item.category)) seen.push(item.category)
  return seen
}

export default function CategoryNav({ className = '' }: { className?: string }) {
  const language = useUIStore((s) => s.language)
  const activeCategory = useUIStore((s) => s.activeCategory)
  const setActiveCategory = useUIStore((s) => s.setActiveCategory)
  const isAr = language === 'ar'
  const reduce = useReducedMotion()

  const categories = menuCategories()
  const tabs = [
    { id: 'all', label: isAr ? 'الكل' : 'All', count: menuItems.length },
    ...categories.map((c) => ({
      id: c,
      label: CATEGORY_LABELS[c] ? (isAr ? CATEGORY_LABELS[c].ar : CATEGORY_LABELS[c].en) : c,
      count: menuItems.filter((m) => m.category === c).length,
    })),
  ]

  return (
    <nav
      aria-label={isAr ? 'أقسام القائمة' : 'Menu categories'}
      className={`-mx-6 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]{display:none} ${className}`}
    >
      <ul className="flex w-max min-w-full items-center justify-start gap-2 md:justify-center">
        {tabs.map((tab) => {
          const active = activeCategory === tab.id
          return (
            <li key={tab.id}>
              <button
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                aria-current={active ? 'true' : undefined}
                className="relative inline-flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition-colors"
                style={{
                  color: active ? '#FFF3EE' : '#D8C2BD',
                  border: `1px solid ${active ? 'transparent' : 'rgba(231,198,164,0.26)'}`,
                }}
              >
                {/* One shared pill that slides between tabs */}
                {active && (
                  <motion.span
                    layoutId="category-pill"
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #C43E57, #FD657D)' }}
                    transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative">{tab.label}</span>
                <span
                  className="relative text-[11px] tabular-nums"
                  style={{ color: active ? 'rgba(255,243,238,0.75)' : '#A88E8E' }}
                >
                  {tab.count}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
