'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, ChevronDown, Eye, Printer, Check, X as XIcon } from 'lucide-react'
import { useOrderStore } from '@/lib/store'
import { getStatusColor, formatPrice, formatDate } from '@/lib/utils'
import { OrderStatus } from '@/lib/types'
import toast from 'react-hot-toast'

const statusOptions: { value: string; label: string }[] = [
  { value: 'all', label: 'All Orders' },
  { value: 'pending', label: 'Pending' },
  { value: 'preparing', label: 'Preparing' },
  { value: 'ready', label: 'Ready' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

const mockOrders = [
  { id: 'o1', orderNumber: 'PT-001240', customerName: 'محمد العمري', customerPhone: '0501234567', status: 'pending' as OrderStatus, total: 54, items: [{ menuItem: { name: 'Pastata Ram', nameAr: 'باستاتا رام', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=60&q=80' }, quantity: 2, extras: [], totalPrice: 54 }], createdAt: new Date(), updatedAt: new Date() },
  { id: 'o2', orderNumber: 'PT-001239', customerName: 'Sarah Al-Rashid', customerPhone: '0507654321', status: 'preparing' as OrderStatus, total: 41, items: [{ menuItem: { name: 'Ramcine', nameAr: 'رامسين', image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=60&q=80' }, quantity: 1, extras: [], totalPrice: 27 }, { menuItem: { name: 'Pastata Balls', nameAr: 'باستاتا بولز', image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=60&q=80' }, quantity: 1, extras: [], totalPrice: 14 }], createdAt: new Date(Date.now() - 600000), updatedAt: new Date() },
  { id: 'o3', orderNumber: 'PT-001238', customerName: 'فيصل القحطاني', customerPhone: '0509876543', status: 'ready' as OrderStatus, total: 27, items: [{ menuItem: { name: 'Pastata Ram', nameAr: 'باستاتا رام', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=60&q=80' }, quantity: 1, extras: [], totalPrice: 27 }], createdAt: new Date(Date.now() - 1200000), updatedAt: new Date() },
  { id: 'o4', orderNumber: 'PT-001237', customerName: 'نورة الزهراني', customerPhone: '0502345678', status: 'completed' as OrderStatus, total: 68, items: [], createdAt: new Date(Date.now() - 3600000), updatedAt: new Date() },
]

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useOrderStore()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const allOrders = [...orders, ...mockOrders]

  const filtered = allOrders.filter((o) => {
    const matchStatus = filter === 'all' || o.status === filter
    const matchSearch = !search || o.orderNumber.includes(search) || o.customerName.includes(search)
    return matchStatus && matchSearch
  })

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status)
    toast.success(`Order status updated to ${status}`)
  }

  const statusColors: Record<string, string> = {
    pending: 'text-amber-600 bg-amber-50 border-amber-200',
    preparing: 'text-blue-600 bg-blue-50 border-blue-200',
    ready: 'text-green-600 bg-green-50 border-green-200',
    completed: 'text-gray-600 bg-gray-100 border-gray-200',
    cancelled: 'text-red-600 bg-red-50 border-red-200',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-brand-espresso dark:text-brand-ivory">Orders Management</h1>
          <p className="text-sm text-brand-latte mt-1">{filtered.length} orders found</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-[#2A1F1C] rounded-2xl p-4 shadow-card flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-latte" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-espresso/30 text-brand-espresso dark:text-brand-ivory placeholder-brand-latte focus:outline-none focus:border-brand-rose-gold text-sm"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          {statusOptions.map((s) => (
            <button
              key={s.value}
              onClick={() => setFilter(s.value)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filter === s.value
                  ? 'bg-gradient-to-r from-brand-rose-gold to-brand-champagne text-white'
                  : 'bg-brand-pearl dark:bg-brand-espresso/20 text-brand-brown dark:text-brand-mocha hover:bg-brand-blush/50'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-[#2A1F1C] rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-brand-pearl dark:bg-brand-espresso/20 text-xs text-brand-latte">
              <tr>
                <th className="text-start px-5 py-3 font-semibold">Order</th>
                <th className="text-start px-5 py-3 font-semibold">Customer</th>
                <th className="text-start px-5 py-3 font-semibold">Items</th>
                <th className="text-start px-5 py-3 font-semibold">Total</th>
                <th className="text-start px-5 py-3 font-semibold">Status</th>
                <th className="text-start px-5 py-3 font-semibold">Time</th>
                <th className="text-start px-5 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => (
                <tr
                  key={order.id}
                  className={`border-b border-brand-rose/10 hover:bg-brand-pearl/30 dark:hover:bg-brand-espresso/10 transition-colors ${i % 2 === 0 ? '' : 'bg-brand-pearl/10'}`}
                >
                  <td className="px-5 py-4">
                    <p className="font-mono font-bold text-sm text-brand-espresso dark:text-brand-ivory">{order.orderNumber}</p>
                    <p className="text-xs text-brand-latte mt-0.5">{order.items.length} item(s)</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-brand-espresso dark:text-brand-ivory">{order.customerName}</p>
                    <p className="text-xs text-brand-latte">{order.customerPhone}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex -space-x-2">
                      {order.items.slice(0, 3).map((item, j) => (
                        <img
                          key={j}
                          src={item.menuItem.image}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-[#2A1F1C]"
                        />
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-brand-blush border-2 border-white dark:border-[#2A1F1C] flex items-center justify-center">
                          <span className="text-xs font-bold text-brand-espresso">+{order.items.length - 3}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-bold text-brand-espresso dark:text-brand-ivory">{formatPrice(order.total, 'en')}</span>
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border cursor-pointer focus:outline-none ${statusColors[order.status]}`}
                    >
                      {statusOptions.slice(1).map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-brand-latte">
                      {new Date(order.createdAt).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-brand-blush/50 transition-colors" title="View">
                        <Eye className="w-3.5 h-3.5 text-brand-espresso dark:text-brand-ivory" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-brand-blush/50 transition-colors" title="Print">
                        <Printer className="w-3.5 h-3.5 text-brand-espresso dark:text-brand-ivory" />
                      </button>
                      {order.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(order.id, 'preparing')}
                            className="p-1.5 rounded-lg hover:bg-green-50 transition-colors"
                            title="Accept"
                          >
                            <Check className="w-3.5 h-3.5 text-green-500" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(order.id, 'cancelled')}
                            className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                            title="Reject"
                          >
                            <XIcon className="w-3.5 h-3.5 text-red-500" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-brand-latte">
            No orders found
          </div>
        )}
      </div>
    </div>
  )
}
