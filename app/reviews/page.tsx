'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Quote } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import ReviewsSection from '@/components/home/ReviewsSection'
import AmbientParticles from '@/components/ambient/AmbientParticles'
import { useUIStore } from '@/lib/store'
import { reviews } from '@/lib/data'

/**
 * The full customer-experience page.
 *
 * It renders the same ReviewsSection the homepage uses, unlimited, so the two
 * can never drift apart in look, wording or behaviour.
 *
 * What it deliberately no longer does: the previous page kept a local
 * useState copy of the reviews, appended a newly submitted one to it, and told
 * the customer "سيتم مراجعته قريباً". That review existed only until the next
 * render — nobody at the restaurant ever saw it. Submission now goes through
 * the review dialog, which sends it to the team on WhatsApp.
 */
export default function ReviewsPage() {
  const language = useUIStore((s) => s.language)
  const isAr = language === 'ar'
  const reduce = useReducedMotion()

  const approvedCount = reviews.filter((r) => r.approved).length

  return (
    <PageWrapper>
      <section
        className="relative overflow-hidden py-20 md:py-24"
        style={{ background: 'linear-gradient(180deg, #0B0709 0%, #120C10 70%, #120C10 100%)' }}
        aria-labelledby="reviews-page-heading"
      >
        <AmbientParticles density={20} />
        <div
          aria-hidden
          className="pointer-events-none absolute start-1/2 top-0 h-[36vh] w-[56vh] -translate-x-1/2 rounded-full blur-[110px]"
          style={{ background: 'radial-gradient(ellipse, rgba(253,101,125,0.2) 0%, transparent 70%)' }}
        />

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-3xl px-6 text-center"
        >
          <span className="eyebrow inline-flex items-center gap-2">
            <Quote className="h-3.5 w-3.5" aria-hidden />
            {isAr ? 'آراء ضيوفنا' : 'Our Guests'}
          </span>

          <h1 id="reviews-page-heading" className="mt-4 font-display display-xl font-bold text-brand-cream">
            {isAr ? 'تجربتك تهمنا' : 'Your experience matters'}
          </h1>

          <div className="rule-fade mx-auto my-7 max-w-[11rem]" aria-hidden />

          <p className="mx-auto max-w-xl text-[15px] leading-9 text-brand-cream-dim">
            {isAr
              ? 'نقرأ كل رسالة تصلنا، ونستخدمها فعلاً لتحسين أطباقنا وخدمتنا.'
              : 'We read everything that reaches us, and we genuinely use it to improve the food and the service.'}
          </p>

          {/* A count of what is shown — not an average, not a score out of five.
              Six seeded reviews are not a rating, and publishing one as if they
              were would invent a trust signal the restaurant has not earned. */}
          <p className="mt-6 text-xs font-semibold text-brand-muted">
            {isAr ? `${approvedCount} تجربة منشورة` : `${approvedCount} published experiences`}
          </p>
        </motion.div>
      </section>

      <ReviewsSection limit={Number.MAX_SAFE_INTEGER} showHeading={false} />
    </PageWrapper>
  )
}
