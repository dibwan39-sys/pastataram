'use client'

import { motion } from 'framer-motion'
import { UtensilsCrossed } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import ProductCard from '@/components/menu/ProductCard'
import MenuImageSection from '@/components/menu/MenuImageSection'
import SocialQRSection from '@/components/menu/SocialQRSection'
import { useUIStore } from '@/lib/store'
import { menuItems } from '@/lib/data'

export default function MenuPage() {
  const { language } = useUIStore()
  const isAr = language === 'ar'

  return (
    <PageWrapper>
      {/* 1. Full menu image */}
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

      {/* 3. Interactive products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, i) => (
              <ProductCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Social QR codes */}
      <SocialQRSection />

      {/* Contact information is provided globally by the site Footer */}
    </PageWrapper>
  )
}
