'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Menu, X, Globe, User } from 'lucide-react'
import { useUIStore, useCartStore, useAuthStore } from '@/lib/store'
import CartDrawer from '@/components/cart/CartDrawer'
import Logo from '@/components/ui/Logo'

export default function Navbar() {
  const pathname = usePathname()
  const { language, setLanguage, cartOpen, setCartOpen, mobileMenuOpen, setMobileMenuOpen } = useUIStore()
  const { itemCount } = useCartStore()
  const { isLoggedIn } = useAuthStore()
  const [scrolled, setScrolled] = useState(false)

  const isAr = language === 'ar'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = isAr ? [
    { href: '/', label: 'الرئيسية' },
    { href: '/menu', label: 'المنيو' },
    { href: '/build-your-pasta', label: 'صمم باستاتك' },
    { href: '/offers', label: 'العروض' },
    { href: '/gallery', label: 'المعرض' },
    { href: '/reviews', label: 'التقييمات' },
    { href: '/about', label: 'عن العلامة' },
    { href: '/contact', label: 'تواصل معنا' },
  ] : [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/build-your-pasta', label: 'Build Pasta' },
    { href: '/offers', label: 'Offers' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass shadow-brand py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo size="sm" href="/" className="flex-shrink-0" />

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:text-brand-rose-gold ${
                  pathname === link.href
                    ? 'text-brand-rose-gold bg-brand-blush/50'
                    : 'text-brand-espresso dark:text-brand-ivory hover:bg-brand-blush/30'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(isAr ? 'en' : 'ar')}
              className="p-2 rounded-full hover:bg-brand-blush/50 transition-colors flex items-center gap-1 text-brand-espresso dark:text-brand-ivory"
              title={isAr ? 'English' : 'عربي'}
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-semibold hidden sm:block">{isAr ? 'EN' : 'ع'}</span>
            </button>

            {/* Account */}
            <Link
              href="/account"
              className="p-2 rounded-full hover:bg-brand-blush/50 transition-colors text-brand-espresso dark:text-brand-ivory"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full bg-gradient-to-br from-brand-rose-gold to-brand-champagne text-white shadow-brand hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              <ShoppingCart className="w-4 h-4" />
              {itemCount() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-brand-espresso text-brand-cream text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {itemCount()}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-brand-blush/50 transition-colors text-brand-espresso dark:text-brand-ivory"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden glass border-t border-brand-rose/20"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      pathname === link.href
                        ? 'text-brand-rose-gold bg-brand-blush/50 font-semibold'
                        : 'text-brand-espresso dark:text-brand-ivory hover:bg-brand-blush/30'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-2 pt-2 border-t border-brand-rose/20">
                  <Link
                    href="/order"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary w-full text-center block py-3"
                  >
                    {isAr ? 'اطلب الآن' : 'Order Now'}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <CartDrawer />
    </>
  )
}
