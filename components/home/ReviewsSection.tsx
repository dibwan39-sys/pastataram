'use client'

import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck, MapPin, Quote } from 'lucide-react'
import { branches, reviews as allReviews } from '@/lib/data'
import { useUIStore } from '@/lib/store'
import { formatDate } from '@/lib/utils'
import { StarDisplay } from '@/components/reviews/StarRating'
import ReviewModal from '@/components/reviews/ReviewModal'

/**
 * "تجربتك تهمنا" — customer experiences as a marketing section, on the
 * homepage rather than buried on /reviews.
 *
 * Two things it deliberately does NOT do:
 *
 *   · No aggregate score. Six seeded reviews are not a rating, and publishing
 *     an average of them as "4.8 من 5" would invent a trust signal.
 *   · No branch filter unless reviews actually carry a branch. The seed
 *     reviews predate the branch field and none of them records where the
 *     customer ate; assigning them one would be fabricating. The filter
 *     appears on its own once branch-tagged reviews exist.
 */
interface ReviewsSectionProps {
  /** How many reviews to show. The homepage shows a taste; /reviews shows all. */
  limit?: number
  /** The page supplies its own title, so the section's heading can be dropped. */
  showHeading?: boolean
}

export default function ReviewsSection({ limit = 6, showHeading = true }: ReviewsSectionProps) {
  const language = useUIStore((s) => s.language)
  const isAr = language === 'ar'
  const reduce = useReducedMotion()
  const [modalOpen, setModalOpen] = useState(false)
  const [branchFilter, setBranchFilter] = useState<number | 'all'>('all')

  const approved = useMemo(() => allReviews.filter((r) => r.approved), [])
  const hasBranchData = approved.some((r) => r.branchId !== undefined)

  const shown = useMemo(() => {
    const list = branchFilter === 'all' ? approved : approved.filter((r) => r.branchId === branchFilter)
    return [...list].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, limit)
  }, [approved, branchFilter, limit])

  return (
    <section
      className="section relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--brand-noir) 0%, var(--brand-surface) 55%, var(--brand-noir) 100%)' }}
      aria-labelledby="reviews-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute end-[-8%] top-1/4 h-[50vh] w-[50vh] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(253,101,125,0.18) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {showHeading && (
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-11 text-center"
          >
            <span className="eyebrow">{isAr ? 'آراء ضيوفنا' : 'Our Guests'}</span>
            <h2 id="reviews-heading" className="mt-3 font-display display-lg font-bold text-brand-cream">
              {isAr ? 'تجربتك تهمنا' : 'Your experience matters'}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-8 text-brand-cream-dim">
              {isAr
                ? 'كل طبق نقدّمه يبدأ من رأي ضيف سابق. شاركنا رأيك لنصنع تجربة أفضل.'
                : 'Every plate we serve starts with a guest telling us what worked. Tell us yours.'}
            </p>
          </motion.div>
        )}

        {hasBranchData && (
          <div className="mb-9 flex flex-wrap items-center justify-center gap-2">
            {([{ id: 'all' as const, label: isAr ? 'كل الفروع' : 'All branches' },
               ...branches.map((b) => ({ id: b.id, label: isAr ? b.nameAr.replace('جدة - ', '') : b.nameEn.replace('Jeddah - ', '') }))]
            ).map((opt) => {
              const active = branchFilter === opt.id
              return (
                <button
                  key={String(opt.id)}
                  type="button"
                  onClick={() => setBranchFilter(opt.id)}
                  aria-pressed={active}
                  className="rounded-full px-4 py-2 text-sm font-bold transition-colors"
                  style={{
                    background: active ? 'linear-gradient(135deg, #C43E57, #FD657D)' : 'transparent',
                    border: `1px solid ${active ? 'transparent' : 'rgba(231,198,164,0.26)'}`,
                    color: active ? '#FFF3EE' : '#D8C2BD',
                  }}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        )}

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((review, i) => {
            const branch = branches.find((b) => b.id === review.branchId)
            return (
              <motion.li
                key={review.id}
                initial={reduce ? undefined : { opacity: 0, y: 26 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: Math.min(i, 5) * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col rounded-[1.5rem] p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(150deg, rgba(58, 27, 42,0.92) 0%, rgba(46, 21, 33,0.92) 100%)',
                  border: '1px solid rgba(231,198,164,0.16)',
                }}
              >
                <Quote
                  aria-hidden
                  className="absolute end-5 top-5 h-8 w-8 text-brand-rose"
                  style={{ opacity: 0.18 }}
                />

                <StarDisplay
                  value={review.rating}
                  label={isAr ? `${review.rating} من ٥` : `${review.rating} out of 5`}
                />

                <p className="mt-4 flex-1 text-[14px] leading-8 text-brand-cream-soft">
                  {review.comment}
                </p>

                <div className="mt-5 flex items-center gap-3 border-t pt-4" style={{ borderColor: 'rgba(231,198,164,0.14)' }}>
                  <span
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #C43E57, #FD657D)' }}
                    aria-hidden
                  >
                    {review.customerName.trim().charAt(0)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 text-sm font-bold text-brand-cream">
                      <span className="truncate">{review.customerName}</span>
                      {review.verified && (
                        <BadgeCheck className="h-3.5 w-3.5 flex-shrink-0 text-brand-champagne" aria-label={isAr ? 'موثّق' : 'Verified'} />
                      )}
                    </span>
                    <span className="flex flex-wrap items-center gap-x-2 text-[11px] text-brand-muted">
                      <time dateTime={new Date(review.date).toISOString()}>
                        {formatDate(review.date, language)}
                      </time>
                      {branch && (
                        <>
                          <span aria-hidden>·</span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3" aria-hidden />
                            {isAr ? branch.nameAr.replace('جدة - ', '') : branch.nameEn.replace('Jeddah - ', '')}
                          </span>
                        </>
                      )}
                    </span>
                  </span>
                </div>
              </motion.li>
            )
          })}
        </ul>

        <motion.div
          initial={reduce ? undefined : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 text-center"
        >
          <button type="button" onClick={() => setModalOpen(true)} className="btn-primary px-9 py-3.5 text-sm">
            {isAr ? 'شاركنا تجربتك' : 'Share your experience'}
          </button>
        </motion.div>
      </div>

      <ReviewModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
