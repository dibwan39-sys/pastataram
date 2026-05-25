'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, ShoppingBag, DollarSign, Clock, Award } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts'

const monthlyRevenue = [
  { month: 'Jul', revenue: 28000, orders: 1040 },
  { month: 'Aug', revenue: 32000, orders: 1185 },
  { month: 'Sep', revenue: 29000, orders: 1074 },
  { month: 'Oct', revenue: 38000, orders: 1407 },
  { month: 'Nov', revenue: 42000, orders: 1555 },
  { month: 'Dec', revenue: 51000, orders: 1888 },
]

const peakHours = [
  { hour: '12pm', orders: 45 }, { hour: '1pm', orders: 68 },
  { hour: '2pm', orders: 52 }, { hour: '3pm', orders: 38 },
  { hour: '4pm', orders: 41 }, { hour: '5pm', orders: 55 },
  { hour: '6pm', orders: 78 }, { hour: '7pm', orders: 92 },
  { hour: '8pm', orders: 85 }, { hour: '9pm', orders: 63 },
]

const customerTypes = [
  { name: 'Returning', value: 68, color: '#CFA18D' },
  { name: 'New', value: 32, color: '#E9B7C7' },
]

const topItemsData = [
  { name: 'Pastata Ram', orders: 648, revenue: 17496 },
  { name: 'Ramcine', orders: 502, revenue: 13554 },
  { name: 'Pastata Balls', orders: 389, revenue: 5446 },
  { name: 'Drinks', orders: 1204, revenue: 2408 },
]

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-brand-espresso dark:text-brand-ivory">Analytics & Reports</h1>
        <p className="text-sm text-brand-latte mt-1">Business performance overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Monthly Revenue', value: '51,000 SAR', change: '+21%', icon: DollarSign, color: 'from-brand-rose-gold to-brand-champagne' },
          { label: 'Monthly Orders', value: '1,888', change: '+21%', icon: ShoppingBag, color: 'from-purple-400 to-purple-600' },
          { label: 'Returning Customers', value: '68%', change: '+5%', icon: Users, color: 'from-green-400 to-emerald-600' },
          { label: 'Avg Order Value', value: '27 SAR', change: '+0%', icon: TrendingUp, color: 'from-blue-400 to-blue-600' },
          { label: 'Peak Hour', value: '7-8 PM', change: '', icon: Clock, color: 'from-amber-400 to-amber-600' },
          { label: 'Top Item', value: 'Pastata Ram', change: '648 orders', icon: Award, color: 'from-pink-400 to-pink-600' },
        ].map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-[#2A1F1C] rounded-2xl p-5 shadow-card"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-xl font-black text-brand-espresso dark:text-brand-ivory">{kpi.value}</p>
              <p className="text-xs text-brand-latte mt-0.5">{kpi.label}</p>
              {kpi.change && (
                <span className={`text-xs font-bold mt-1 block ${kpi.change.startsWith('+') ? 'text-green-500' : 'text-brand-latte'}`}>
                  {kpi.change}
                </span>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-[#2A1F1C] rounded-2xl p-6 shadow-card">
        <h3 className="font-bold text-brand-espresso dark:text-brand-ivory mb-5">Revenue Trend (Last 6 Months)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={monthlyRevenue}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#CFA18D" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#CFA18D" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F7D6DF" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#B89E90' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#B89E90' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#FFF8F5', border: '1px solid #E9B7C7', borderRadius: 12 }} />
            <Area type="monotone" dataKey="revenue" stroke="#CFA18D" strokeWidth={2} fill="url(#revenueGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Peak Hours */}
        <div className="bg-white dark:bg-[#2A1F1C] rounded-2xl p-6 shadow-card">
          <h3 className="font-bold text-brand-espresso dark:text-brand-ivory mb-5">Peak Order Hours</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={peakHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F7D6DF" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#B89E90' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#B89E90' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#FFF8F5', border: '1px solid #E9B7C7', borderRadius: 12 }} />
              <Bar dataKey="orders" fill="#D8B38A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Types */}
        <div className="bg-white dark:bg-[#2A1F1C] rounded-2xl p-6 shadow-card">
          <h3 className="font-bold text-brand-espresso dark:text-brand-ivory mb-5">Customer Breakdown</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={customerTypes} cx="50%" cy="50%" outerRadius={70} paddingAngle={4} dataKey="value">
                {customerTypes.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#FFF8F5', border: '1px solid #E9B7C7', borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-2">
            {customerTypes.map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ background: c.color }} />
                <span className="text-brand-brown dark:text-brand-mocha">{c.name}: <strong>{c.value}%</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Items Table */}
      <div className="bg-white dark:bg-[#2A1F1C] rounded-2xl shadow-card overflow-hidden">
        <div className="p-5 border-b border-brand-rose/20">
          <h3 className="font-bold text-brand-espresso dark:text-brand-ivory">Top Performing Items</h3>
        </div>
        <table className="w-full">
          <thead className="bg-brand-pearl dark:bg-brand-espresso/20 text-xs text-brand-latte">
            <tr>
              <th className="text-start px-5 py-3 font-semibold">Item</th>
              <th className="text-start px-5 py-3 font-semibold">Orders</th>
              <th className="text-start px-5 py-3 font-semibold">Revenue</th>
              <th className="text-start px-5 py-3 font-semibold">Share</th>
            </tr>
          </thead>
          <tbody>
            {topItemsData.map((item, i) => {
              const maxOrders = topItemsData[0].orders
              return (
                <tr key={item.name} className="border-b border-brand-rose/10">
                  <td className="px-5 py-3 text-sm font-semibold text-brand-espresso dark:text-brand-ivory">{item.name}</td>
                  <td className="px-5 py-3 text-sm text-brand-brown dark:text-brand-mocha">{item.orders}</td>
                  <td className="px-5 py-3 text-sm font-bold text-brand-espresso dark:text-brand-ivory">{item.revenue} SAR</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-brand-blush dark:bg-brand-espresso/30 rounded-full overflow-hidden max-w-24">
                        <div
                          className="h-full bg-gradient-to-r from-brand-rose-gold to-brand-champagne rounded-full"
                          style={{ width: `${(item.orders / maxOrders) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-brand-latte">{Math.round((item.orders / maxOrders) * 100)}%</span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
