import type { MenuItem } from './types'

/**
 * ════════════════════════════════════════════════════════════════
 *  Build Your Pasta — options, pricing and cart representation
 * ════════════════════════════════════════════════════════════════
 *
 *  These options and surcharges used to live inside the page component, which
 *  put business prices in the UI layer. They are unchanged in value — only
 *  moved — so the builder still costs exactly what it did.
 */

export interface BuildOption {
  id: string
  nameAr: string
  nameEn: string
  emoji: string
  /** Surcharge on top of the base price. Negative for an omission. */
  price: number
}

export const pastaTypes: BuildOption[] = [
  { id: 'spaghetti', nameAr: 'سباغيتي', nameEn: 'Spaghetti', emoji: '🍝', price: 0 },
  { id: 'fettuccine', nameAr: 'فيتوتشيني', nameEn: 'Fettuccine', emoji: '🍜', price: 0 },
  { id: 'penne', nameAr: 'بيني', nameEn: 'Penne', emoji: '🍝', price: 0 },
  { id: 'rigatoni', nameAr: 'ريجاتوني', nameEn: 'Rigatoni', emoji: '🍝', price: 2 },
]

export const sauces: BuildOption[] = [
  { id: 'tomato', nameAr: 'صوص الطماطم', nameEn: 'Tomato Sauce', emoji: '🍅', price: 0 },
  { id: 'cream', nameAr: 'صوص الكريمة', nameEn: 'Cream Sauce', emoji: '🥛', price: 0 },
  { id: 'pesto', nameAr: 'بيستو', nameEn: 'Pesto', emoji: '🌿', price: 3 },
  { id: 'rosé', nameAr: 'روزيه', nameEn: 'Rosé', emoji: '🌹', price: 3 },
]

export const proteins: BuildOption[] = [
  { id: 'chicken', nameAr: 'دجاج مشوي', nameEn: 'Grilled Chicken', emoji: '🍗', price: 0 },
  { id: 'shrimp', nameAr: 'جمبري', nameEn: 'Shrimp', emoji: '🦐', price: 5 },
  { id: 'beef', nameAr: 'لحم بقري', nameEn: 'Beef', emoji: '🥩', price: 5 },
  { id: 'none', nameAr: 'بدون بروتين', nameEn: 'No Protein', emoji: '🥦', price: -3 },
]

export const cheeses: BuildOption[] = [
  { id: 'mozzarella', nameAr: 'موزاريلا', nameEn: 'Mozzarella', emoji: '🧀', price: 0 },
  { id: 'parmesan', nameAr: 'بارميزان', nameEn: 'Parmesan', emoji: '🧀', price: 2 },
  { id: 'extra', nameAr: 'جبنة مضاعفة', nameEn: 'Double Cheese', emoji: '🧀', price: 4 },
  { id: 'none', nameAr: 'بدون جبنة', nameEn: 'No Cheese', emoji: '❌', price: -2 },
]

export const toppings: BuildOption[] = [
  { id: 'mushroom', nameAr: 'مشروم', nameEn: 'Mushrooms', emoji: '🍄', price: 2 },
  { id: 'eggplant', nameAr: 'باذنجان', nameEn: 'Eggplant', emoji: '🍆', price: 2 },
  { id: 'olives', nameAr: 'زيتون', nameEn: 'Olives', emoji: '🫒', price: 2 },
  { id: 'herbs', nameAr: 'أعشاب طازجة', nameEn: 'Fresh Herbs', emoji: '🌿', price: 1 },
  { id: 'pepper', nameAr: 'فلفل رومي', nameEn: 'Bell Pepper', emoji: '🫑', price: 2 },
  { id: 'chili', nameAr: 'فلفل حار', nameEn: 'Chili Flakes', emoji: '🌶️', price: 1 },
]

/**
 * ⚠️  Ordering is OFF until these prices are approved.
 *
 * The base price and every surcharge below exist only in this file. They
 * appear nowhere in the official menu artwork (public/images/menu-final-v2.webp),
 * which is the source of truth for what PASTATARAM charges, and no other
 * approved record backs them. Numbers in a repository are not a price list.
 *
 * So the builder stays visible — a customer can compose a pasta and see what
 * it would contain — but it cannot create a cart line, because doing so would
 * quote a customer a figure the restaurant never agreed to and carry it into a
 * WhatsApp order as if it had.
 *
 * To turn ordering on: confirm the base and every surcharge with the
 * restaurant, reconcile them with the menu, then flip this to `true`. It is
 * the only switch — the page, the teaser and the cart all read it.
 */
