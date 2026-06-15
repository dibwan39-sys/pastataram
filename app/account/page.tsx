'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Package, Heart, LogOut, Eye, EyeOff, ChevronRight, Star } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import { useUIStore, useAuthStore, useOrderStore } from '@/lib/store'
import { getStatusLabel, getStatusColor, formatPrice, formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function AccountPage() {
  const { language } = useUIStore()
  const { isLoggedIn, user, login, logout } = useAuthStore()
  const { orders } = useOrderStore()
  const isAr = language === 'ar'
  const [activeTab, setActiveTab] = useState('orders')
  const [showPass, setShowPass] = useState(false)
  const [loginMode, setLoginMode] = useState<'login' | 'register'>('login')
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      toast.error(isAr ? 'يرجى ملء جميع الحقول' : 'Please fill all fields')
      return
    }
    login({ id: '1', name: form.name || 'مستخدم', email: form.email, phone: form.phone })
    toast.success(isAr ? 'تم تسجيل الدخول بنجاح!' : 'Logged in successfully!')
  }

  const tabs = [
    { id: 'orders', labelAr: 'طلباتي', labelEn: 'My Orders', icon: Package },
    { id: 'favorites', labelAr: 'المفضلة', labelEn: 'Favorites', icon: Heart },
    { id: 'profile', labelAr: 'الملف الشخصي', labelEn: 'Profile', icon: User },
  ]

  if (!isLoggedIn) {
    return (
      <PageWrapper>
        <section className="min-h-[80vh] flex items-center justify-center py-20 bg-gradient-to-br from-brand-cream via-brand-blush/20 to-brand-pearl dark:from-[#14110F] dark:to-[#1A1614]">
          <div className="w-full max-w-md mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="premium-card p-8"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blush to-brand-nude flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-brand-rose-gold" />
                </div>
                <h1 className="text-2xl font-black text-brand-espresso dark:text-brand-ivory">
                  {isAr ? (loginMode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب') : (loginMode === 'login' ? 'Sign In' : 'Create Account')}
                </h1>
                <p className="text-brand-brown dark:text-brand-mocha text-sm mt-1">
                  {isAr ? 'للوصول إلى طلباتك ومفضلتك' : 'Access your orders and favorites'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                {loginMode === 'register' && (
                  <div>
                    <label className="block text-sm font-semibold text-brand-espresso dark:text-brand-ivory mb-1.5">
                      {isAr ? 'الاسم' : 'Full Name'}
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={isAr ? 'الاسم الكامل' : 'Full name'}
                      className="w-full px-4 py-3 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory placeholder-brand-latte focus:outline-none focus:border-brand-rose-gold text-sm"
                      dir={isAr ? 'rtl' : 'ltr'}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-brand-espresso dark:text-brand-ivory mb-1.5">
                    {isAr ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory placeholder-brand-latte focus:outline-none focus:border-brand-rose-gold text-sm"
                    dir="ltr"
                  />
                </div>
                {loginMode === 'register' && (
                  <div>
                    <label className="block text-sm font-semibold text-brand-espresso dark:text-brand-ivory mb-1.5">
                      {isAr ? 'رقم الهاتف' : 'Phone Number'}
                    </label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="05xxxxxxxx"
                      className="w-full px-4 py-3 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory placeholder-brand-latte focus:outline-none focus:border-brand-rose-gold text-sm"
                      dir="ltr"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-brand-espresso dark:text-brand-ivory mb-1.5">
                    {isAr ? 'كلمة المرور' : 'Password'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-brand-rose/30 bg-brand-pearl dark:bg-brand-surface/30 text-brand-espresso dark:text-brand-ivory placeholder-brand-latte focus:outline-none focus:border-brand-rose-gold text-sm pe-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-brand-latte"
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full py-3">
                  {isAr ? (loginMode === 'login' ? 'دخول' : 'إنشاء حساب') : (loginMode === 'login' ? 'Sign In' : 'Create Account')}
                </button>
              </form>

              <div className="text-center mt-5">
                <button
                  onClick={() => setLoginMode(loginMode === 'login' ? 'register' : 'login')}
                  className="text-sm text-brand-rose-gold font-semibold hover:underline"
                >
                  {isAr
                    ? (loginMode === 'login' ? 'ليس لديك حساب؟ سجّل الآن' : 'لديك حساب؟ سجّل الدخول')
                    : (loginMode === 'login' ? "Don't have an account? Register" : 'Already have an account? Sign in')}
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-card p-6 mb-8 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-rose-gold to-brand-champagne flex items-center justify-center text-white font-black text-2xl">
                {user?.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-black text-brand-espresso dark:text-brand-ivory">
                  {isAr ? 'مرحباً، ' : 'Hello, '}{user?.name}
                </h2>
                <p className="text-sm text-brand-latte">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => { logout(); toast.success(isAr ? 'تم تسجيل الخروج' : 'Logged out') }}
              className="flex items-center gap-2 text-red-400 hover:text-red-600 transition-colors text-sm font-semibold"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">{isAr ? 'خروج' : 'Logout'}</span>
            </button>
          </motion.div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mb-8 border-b border-brand-rose/20">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm transition-all border-b-2 -mb-px ${
                    activeTab === tab.id
                      ? 'border-brand-rose-gold text-brand-rose-gold'
                      : 'border-transparent text-brand-latte hover:text-brand-espresso dark:hover:text-brand-ivory'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {isAr ? tab.labelAr : tab.labelEn}
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {orders.length === 0 ? (
                  <div className="text-center py-16">
                    <Package className="w-12 h-12 text-brand-latte mx-auto mb-4" />
                    <p className="text-brand-brown dark:text-brand-mocha font-medium">
                      {isAr ? 'لا توجد طلبات بعد' : 'No orders yet'}
                    </p>
                    <Link href="/menu" className="btn-primary mt-4 inline-block text-sm px-6 py-2.5">
                      {isAr ? 'اطلب الآن' : 'Order Now'}
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="premium-card p-5 flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold text-brand-espresso dark:text-brand-ivory">
                              {order.orderNumber}
                            </p>
                            <span className={`status-badge ${getStatusColor(order.status)}`}>
                              {getStatusLabel(order.status, language)}
                            </span>
                          </div>
                          <p className="text-sm text-brand-latte">{formatDate(order.createdAt, language)}</p>
                          <p className="text-sm text-brand-brown dark:text-brand-mocha mt-1">
                            {order.items.length} {isAr ? 'عنصر' : 'items'} · {formatPrice(order.total, language)}
                          </p>
                        </div>
                        <Link href={`/track-order?id=${order.id}`} className="btn-secondary text-xs px-4 py-2 flex items-center gap-1">
                          {isAr ? 'تتبع' : 'Track'}
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
            {activeTab === 'favorites' && (
              <motion.div key="favorites" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="text-center py-16">
                  <Heart className="w-12 h-12 text-brand-latte mx-auto mb-4" />
                  <p className="text-brand-brown dark:text-brand-mocha font-medium">
                    {isAr ? 'لا توجد أطباق مفضلة بعد' : 'No favorite dishes yet'}
                  </p>
                  <Link href="/menu" className="btn-primary mt-4 inline-block text-sm px-6 py-2.5">
                    {isAr ? 'استكشف المنيو' : 'Explore Menu'}
                  </Link>
                </div>
              </motion.div>
            )}
            {activeTab === 'profile' && (
              <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="premium-card p-6">
                  <h3 className="font-bold text-brand-espresso dark:text-brand-ivory mb-5">
                    {isAr ? 'معلومات الحساب' : 'Account Information'}
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: isAr ? 'الاسم' : 'Name', value: user?.name },
                      { label: isAr ? 'البريد الإلكتروني' : 'Email', value: user?.email },
                      { label: isAr ? 'رقم الهاتف' : 'Phone', value: user?.phone || '—' },
                    ].map((field) => (
                      <div key={field.label} className="flex items-center justify-between border-b border-brand-rose/10 pb-3">
                        <span className="text-sm text-brand-latte">{field.label}</span>
                        <span className="font-semibold text-brand-espresso dark:text-brand-ivory text-sm">{field.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageWrapper>
  )
}
