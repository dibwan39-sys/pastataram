import { MetadataRoute } from 'next'
import { SITE_URL, publicRoutes } from '@/lib/site'

/**
 * Served by Next at /sitemap.xml.
 *
 * The host now comes from lib/site.ts instead of a hardcoded pastataram.com,
 * which disagreed with the metadataBase the rest of the app used.
 *
 * `/offers` and `/account` are deliberately absent: there is no live promotion
 * to index, and the account area is per-customer with nothing for a crawler.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return publicRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === '' || route === '/menu' ? ('weekly' as const) : ('monthly' as const),
    priority: route === '' ? 1 : route === '/menu' ? 0.9 : 0.7,
  }))
}
