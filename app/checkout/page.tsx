'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Check, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import { useUIStore, useCartStore, useOrderStore } from '@/lib/store'
import { formatPrice, generateOrderNumber, generateId } from '@/lib/utils'
import { Order } from '@/lib/types'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getWhatsAppLink } from '@/lib/utils'

export default function CheckoutPage() {
  const { language } = useUIStore()
  const { items, total, clearCart } = useCartStore()
  const { addOrder, setCurrentOrder } = useOrderStore()
  const router = useRouter()
  const isAr = language === 'ar'

  const [form, setForm] = useState({ name: '', phone: '', notes: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<Order | null>(null)

  const subtotal = total()
  const waMessage = isAr
    ? `السلام عليكم، أريد تأكيد طلبي من باستاتا رام:\n${items.map((i) => `- ${i.menuItem.nameAr} × ${i.quantity} = ${formatPrice(i.totalPrice, language)}`).join('\n')}\nالإجمالي: ${formatPrice(subtotal, language)}`
    : `Hello, I want to confirm my order from PASTATARAM:\n${items.map((i) => `- ${i.menuItem.name} × ${i.quantity} = ${formatPrice(i.totalPrice, language)}`).join('\n')}\nTotal: ${formatPrice(subtotal, language)}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error(isAr ? 'يرجى ملء جميع الحقول' : 'Please fill all fields')
      return
    }
    if (items.length === 0) {
      toast.error(isAr ? 'السلة فارغة' : 'Cart is empty')
      return
    }

    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))

    const order: Order = {
      id: generateId(),
      orderNumber: generateOrderNumber(),
      items: [...items],
      status: 'pending',
      total: subtotal,
      customerName: form.name,
      customerPhone: form.phone,
      notes: form.notes,
      createdAt: new Date(),
      updatedAt: new Date(),
      estimatedTime: 15,
    }

    addOrder(order)
    setCurrentOrder(order)
    clearCart()
    setLoading(false)
    setSuccess(order)

    // Open WhatsApp
    setTimeout(() => {
      window.open(getWhatsAppLink('0501938696', waMessage), '_blank')
    }, 500)
  }

  if (success) {
    return (
      <PageWrapper>
        <section className="min-h-[80vh] flex items-center justify-center py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 25 }}
            className="max-w-md w-full mx-auto px-4 text-center"
          >
            <div className="premium-card p-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', damping: 20 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-black text-brand-espresso dark:text-brand-ivory mb-2">
                {isAr ? 'تم الطلب بنجاح! 🎉' : 'Order Placed! 🎉'}
              </h2>
              <p className="text-brand-brown dark:text-brand-mocha mb-2">
                {isAr ? 'رقم طلبك:' : 'Order Number:'}
              </p>
              <p className="text-2xl font-black gradient-text mb-6">{success.orderNumber}</p>
              <p className="text-sm text-brand-latte mb-8">
                {isAr
                  ? 'تم فتح واتساب لتأكيد الطلب. سيصلك تحديث بحالة طلبك قريباً.'
                  : 'WhatsApp has been opened to confirm your order. You will receive a status update shortly.'}
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href={`/track-order?id=${success.id}`}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                >
                  {isAr ? 'تتبع الطلب' : 'Track Order'}
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Link>
                <Link href="/menu" className="btn-secondary w-full py-3">
                  {isAr ? 'طلب آخر' : 'Order More'}
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </PageWrapper>
    )
  }

  if (items.length === 0) {
    return (
      <PageWrapper>
        <section className="min-h-[80vh] flex items-center justify-center py-20">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 text-brand-latte mx-auto mb-4" />
            <h2 className="text-2xl font-black text-brand-espresso dark:text-brand-ivory mb-4">
              {isAr ? 'السلة فارغة' : 'Cart is Empty'}
            </h2>
            <Link href="/menu" className="btn-primary px-8 py-3">
              {isAr ? 'استكشف المنيو' : 'Browse Menu'}
            </Link>
          </div>
        </section>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-black text-brand-espresso dark:text-brand-ivory mb-8">
              {isAr ? 'إتمام الطلب' : 'Checkout'}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Form */}
              <div className="lg:col-span-3">
                <div className="premium-card p-6">
                  <h2 className="font-bold text-brand-espresso dark:text-brand-ivory mb-5">
                    {isAr ? 'بياناتك' : 'Your Details'}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-brand-espresso dark:text-brand-ivory mb-1.5">
                        {isAr ? 'الاسم الكامل *' : 'Full Name *'}
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={isAr ? 'اسمك الكريم' : 'Your full name'}
                        className="w-full px-4 py-3 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-espresso/30 text-brand-espresso dark:text-brand-ivory placeholder-brand-latte focus:outline-none focus:border-brand-rose-gold"
                        dir={isAr ? 'rtl' : 'ltr'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-espresso dark:text-brand-ivory mb-1.5">
                        {isAr ? 'رقم الهاتف *' : 'Phone Number *'}
                      </label>
                      <input
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="05xxxxxxxx"
                        className="w-full px-4 py-3 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-espresso/30 text-brand-espresso dark:text-brand-ivory placeholder-brand-latte focus:outline-none focus:border-brand-rose-gold"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-espresso dark:text-brand-ivory mb-1.5">
                        {isAr ? 'ملاحظات' : 'Notes (Optional)'}
                      </label>
                      <textarea
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        placeholder={isAr ? 'أي تعليمات خاصة للطلب...' : 'Any special instructions...'}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-espresso/30 text-brand-espresso dark:text-brand-ivory placeholder-brand-latte focus:outline-none focus:border-brand-rose-gold resize-none"
                        dir={isAr ? 'rtl' : 'ltr'}
                      />
                    </div>

                    {/* Pickup info */}
                    <div className="p-4 rounded-xl bg-brand-blush/50 dark:bg-brand-espresso/20 border border-brand-rose/20">
                      <p className="font-semibold text-brand-espresso dark:text-brand-ivory text-sm mb-1">
                        📍 {isAr ? 'الاستلام من الكشك' : 'Pickup from Kiosk'}
                      </p>
                      <p className="text-xs text-brand-brown dark:text-brand-mocha">
                        {isAr ? 'جدة - القرنية - شارع 80 - بجوار الصالة الاقتصادية' : 'Jeddah – Al Qurainiyah – Street 80 – Next to Al-Salah Al-Eqtisadiyah Hall'}
                      </p>
                      <p className="text-xs text-brand-rose-gold font-semibold mt-1">
                        ⏱ {isAr ? 'وقت التحضير: ١٠-١٥ دقيقة' : 'Prep time: 10-15 minutes'}
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-base disabled:opacity-70"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          {isAr ? 'تأكيد عبر واتساب' : 'Confirm via WhatsApp'}
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-2">
                <div className="premium-card p-6 sticky top-28">
                  <h2 className="font-bold text-brand-espresso dark:text-brand-ivory mb-5">
                    {isAr ? 'ملخص الطلب' : 'Order Summary'}
                  </h2>
                  <div className="space-y-3 mb-5">
                    {items.map((item) => (
                      <div key={item.menuItem.id} className="flex items-start justify-between gap-3 text-sm">
                        <div className="flex-1">
                          <p className="font-semibold text-brand-espresso dark:text-brand-ivory">
                            {isAr ? item.menuItem.nameAr : item.menuItem.name}
                          </p>
                          <p className="text-brand-latte">× {item.quantity}</p>
                        </div>
                        <span className="font-bold text-brand-espresso dark:text-brand-ivory flex-shrink-0">
                          {formatPrice(item.totalPrice, language)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-brand-rose/20 pt-4 flex justify-between items-center">
                    <span className="font-bold text-brand-espresso dark:text-brand-ivory">
                      {isAr ? 'الإجمالي' : 'Total'}
                    </span>
                    <span className="text-2xl font-black gradient-text">
                      {formatPrice(subtotal, language)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
