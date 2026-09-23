'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Flame, Plus, ShoppingCart, Star } from 'lucide-react'
import type { MenuItem } from '@/lib/types'
import { useProductOrder } from './useProductOrder'
import { ExtrasPicker, Price, QuantityStepper } from './OrderControls'
import ProductSheet from './ProductSheet'

interface ProductCardProps {
  item: MenuItem
  index?: number
  /**
   * `standard` — upright card, three to a row.
   * `wide`     — photograph beside the copy, used to break up long runs of
   *              upright cards so the menu reads as an editorial page rather
   *              than a catalogue grid.
   */
  variant?: 'standard' | 'wide'
}

/**
 * A premium restaurant menu card.
 *
 * The photograph is the subject: it fills the frame, carries only a soft
 * bottom scrim so the dish name stays legible, and scales gently on hover.
 * Everything a customer needs to order — price, add-ons, quantity, add —
 * is on the card; the sheet is for reading the full description.
 *
 * Images render through next/image with real `sizes`, so a phone downloads a
 * ~400px AVIF rather than the 2 MB master the raw <img> used to fetch.
 */
export default function ProductCard({ item, index = 0, variant = 'standard' }: ProductCardProps) {
  const reduce = useReducedMotion()
  const [sheetOpen, setSheetOpen] = useState(false)
  const order = useProductOrder(item)
  const { isAr } = order

  const cardText = isAr
    ? item.shortDescriptionAr || item.descriptionAr
    : item.shortDescription || item.description

  const isWide = variant === 'wide'

  const badges = (
    <div className="flex flex-wrap gap-2">
      {item.bestseller && (
        <span
          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #C43E57, #FD657D)' }}
        >
          <Flame className="h-3 w-3" aria-hidden />
          {/* Not a sales claim — nothing in the project measures sales. */}
          {isAr ? 'من مختاراتنا' : 'Our selection'}
        </span>
      )}
      {item.featured && !item.bestseller && (
        <span
          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold"
          style={{ background: 'rgba(30, 7, 19,0.72)', color: '#F6E0C4' }}
        >
          <Star className="h-3 w-3" aria-hidden />
          {isAr ? 'مميز' : 'Featured'}
        </span>
      )}
    </div>
  )

  const photo = (
    <div className={`relative overflow-hidden ${isWide ? 'aspect-[4/3] sm:aspect-auto sm:h-full' : 'aspect-[4/3]'}`}>
      <Image
        src={item.image}
        alt={isAr ? item.nameAr : item.name}
        fill
        sizes={isWide ? '(max-width: 640px) 100vw, 40vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
        className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.07]"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(51, 12, 30,0.86) 0%, rgba(51, 12, 30,0.12) 52%, transparent 100%)' }}
      />
      <div className="absolute top-3 start-3">{badges}</div>
      {!isWide && (
        <h3 className="absolute bottom-3 start-4 end-4 font-display text-lg font-bold text-brand-cream drop-shadow">
          {isAr ? item.nameAr : item.name}
        </h3>
      )}
    </div>
  )

  return (
    <>
      <motion.article
        initial={reduce ? undefined : { opacity: 0, y: 26 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, delay: Math.min(index, 5) * 0.06, ease: [0.16, 1, 0.3, 1] }}
        className={`group relative flex h-full overflow-hidden rounded-[1.5rem] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 ${
          isWide ? 'flex-col sm:flex-row' : 'flex-col'
        }`}
        style={{
          background: 'linear-gradient(150deg, var(--brand-surface) 0%, var(--brand-noir-2) 100%)',
          border: '1px solid rgba(231,198,164,0.16)',
          boxShadow: '0 8px 28px rgba(0,0,0,0.38)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(253,101,125,0.45)'
          e.currentTarget.style.boxShadow = '0 22px 56px rgba(253,101,125,0.16)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(231,198,164,0.16)'
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.38)'
        }}
      >
        <div className={isWide ? 'sm:w-[42%] sm:flex-shrink-0' : ''}>{photo}</div>

        <div className={`flex flex-1 flex-col p-5 ${isWide ? 'sm:p-6' : ''}`}>
          {isWide && (
            <h3 className="mb-2 font-display text-xl font-bold text-brand-cream">
              {isAr ? item.nameAr : item.name}
            </h3>
          )}

          {cardText && (
            <p className={`mb-4 text-[13.5px] leading-7 text-brand-cream-dim ${isWide ? '' : 'min-h-[3.5rem]'}`}>
              {cardText}
            </p>
          )}

          {item.calories ? (
            <p className="mb-4 text-xs font-semibold text-brand-champagne">
              {item.calories} {isAr ? 'سعرة حرارية' : 'cal'}
            </p>
          ) : null}

          {order.availableExtras.length > 0 && (
            <div className="mb-4">
              <ExtrasPicker
                extras={order.availableExtras}
                selectedIds={order.selectedIds}
                onToggle={order.toggleExtra}
                isAr={isAr}
              />
            </div>
          )}

          <div className="mt-auto pt-4" style={{ borderTop: '1px solid rgba(231,198,164,0.14)' }}>
            <div className="mb-4 flex items-center justify-between gap-3">
              {order.priceReady ? (
                <Price value={order.lineTotal} isAr={isAr} />
              ) : (
                <span className="py-2 text-base font-black text-brand-champagne">
                  {isAr ? 'السعر قريباً' : 'Price coming soon'}
                </span>
              )}

              <button
                type="button"
                onClick={() => setSheetOpen(true)}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-brand-cream-dim transition-colors hover:text-brand-rose"
                style={{ border: '1px solid rgba(231,198,164,0.26)' }}
              >
                <Plus className="h-3 w-3" aria-hidden />
                {isAr ? 'التفاصيل' : 'Details'}
                <span className="sr-only">— {isAr ? item.nameAr : item.name}</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <QuantityStepper
                value={order.quantity}
                onChange={order.setQuantity}
                isAr={isAr}
                label={`${isAr ? 'كمية' : 'Quantity'} — ${isAr ? item.nameAr : item.name}`}
              />
              <button
                type="button"
                onClick={order.add}
                disabled={!order.priceReady}
                className="btn-primary inline-flex flex-1 items-center justify-center gap-2 px-4 py-2.5 text-sm"
              >
                <ShoppingCart className="h-4 w-4" aria-hidden />
                {isAr ? 'أضف' : 'Add'}
                <span className="sr-only">{isAr ? item.nameAr : item.name}</span>
              </button>
            </div>
          </div>
        </div>
      </motion.article>

      <ProductSheet item={item} open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </>
  )
}
