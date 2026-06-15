'use client'

import { motion } from 'framer-motion'
import { ShoppingBag, Users, Star, TrendingUp, DollarSign, Clock, CheckCircle, Package } from 'lucide-react'
import { useOrderStore } from '@/lib/store'
import { menuItems, reviews } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import Link from 'next/link'

const salesData = [
  { day: 'Sun', orders: 45, revenue: 1215 },
  { day: 'Mon', orders: 52, revenue: 1404 },
  { day: 'Tue', orders: 38, revenue: 1026 },
  { day: 'Wed', orders: 65, revenue: 1755 },
  { day: 'Thu', orders: 78, revenue: 2106 },
  { day: 'Fri', orders: 92, revenue: 2484 },
  { day: 'Sat', orders: 85, revenue: 2295 },
]

const topItems = [
  { name: 'Pastata Ram', orders: 185, color: '#B87333' },
  { name: 'Ramcine', orders: 142, color: '#D8A24A' },
  { name: 'Pastata Balls', orders: 98, color: '#B87333' },
  { name: 'Drinks', orders: 76, color: '#E0B566' },
]

export default function AdminDashboard() {
  const { orders } = useOrderStore()

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 48570
  const totalOrders = orders.length + 455
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

  const stats = [
    {
      label: 'Total Revenue',
      value: formatPrice(totalRevenue, 'en'),
      change: '+12.5%',
      positive: true,
      icon: DollarSign,
      color: 'from-brand-rose-gold to-brand-champagne',
    },
    {
      label: 'Total Orders',
      value: totalOrders.toString(),
      change: '+8.2%',
      positive: true,
      icon: ShoppingBag,
      color: 'from-purple-400 to-purple-600',
    },
    {
      label: 'Avg. Rating',
      value: avgRating.toFixed(1) + '/5',
      change: '+0.2',
      positive: true,
      icon: Star,
      color: 'from-amber-400 to-amber-600',
    },
    {
      label: 'Active Customers',
      value: '328',
      change: '+15.3%',
      positive: true,
      icon: Users,
      color: 'from-green-400 to-emerald-600',
    },
  ]

  const recentOrders = [
    { num: 'PT-001234', customer: 'محمد العمري', status: 'preparing', total: 54, time: '5 min ago' },
    { num: 'PT-001233', customer: 'Sarah Al-Rashid', status: 'ready', total: 27, time: '12 min ago' },
    { num: 'PT-001232', customer: 'نورة الزهراني', status: 'completed', total: 41, time: '25 min ago' },
    { num: 'PT-001231', customer: 'Ahmed Hassan', status: 'pending', total: 27, time: '30 min ago' },
    { num: 'PT-001230', customer: 'فيصل القحطاني', status: 'completed', total: 68, time: '45 min ago' },
  ]

  const statusColors: Record<string, string> = {
    pending: 'text-amber-600 bg-amber-50',
    preparing: 'text-blue-600 bg-blue-50',
    ready: 'text-green-600 bg-green-50',
    completed: 'text-gray-600 bg-gray-100',
    cancelled: 'text-red-600 bg-red-50',
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1A1614] dark:bg-[#1A1614] rounded-2xl p-5 shadow-card"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.positive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-black text-brand-espresso dark:text-brand-ivory">{stat.value}</p>
              <p className="text-xs text-brand-latte mt-1">{stat.label}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-[#1A1614] dark:bg-[#1A1614] rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-brand-espresso dark:text-brand-ivory">Weekly Revenue</h3>
            <span className="text-xs text-brand-latte bg-brand-blush/50 px-3 py-1 rounded-full">This Week</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#211C19" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9A8B7C' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9A8B7C' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#14110F', border: '1px solid #E0B566', borderRadius: 12 }}
                cursor={{ fill: '#211C1930' }}
              />
              <Bar dataKey="revenue" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B87333" />
                  <stop offset="100%" stopColor="#D8A24A" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Items */}
        <div className="bg-[#1A1614] dark:bg-[#1A1614] rounded-2xl p-5 shadow-card">
          <h3 className="font-bold text-brand-espresso dark:text-brand-ivory mb-5">Top Items</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={topItems}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={3}
                dataKey="orders"
              >
                {topItems.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#14110F', border: '1px solid #E0B566', borderRadius: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {topItems.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-brand-brown dark:text-brand-mocha">{item.name}</span>
                </div>
                <span className="font-bold text-brand-espresso dark:text-brand-ivory">{item.orders}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-[#1A1614] dark:bg-[#1A1614] rounded-2xl shadow-card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-brand-rose/20">
          <h3 className="font-bold text-brand-espresso dark:text-brand-ivory">Recent Orders</h3>
          <Link href="/admin/orders" className="text-xs text-brand-rose-gold font-semibold hover:underline">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-brand-pearl dark:bg-brand-surface/20 text-xs text-brand-latte">
              <tr>
                <th className="text-start px-5 py-3 font-semibold">Order #</th>
                <th className="text-start px-5 py-3 font-semibold">Customer</th>
                <th className="text-start px-5 py-3 font-semibold">Status</th>
                <th className="text-start px-5 py-3 font-semibold">Total</th>
                <th className="text-start px-5 py-3 font-semibold">Time</th>
                <th className="text-start px-5 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <tr key={order.num} className={`border-b border-brand-rose/10 hover:bg-brand-pearl/50 dark:hover:bg-brand-surface/10 transition-colors ${i % 2 === 0 ? '' : 'bg-brand-pearl/20 dark:bg-brand-surface/5'}`}>
                  <td className="px-5 py-3 text-sm font-mono font-bold text-brand-espresso dark:text-brand-ivory">{order.num}</td>
                  <td className="px-5 py-3 text-sm text-brand-brown dark:text-brand-mocha">{order.customer}</td>
                  <td className="px-5 py-3">
                    <span className={`status-badge capitalize ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm font-bold text-brand-espresso dark:text-brand-ivory">
                    {formatPrice(order.total, 'en')}
                  </td>
                  <td className="px-5 py-3 text-xs text-brand-latte">{order.time}</td>
                  <td className="px-5 py-3">
                    <button className="text-xs text-brand-rose-gold hover:underline font-semibold">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { href: '/admin/orders', icon: Package, label: 'Manage Orders', color: 'from-blue-400 to-blue-600' },
          { href: '/admin/menu', icon: TrendingUp, label: 'Update Menu', color: 'from-brand-rose-gold to-brand-champagne' },
          { href: '/admin/reviews', icon: Star, label: 'Review Approvals', color: 'from-amber-400 to-amber-600' },
          { href: '/admin/settings', icon: Clock, label: 'Update Hours', color: 'from-green-400 to-emerald-600' },
        ].map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.href}
              href={action.href}
              className="bg-[#1A1614] dark:bg-[#1A1614] rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300 flex items-center gap-3 group"
            >
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-brand-espresso dark:text-brand-ivory">{action.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
