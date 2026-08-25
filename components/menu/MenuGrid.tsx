'use client'

import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { useUIStore } from '@/lib/store'
import { menuItems } from '@/lib/data'
import type { MenuItem } from '@/lib/types'

/** Section titles per category, in the brand's two languages. */
const CATEGORY_LABELS: Record<string, { ar: string; en: string }> = {
  pasta: { ar: 'الباستا', en: 'Pasta' },
  sides: { ar: 'المقبلات', en: 'Sides' },
  drinks: { ar: 'المشروبات', en: 'Drinks' },
}

/**
 * Groups the menu into category sections, keeping the order defined in
 * `lib/data.ts` — both the order of the categories and of the items inside
 * them. Reordering the data reorders the page, no changes needed here.
 */
function groupByCategory(items: MenuItem[]) {
  const groups: { category: string; items: MenuItem[] }[] = []
  items.forEach((item) => {
    const last = groups.find((g) => g.category === item.category)
    if (last) last.items.push(item)
    else groups.push({ category: item.category, items: [item] })
  })
  return groups
}

interface MenuGridProps {
  /** 'dark' for always-dark sections (home page), 'auto' to follow the theme. */
  tone?: 'auto' | 'dark'
  className?: string
}

export default function MenuGrid({ tone = 'auto', className = '' }: MenuGridProps) {
  const { language } = useUIStore()
  const isAr = language === 'ar'
  const groups = groupByCategory(menuItems)

  return (
    <div className={className}>
      {groups.map((group, gi) => {
        const label = CATEGORY_LABELS[group.category]
        return (
          <section key={group.category} className={gi > 0 ? 'mt-14' : ''}>
            {/* Category title with the brand's copper rule */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: gi * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-6"
            >
              <h3
                className={`text-xl md:text-2xl font-black whitespace-nowrap ${
                  tone === 'dark' ? '' : 'text-brand-espresso dark:text-brand-ivory'
                }`}
                style={tone === 'dark' ? { color: '#F2E8DA' } : undefined}
              >
                {label ? (isAr ? label.ar : label.en) : group.category}
              </h3>
              <div
                className="h-px flex-1 rounded-full"
                style={{
                  background: isAr
                    ? 'linear-gradient(270deg, rgba(184,115,51,0), #B87333 15%, rgba(216,162,74,0.25))'
                    : 'linear-gradient(90deg, rgba(184,115,51,0), #B87333 15%, rgba(216,162,74,0.25))',
                }}
              />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {group.items.map((item, i) => (
                <ProductCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
