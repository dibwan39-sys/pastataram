'use client'

import { motion } from 'framer-motion'
import { Tag, Clock, Percent, Zap, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import PageWrapper from '@/components/layout/PageWrapper'
import { useUIStore } from '@/lib/store'
import { offers } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function OffersPage() {
  const { language } = useUIStore()
  const isAr = language === 'ar'
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast.success(isAr ? 'تم نسخ الكود!' : 'Code copied!')
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const activeOffers = offers.filter((o) => o.active)

  const getDaysLeft = (date: Date) => {
    const diff = new Date(date).getTime() - Date.now()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-brand-espresso to-brand-brown">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #CFA18D 0%, transparent 50%)' }} />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-ivory/10 text-brand-champagne text-sm font-bold mb-6">
              <Tag className="w-4 h-4" />
              {isAr ? 'عروض حصرية' : 'Exclusive Offers'}
            </div>
            <h1 className="text-5xl font-black text-white mb-4">
              {isAr ? 'العروض والتخفيضات' : 'Offers & Discounts'}
            </h1>
            <p className="text-brand-ivory/70">
              {isAr ? 'استمتع بأفضل العروض على أطباقنا المميزة' : 'Enjoy the best deals on our signature dishes'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-4xl overflow-hidden bg-gradient-to-r from-brand-rose-gold via-brand-champagne to-brand-copper p-8 md:p-12"
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, white 0%, transparent 60%)' }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {isAr ? '🔥 العرض الأبرز' : '🔥 Featured Deal'}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                  {isAr ? activeOffers[0]?.titleAr : activeOffers[0]?.title}
                </h2>
                <p className="text-white/80 text-lg">
                  {isAr ? activeOffers[0]?.descriptionAr : activeOffers[0]?.description}
                </p>
              </div>
              <div className="text-center flex-shrink-0">
                <div className="text-6xl font-black text-white mb-1">
                  {activeOffers[0]?.discount}{activeOffers[0]?.discountType === 'percentage' ? '%' : ' SAR'}
                </div>
                <p className="text-white/70 text-sm">{isAr ? 'خصم' : 'Off'}</p>
                {activeOffers[0]?.code && (
                  <button
                    onClick={() => copyCode(activeOffers[0].code!)}
                    className="mt-3 flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full font-mono font-bold text-sm transition-colors"
                  >
                    {copiedCode === activeOffers[0].code ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {activeOffers[0].code}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black text-brand-espresso dark:text-brand-ivory mb-8">
            {isAr ? 'جميع العروض' : 'All Offers'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeOffers.map((offer, i) => {
              const daysLeft = getDaysLeft(offer.validUntil)
              return (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="premium-card overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={offer.image}
                      alt={isAr ? offer.titleAr : offer.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/60 to-transparent" />
                    <div className="absolute top-3 start-3 flex items-center gap-1.5 bg-gradient-to-r from-brand-rose-gold to-brand-champagne text-white px-3 py-1.5 rounded-full text-sm font-bold">
                      <Percent className="w-3 h-3" />
                      {offer.discount}{offer.discountType === 'percentage' ? '%' : ' SAR'} {isAr ? 'خصم' : 'Off'}
                    </div>
                    {daysLeft <= 7 && daysLeft > 0 && (
                      <div className="absolute top-3 end-3 flex items-center gap-1 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-bold">
                        <Clock className="w-3 h-3" />
                        {daysLeft} {isAr ? 'أيام' : 'days left'}
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="font-black text-lg text-brand-espresso dark:text-brand-ivory mb-1">
                      {isAr ? offer.titleAr : offer.title}
                    </h3>
                    <p className="text-sm text-brand-brown dark:text-brand-mocha mb-4 leading-relaxed">
                      {isAr ? offer.descriptionAr : offer.description}
                    </p>

                    {offer.code && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs text-brand-latte">{isAr ? 'كود الخصم:' : 'Promo Code:'}</span>
                        <button
                          onClick={() => copyCode(offer.code!)}
                          className="flex items-center gap-1.5 bg-brand-blush dark:bg-brand-espresso/30 hover:bg-brand-rose/30 px-3 py-1.5 rounded-full font-mono text-sm font-bold text-brand-espresso dark:text-brand-ivory transition-colors"
                        >
                          {copiedCode === offer.code ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          {offer.code}
                        </button>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-brand-latte flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {isAr ? 'ينتهي: ' : 'Expires: '}
                        {new Date(offer.validUntil).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <Link href="/order" className="btn-primary text-xs px-4 py-2">
                        {isAr ? 'اطلب الآن' : 'Order Now'}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-brand-pearl dark:bg-[#231A17]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="premium-card p-10"
          >
            <Zap className="w-10 h-10 text-brand-rose-gold mx-auto mb-4" />
            <h2 className="text-2xl font-black text-brand-espresso dark:text-brand-ivory mb-3">
              {isAr ? 'لا تفوتوا أي عرض!' : "Don't Miss Any Deal!"}
            </h2>
            <p className="text-brand-brown dark:text-brand-mocha mb-6">
              {isAr ? 'تابعونا على إنستقرام لأحدث العروض الحصرية' : 'Follow us on Instagram for the latest exclusive offers'}
            </p>
            <a
              href="https://instagram.com/pastataram"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-3 inline-flex items-center gap-2"
            >
              @pastataram
            </a>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
