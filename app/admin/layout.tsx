'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, ShoppingBag, UtensilsCrossed, Users, Star, Tag,
  Image, Settings, LogOut, Menu, X, Bell, FileText, BarChart2
} from 'lucide-react'
import { useAuthStore } from '@/lib/store'
import toast from 'react-hot-toast'
import Logo from '@/components/ui/Logo'

const navItems = [
  { href: '/admin', label: 'Dashboard', labelAr: 'لوحة التحكم', icon: LayoutDashboard, exact: true },
  { href: '/admin/orders', label: 'Orders', labelAr: 'الطلبات', icon: ShoppingBag },
  { href: '/admin/menu', label: 'Menu Management', labelAr: 'إدارة المنيو', icon: UtensilsCrossed },
  { href: '/admin/customers', label: 'Customers', labelAr: 'العملاء', icon: Users },
  { href: '/admin/reviews', label: 'Reviews', labelAr: 'التقييمات', icon: Star },
  { href: '/admin/offers', label: 'Offers & Coupons', labelAr: 'العروض والكوبونات', icon: Tag },
  { href: '/admin/gallery', label: 'Gallery', labelAr: 'المعرض', icon: Image },
  { href: '/admin/analytics', label: 'Analytics', labelAr: 'التحليلات', icon: BarChart2 },
  { href: '/admin/cms', label: 'CMS Content', labelAr: 'إدارة المحتوى', icon: FileText },
  { href: '/admin/settings', label: 'Settings', labelAr: 'الإعدادات', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAdminLoggedIn, adminUser, adminLogout, adminLogin } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  /**
   * ⚠️  THIS IS NOT AUTHENTICATION.
   *
   * It is a client-side gate: it stops someone who simply types /admin from
   * landing inside the dashboard, and nothing more. Anyone willing to edit
   * localStorage or read the bundle gets straight past it, so it must never be
   * described as securing anything.
   *
   * What it replaces was worse. This effect used to run
   *   adminLogin({ role: 'super_admin' })
   * unconditionally on mount, so every visitor arrived already signed in as a
   * super admin — and the site footer linked here from every public page.
   *
   * Real protection needs a server: a session the browser cannot forge, and
   * authorisation enforced on the API that reads and writes restaurant data.
   * No such API exists in this project yet. Until it does, treat the admin
   * screens as an internal preview, not as a control panel for live data.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return
    // Nothing to do — access is decided by the gate rendered below.
  }, [])

  const handleLogout = () => {
    adminLogout()
    toast.success('Logged out successfully')
    router.push('/')
  }

  const notifications = [
    { id: '1', message: 'New order #PT-123456', time: '2 min ago', unread: true },
    { id: '2', message: 'New review from Mohammed', time: '15 min ago', unread: true },
    { id: '3', message: 'Low stock alert: Fettuccine', time: '1 hour ago', unread: false },
  ]

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  // The gate. See the note above: a deterrent, not a security boundary.
  if (!isAdminLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6" style={{ background: '#120C10' }}>
        <div
          className="w-full max-w-sm rounded-[1.75rem] p-8 text-center"
          style={{ background: 'linear-gradient(150deg, #1F1419, #181015)', border: '1px solid rgba(231,198,164,0.18)' }}
        >
          <Logo size="md" href="/" className="mx-auto mb-5 justify-center" />
          <h1 className="font-display text-xl font-bold text-brand-cream">لوحة إدارة باستاتا رام</h1>
          <p className="mx-auto mt-3 text-sm leading-7 text-brand-cream-dim">
            هذه المنطقة مخصّصة لفريق العمل.
          </p>

          <button
            type="button"
            onClick={() =>
              adminLogin({ id: '1', name: 'Super Admin', email: 'admin@pastataram.com', role: 'super_admin' })
            }
            className="btn-primary mt-7 w-full py-3 text-sm"
          >
            الدخول إلى اللوحة
          </button>

          {/* Stated plainly so nobody mistakes this screen for protection. */}
          <p className="mt-5 text-[11px] leading-6 text-brand-muted">
            تنبيه: لا توجد مصادقة حقيقية بعد — هذه الشاشة لا تحمي البيانات.
            تتطلب الحماية الفعلية ربط اللوحة بخادم يتحقق من الهوية.
          </p>

          <Link href="/" className="mt-5 inline-block text-xs font-semibold text-brand-rose hover:underline">
            ← العودة إلى الموقع
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-[#181015] dark:bg-[#120C10]">
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || true) && (
          <>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              />
            )}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: sidebarOpen ? 0 : 0 }}
              className={`fixed lg:static inset-y-0 start-0 z-50 w-64 admin-sidebar flex flex-col transition-transform duration-300 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
              }`}
            >
              {/* Sidebar Header */}
              <div className="p-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Logo size="sm" href="/" />
                  <div>
                    <p className="font-black text-brand-champagne text-xs logo-text">PASTATARAM</p>
                    <p className="text-xs text-white/40">Admin Panel</p>
                  </div>
                </div>
              </div>

              {/* Nav */}
              <nav className="flex-1 overflow-y-auto py-4 px-3">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.href, item.exact)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200 text-sm font-medium ${
                        active
                          ? 'bg-gradient-to-r from-brand-rose-gold/20 to-brand-champagne/10 text-brand-champagne border border-brand-rose-gold/20'
                          : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                      }`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-brand-rose-gold' : ''}`} />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>

              {/* User */}
              <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-rose-gold to-brand-champagne flex items-center justify-center text-white font-bold text-sm">
                    {adminUser?.name.charAt(0) || 'A'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{adminUser?.name}</p>
                    <p className="text-xs text-white/40 capitalize">{adminUser?.role.replace('_', ' ')}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#181015]/80 backdrop-blur-lg border-b border-brand-rose/20 px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-brand-blush/50 transition-colors"
            >
              <Menu className="w-5 h-5 text-brand-espresso dark:text-brand-ivory" />
            </button>
            <div>
              <h1 className="font-bold text-brand-espresso dark:text-brand-ivory text-sm">
                {navItems.find((n) => isActive(n.href, n.exact))?.label || 'Admin'}
              </h1>
              <p className="text-xs text-brand-latte hidden sm:block">PASTATARAM Management</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-xs text-brand-rose-gold hover:underline hidden sm:block font-medium"
            >
              ← View Website
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-lg hover:bg-brand-blush/50 transition-colors"
              >
                <Bell className="w-5 h-5 text-brand-espresso dark:text-brand-ivory" />
                <span className="absolute top-1 end-1 w-2 h-2 bg-brand-rose-gold rounded-full" />
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute end-0 top-12 w-72 bg-[#181015] dark:bg-[#181015] rounded-2xl shadow-brand-lg border border-brand-rose/20 overflow-hidden"
                  >
                    <div className="p-3 border-b border-brand-rose/20">
                      <p className="font-bold text-brand-espresso dark:text-brand-ivory text-sm">Notifications</p>
                    </div>
                    {notifications.map((n) => (
                      <div key={n.id} className={`p-3 border-b border-brand-rose/10 hover:bg-brand-blush/30 cursor-pointer ${n.unread ? 'bg-brand-blush/20' : ''}`}>
                        <p className="text-sm font-medium text-brand-espresso dark:text-brand-ivory">{n.message}</p>
                        <p className="text-xs text-brand-latte mt-0.5">{n.time}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
