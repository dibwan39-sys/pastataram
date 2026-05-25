'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Star, Plus, Flame, UtensilsCrossed } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import { useUIStore, useCartStore } from '@/lib/store'
import { menuItems } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

const categories = [
  { id: 'all', labelAr: 'الكل', labelEn: 'All' },
  { id: 'pasta', labelAr: 'باستا', labelEn: 'Pasta' },
  { id: 'sides', labelAr: 'مقبلات', labelEn: 'Sides' },
  { id: 'drinks', labelAr: 'مشروبات', labelEn: 'Drinks' },
]

export default function MenuPage() {
  const { language } = useUIStore()
  const { addItem } = useCartStore()
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
      {/* Header */}
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

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-brand-cream/90 dark:bg-[#1C1410]/90 backdrop-blur-lg border-b border-brand-rose/20 py-4">
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
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="premium-card overflow-hidden group"
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <motion.img
                        src={item.image}
                        alt={isAr ? item.nameAr : item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      {/* Tags */}
                      <div className="absolute top-3 start-3 flex gap-2">
                        {item.bestseller && (
                          <span className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-brand-rose-gold to-brand-champagne text-white text-xs font-bold rounded-full">
                            <Flame className="w-3 h-3" />
                            {isAr ? 'الأكثر مبيعاً' : 'Bestseller'}
                          </span>
                        )}
                        {item.featured && !item.bestseller && (
                          <span className="flex items-center gap-1 px-2.5 py-1 bg-brand-espresso/80 text-brand-champagne text-xs font-bold rounded-full">
                            <Star className="w-3 h-3" />
                            {isAr ? 'مميز' : 'Featured'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-black text-lg text-brand-espresso dark:text-brand-ivory mb-1">
                        {isAr ? item.nameAr : item.name}
                      </h3>
                      <p className="text-sm text-brand-brown dark:text-brand-mocha leading-relaxed mb-4">
                        {isAr ? item.descriptionAr : item.description}
                      </p>
                      {item.calories && (
                        <p className="text-xs text-brand-latte mb-4">
                          {item.calories} {isAr ? 'سعرة حرارية' : 'calories'}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-black gradient-text">
                          {formatPrice(item.price, language)}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            addItem(item)
                            toast.success(isAr ? `تمت إضافة ${item.nameAr}` : `${item.name} added!`)
                          }}
                          className="flex items-center gap-2 btn-primary text-sm py-2.5 px-5"
                        >
                          <Plus className="w-4 h-4" />
                          {isAr ? 'أضف للسلة' : 'Add to Cart'}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageWrapper>
  )
}
