export type Language = 'ar' | 'en'
export type Theme = 'light' | 'dark'

export interface MenuItem {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  /** Optional short teaser shown on the product card; falls back to description. */
  shortDescription?: string
  shortDescriptionAr?: string
  price: number
  category: string
  image: string
  tags: string[]
  available: boolean
  featured: boolean
  bestseller: boolean
  calories?: number
  extras?: Extra[]
  /**
   * True for a pasta the customer composed in /build-your-pasta. Such an item
   * exists only inside that customer's cart — it is never in `menuItems` — so
   * the cart's migration must keep it on its own stored price instead of
   * trying to re-resolve it against the menu and dropping it.
   */
  isCustom?: boolean
}

export interface Extra {
  id: string
  name: string
  nameAr: string
  price: number
}

export interface CartItem {
  menuItem: MenuItem
  quantity: number
  extras: Extra[]
  notes?: string
  totalPrice: number
}

export type OrderType = 'pickup' | 'delivery'

export interface Order {
  id: string
  orderNumber: string
  items: CartItem[]
  status: OrderStatus
  total: number
  customerName: string
  customerPhone: string
  notes?: string
  createdAt: Date
  updatedAt: Date
  estimatedTime?: number
  orderType?: OrderType
  branchId?: number
  address?: string
  deliveryFee?: number
  scheduledAt?: string
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'

/** The four aspects a customer can score separately, each 1–5. */
export interface ReviewAspects {
  food: number
  service: number
  cleanliness: number
  atmosphere: number
}

export interface Review {
  id: string
  customerName: string
  rating: number
  comment: string
  date: Date
  verified: boolean
  featured: boolean
  image?: string
  approved: boolean
  /**
   * Added for the review experience. Both are optional so the existing seed
   * reviews — which predate them and carry no branch or per-aspect scores —
   * stay valid, and so the admin moderation screen keeps working unchanged.
   */
  branchId?: number
  aspects?: ReviewAspects
}

export interface Offer {
  id: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  discount: number
  discountType: 'percentage' | 'fixed'
  code?: string
  image: string
  validUntil: Date
  active: boolean
  featured: boolean
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  orders: Order[]
  favorites: string[]
  createdAt: Date
}

export interface GalleryImage {
  id: string
  url: string
  alt: string
  altAr: string
  category: string
  featured: boolean
  /**
   * Intrinsic pixel dimensions of the file, measured from the asset itself.
   * The masonry gallery needs them so next/image can reserve the right space
   * before the photograph arrives, instead of reflowing the column as each one
   * loads.
   */
  width: number
  height: number
}

export interface Notification {
  id: string
  type: 'order' | 'review' | 'message' | 'system'
  title: string
  message: string
  read: boolean
  createdAt: Date
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: AdminRole
  avatar?: string
}

export type AdminRole = 'super_admin' | 'manager' | 'cashier' | 'kitchen'

export interface CMSContent {
  heroTitle: string
  heroTitleAr: string
  heroSubtitle: string
  heroSubtitleAr: string
  heroImage: string
  aboutText: string
  aboutTextAr: string
  businessHours: BusinessHours[]
  socialLinks: SocialLinks
  whatsappNumber: string
  phone: string
  address: string
  addressAr: string
}

export interface BusinessHours {
  day: string
  dayAr: string
  open: string
  close: string
  closed: boolean
}

export interface SocialLinks {
  instagram: string
  tiktok: string
  snapchat: string
  whatsapp: string
}

export interface PastaCustomization {
  pastaType: string
  sauce: string
  cheese: string
  protein: string
  spiceLevel: number
  toppings: string[]
  totalPrice: number
}
