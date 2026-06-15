'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { QrCode, BookOpen, Smartphone, ArrowLeft, ArrowRight } from 'lucide-react'
import { useUIStore } from '@/lib/store'

const ORDER_QR = '/images/order-qr.png'

/**
 * "الطلب عبر الباركود" — QR ordering feature.
 * Customer scans the QR → opens the menu on their phone → orders via the cart
 * + WhatsApp checkout. Includes a direct button for visitors already on mobile.
 */
export default function QROrderSection() {
  const { language } = useUIStore()
  const isAr = language === 'ar'

  const steps = isAr
    ? [
        { icon: QrCode, title: 'امسح الباركود', desc: 'وجّه كاميرا هاتفك نحو الكود' },
        { icon: BookOpen, title: 'تصفّح المنيو', desc: 'استعرض الأطباق والأسعار' },
        { icon: Smartphone, title: 'اطلب من هاتفك', desc: 'أضِف للسلة وأرسل الطلب عبر واتساب' },
      ]
    : [
        { icon: QrCode, title: 'Scan the code', desc: 'Point your phone camera at the QR' },
        { icon: BookOpen, title: 'Browse the menu', desc: 'View all dishes & prices' },
        { icon: Smartphone, title: 'Order from your phone', desc: 'Add to cart & send via WhatsApp' },
      ]

  return (
    <section className="section relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #211C19 0%, #14110F 100%)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.22em] mb-3" style={{ color: '#7B1E2B' }}>
            <QrCode className="w-3.5 h-3.5" />
            {isAr ? 'الطلب الذكي' : 'Smart Ordering'}
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: '#F2E8DA' }}>
            {isAr ? 'اطلب عبر الباركود' : 'Order via QR'}
          </h2>
          <p className="text-sm md:text-base" style={{ color: 'rgba(201,187,168,0.7)' }}>
            {isAr ? 'امسح · تصفّح المنيو · اطلب من هاتفك مباشرة' : 'Scan · browse the menu · order right from your phone'}
          </p>
          <div className="w-10 h-0.5 rounded-full mx-auto mt-4" style={{ background: 'linear-gradient(90deg, #7B1E2B, #D8A24A)' }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 24 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1 space-y-5"
          >
            {steps.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={s.title} className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #211C19, #D8A24A)' }}>
                      <Icon className="w-5 h-5" style={{ color: '#C9BBA8' }} />
                    </div>
                    <span className="absolute -top-1.5 -end-1.5 w-5 h-5 rounded-full text-white text-[11px] font-black flex items-center justify-center" style={{ background: '#7B1E2B' }}>
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-black text-base mb-0.5" style={{ color: '#F2E8DA' }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(201,187,168,0.7)' }}>{s.desc}</p>
                  </div>
                </div>
              )
            })}

            {/* Direct button for visitors already on a phone */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block pt-2">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white text-sm"
                style={{ background: 'linear-gradient(135deg, #7B1E2B, #B87333)', boxShadow: '0 8px 24px rgba(123,30,43,0.35)' }}
              >
                {isAr ? 'افتح المنيو واطلب الآن' : 'Open the menu & order now'}
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </motion.div>
          </motion.div>

          {/* QR card */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div
              className="rounded-3xl p-6 sm:p-8 text-center max-w-xs w-full"
              style={{
                background: 'linear-gradient(145deg, rgba(33,28,25,0.96) 0%, rgba(33,28,25,0.7) 100%)',
                border: '1px solid rgba(184,115,51,0.3)',
                boxShadow: '0 18px 60px rgba(123,30,43,0.2)',
              }}
            >
              <div className="rounded-2xl bg-[#1A1614] p-4 mb-4" style={{ border: '2px solid rgba(184,115,51,0.35)', boxShadow: '0 6px 22px rgba(123,30,43,0.16)' }}>
                <img src={ORDER_QR} alt={isAr ? 'باركود الطلب' : 'Order QR code'} className="w-full h-auto" />
              </div>
              <p className="font-black text-base mb-1" style={{ color: '#F2E8DA' }}>PASTATARAM</p>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(201,187,168,0.55)' }}>
                {isAr ? 'امسح لعرض المنيو والطلب' : 'Scan to view the menu & order'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
