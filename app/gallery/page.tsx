'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Camera, Instagram, Grid, LayoutGrid } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import { useUIStore } from '@/lib/store'
import { galleryImages } from '@/lib/data'

const galleryCategories = [
  { id: 'all', labelAr: 'الكل', labelEn: 'All' },
  { id: 'food', labelAr: 'الأطعمة', labelEn: 'Food' },
  { id: 'ingredients', labelAr: 'المكونات', labelEn: 'Ingredients' },
  { id: 'experience', labelAr: 'التجربة', labelEn: 'Experience' },
]

export default function GalleryPage() {
  const { language } = useUIStore()
  const isAr = language === 'ar'
  const [activeCategory, setActiveCategory] = useState('all')
  const [selected, setSelected] = useState<string | null>(null)
  const [layout, setLayout] = useState<'grid' | 'masonry'>('masonry')

  const filtered = galleryImages.filter(
    (img) => activeCategory === 'all' || img.category === activeCategory
  )

  const selectedImage = galleryImages.find((img) => img.id === selected)

  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-brand-cream via-brand-blush/30 to-brand-pearl dark:from-[#1C1410] dark:via-[#2A1F1C] dark:to-[#1C1410]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-brand-rose-gold text-sm font-bold mb-6">
              <Camera className="w-4 h-4" />
              {isAr ? 'معرض الصور' : 'Photo Gallery'}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-espresso dark:text-brand-ivory mb-4">
              {isAr ? 'لحظات باستاتا رام' : 'PASTATARAM Moments'}
            </h1>
            <p className="text-brand-brown dark:text-brand-mocha max-w-lg mx-auto">
              {isAr ? 'تشكيلة من أجمل لحظاتنا وأطباقنا المميزة' : 'A collection of our most beautiful moments and signature dishes'}
            </p>
            <a
              href="https://instagram.com/pastataram"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-brand-rose-gold font-semibold hover:underline"
            >
              <Instagram className="w-4 h-4" />
              @pastataram
            </a>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-brand-cream/90 dark:bg-[#1C1410]/90 backdrop-blur-lg border-b border-brand-rose/20 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {galleryCategories.map((cat) => (
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
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLayout('masonry')}
              className={`p-2 rounded-lg transition-colors ${layout === 'masonry' ? 'text-brand-rose-gold bg-brand-blush/50' : 'text-brand-latte hover:bg-brand-blush/30'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout('grid')}
              className={`p-2 rounded-lg transition-colors ${layout === 'grid' ? 'text-brand-rose-gold bg-brand-blush/50' : 'text-brand-latte hover:bg-brand-blush/30'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + layout}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={
                layout === 'grid'
                  ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
                  : 'columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4'
              }
            >
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => setSelected(img.id)}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                    layout === 'masonry' ? 'mb-4 break-inside-avoid' : ''
                  } ${layout === 'grid' ? 'aspect-square' : ''}`}
                >
                  <img
                    src={img.url}
                    alt={isAr ? img.altAr : img.alt}
                    className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                      layout === 'grid' ? 'h-full' : ''
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-semibold text-sm">{isAr ? img.altAr : img.alt}</p>
                  </div>
                  {img.featured && (
                    <div className="absolute top-3 end-3 w-6 h-6 bg-brand-rose-gold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Instagram className="w-3 h-3 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-12 end-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <div className="rounded-3xl overflow-hidden">
                <img
                  src={selectedImage.url}
                  alt={isAr ? selectedImage.altAr : selectedImage.alt}
                  className="w-full max-h-[80vh] object-contain"
                />
              </div>
              <p className="text-white/70 text-center mt-4 text-sm">
                {isAr ? selectedImage.altAr : selectedImage.alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instagram CTA */}
      <section className="section bg-brand-pearl dark:bg-[#231A17]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="premium-card p-10"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6">
              <Instagram className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-black text-brand-espresso dark:text-brand-ivory mb-3">
              {isAr ? 'تابعونا على إنستقرام' : 'Follow Us on Instagram'}
            </h2>
            <p className="text-brand-brown dark:text-brand-mocha mb-6">
              {isAr
                ? 'شاركوا لحظاتكم معنا وتابعونا لأحدث العروض والمستجدات'
                : 'Share your moments with us and follow for the latest offers and updates'}
            </p>
            <a
              href="https://instagram.com/pastataram"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-primary px-8 py-3"
            >
              <Instagram className="w-4 h-4" />
              @pastataram
            </a>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
