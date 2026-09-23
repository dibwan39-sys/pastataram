'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Flame, ShoppingCart, Star, X } from 'lucide-react'
import type { MenuItem } from '@/lib/types'
import { useProductOrder } from './useProductOrder'
import { ExtrasPicker, Price, QuantityStepper } from './OrderControls'

/**
 * The full product view — a centred panel on desktop, a bottom sheet on a
 * phone. The customer never leaves the menu to read a dish or pick add-ons.
 *
 * It behaves like a real dialog, which the site previously had nowhere:
 *   · focus moves in on open and returns to the trigger on close
 *   · Tab is trapped inside the panel
 *   · Escape closes it
 *   · the page behind cannot scroll
 *   · `role="dialog" aria-modal` with a labelled title
 */
export default function ProductSheet({
  item,
  open,
  onClose,
}: {
  item: MenuItem | null
  open: boolean
  onClose: () => void
}) {
  const reduce = useReducedMotion()
  const panelRef = useRef<HTMLDivElement | null>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const titleId = useId()
  const descId = useId()

  useEffect(() => setMounted(true), [])

  // Hooks cannot be called conditionally, so the sheet always has an item to
  // work with; it simply renders nothing when closed.
  const fallback = item
  const order = useProductOrder(fallback ?? ({ id: '', price: 0, extras: [] } as unknown as MenuItem), {
    openCartOnAdd: false,
  })
  const { isAr } = order

  const close = useCallback(() => {
    onClose()
    order.reset()
  }, [onClose, order])

  // Lock the page, trap focus, and restore it on close.
  useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement as HTMLElement
    const { overflow, paddingInlineEnd } = document.body.style
    // Compensate for the scrollbar so the page does not jump as it locks.
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingInlineEnd = `${gap}px`

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((el) => el.offsetParent !== null)

    const t = window.setTimeout(() => focusables()[0]?.focus(), 60)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab') return

      const items = focusables()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(t)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      document.body.style.paddingInlineEnd = paddingInlineEnd
      previouslyFocused.current?.focus?.()
    }
  }, [open, close])

  if (!mounted || !fallback) return null

  const description = isAr ? fallback.descriptionAr : fallback.description

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[90]"
            style={{ background: 'rgba(11,7,9,0.78)', backdropFilter: 'blur(6px)' }}
            aria-hidden
          />

          <div className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center sm:p-6">
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={description ? descId : undefined}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] sm:rounded-[2rem]"
              style={{
                background: 'linear-gradient(160deg, #1F1419 0%, #120C10 100%)',
                border: '1px solid rgba(231,198,164,0.18)',
                boxShadow: '0 30px 90px rgba(0,0,0,0.65)',
              }}
            >
              {/* Grab handle, phone only */}
              <div aria-hidden className="mx-auto mt-3 h-1 w-10 rounded-full bg-brand-line sm:hidden" />

              <button
                type="button"
                onClick={close}
                aria-label={isAr ? 'إغلاق' : 'Close'}
                className="absolute end-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-brand-cream transition-colors hover:bg-white/10"
                style={{ background: 'rgba(11,7,9,0.55)', backdropFilter: 'blur(8px)' }}
              >
                <X className="h-4.5 w-4.5" aria-hidden />
              </button>

              {/* Large photograph */}
              <div className="relative aspect-[4/3] w-full overflow-hidden sm:rounded-t-[2rem]">
                <Image
                  src={fallback.image}
                  alt={isAr ? fallback.nameAr : fallback.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 512px"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(18,12,16,0.92) 0%, transparent 55%)' }}
                />

                <div className="absolute bottom-4 start-5 end-5">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {fallback.bestseller && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #C43E57, #FD657D)' }}
                      >
                        <Flame className="h-3 w-3" aria-hidden />
                        {isAr ? 'من مختاراتنا' : 'Our selection'}
                      </span>
                    )}
                    {fallback.featured && !fallback.bestseller && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold"
                        style={{ background: 'rgba(11,7,9,0.7)', color: '#F6E0C4' }}
                      >
                        <Star className="h-3 w-3" aria-hidden />
                        {isAr ? 'مميز' : 'Featured'}
                      </span>
                    )}
                  </div>
                  <h2 id={titleId} className="font-display text-2xl font-bold text-brand-cream drop-shadow">
                    {isAr ? fallback.nameAr : fallback.name}
                  </h2>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                {description && (
                  <p id={descId} className="mb-5 text-[14px] leading-8 text-brand-cream-dim">
                    {description}
                  </p>
                )}

                {fallback.calories ? (
                  <p className="mb-5 text-xs font-semibold text-brand-champagne">
                    {fallback.calories} {isAr ? 'سعرة حرارية' : 'cal'}
                  </p>
                ) : null}

                {order.availableExtras.length > 0 && (
                  <div className="mb-6">
                    <ExtrasPicker
                      extras={order.availableExtras}
                      selectedIds={order.selectedIds}
                      onToggle={order.toggleExtra}
                      isAr={isAr}
                    />
                  </div>
                )}

                {/* Running total, so the final price is never a surprise */}
                <div
                  className="mb-5 flex items-center justify-between rounded-2xl px-4 py-3"
                  style={{ background: 'rgba(42,27,34,0.6)', border: '1px solid rgba(231,198,164,0.14)' }}
                >
                  <span className="text-sm font-semibold text-brand-cream-soft">
                    {isAr ? 'الإجمالي' : 'Total'}
                    {order.extrasTotal > 0 && (
                      <span className="ms-2 text-xs text-brand-champagne">
                        ({fallback.price} + {order.extrasTotal} {isAr ? 'ر.س' : 'SAR'}
                        {order.quantity > 1 ? ` × ${order.quantity}` : ''})
                      </span>
                    )}
                  </span>
                  {order.priceReady ? (
                    <Price value={order.lineTotal} isAr={isAr} />
                  ) : (
                    <span className="text-sm font-bold text-brand-champagne">
                      {isAr ? 'السعر قريباً' : 'Price coming soon'}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <QuantityStepper
                    value={order.quantity}
                    onChange={order.setQuantity}
                    isAr={isAr}
                    label={isAr ? 'الكمية' : 'Quantity'}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (order.add()) close()
                    }}
                    disabled={!order.priceReady}
                    className="btn-primary inline-flex flex-1 items-center justify-center gap-2 py-3 text-sm"
                  >
                    <ShoppingCart className="h-4 w-4" aria-hidden />
                    {isAr ? 'أضف للسلة' : 'Add to cart'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
