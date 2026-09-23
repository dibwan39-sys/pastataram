'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, MessageCircle, Phone } from 'lucide-react'
import { cmsContent, menuItems, workingHours } from '@/lib/data'
import { getWhatsAppLink } from '@/lib/utils'
import { useUIStore } from '@/lib/store'

/**
 * The closing frame — one clear way to order, plus the two direct channels the
 * restaurant already uses. Numbers and links come from cmsContent so there is
 * one place to change them.
 */
export default function FinalCTA() {
  const language = useUIStore((s) => s.language)
  const isAr = language === 'ar'
  const reduce = useReducedMotion()
  const Arrow = isAr ? ArrowLeft : ArrowRight

  const backdrop = menuItems.find((m) => m.id === '2') ?? menuItems[0]
  const waLink = getWhatsAppLink(
    cmsContent.whatsappNumber,
    isAr ? 'السلام عليكم، أريد الطلب من باستاتا رام' : 'Hello, I would like to order from PASTATARAM'
  )

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="final-cta-heading"
      style={{ background: 'var(--brand-ink)' }}
    >
      <div className="absolute inset-0">
        <Image src={backdrop.image} alt="" fill sizes="100vw" quality={75} className="object-cover" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, var(--brand-noir) 0%, rgba(22, 7, 13,0.82) 35%, rgba(22, 7, 13,0.94) 100%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
        style={{ background: 'radial-gradient(ellipse, rgba(253,101,125,0.2) 0%, transparent 70%)' }}
      />

      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 28 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="section relative mx-auto max-w-3xl px-6 text-center"
      >
        <span className="eyebrow">{isAr ? 'جاهزون لخدمتك' : 'Ready when you are'}</span>

        <h2 id="final-cta-heading" className="mt-3 font-display display-lg font-bold text-brand-cream">
          {isAr ? 'تجربة باستا تستحق أن تُعاش' : 'A pasta experience worth having'}
        </h2>

        <div className="rule-fade mx-auto my-7 max-w-[10rem]" aria-hidden />

        <p className="mx-auto max-w-lg text-[15px] leading-9 text-brand-cream-dim">
          {isAr ? cmsContent.heroSubtitleAr : cmsContent.heroSubtitle}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/menu" className="btn-primary inline-flex w-full items-center justify-center gap-2 py-3.5 text-base sm:w-auto">
            {isAr ? 'اطلب الآن' : 'Order Now'}
            <Arrow className="h-4 w-4" aria-hidden />
          </Link>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 px-8 text-base font-bold text-[#0A2616] transition-transform hover:scale-[1.02] sm:w-auto"
            style={{ background: '#25D366', boxShadow: '0 10px 30px rgba(37,211,102,0.3)' }}
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            {isAr ? 'اطلب عبر واتساب' : 'Order on WhatsApp'}
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-brand-cream-dim">
          <a href={`tel:${cmsContent.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 hover:text-brand-rose">
            <Phone className="h-3.5 w-3.5 text-brand-rose" aria-hidden />
            <span dir="ltr">{cmsContent.phone}</span>
          </a>
          <span aria-hidden className="text-brand-line">|</span>
          <span>{isAr ? workingHours.ar : workingHours.en}</span>
        </div>
      </motion.div>
    </section>
  )
}
