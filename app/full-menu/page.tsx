'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Download, QrCode, BookOpen } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import MenuLightbox from '@/components/menu/MenuLightbox'
import { useUIStore } from '@/lib/store'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
}

export default function FullMenuPage() {
  const { language } = useUIStore()
  const isAr = language === 'ar'

  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative py-16 md:py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #F8D7E2 0%, #FCEEF4 55%, #F5DAEA 100%)' }}>
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(196,134,154,0.18) 0%, transparent 50%)' }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold mb-5" style={{ background: 'rgba(248,215,226,0.75)', border: '1px solid rgba(196,134,154,0.35)', color: '#8A3A56' }}>
              <BookOpen className="w-3.5 h-3.5" />
              {isAr ? 'المنيو' : 'The Menu'}
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#3D1F2B' }}>
              {isAr ? 'المنيو' : 'Our Menu'}
            </h1>
            <p className="text-sm md:text-base" style={{ color: 'rgba(92,47,61,0.7)' }}>
              {isAr ? 'قائمة الطعام والأسعار' : 'Full menu & prices'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Full-resolution menu image */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #FCEEF4 0%, #F8D7E2 100%)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fadeUp}>
            <MenuLightbox
              src="/images/menu.jpg"
              alt={isAr ? 'منيو باستاتا رام بالحجم الكامل' : 'PASTATARAM Full Menu'}
              hint={isAr ? 'اضغط للتكبير والتقريب' : 'Tap to zoom'}
              caption={isAr ? 'اضغط على الصورة للتقريب وعرضها بكامل الشاشة' : 'Tap the image to zoom & view fullscreen'}
            />
          </motion.div>

          {/* Actions */}
          <motion.div {...fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-9">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <a
                href="/images/menu.jpg"
                download
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white text-sm"
                style={{ background: 'linear-gradient(135deg, #A0455E 0%, #C4869A 60%, #D4A0B5 100%)', boxShadow: '0 8px 28px rgba(160,69,94,0.4)' }}
              >
                <Download className="w-4 h-4" />
                {isAr ? 'تحميل المنيو' : 'Download Menu'}
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm"
                style={{ background: 'rgba(248,215,226,0.65)', border: '1.5px solid rgba(196,134,154,0.5)', color: '#8A3A56' }}
              >
                {isAr ? 'اطلب من المنيو التفاعلي' : 'Order from Interactive Menu'}
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </motion.div>
          </motion.div>

          {/* QR card */}
          <motion.div {...fadeUp} className="mt-14 max-w-xl mx-auto">
            <div
              className="flex flex-col sm:flex-row items-center gap-6 p-7 md:p-8 rounded-3xl"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(248,215,226,0.7) 100%)',
                border: '1px solid rgba(196,134,154,0.3)',
                boxShadow: '0 12px 44px rgba(160,69,94,0.16)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="w-40 h-40 rounded-2xl overflow-hidden flex-shrink-0 bg-white" style={{ border: '2px solid rgba(196,134,154,0.4)', boxShadow: '0 6px 22px rgba(160,69,94,0.18)' }}>
                <img src="/images/menu-qr.jpg" alt={isAr ? 'باركود المنيو' : 'Menu QR code'} className="w-full h-full object-cover" />
              </div>
              <div className="text-center sm:text-start">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#A0455E' }}>
                  <QrCode className="w-3.5 h-3.5" />
                  {isAr ? 'منيو رقمي' : 'Digital Menu'}
                </span>
                <p className="font-black text-lg mb-1.5" style={{ color: '#3D1F2B' }}>
                  {isAr ? 'امسح الباركود لعرض المنيو' : 'Scan the code to view the menu'}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(92,47,61,0.65)' }}>
                  {isAr ? 'وجّه كاميرا هاتفك نحو الباركود للوصول السريع إلى قائمتنا الكاملة' : 'Point your phone camera at the code for instant access to our full menu'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
