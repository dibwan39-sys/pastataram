'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Globe, Menu, ShoppingCart, User, X } from 'lucide-react'
import { useCartStore, useUIStore } from '@/lib/store'
import CartDrawer from '@/components/cart/CartDrawer'
import Logo from '@/components/ui/Logo'

/**
 * Floating chrome over the hero: transparent at the top of the page so the
 * photograph runs edge to edge, resolving into a glass bar once the customer
 * scrolls. Glass is used here deliberately and sparingly — on chrome that sits
 * above content — rather than on every card.
 *
 * `اطلب الآن` is the one primary action and it is present at every width.
 */
export default function Navbar() {
  const pathname = usePathname()
  const language = useUIStore((s) => s.language)
  const setLanguage = useUIStore((s) => s.setLanguage)
  const setCartOpen = useUIStore((s) => s.setCartOpen)
  const mobileMenuOpen = useUIStore((s) => s.mobileMenuOpen)
  const setMobileMenuOpen = useUIStore((s) => s.setMobileMenuOpen)
  const itemCount = useCartStore((s) => s.itemCount)
  const isAr = language === 'ar'
  const reduce = useReducedMotion()

  const [scrolled, setScrolled] = useState(false)
  // The badge reads persisted cart state, so it must not render until mounted
  // or the server and client markup disagree.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile sheet whenever the route changes.
  useEffect(() => setMobileMenuOpen(false), [pathname, setMobileMenuOpen])

  const navLinks = isAr
    ? [
        { href: '/', label: 'الرئيسية' },
        { href: '/menu', label: 'المنيو' },
        { href: '/build-your-pasta', label: 'صمّم باستاتك' },
        { href: '/gallery', label: 'المعرض' },
        { href: '/reviews', label: 'التقييمات' },
        { href: '/about', label: 'عن العلامة' },
        { href: '/contact', label: 'تواصل معنا' },
      ]
    : [
        { href: '/', label: 'Home' },
        { href: '/menu', label: 'Menu' },
        { href: '/build-your-pasta', label: 'Build Pasta' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/reviews', label: 'Reviews' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
      ]

  const count = mounted ? itemCount() : 0

  return (
    <>
      <motion.header
        initial={reduce ? undefined : { y: -80 }}
        animate={reduce ? undefined : { y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,backdrop-filter] duration-300"
        style={
          scrolled
            ? {
                background: 'rgba(51, 12, 30,0.82)',
                backdropFilter: 'blur(22px) saturate(140%)',
                WebkitBackdropFilter: 'blur(22px) saturate(140%)',
                borderBottom: '1px solid rgba(231,198,164,0.14)',
                boxShadow: '0 10px 34px rgba(0,0,0,0.4)',
              }
            : { background: 'transparent' }
        }
      >
        <nav
          aria-label={isAr ? 'التنقل الرئيسي' : 'Main navigation'}
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-[padding] duration-300 ${
            scrolled ? 'py-2.5' : 'py-4'
          }`}
          style={{ minHeight: 'var(--nav-h)' }}
        >
          <Logo size="sm" href="/" className="flex-shrink-0" />

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className="relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors"
                    style={{ color: active ? '#FFF3EE' : '#D8C2BD' }}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'rgba(253,101,125,0.16)', border: '1px solid rgba(253,101,125,0.34)' }}
                        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 36 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Actions */}
          <div className="flex flex-shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => setLanguage(isAr ? 'en' : 'ar')}
              className="flex items-center gap-1 rounded-full p-2 text-brand-cream-dim transition-colors hover:bg-white/10 hover:text-brand-cream"
              aria-label={isAr ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <Globe className="h-4 w-4" aria-hidden />
              <span className="hidden text-xs font-bold sm:block">{isAr ? 'EN' : 'ع'}</span>
            </button>

            <Link
              href="/account"
              className="rounded-full p-2 text-brand-cream-dim transition-colors hover:bg-white/10 hover:text-brand-cream"
              aria-label={isAr ? 'حسابي' : 'My account'}
            >
              <User className="h-4 w-4" aria-hidden />
            </Link>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative rounded-full p-2.5 text-white transition-shadow hover:shadow-glow"
              style={{ background: 'linear-gradient(135deg, #C43E57, #FD657D)' }}
              aria-label={
                isAr
                  ? `سلة الطلبات${count > 0 ? ` — ${count} صنف` : ' — فارغة'}`
                  : `Cart${count > 0 ? ` — ${count} items` : ' — empty'}`
              }
            >
              <ShoppingCart className="h-4 w-4" aria-hidden />
              {count > 0 && (
                <motion.span
                  initial={reduce ? undefined : { scale: 0 }}
                  animate={reduce ? undefined : { scale: 1 }}
                  aria-hidden
                  className="absolute -end-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold text-brand-cream"
                  style={{ background: 'var(--brand-surface)', border: '1px solid rgba(253,101,125,0.6)' }}
                >
                  {count}
                </motion.span>
              )}
            </button>

            {/* The primary action, always present on desktop */}
            <Link href="/menu" className="btn-primary ms-1 hidden px-6 py-2.5 text-sm lg:inline-flex">
              {isAr ? 'اطلب الآن' : 'Order Now'}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full p-2 text-brand-cream transition-colors hover:bg-white/10 lg:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-sheet"
              aria-label={isAr ? 'القائمة' : 'Menu'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </nav>

        {/* Mobile sheet */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav-sheet"
              initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden lg:hidden"
              style={{
                background: 'rgba(51, 12, 30,0.97)',
                backdropFilter: 'blur(22px)',
                borderTop: '1px solid rgba(231,198,164,0.14)',
              }}
            >
              <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
                {navLinks.map((link) => {
                  const active = pathname === link.href
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? 'page' : undefined}
                        className="block rounded-xl px-4 py-3 font-medium transition-colors"
                        style={{
                          color: active ? '#FFF3EE' : '#D8C2BD',
                          background: active ? 'rgba(253,101,125,0.16)' : 'transparent',
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
                <li className="mt-2 border-t pt-3" style={{ borderColor: 'rgba(231,198,164,0.14)' }}>
                  <Link href="/menu" className="btn-primary block w-full py-3 text-center">
                    {isAr ? 'اطلب الآن' : 'Order Now'}
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <CartDrawer />
    </>
  )
}
