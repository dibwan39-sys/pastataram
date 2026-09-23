'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ShoppingCart, Sparkles } from 'lucide-react'
import { menuItems } from '@/lib/data'
import { useUIStore } from '@/lib/store'
import { useProductOrder } from '@/components/menu/useProductOrder'
import { ExtrasPicker, Price, QuantityStepper } from '@/components/menu/OrderControls'
import ProductSheet from '@/components/menu/ProductSheet'

/**
 * The signature dish, given the space a restaurant gives its best plate.
 *
 * Structured as a food campaign rather than a product tile: an oversized
 * photograph that drifts against the scroll, the dish's own approved copy, its
 * live price, its add-ons, and one action. Everything — name, description,
 * price, add-ons — is read from the product in lib/data.ts.
 */
export default function SignatureSection() {
  const language = useUIStore((s) => s.language)
  const isAr = language === 'ar'
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  // PASTATA RAM — the brand's namesake plate.
  const item = menuItems.find((m) => m.id === '1') ?? menuItems[0]
  const order = useProductOrder(item)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.6, 0.25])

  return (
    <section
      id="signature"
      ref={sectionRef}
      className="section relative overflow-hidden scroll-mt-24"
      style={{ background: 'linear-gradient(180deg, var(--brand-noir) 0%, var(--brand-surface) 100%)' }}
      aria-labelledby="signature-heading"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-20 start-[-10%] h-[60vh] w-[60vh] rounded-full blur-[110px]"
        style={{
          background: 'radial-gradient(circle, rgba(253,101,125,0.3) 0%, transparent 70%)',
          opacity: reduce ? 0.35 : glowOpacity,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ── Photograph ─────────────────────────────── */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-1 lg:order-none"
          >
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[4/3] lg:aspect-[4/5]"
              style={{ border: '1px solid rgba(231,198,164,0.2)', boxShadow: '0 30px 80px rgba(0,0,0,0.55)' }}
            >
              <motion.div className="absolute inset-[-7%]" style={reduce ? undefined : { y: imageY }}>
                <Image
                  src={item.image}
                  alt={isAr ? item.nameAr : item.name}
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  quality={85}
                  className="object-cover"
                />
              </motion.div>
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(22, 7, 13,0.6) 0%, transparent 45%)' }}
              />
            </div>

            {/* Floating price medallion */}
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 16, scale: 0.9 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-5 end-5 rounded-2xl px-5 py-3 text-center"
              style={{
                background: 'rgba(36, 16, 25,0.88)',
                border: '1px solid rgba(253,101,125,0.4)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 16px 44px rgba(253,101,125,0.22)',
              }}
            >
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-champagne">
                {isAr ? 'السعر' : 'Price'}
              </span>
              <Price value={item.price} isAr={isAr} size="sm" />
            </motion.div>
          </motion.div>

          {/* ── Copy + ordering ────────────────────────── */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 30 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {isAr ? 'طبق التوقيع' : 'The Signature'}
            </span>

            <h2
              id="signature-heading"
              className="mt-3 font-display display-lg font-bold text-brand-cream"
            >
              {isAr ? item.nameAr : item.name}
            </h2>

            <div className="rule-fade my-6 max-w-[14rem]" aria-hidden />

            <p className="max-w-xl text-[15px] leading-9 text-brand-cream-dim">
              {isAr ? item.descriptionAr : item.description}
            </p>

            {item.calories ? (
              <p className="mt-4 text-xs font-semibold text-brand-champagne">
                {item.calories} {isAr ? 'سعرة حرارية' : 'cal'}
              </p>
            ) : null}

            {order.availableExtras.length > 0 && (
              <div className="mt-8">
                <ExtrasPicker
                  extras={order.availableExtras}
                  selectedIds={order.selectedIds}
                  onToggle={order.toggleExtra}
                  isAr={isAr}
                />
              </div>
            )}

            <div
              className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-4"
              style={{ background: 'rgba(42,27,34,0.55)', border: '1px solid rgba(231,198,164,0.16)' }}
            >
              <span className="text-sm font-semibold text-brand-cream-soft">
                {isAr ? 'الإجمالي' : 'Total'}
              </span>
              <Price value={order.lineTotal} isAr={isAr} />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <QuantityStepper
                value={order.quantity}
                onChange={order.setQuantity}
                isAr={isAr}
                label={`${isAr ? 'كمية' : 'Quantity'} — ${isAr ? item.nameAr : item.name}`}
              />
              <button
                type="button"
                onClick={order.add}
                className="btn-primary inline-flex items-center justify-center gap-2 py-3 text-sm"
              >
                <ShoppingCart className="h-4 w-4" aria-hidden />
                {isAr ? 'أضف للسلة' : 'Add to cart'}
              </button>
              <button
                type="button"
                onClick={() => setSheetOpen(true)}
                className="btn-secondary py-2.5 text-sm"
              >
                {isAr ? 'التفاصيل' : 'Details'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <ProductSheet item={item} open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </section>
  )
}
