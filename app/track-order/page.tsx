'use client'

import { useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Search, Package, Clock, ChefHat, CheckCircle, XCircle, Truck } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import { useUIStore, useOrderStore } from '@/lib/store'
import { getStatusLabel, formatDate, formatPrice } from '@/lib/utils'
import { Order, OrderStatus } from '@/lib/types'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

const statusSteps: OrderStatus[] = ['pending', 'preparing', 'ready', 'completed']

const statusIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  pending: Clock,
  preparing: ChefHat,
  ready: Truck,
  completed: CheckCircle,
  cancelled: XCircle,
}

function TrackOrderContent() {
  const { language } = useUIStore()
  const { orders, currentOrder } = useOrderStore()
  const isAr = language === 'ar'
  const searchParams = useSearchParams()
  const orderId = searchParams.get('id')

  const [searchNum, setSearchNum] = useState('')
  const [foundOrder, setFoundOrder] = useState<Order | null>(
    orderId ? (orders.find((o) => o.id === orderId) ?? currentOrder) : currentOrder
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === searchNum.toLowerCase() ||
        o.id === searchNum
    )
    setFoundOrder(found ?? null)
  }

  const currentStepIndex = foundOrder
    ? statusSteps.indexOf(foundOrder.status as OrderStatus)
    : -1

  return (
    <section className="py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-10">
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-latte" />
            <input
              value={searchNum}
              onChange={(e) => setSearchNum(e.target.value)}
              placeholder={isAr ? 'أدخل رقم الطلب...' : 'Enter order number...'}
              className="w-full ps-10 pe-4 py-3 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory placeholder-brand-latte focus:outline-none focus:border-brand-rose-gold"
              dir={isAr ? 'rtl' : 'ltr'}
            />
          </div>
          <button type="submit" className="btn-primary px-6 py-3">
            {isAr ? 'بحث' : 'Search'}
          </button>
        </form>

        {foundOrder ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Order Info */}
            <div className="premium-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-brand-latte">{isAr ? 'رقم الطلب' : 'Order Number'}</p>
                  <p className="text-xl font-black gradient-text">{foundOrder.orderNumber}</p>
                </div>
                <div className="text-end">
                  <p className="text-sm text-brand-latte">{isAr ? 'التاريخ' : 'Date'}</p>
                  <p className="text-sm font-semibold text-brand-espresso dark:text-brand-ivory">
                    {formatDate(foundOrder.createdAt, language)}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-brand-latte text-sm">{isAr ? 'الإجمالي' : 'Total'}</span>
                <span className="font-black gradient-text text-lg">{formatPrice(foundOrder.total, language)}</span>
              </div>
            </div>

            {/* Status Timeline */}
            {foundOrder.status !== 'cancelled' ? (
              <div className="premium-card p-6">
                <h3 className="font-bold text-brand-espresso dark:text-brand-ivory mb-6">
                  {isAr ? 'حالة الطلب' : 'Order Status'}
                </h3>
                <div className="relative">
                  <div className="absolute start-5 top-5 bottom-5 w-0.5 bg-brand-blush dark:bg-brand-surface/30" />
                  {statusSteps.map((step, i) => {
                    const Icon = statusIcons[step] ?? Clock
                    const isCompleted = i <= currentStepIndex
                    const isCurrent = i === currentStepIndex
                    return (
                      <div key={step} className="relative flex items-center gap-4 mb-6 last:mb-0">
                        <motion.div
                          className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isCompleted
                              ? 'bg-gradient-to-br from-brand-rose-gold to-brand-champagne shadow-brand'
                              : 'bg-brand-blush dark:bg-brand-surface/30'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isCompleted ? 'text-white' : 'text-brand-latte'}`} />
                          {isCurrent && (
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 border-brand-rose-gold"
                              animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                        </motion.div>
                        <div>
                          <p className={`font-bold text-sm ${isCompleted ? 'text-brand-espresso dark:text-brand-ivory' : 'text-brand-latte'}`}>
                            {getStatusLabel(step, language)}
                          </p>
                          {isCurrent && (
                            <p className="text-xs text-brand-rose-gold font-semibold">
                              {isAr ? '← الحالة الآن' : 'Current Status →'}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
                {foundOrder.estimatedTime && foundOrder.status === 'preparing' && (
                  <div className="mt-6 p-4 rounded-xl bg-brand-blush/50 dark:bg-brand-surface/20 border border-brand-rose/20 text-center">
                    <p className="text-brand-espresso dark:text-brand-ivory font-semibold">
                      ⏱ {isAr ? `الوقت المتوقع: ${foundOrder.estimatedTime} دقيقة` : `Estimated: ${foundOrder.estimatedTime} minutes`}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="premium-card p-6 text-center">
                <XCircle className="w-10 h-10 text-red-400 mx-auto mb-2" />
                <p className="font-bold text-brand-espresso dark:text-brand-ivory">
                  {isAr ? 'تم إلغاء الطلب' : 'Order Cancelled'}
                </p>
              </div>
            )}

            {/* Items */}
            {foundOrder.items.length > 0 && (
              <div className="premium-card p-6">
                <h3 className="font-bold text-brand-espresso dark:text-brand-ivory mb-4">
                  {isAr ? 'العناصر المطلوبة' : 'Ordered Items'}
                </h3>
                <div className="space-y-3">
                  {foundOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="relative block h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg">
                          <Image src={item.menuItem.image} alt="" fill sizes="40px" className="object-cover" />
                        </span>
                        <div>
                          <p className="font-semibold text-brand-espresso dark:text-brand-ivory">
                            {isAr ? item.menuItem.nameAr : item.menuItem.name}
                          </p>
                          <p className="text-brand-latte">× {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-brand-espresso dark:text-brand-ivory">
                        {formatPrice(item.totalPrice, language)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-brand-latte mx-auto mb-4" />
            <p className="text-brand-brown dark:text-brand-mocha font-medium">
              {isAr ? 'لا توجد طلبات محفوظة في هذا المتصفح' : 'No orders saved in this browser'}
            </p>
            <p className="mx-auto mt-3 max-w-sm text-[13px] leading-7 text-brand-muted">
              {isAr
                ? 'إن كنت قد طلبت من جهاز آخر فلن يظهر الطلب هنا. تواصل معنا عبر واتساب لمتابعته.'
                : 'An order placed on another device will not appear here. Message us on WhatsApp to follow it.'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default function TrackOrderPage() {
  const { language } = useUIStore()
  const isAr = language === 'ar'

  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative py-24 bg-gradient-to-br from-brand-cream via-brand-blush/30 to-brand-pearl dark:from-[var(--brand-noir)] dark:via-[var(--brand-noir-2)] dark:to-[var(--brand-noir)]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-brand-rose-gold text-sm font-bold mb-6">
              <Package className="w-4 h-4" />
              {isAr ? 'تتبع الطلب' : 'Track Order'}
            </div>
            <h1 className="text-4xl font-black text-brand-espresso dark:text-brand-ivory mb-4">
              {isAr ? 'تتبع طلبك' : 'Track Your Order'}
            </h1>
            <p className="text-brand-brown dark:text-brand-mocha">
              {isAr
                ? 'اعرض الطلبات التي أنشأتها من هذا المتصفح.'
                : 'View the orders you placed from this browser.'}
            </p>

            {/*
              Said plainly, because the page cannot do what its name suggests.
              Orders live in this browser's storage (the `pastataram-orders`
              key) and nowhere else — there is no server holding them. A
              customer who ordered on their phone will find nothing here on a
              laptop, and the honest thing is to say so before they search
              rather than after they fail.
            */}
            <p className="mx-auto mt-4 max-w-md text-[13px] leading-7 text-brand-muted">
              {isAr
                ? 'ملاحظة: يُحفظ سجلّ الطلبات على هذا الجهاز وهذا المتصفح فقط، ولا يُزامَن مع المطعم أو مع أجهزتك الأخرى. لمتابعة طلب فعلي تواصل معنا عبر واتساب.'
                : 'Note: this history is stored on this device and browser only. It is not synced with the restaurant or your other devices. To follow a real order, message us on WhatsApp.'}
            </p>
          </motion.div>
        </div>
      </section>

      <Suspense fallback={
        <div className="py-12 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-brand-rose-gold border-t-transparent animate-spin mx-auto" />
        </div>
      }>
        <TrackOrderContent />
      </Suspense>
    </PageWrapper>
  )
}
