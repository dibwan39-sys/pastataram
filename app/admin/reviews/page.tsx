'use client'

import { useState } from 'react'
import { Star, Check, X, Eye } from 'lucide-react'
import { reviews as initialReviews } from '@/lib/data'
import { Review } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews)
  const [filter, setFilter] = useState('all')

  const filtered = reviews.filter((r) => {
    if (filter === 'pending') return !r.approved
    if (filter === 'approved') return r.approved
    if (filter === 'featured') return r.featured
    return true
  })

  const approve = (id: string) => {
    setReviews(reviews.map((r) => r.id === id ? { ...r, approved: true } : r))
    toast.success('Review approved!')
  }

  const reject = (id: string) => {
    setReviews(reviews.filter((r) => r.id !== id))
    toast.success('Review removed')
  }

  const toggleFeatured = (id: string) => {
    setReviews(reviews.map((r) => r.id === id ? { ...r, featured: !r.featured } : r))
    toast.success('Featured status updated')
  }

  const tabs = ['all', 'pending', 'approved', 'featured']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-brand-espresso dark:text-brand-ivory">Reviews Management</h1>
          <p className="text-sm text-brand-latte mt-1">{reviews.length} total reviews</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="text-center">
            <p className="font-black text-2xl gradient-text">
              {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
            </p>
            <p className="text-brand-latte text-xs">Avg Rating</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-brand-rose/20">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2.5 text-sm font-semibold capitalize transition-all border-b-2 -mb-px ${
              filter === tab
                ? 'border-brand-rose-gold text-brand-rose-gold'
                : 'border-transparent text-brand-latte hover:text-brand-espresso dark:hover:text-brand-ivory'
            }`}
          >
            {tab} ({tab === 'all' ? reviews.length : reviews.filter((r) => {
              if (tab === 'pending') return !r.approved
              if (tab === 'approved') return r.approved
              if (tab === 'featured') return r.featured
              return true
            }).length})
          </button>
        ))}
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        {filtered.map((review) => (
          <div
            key={review.id}
            className={`bg-white dark:bg-[#2A1F1C] rounded-2xl p-5 shadow-card ${!review.approved ? 'border-l-4 border-amber-400' : review.featured ? 'border-l-4 border-brand-rose-gold' : ''}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blush to-brand-nude flex items-center justify-center font-bold text-brand-espresso flex-shrink-0">
                  {review.customerName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-brand-espresso dark:text-brand-ivory">{review.customerName}</p>
                    {review.verified && (
                      <span className="text-xs text-green-500 bg-green-50 px-2 py-0.5 rounded-full font-semibold">Verified</span>
                    )}
                    {!review.approved && (
                      <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-semibold">Pending</span>
                    )}
                    {review.featured && (
                      <span className="text-xs text-brand-rose-gold bg-brand-blush px-2 py-0.5 rounded-full font-semibold">⭐ Featured</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-brand-champagne text-brand-champagne' : 'text-brand-mocha'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-brand-brown dark:text-brand-mocha mt-2 italic">"{review.comment}"</p>
                  <p className="text-xs text-brand-latte mt-2">{formatDate(review.date, 'en')}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => toggleFeatured(review.id)}
                  className={`p-1.5 rounded-lg transition-colors ${review.featured ? 'bg-brand-blush text-brand-rose-gold' : 'hover:bg-brand-blush/50 text-brand-latte hover:text-brand-rose-gold'}`}
                  title="Toggle Featured"
                >
                  <Star className="w-4 h-4" />
                </button>
                {!review.approved && (
                  <button
                    onClick={() => approve(review.id)}
                    className="p-1.5 rounded-lg hover:bg-green-50 text-green-500 transition-colors"
                    title="Approve"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => reject(review.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
                  title="Delete"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-brand-latte">No reviews in this category</div>
        )}
      </div>
    </div>
  )
}
