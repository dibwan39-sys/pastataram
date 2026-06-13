'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Minus, Flame, Star, ShoppingCart } from 'lucide-react'
import toast from 'react-hot-toast'
import type { MenuItem } from '@/lib/types'
import { useCartStore, useUIStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  item: MenuItem
  index?: number
}

/**
 * Premium glassmorphism product card with image, name, description, price,
 * a quantity selector, and an add-to-cart button. Used on the menu page and
 * the home menu section.
 */
export default function ProductCard({ item, index = 0 }: ProductCardProps) {
  const { language, setCartOpen } = useUIStore()
  const { addItem } = useCartStore()
  const isAr = language === 'ar'
  const [qty, setQty] = useState(1)

  const handleAdd = () => {
    addItem(item, qty)
    toast.success(
      isAr ? `تمت إضافة ${qty} × ${item.nameAr} للسلة` : `${qty} × ${item.name} added to cart`,
      { icon: '🛒' }
    )
    setCartOpen(true)
    setQty(1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col rounded-3xl overflow-hidden h-full"
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,215,226,0.62) 100%)',
        border: '1px solid rgba(196,134,154,0.3)',
        boxShadow: '0 8px 32px rgba(160,69,94,0.12)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 20px 56px rgba(160,69,94,0.24)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(160,69,94,0.12)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={item.image}
          alt={isAr ? item.nameAr : item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[600ms]"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(61,31,43,0.5) 0%, transparent 55%)' }} />
        <div className="absolute top-3 start-3 flex gap-2">
          {item.bestseller && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-white text-[11px] font-bold" style={{ background: 'linear-gradient(135deg, #A0455E, #C4869A)' }}>
              <Flame className="w-3 h-3" />
              {isAr ? 'الأكثر مبيعاً' : 'Bestseller'}
            </span>
          )}
          {item.featured && !item.bestseller && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: 'rgba(61,31,43,0.8)', color: '#E6B7C8' }}>
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
        {(isAr ? item.descriptionAr : item.description) && (
          <p className="text-sm leading-relaxed mb-3 line-clamp-2" style={{ color: 'rgba(92,47,61,0.75)' }}>
            {isAr ? item.descriptionAr : item.description}
          </p>
        )}
        {item.calories ? (
          <p className="text-xs mb-4" style={{ color: 'rgba(196,134,154,0.95)' }}>
            {item.calories} {isAr ? 'سعرة حرارية' : 'cal'}
          </p>
        ) : <div className="mb-4" />}

        <div className="mt-auto">
          <span
            className="text-2xl font-black"
            style={{ background: 'linear-gradient(135deg, #A0455E, #C4869A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            {formatPrice(item.price, language)}
          </span>

          {/* Quantity selector + add to cart */}
          <div className="flex items-center gap-3 mt-4">
            <div
              className="flex items-center gap-1 rounded-full p-1"
              style={{ background: 'rgba(248,215,226,0.6)', border: '1px solid rgba(196,134,154,0.4)' }}
            >
              <button
                type="button"
                aria-label={isAr ? 'إنقاص' : 'Decrease'}
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/70 hover:bg-white transition-colors"
                style={{ color: '#7A3050' }}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center text-sm font-black tabular-nums" style={{ color: '#3D1F2B' }}>{qty}</span>
              <button
                type="button"
                aria-label={isAr ? 'زيادة' : 'Increase'}
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/70 hover:bg-white transition-colors"
                style={{ color: '#7A3050' }}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAdd}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #A0455E, #C4869A)', boxShadow: '0 6px 18px rgba(160,69,94,0.35)' }}
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
