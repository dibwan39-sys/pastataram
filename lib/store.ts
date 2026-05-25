import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, MenuItem, Extra, Language, Order, OrderStatus } from './types'

interface CartStore {
  items: CartItem[]
  addItem: (item: MenuItem, quantity?: number, extras?: Extra[], notes?: string) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
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

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1, extras = [], notes = '') => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (cartItem) => cartItem.menuItem.id === item.id &&
            JSON.stringify(cartItem.extras) === JSON.stringify(extras)
          )
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
      removeItem: (itemId) =>
        set((state) => ({ items: state.items.filter((i) => i.menuItem.id !== itemId) })),
      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.menuItem.id === itemId
              ? { ...i, quantity, totalPrice: (i.menuItem.price + i.extras.reduce((s, e) => s + e.price, 0)) * quantity }
              : i
          ).filter((i) => i.quantity > 0),
        })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, item) => sum + item.totalPrice, 0),
      itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: 'pastataram-cart' }
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
