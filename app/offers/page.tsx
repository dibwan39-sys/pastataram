import { notFound } from 'next/navigation'
import { liveOffers } from '@/lib/data'
import OffersClient from './OffersClient'

/**
 * Server-side gate for the promotions route.
 *
 * The check deliberately lives in a server component. Calling `notFound()`
 * from the client page instead produced a soft 404: the response was still
 * HTTP 200 with the not-found UI painted afterwards, which search engines
 * treat as a real page and may index. Here the 404 is the actual status.
 *
 * `liveOffers()` requires a promotion to be both flagged active and inside its
 * validity window. Every offer in lib/data.ts expired in early 2025, so the
 * route is currently 404 by design.
 *
 * `force-dynamic` matters for two reasons. A statically prerendered route bakes
 * its status in at build time, so `notFound()` still answered 200 — the very
 * soft 404 this gate exists to avoid. And validity is a question about *now*,
 * not about build time: evaluated per request, a promotion starts and stops on
 * its own dates without anyone redeploying.
 */
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'العروض',
  robots: { index: false, follow: false },
}

export default function OffersPage() {
  if (liveOffers().length === 0) notFound()
  return <OffersClient />
}
