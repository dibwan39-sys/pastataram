'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, UtensilsCrossed } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import ProductCard from '@/components/menu/ProductCard'
import MenuImageSection from '@/components/menu/MenuImageSection'
import SocialQRSection from '@/components/menu/SocialQRSection'
import { useUIStore } from '@/lib/store'
import { menuItems } from '@/lib/data'

const categories = [
  { id: 'all', labelAr: 'الكل', labelEn: 'All' },
  { id: 'pasta', labelAr: 'باستا', labelEn: 'Pasta' },
  { id: 'sides', labelAr: 'مقبلات', labelEn: 'Sides' },
  { id: 'drinks', labelAr: 'مشروبات', labelEn: 'Drinks' },
]

export default function MenuPage() {
  const { language } = useUIStore()
  const isAr = language === 'ar'
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.nameAr.includes(search)
      return matchesCat && matchesSearch
    })
  }, [activeCategory, search])

  return (
    <PageWrapper>
      {/* 1. Full menu image — first, before title/search/filters/products */}
      <MenuImageSection showHeading={false} compact />

      {/* 2. Menu Title */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-brand-cream via-brand-blush/30 to-brand-pearl dark:from-[#1C1410] dark:via-[#2A1F1C] dark:to-[#1C1410]">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #CFA18D33 0%, transparent 50%)' }} />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-brand-rose-gold text-sm font-bold mb-6">
              <UtensilsCrossed className="w-4 h-4" />
              {isAr ? 'قائمة الطعام' : 'Our Menu'}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-espresso dark:text-brand-ivory mb-4">
              {isAr ? 'تشكيلة باستاتا رام' : 'PASTATARAM Selection'}
            </h1>
            <p className="text-brand-brown dark:text-brand-mocha max-w-lg mx-auto">
              {isAr
                ? 'أطباق باستا فاخرة مُصنَّعة بأجود المكونات الإيطالية'
                : 'Premium pasta dishes crafted with the finest Italian ingredients'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3 + 4. Search box & categories — sticky filter bar.
          NOTE: no backdrop-filter here — on iOS Safari an element that has both
          position:sticky AND backdrop-filter fails to stick. We use a solid,
          near-opaque background instead so sticky works on every browser. */}
      <section
        className="sticky z-40 border-b border-brand-rose/20 py-4"
        style={{ top: '70px', backgroundColor: 'rgba(252,238,244,0.97)', boxShadow: '0 8px 24px rgba(160,69,94,0.12)' }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-latte" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isAr ? 'ابحث عن طبق...' : 'Search dishes...'}
                className="w-full ps-10 pe-4 py-2.5 rounded-full border border-brand-rose/30 bg-brand-pearl dark:bg-brand-espresso/30 text-brand-espresso dark:text-brand-ivory placeholder-brand-latte focus:outline-none focus:border-brand-rose-gold focus:ring-2 focus:ring-brand-rose-gold/20 text-sm"
                dir={isAr ? 'rtl' : 'ltr'}
              />
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-brand-rose-gold to-brand-champagne text-white shadow-brand'
                      : 'bg-brand-pearl dark:bg-brand-espresso/30 text-brand-brown dark:text-brand-mocha hover:bg-brand-blush/50'
                  }`}
                >
                  {isAr ? cat.labelAr : cat.labelEn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <UtensilsCrossed className="w-12 h-12 text-brand-latte mx-auto mb-4" />
                <p className="text-brand-brown dark:text-brand-mocha font-medium">
                  {isAr ? 'لا توجد نتائج' : 'No results found'}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((item, i) => (
                  <ProductCard key={item.id} item={item} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Social QR codes */}
      <SocialQRSection />

      {/* Contact information is provided globally by the site Footer */}
    </PageWrapper>
  )
}
