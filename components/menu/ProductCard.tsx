'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Minus, Flame, Star, ShoppingCart, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Extra, MenuItem } from '@/lib/types'
import { useCartStore, useUIStore } from '@/lib/store'

interface ProductCardProps {
  item: MenuItem
  index?: number
}

/**
 * Premium glassmorphism product card with image, name, description, price,
 * optional add-ons, a quantity selector, and an add-to-cart button. Used on the
 * menu page and the home menu section.
 */
export default function ProductCard({ item, index = 0 }: ProductCardProps) {
  const { language, setCartOpen } = useUIStore()
  const { addItem } = useCartStore()
  const isAr = language === 'ar'
  const [qty, setQty] = useState(1)

  // Cards show the short teaser when the item defines one, otherwise the full description.
  const cardText = isAr
    ? item.shortDescriptionAr || item.descriptionAr
    : item.shortDescription || item.description
  // Items whose price has not been set yet (price: 0) show a placeholder instead of "0".
  const priceReady = item.price > 0

  // Add-ons the customer picked for this card, in the order they are declared on the item.
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>([])
  const availableExtras = item.extras ?? []
  const selectedExtras: Extra[] = availableExtras.filter((e) => selectedExtraIds.includes(e.id))

  const toggleExtra = (id: string) =>
    setSelectedExtraIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))

  const handleAdd = () => {
    if (!priceReady) return
    addItem(item, qty, selectedExtras)
    toast.success(
      isAr ? `تمت إضافة ${qty} × ${item.nameAr} للسلة` : `${qty} × ${item.name} added to cart`,
      { icon: '🛒' }
    )
    setCartOpen(true)
    setQty(1)
    setSelectedExtraIds([])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col rounded-3xl overflow-hidden h-full"
      style={{
        background: 'linear-gradient(145deg, rgba(33,28,25,0.96) 0%, rgba(33,28,25,0.62) 100%)',
        border: '1px solid rgba(184,115,51,0.3)',
        boxShadow: '0 8px 32px rgba(123,30,43,0.12)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 20px 56px rgba(123,30,43,0.24)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(123,30,43,0.12)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={isAr ? item.nameAr : item.name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-[600ms]"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(61,31,43,0.5) 0%, transparent 55%)' }} />
        <div className="absolute top-3 start-3 flex gap-2">
          {item.bestseller && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-white text-[11px] font-bold" style={{ background: 'linear-gradient(135deg, #7B1E2B, #B87333)' }}>
              <Flame className="w-3 h-3" />
              {isAr ? 'الأكثر مبيعاً' : 'Bestseller'}
            </span>
          )}
          {item.featured && !item.bestseller && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: 'rgba(61,31,43,0.8)', color: '#E0B566' }}>
              <Star className="w-3 h-3" />
              {isAr ? 'مميز' : 'Featured'}
            </span>
          )}
        </div>
        <p className="absolute bottom-3 start-4 font-black text-white text-lg drop-shadow">
          {isAr ? item.nameAr : item.name}
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {cardText && (
          <p
            className={`text-[13.5px] md:text-sm leading-7 tracking-[0.01em] mb-4 min-h-[3.5rem] ${isAr ? 'text-right' : ''}`}
            style={{ color: 'rgba(201,187,168,0.82)' }}
          >
            {cardText}
          </p>
        )}
        {item.calories ? (
          <p className="text-xs mb-4" style={{ color: 'rgba(184,115,51,0.95)' }}>
            {item.calories} {isAr ? 'سعرة حرارية' : 'cal'}
          </p>
        ) : <div className="mb-4" />}

        {/* Add-ons — options inside the product, chosen before adding to the cart */}
        {availableExtras.length > 0 && (
          <div className="mb-4">
            <p className="text-[11px] font-bold mb-2" style={{ color: 'rgba(184,115,51,0.95)' }}>
              {isAr ? 'الإضافات' : 'Add-ons'}
            </p>
            <div className="flex flex-wrap gap-2">
              {availableExtras.map((extra) => {
                const active = selectedExtraIds.includes(extra.id)
                return (
                  <button
                    key={extra.id}
                    type="button"
                    onClick={() => toggleExtra(extra.id)}
                    aria-pressed={active}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold transition-colors"
                    style={{
                      background: active ? 'linear-gradient(135deg, #7B1E2B, #B87333)' : 'rgba(33,28,25,0.6)',
                      border: `1px solid ${active ? 'rgba(216,162,74,0.7)' : 'rgba(184,115,51,0.4)'}`,
                      color: active ? '#FFFFFF' : '#C9BBA8',
                    }}
                  >
                    {active ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    {isAr ? extra.nameAr : extra.name}
                    {extra.price > 0 && (
                      <span className="opacity-80">
                        +{extra.price} {isAr ? 'ر.س' : 'SAR'}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Price + controls — clearly separated for visual hierarchy */}
        <div className="mt-auto pt-4" style={{ borderTop: '1px solid rgba(184,115,51,0.15)' }}>
          <div className="flex items-baseline gap-1.5">
            {priceReady ? (
              <>
                <span
                  className="text-[1.7rem] leading-none font-black"
                  style={{ background: 'linear-gradient(135deg, #7B1E2B, #B87333)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  {item.price}
                </span>
                <span className="text-sm font-bold" style={{ color: 'rgba(184,115,51,0.95)' }}>
                  {isAr ? 'ر.س' : 'SAR'}
                </span>
              </>
            ) : (
              <span className="text-base leading-none font-black py-2" style={{ color: 'rgba(184,115,51,0.95)' }}>
                {isAr ? 'السعر قريباً' : 'Price coming soon'}
              </span>
            )}
          </div>

          {/* Quantity selector + add to cart */}
          <div className="flex items-center gap-3 mt-4">
            <div
              className="flex items-center gap-1 rounded-full p-1"
              style={{ background: 'rgba(33,28,25,0.6)', border: '1px solid rgba(184,115,51,0.4)' }}
            >
              <button
                type="button"
                aria-label={isAr ? 'إنقاص' : 'Decrease'}
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[#2B2521] hover:bg-[#3A322C] transition-colors"
                style={{ color: '#C9BBA8' }}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center text-sm font-black tabular-nums" style={{ color: '#F2E8DA' }}>{qty}</span>
              <button
                type="button"
                aria-label={isAr ? 'زيادة' : 'Increase'}
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[#2B2521] hover:bg-[#3A322C] transition-colors"
                style={{ color: '#C9BBA8' }}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <motion.button
              whileHover={priceReady ? { scale: 1.04 } : undefined}
              whileTap={priceReady ? { scale: 0.96 } : undefined}
              onClick={handleAdd}
              disabled={!priceReady}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-bold text-white disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #7B1E2B, #B87333)',
                boxShadow: '0 6px 18px rgba(123,30,43,0.35)',
                opacity: priceReady ? 1 : 0.45,
              }}
            >
              <ShoppingCart className="w-4 h-4" />
              {isAr ? 'أضف للسلة' : 'Add'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
