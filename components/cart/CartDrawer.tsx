'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCartStore, useUIStore } from '@/lib/store'
import { formatPrice, getWhatsAppLink } from '@/lib/utils'
import Link from 'next/link'

// PASTATARAM ordering line (Saudi number; getWhatsAppLink converts the leading 0 → 966)
const WHATSAPP_PHONE = '0501938696'

export default function CartDrawer() {
  const { cartOpen, setCartOpen, language } = useUIStore()
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore()
  const isAr = language === 'ar'

  const buildOrderMessage = () => {
    const lines = items
      .map((it) => {
        const name = isAr ? it.menuItem.nameAr : it.menuItem.name
        return `• ${name} ×${it.quantity} — ${formatPrice(it.totalPrice, language)}`
      })
      .join('\n')

    return isAr
      ? `السلام عليكم\n\nأرغب بطلب:\n\n${lines}\n\nالإجمالي: ${formatPrice(total(), language)}`
      : `Hello,\n\nI'd like to place an order:\n\n${lines}\n\nTotal: ${formatPrice(total(), language)}`
  }

  const whatsappHref = getWhatsAppLink(WHATSAPP_PHONE, buildOrderMessage())

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[60] bg-brand-espresso/30 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: isAr ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isAr ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed top-0 bottom-0 z-[70] w-full max-w-md glass-card flex flex-col ${
              isAr ? 'left-0 border-r border-brand-rose/30' : 'right-0 border-l border-brand-rose/30'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-brand-rose/20">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-rose-gold" />
                <h2 className="text-lg font-bold text-brand-espresso dark:text-brand-ivory">
                  {isAr ? 'سلة الطلبات' : 'Your Cart'}
                </h2>
                {items.length > 0 && (
                  <span className="bg-brand-rose-gold text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {items.reduce((sum, i) => sum + i.quantity, 0)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-red-400 hover:text-red-600 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    {isAr ? 'مسح الكل' : 'Clear'}
                  </button>
                )}
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 rounded-full hover:bg-brand-blush/50 transition-colors"
                >
                  <X className="w-5 h-5 text-brand-espresso dark:text-brand-ivory" />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-brand-blush flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-brand-rose-gold" />
                  </div>
                  <p className="text-brand-brown font-medium">
                    {isAr ? 'سلتك فارغة' : 'Your cart is empty'}
                  </p>
                  <p className="text-sm text-brand-latte mt-1">
                    {isAr ? 'أضف وجباتك المفضلة' : 'Add your favorite dishes'}
                  </p>
                  <Link
                    href="/menu"
                    onClick={() => setCartOpen(false)}
                    className="mt-4 btn-primary text-sm"
                  >
                    {isAr ? 'استكشف المنيو' : 'Browse Menu'}
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.menuItem.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: isAr ? -100 : 100 }}
                    className="premium-card p-4 flex gap-3"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.menuItem.image}
                        alt={isAr ? item.menuItem.nameAr : item.menuItem.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-brand-espresso dark:text-brand-ivory text-sm truncate">
                        {isAr ? item.menuItem.nameAr : item.menuItem.name}
                      </p>
                      <p className="text-brand-rose-gold font-bold text-sm">
                        {formatPrice(item.totalPrice, language)}
                      </p>
                      {item.notes && (
                        <p className="text-xs text-brand-latte truncate">{item.notes}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-brand-blush hover:bg-brand-rose transition-colors flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3 text-brand-espresso" />
                      </button>
                      <span className="text-sm font-bold text-brand-espresso dark:text-brand-ivory w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => item.quantity === 1 ? removeItem(item.menuItem.id) : updateQuantity(item.menuItem.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-brand-blush hover:bg-brand-rose transition-colors flex items-center justify-center"
                      >
                        {item.quantity === 1 ? (
                          <Trash2 className="w-3 h-3 text-red-400" />
                        ) : (
                          <Minus className="w-3 h-3 text-brand-espresso" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-brand-rose/20 space-y-3">
                {/* Subtotal */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-brand-brown">
                    {isAr ? 'المجموع الفرعي' : 'Subtotal'}
                  </span>
                  <span className="font-semibold text-brand-espresso dark:text-brand-ivory">
                    {formatPrice(total(), language)}
                  </span>
                </div>
                {/* Total */}
                <div className="flex justify-between items-center pb-1">
                  <span className="text-brand-brown font-bold">
                    {isAr ? 'الإجمالي' : 'Total'}
                  </span>
                  <span className="text-2xl font-black gradient-text">
                    {formatPrice(total(), language)}
                  </span>
                </div>

                {/* WhatsApp order — primary checkout */}
                <motion.a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #1FA855, #25D366)', boxShadow: '0 8px 24px rgba(37,211,102,0.4)' }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.715zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z"/>
                  </svg>
                  {isAr ? 'اطلب عبر واتساب' : 'Order via WhatsApp'}
                </motion.a>

                <Link
                  href="/menu"
                  onClick={() => setCartOpen(false)}
                  className="btn-secondary w-full block text-center text-sm"
                >
                  {isAr ? 'إضافة المزيد' : 'Add More Items'}
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
