'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Upload, Send, CheckCircle, MessageSquare } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import { useUIStore } from '@/lib/store'
import { reviews as initialReviews } from '@/lib/data'
import { formatDate, generateId } from '@/lib/utils'
import toast from 'react-hot-toast'
import { Review } from '@/lib/types'

export default function ReviewsPage() {
  const { language } = useUIStore()
  const isAr = language === 'ar'
  const [allReviews, setAllReviews] = useState(initialReviews)

  const [form, setForm] = useState({ name: '', rating: 5, comment: '' })
  const [hoverRating, setHoverRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length

  const ratingCounts = [5, 4, 3, 2, 1].map((r) => ({
    rating: r,
    count: allReviews.filter((rv) => rv.rating === r).length,
    pct: (allReviews.filter((rv) => rv.rating === r).length / allReviews.length) * 100,
  }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.comment.trim()) {
      toast.error(isAr ? 'يرجى ملء جميع الحقول' : 'Please fill all fields')
      return
    }
    const newReview: Review = {
      id: generateId(),
      customerName: form.name,
      rating: form.rating,
      comment: form.comment,
      date: new Date(),
      verified: false,
      featured: false,
      approved: false,
    }
    setAllReviews([newReview, ...allReviews])
    setSubmitted(true)
    toast.success(isAr ? 'شكراً على تقييمك! سيتم مراجعته قريباً' : 'Thank you! Your review will be reviewed shortly')
  }

  const approvedReviews = allReviews.filter((r) => r.approved)

  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative py-24 bg-gradient-to-br from-brand-cream via-brand-blush/30 to-brand-pearl dark:from-[#1C1410] dark:via-[#2A1F1C] dark:to-[#1C1410]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-brand-rose-gold text-sm font-bold mb-6">
              <Star className="w-4 h-4 fill-brand-rose-gold" />
              {isAr ? 'آراء عملائنا' : 'Customer Reviews'}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-espresso dark:text-brand-ivory mb-4">
              {isAr ? 'التقييمات والآراء' : 'Reviews & Feedback'}
            </h1>

            {/* Overall Rating */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="text-6xl font-black gradient-text">{avgRating.toFixed(1)}</div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(avgRating) ? 'fill-brand-champagne text-brand-champagne' : 'text-brand-mocha'}`}
                    />
                  ))}
                </div>
                <p className="text-brand-brown dark:text-brand-mocha text-sm">
                  {isAr ? `${approvedReviews.length} تقييم` : `${approvedReviews.length} reviews`}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Reviews */}
            <div className="lg:col-span-2 space-y-6">
              {/* Rating breakdown */}
              <div className="premium-card p-6 mb-8">
                <h3 className="font-bold text-brand-espresso dark:text-brand-ivory mb-4">
                  {isAr ? 'توزيع التقييمات' : 'Rating Breakdown'}
                </h3>
                <div className="space-y-2">
                  {ratingCounts.map(({ rating, count, pct }) => (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm text-brand-brown dark:text-brand-mocha w-6 text-end">{rating}</span>
                      <Star className="w-4 h-4 text-brand-champagne fill-brand-champagne flex-shrink-0" />
                      <div className="flex-1 h-2 bg-brand-blush dark:bg-brand-espresso/30 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-brand-rose-gold to-brand-champagne rounded-full"
                        />
                      </div>
                      <span className="text-xs text-brand-latte w-8">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews list */}
              <div className="space-y-5">
                {approvedReviews.map((review, i) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="premium-card p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blush to-brand-nude flex items-center justify-center font-bold text-lg text-brand-espresso flex-shrink-0">
                          {review.customerName.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-brand-espresso dark:text-brand-ivory">
                              {review.customerName}
                            </p>
                            {review.verified && (
                              <span className="flex items-center gap-1 text-xs text-green-500 font-semibold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                                <CheckCircle className="w-3 h-3" />
                                {isAr ? 'موثق' : 'Verified'}
                              </span>
                            )}
                            {review.featured && (
                              <span className="text-xs text-brand-rose-gold font-semibold bg-brand-blush dark:bg-brand-rose-gold/10 px-2 py-0.5 rounded-full">
                                ⭐ {isAr ? 'مميز' : 'Featured'}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, j) => (
                              <Star
                                key={j}
                                className={`w-3.5 h-3.5 ${j < review.rating ? 'fill-brand-champagne text-brand-champagne' : 'text-brand-mocha'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-brand-latte flex-shrink-0">
                        {formatDate(review.date, language)}
                      </span>
                    </div>
                    <p className="mt-4 text-brand-brown dark:text-brand-mocha leading-relaxed text-sm italic">
                      "{review.comment}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Review Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="premium-card p-8 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="font-black text-brand-espresso dark:text-brand-ivory text-xl mb-2">
                        {isAr ? 'شكراً لك!' : 'Thank You!'}
                      </h3>
                      <p className="text-brand-brown dark:text-brand-mocha text-sm">
                        {isAr ? 'تم استلام تقييمك وسيتم مراجعته قريباً' : 'Your review has been received and will be reviewed shortly'}
                      </p>
                      <button
                        onClick={() => { setSubmitted(false); setForm({ name: '', rating: 5, comment: '' }) }}
                        className="btn-secondary mt-6 w-full text-sm py-2.5"
                      >
                        {isAr ? 'إضافة تقييم آخر' : 'Add Another Review'}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="premium-card p-6">
                      <div className="flex items-center gap-2 mb-5">
                        <MessageSquare className="w-5 h-5 text-brand-rose-gold" />
                        <h3 className="font-black text-brand-espresso dark:text-brand-ivory">
                          {isAr ? 'أضف تقييمك' : 'Write a Review'}
                        </h3>
                      </div>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-brand-espresso dark:text-brand-ivory mb-1.5">
                            {isAr ? 'الاسم' : 'Name'}
                          </label>
                          <input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder={isAr ? 'اسمك الكريم' : 'Your name'}
                            className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-espresso/30 text-brand-espresso dark:text-brand-ivory placeholder-brand-latte focus:outline-none focus:border-brand-rose-gold text-sm"
                            dir={isAr ? 'rtl' : 'ltr'}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-brand-espresso dark:text-brand-ivory mb-1.5">
                            {isAr ? 'التقييم' : 'Rating'}
                          </label>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((r) => (
                              <button
                                key={r}
                                type="button"
                                onClick={() => setForm({ ...form, rating: r })}
                                onMouseEnter={() => setHoverRating(r)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="transition-transform hover:scale-110"
                              >
                                <Star
                                  className={`w-7 h-7 transition-colors ${
                                    r <= (hoverRating || form.rating)
                                      ? 'fill-brand-champagne text-brand-champagne'
                                      : 'text-brand-mocha'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-brand-espresso dark:text-brand-ivory mb-1.5">
                            {isAr ? 'تعليقك' : 'Your Comment'}
                          </label>
                          <textarea
                            value={form.comment}
                            onChange={(e) => setForm({ ...form, comment: e.target.value })}
                            placeholder={isAr ? 'شاركنا تجربتك...' : 'Share your experience...'}
                            rows={4}
                            className="w-full px-4 py-2.5 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-espresso/30 text-brand-espresso dark:text-brand-ivory placeholder-brand-latte focus:outline-none focus:border-brand-rose-gold resize-none text-sm"
                            dir={isAr ? 'rtl' : 'ltr'}
                          />
                        </div>

                        <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                          <Send className="w-4 h-4" />
                          {isAr ? 'إرسال التقييم' : 'Submit Review'}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
