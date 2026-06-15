'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, UtensilsCrossed, ShoppingCart, Star, User } from 'lucide-react'
import { useUIStore, useCartStore } from '@/lib/store'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { language, setCartOpen } = useUIStore()
  const { itemCount } = useCartStore()
  const isAr = language === 'ar'

  const tabs = [
    { href: '/', icon: Home, label: isAr ? 'الرئيسية' : 'Home' },
    { href: '/menu', icon: UtensilsCrossed, label: isAr ? 'المنيو' : 'Menu' },
    { href: '/cart', icon: ShoppingCart, label: isAr ? 'السلة' : 'Cart', isCart: true },
    { href: '/reviews', icon: Star, label: isAr ? 'التقييمات' : 'Reviews' },
    { href: '/account', icon: User, label: isAr ? 'حسابي' : 'Account' },
  ]

  return (
    <nav className="mobile-nav lg:hidden">
      <div className="flex items-center justify-around py-2 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = pathname === tab.href

          if (tab.isCart) {
            return (
              <button
                key="cart"
                onClick={() => setCartOpen(true)}
                className="flex flex-col items-center gap-1 py-1 px-3 relative"
              >
                <div className="relative -mt-6">
                  {/* Logo as cart button centerpiece */}
                  <div className="w-14 h-14 rounded-full shadow-lg overflow-hidden border-2 border-[#211C19]" style={{ background: '#211C19' }}>
                    <Image
                      src="/images/logo.png"
                      alt="PASTATARAM"
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                  {itemCount() > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                      style={{ background: '#7B1E2B' }}
                    >
                      {itemCount()}
                    </motion.span>
                  )}
                </div>
                <span className="text-[10px] font-semibold" style={{ color: '#7B1E2B' }}>{tab.label}</span>
              </button>
            )
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-1 py-1 px-3 transition-colors ${
                isActive ? 'text-brand-rose-gold' : 'text-brand-latte'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute bottom-1 w-1 h-1 rounded-full bg-brand-rose-gold"
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