export const BUILD_PRICING_APPROVED = false

export const BUILD_BASE_PRICE = 22
/** A composed pasta never costs less than this, whatever is omitted. */
export const BUILD_MIN_PRICE = 15

/**
 * A composed pasta has no photograph of its own — it is assembled to order, so
 * no such plate has ever been shot. It borrows an existing PASTATARAM pasta
 * photo as its representative image.
 *
 * It previously pointed at a stock Unsplash URL, which meant a cart line and a
 * WhatsApp order illustrated by someone else's food, served from a third-party
 * host, and dependent on that host staying up.
 */
export const BUILD_IMAGE = '/images/f2.webp'

export interface BuildSelection {
  pasta: BuildOption
  sauce: BuildOption
  protein: BuildOption
  cheese: BuildOption
  toppingIds: string[]
  spiceLevel: number
}

/** Unit price of one composed pasta, before quantity. */
export function buildUnitPrice(sel: BuildSelection): number {
  const surcharge =
    sel.pasta.price +
    sel.sauce.price +
    sel.protein.price +
    sel.cheese.price +
    sel.toppingIds.reduce((sum, id) => sum + (toppings.find((t) => t.id === id)?.price ?? 0), 0)

  return Math.max(BUILD_BASE_PRICE + surcharge, BUILD_MIN_PRICE)
}

/**
 * Turns a selection into a cart-ready item.
 *
 * Two things matter here and both used to be wrong:
 *
 *  1. `isCustom: true` — the cart's migration keeps these lines on their own
 *     price instead of looking them up in `menuItems` and discarding them.
 *     Without it, every composed pasta silently vanished from a saved cart the
 *     next time the cart version was bumped, which happens on any price change.
 *
 *  2. A deterministic id built from the selection, instead of a random one.
 *     Two identical pastas now merge into a single cart line the way two
 *     identical menu items do, and `cartLineId` stays stable across reloads.
 */
export function buildCustomPasta(sel: BuildSelection, isAr: boolean): MenuItem {
  const chosenToppings = toppings.filter((t) => sel.toppingIds.includes(t.id))
  const toppingKey = [...sel.toppingIds].sort().join('+')

  const partsEn = [sel.sauce.nameEn, sel.protein.nameEn, sel.cheese.nameEn, ...chosenToppings.map((t) => t.nameEn)]
  const partsAr = [sel.sauce.nameAr, sel.protein.nameAr, sel.cheese.nameAr, ...chosenToppings.map((t) => t.nameAr)]

  return {
    id: `custom:${sel.pasta.id}:${sel.sauce.id}:${sel.protein.id}:${sel.cheese.id}:${toppingKey}:${sel.spiceLevel}`,
    name: `Custom ${sel.pasta.nameEn}`,
    nameAr: `باستا مخصصة — ${sel.pasta.nameAr}`,
    description: partsEn.join(', '),
    descriptionAr: partsAr.join('، '),
    shortDescription: partsEn.slice(0, 3).join(', '),
    shortDescriptionAr: partsAr.slice(0, 3).join('، '),
    price: buildUnitPrice(sel),
    category: 'pasta',
    image: BUILD_IMAGE,
    tags: ['custom'],
    available: true,
    featured: false,
    bestseller: false,
    isCustom: true,
  }
}

/** Human-readable summary of a selection, for the cart note and the invoice. */
export function buildSummary(sel: BuildSelection, isAr: boolean): string {
  const chosen = toppings.filter((t) => sel.toppingIds.includes(t.id))
  const lines = isAr
    ? [
        `الباستا: ${sel.pasta.nameAr}`,
        `الصوص: ${sel.sauce.nameAr}`,
        `البروتين: ${sel.protein.nameAr}`,
        `الجبنة: ${sel.cheese.nameAr}`,
        chosen.length ? `الإضافات: ${chosen.map((t) => t.nameAr).join('، ')}` : null,
        `الحرارة: ${sel.spiceLevel}/3`,
      ]
    : [
        `Pasta: ${sel.pasta.nameEn}`,
        `Sauce: ${sel.sauce.nameEn}`,
        `Protein: ${sel.protein.nameEn}`,
        `Cheese: ${sel.cheese.nameEn}`,
        chosen.length ? `Toppings: ${chosen.map((t) => t.nameEn).join(', ')}` : null,
        `Spice: ${sel.spiceLevel}/3`,
      ]

  return lines.filter(Boolean).join(' · ')
}
