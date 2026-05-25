'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCartStore, useUIStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export default function CartDrawer() {
  const { cartOpen, setCartOpen, language } = useUIStore()
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore()
  const isAr = language === 'ar'

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
              <div className="p-6 border-t border-brand-rose/20 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-brand-brown font-medium">
                    {isAr ? 'الإجمالي' : 'Total'}
                  </span>
                  <span className="text-xl font-bold gradient-text">
                    {formatPrice(total(), language)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="btn-primary w-full block text-center"
                >
                  {isAr ? 'إتمام الطلب' : 'Proceed to Checkout'}
                </Link>
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
