'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Tag } from 'lucide-react'
import { offers as initialOffers } from '@/lib/data'
import toast from 'react-hot-toast'

export default function AdminOffersPage() {
  const [offers, setOffers] = useState(initialOffers)

  const toggleActive = (id: string) => {
    setOffers(offers.map((o) => o.id === id ? { ...o, active: !o.active } : o))
    toast.success('Offer status updated')
  }

  const deleteOffer = (id: string) => {
    setOffers(offers.filter((o) => o.id !== id))
    toast.success('Offer deleted')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-brand-espresso dark:text-brand-ivory">Offers & Coupons</h1>
          <p className="text-sm text-brand-latte mt-1">{offers.filter((o) => o.active).length} active offers</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5">
          <Plus className="w-4 h-4" />
          New Offer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`bg-white dark:bg-[#2A1F1C] rounded-2xl shadow-card overflow-hidden ${!offer.active ? 'opacity-60' : ''}`}
          >
            <div className="relative h-36">
              <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 start-3">
                <span className="bg-gradient-to-r from-brand-rose-gold to-brand-champagne text-white px-3 py-1 rounded-full text-sm font-bold">
                  {offer.discount}{offer.discountType === 'percentage' ? '%' : ' SAR'} Off
                </span>
              </div>
              {!offer.active && (
                <div className="absolute top-3 end-3 bg-gray-500/80 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Inactive
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-brand-espresso dark:text-brand-ivory mb-1">{offer.title}</h3>
              <p className="text-xs text-brand-brown dark:text-brand-mocha mb-3 line-clamp-2">{offer.description}</p>
              {offer.code && (
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-3.5 h-3.5 text-brand-rose-gold" />
                  <span className="font-mono text-sm font-bold text-brand-espresso dark:text-brand-ivory bg-brand-blush dark:bg-brand-espresso/30 px-2 py-0.5 rounded">
                    {offer.code}
                  </span>
                </div>
              )}
              <p className="text-xs text-brand-latte mb-4">
                Expires: {new Date(offer.validUntil).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleActive(offer.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
                    offer.active
                      ? 'bg-green-50 text-green-600 hover:bg-green-100'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {offer.active ? 'Active' : 'Inactive'}
                </button>
                <div className="flex items-center gap-1.5">
                  <button className="p-1.5 rounded-lg hover:bg-brand-blush/50 text-brand-espresso dark:text-brand-ivory transition-colors">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteOffer(offer.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
