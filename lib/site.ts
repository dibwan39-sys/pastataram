import { branches, businessHours, cmsContent, menuItems } from './data'

/**
 * ════════════════════════════════════════════════════════════════
 *  Canonical site identity — one source of truth for every URL.
 * ════════════════════════════════════════════════════════════════
 *
 *  The only deployment this repository actually configures is the
 *  Vercel project `pastataram` (.vercel/project.json), which serves
 *  https://pastataram.vercel.app. `app/sitemap.ts` and `app/robots.ts`
 *  previously hardcoded https://pastataram.com while `metadataBase`
 *  fell back to the vercel.app host, so the canonical URL, the sitemap
 *  and the Open Graph tags disagreed with one another.
 *
 *  pastataram.com is NOT asserted here because nothing in the project
 *  confirms it is live and pointed at this deployment. When that domain
 *  is attached to the Vercel project, set NEXT_PUBLIC_SITE_URL to it —
 *  every URL below follows automatically, with no code change.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://pastataram.vercel.app').replace(/\/$/, '')

export const SITE_NAME = 'PASTATARAM'

export const absoluteUrl = (path = '') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

/** Customer-facing routes, used by the sitemap. */
export const publicRoutes = [
  '',
  '/menu',
  '/build-your-pasta',
  '/gallery',
  '/reviews',
  '/about',
  '/contact',
  '/qr',
] as const

/**
 * Restaurant structured data.
 *
 * Every field below is derived from data that exists in this project. In
 * particular there is deliberately NO `aggregateRating` and NO `geo`: the
 * reviews in lib/data.ts are seed content rather than collected ratings, and
 * no verified coordinates exist for either branch. Publishing either would be
 * fabricating trust signals to Google and to customers.
 */
export function restaurantJsonLd() {
  const prices = menuItems.filter((m) => m.price > 0).map((m) => m.price)
  const open = businessHours.find((h) => !h.closed)

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: SITE_NAME,
    alternateName: 'باستاتا رام',
    url: SITE_URL,
    image: absoluteUrl('/images/f1.png'),
    logo: absoluteUrl('/images/logo.png'),
    servesCuisine: 'Italian',
    priceRange: `SAR ${Math.min(...prices)}–${Math.max(...prices)}`,
    currenciesAccepted: 'SAR',
    telephone: `+${cmsContent.whatsappNumber}`,
    hasMenu: absoluteUrl('/menu'),
    acceptsReservations: false,
    sameAs: [cmsContent.socialLinks.instagram, cmsContent.socialLinks.tiktok, cmsContent.socialLinks.snapchat],
    openingHoursSpecification: open
      ? [{
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: businessHours.filter((h) => !h.closed).map((h) => h.day),
          opens: '15:00',
          closes: '03:00',
        }]
      : [],
    address: branches.map((b) => ({
      '@type': 'PostalAddress',
      streetAddress: `${b.nameEn} — ${b.detailEn}`,
      addressLocality: 'Jeddah',
      addressCountry: 'SA',
    })),
  }
}
