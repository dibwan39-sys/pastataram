import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, MenuItem, Extra, Language, Order, OrderStatus } from './types'
import { menuItems, allExtras } from './data'

interface CartStore {
  items: CartItem[]
  addItem: (item: MenuItem, quantity?: number, extras?: Extra[], notes?: string) => void
  removeItem: (lineId: string) => void
  updateQuantity: (lineId: string, quantity: number) => void
  clearCart: () => void
  total: () => number
  itemCount: () => number
}

interface UIStore {
  language: Language
  setLanguage: (lang: Language) => void
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  activeCategory: string
  setActiveCategory: (cat: string) => void
}

interface OrderStore {
  orders: Order[]
  currentOrder: Order | null
  addOrder: (order: Order) => void
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  setCurrentOrder: (order: Order | null) => void
}

interface AuthStore {
  isLoggedIn: boolean
  user: { id: string; name: string; email: string; phone: string } | null
  login: (user: { id: string; name: string; email: string; phone: string }) => void
  logout: () => void
  isAdminLoggedIn: boolean
  adminUser: { id: string; name: string; email: string; role: string } | null
  adminLogin: (user: { id: string; name: string; email: string; role: string }) => void
  adminLogout: () => void
}

/**
 * Identifies one cart line: the same product with a different set of add-ons is a
 * separate line, so quantity and removal must key on both.
 */
export const cartLineId = (line: CartItem) =>
  `${line.menuItem.id}::${line.extras.map((e) => e.id).sort().join(',')}`

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1, extras = [], notes = '') => {
        set((state) => {
          // Merge on the same key the rest of the store uses to address a line.
          // Comparing JSON.stringify(extras) instead would treat two identical
          // selections made in a different order as different lines, while
          // cartLineId still collapsed them onto one id.
          const incomingId = cartLineId({ menuItem: item, quantity, extras, totalPrice: 0 })
          const existingIndex = state.items.findIndex((cartItem) => cartLineId(cartItem) === incomingId)
          const extrasTotal = extras.reduce((sum, e) => sum + e.price, 0)
          const itemTotal = (item.price + extrasTotal) * quantity

          if (existingIndex > -1) {
            const updated = [...state.items]
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + quantity,
              totalPrice: updated[existingIndex].totalPrice + itemTotal,
            }
            return { items: updated }
          }
          return {
            items: [...state.items, { menuItem: item, quantity, extras, notes, totalPrice: itemTotal }],
          }
        })
      },
      removeItem: (lineId) =>
        set((state) => ({ items: state.items.filter((i) => cartLineId(i) !== lineId) })),
      updateQuantity: (lineId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            cartLineId(i) === lineId
              ? { ...i, quantity, totalPrice: (i.menuItem.price + i.extras.reduce((s, e) => s + e.price, 0)) * quantity }
              : i
          ).filter((i) => i.quantity > 0),
        })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, item) => sum + item.totalPrice, 0),
      itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: 'pastataram-cart',
      version: 3,
      /**
       * A cart saved in the browser keeps a snapshot of the menu item, so after a
       * price change its lines would still carry the old price into the totals and
       * the WhatsApp order. Bumping the version re-resolves every line against the
       * live menu and recomputes its total from lib/data.ts; quantities, notes and
       * chosen add-ons are kept exactly as the customer left them.
       *
       * Two kinds of line are handled differently:
       *
       *   menu items  — re-resolved against `menuItems`. If the product no longer
       *                 exists on the menu the line is dropped, because we cannot
       *                 honour a price for something we no longer sell.
       *   custom pasta — kept as stored. A composed pasta is never in `menuItems`,
       *                 so the old code dropped every one of them on each version
       *                 bump. Its price comes from the builder's own options, and
       *                 only its add-on prices are refreshed.
       *
       * Add-on prices are always re-read from lib/data.ts so a change to
       * EXTRA_PRICE reaches carts that were saved before it.
       */
      migrate: (persisted) => {
        const state = (persisted ?? {}) as Partial<CartStore>

        const currentExtra = (extra: Extra): Extra =>
          allExtras.find((e) => e.id === extra.id) ?? extra

        const items = (state.items ?? []).flatMap<CartItem>((line) => {
          const extras = (line.extras ?? []).map(currentExtra)
          const extrasTotal = extras.reduce((sum, e) => sum + e.price, 0)

          if (line.menuItem?.isCustom) {
            return [{
              ...line,
              extras,
              totalPrice: (line.menuItem.price + extrasTotal) * line.quantity,
            }]
          }

          const current = menuItems.find((m) => m.id === line.menuItem?.id)
          if (!current) return []
          return [{
            ...line,
            menuItem: current,
            extras,
            totalPrice: (current.price + extrasTotal) * line.quantity,
          }]
        })

        return { ...state, items } as CartStore
      },
    }
  )
)

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      language: 'ar',
      setLanguage: (lang) => set({ language: lang }),
      cartOpen: false,
      setCartOpen: (open) => set({ cartOpen: open }),
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      activeCategory: 'all',
      setActiveCategory: (cat) => set({ activeCategory: cat }),
    }),
    { name: 'pastataram-ui', partialize: (state) => ({ language: state.language }) }
  )
)

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      currentOrder: null,
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status, updatedAt: new Date() } : o
          ),
          currentOrder:
            state.currentOrder?.id === orderId
              ? { ...state.currentOrder, status, updatedAt: new Date() }
              : state.currentOrder,
        })),
      setCurrentOrder: (order) => set({ currentOrder: order }),
    }),
    { name: 'pastataram-orders' }
  )
)

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      login: (user) => set({ isLoggedIn: true, user }),
      logout: () => set({ isLoggedIn: false, user: null }),
      isAdminLoggedIn: false,
      adminUser: null,
      adminLogin: (user) => set({ isAdminLoggedIn: true, adminUser: user }),
      adminLogout: () => set({ isAdminLoggedIn: false, adminUser: null }),
    }),
    { name: 'pastataram-auth' }
  )
)
