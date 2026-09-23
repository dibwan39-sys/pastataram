'use client'

import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import type { Extra, MenuItem } from '@/lib/types'
import { useCartStore, useUIStore } from '@/lib/store'

/**
 * Quantity + add-on selection for one product, shared by the product card and
 * the product detail sheet.
 *
 * Both surfaces show a running total, so the arithmetic lives here once. Every
 * price comes from the item and its `extras` — which lib/data.ts owns — so no
 * component ever holds a number of its own.
 */
export function useProductOrder(item: MenuItem, opts: { openCartOnAdd?: boolean } = {}) {
  const { openCartOnAdd = true } = opts
  const language = useUIStore((s) => s.language)
  const setCartOpen = useUIStore((s) => s.setCartOpen)
  const addItem = useCartStore((s) => s.addItem)
  const isAr = language === 'ar'

  const [quantity, setQuantity] = useState(1)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const availableExtras = useMemo(() => item.extras ?? [], [item.extras])

  // Kept in the order the item declares them, not the order they were tapped,
  // so the cart line id is stable however the customer builds the selection.
  const selectedExtras: Extra[] = useMemo(
    () => availableExtras.filter((e) => selectedIds.includes(e.id)),
    [availableExtras, selectedIds]
  )

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0)
  const unitPrice = item.price + extrasTotal
  const lineTotal = unitPrice * quantity

  /** A price of 0 means the item is on the menu but not yet priced. */
  const priceReady = item.price > 0

  const toggleExtra = (id: string) =>
    setSelectedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))

  const reset = () => {
    setQuantity(1)
    setSelectedIds([])
  }

  const add = () => {
    if (!priceReady) return false

    addItem(item, quantity, selectedExtras)

    const name = isAr ? item.nameAr : item.name
    toast.success(
      isAr ? `أُضيف ${quantity} × ${name} إلى السلة` : `${quantity} × ${name} added to your cart`,
      { icon: '🛒' }
    )

    if (openCartOnAdd) setCartOpen(true)
    reset()
    return true
  }

  return {
    isAr,
    quantity,
    setQuantity: (n: number) => setQuantity(Math.min(99, Math.max(1, n))),
    availableExtras,
    selectedIds,
    selectedExtras,
    toggleExtra,
    extrasTotal,
    unitPrice,
    lineTotal,
    priceReady,
    add,
    reset,
  }
}
