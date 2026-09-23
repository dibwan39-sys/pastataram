import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

/**
 * Served by Next at /robots.txt.
 *
 * vercel.json used to rewrite /robots.txt → /robots and /sitemap.xml → /sitemap.
 * Neither target exists, so both endpoints returned 404 in production while
 * looking correct in the source. Those rewrites are gone.
 *
 * Disallowing /admin keeps it out of search results. It is NOT a security
 * control — see the admin gate for what actually restricts access.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/', '/account', '/checkout'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
