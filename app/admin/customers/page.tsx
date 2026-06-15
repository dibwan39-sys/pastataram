'use client'

import { useState } from 'react'
import { Search, User, Phone, ShoppingBag, Star } from 'lucide-react'

const mockCustomers = [
  { id: '1', name: 'محمد العمري', email: 'mohammed@email.com', phone: '0501234567', orders: 12, totalSpent: 324, rating: 5, lastOrder: '2 days ago' },
  { id: '2', name: 'Sarah Al-Rashid', email: 'sarah@email.com', phone: '0507654321', orders: 8, totalSpent: 216, rating: 5, lastOrder: '5 days ago' },
  { id: '3', name: 'نورة الزهراني', email: 'noura@email.com', phone: '0502345678', orders: 15, totalSpent: 405, rating: 5, lastOrder: '1 day ago' },
  { id: '4', name: 'Ahmed Hassan', email: 'ahmed@email.com', phone: '0509876543', orders: 6, totalSpent: 162, rating: 4, lastOrder: '1 week ago' },
  { id: '5', name: 'فيصل القحطاني', email: 'faisal@email.com', phone: '0505678901', orders: 20, totalSpent: 540, rating: 5, lastOrder: 'Today' },
  { id: '6', name: 'Lina Khalid', email: 'lina@email.com', phone: '0503456789', orders: 4, totalSpent: 108, rating: 5, lastOrder: '3 days ago' },
]

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('')
  const filtered = mockCustomers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.includes(search) || c.phone.includes(search)
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-brand-espresso dark:text-brand-ivory">Customers</h1>
          <p className="text-sm text-brand-latte mt-1">{mockCustomers.length} registered customers</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="text-center">
            <p className="font-black text-xl gradient-text">{mockCustomers.reduce((s, c) => s + c.orders, 0)}</p>
            <p className="text-brand-latte text-xs">Total Orders</p>
          </div>
          <div className="text-center">
            <p className="font-black text-xl gradient-text">{mockCustomers.reduce((s, c) => s + c.totalSpent, 0)} SAR</p>
            <p className="text-brand-latte text-xs">Total Revenue</p>
          </div>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-latte" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers..."
          className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-brand-rose/30 bg-[#1A1614] dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory placeholder-brand-latte focus:outline-none focus:border-brand-rose-gold text-sm"
        />
      </div>

      <div className="bg-[#1A1614] dark:bg-[#1A1614] rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-brand-pearl dark:bg-brand-surface/20 text-xs text-brand-latte">
              <tr>
                <th className="text-start px-5 py-3 font-semibold">Customer</th>
                <th className="text-start px-5 py-3 font-semibold">Phone</th>
                <th className="text-start px-5 py-3 font-semibold">Orders</th>
                <th className="text-start px-5 py-3 font-semibold">Total Spent</th>
                <th className="text-start px-5 py-3 font-semibold">Rating</th>
                <th className="text-start px-5 py-3 font-semibold">Last Order</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer, i) => (
                <tr key={customer.id} className={`border-b border-brand-rose/10 hover:bg-brand-pearl/30 dark:hover:bg-brand-surface/10 transition-colors ${i % 2 === 0 ? '' : 'bg-brand-pearl/10'}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-blush to-brand-nude flex items-center justify-center font-bold text-brand-espresso text-sm flex-shrink-0">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-brand-espresso dark:text-brand-ivory">{customer.name}</p>
                        <p className="text-xs text-brand-latte">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-brand-brown dark:text-brand-mocha" dir="ltr">{customer.phone}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-brand-latte" />
                      <span className="text-sm font-bold text-brand-espresso dark:text-brand-ivory">{customer.orders}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm font-bold text-brand-espresso dark:text-brand-ivory">{customer.totalSpent} SAR</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-brand-champagne text-brand-champagne" />
                      <span className="text-sm font-bold text-brand-espresso dark:text-brand-ivory">{customer.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-brand-latte">{customer.lastOrder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
