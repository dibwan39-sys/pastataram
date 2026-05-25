'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Instagram, Phone, MapPin, Clock, Heart } from 'lucide-react'
import { useUIStore } from '@/lib/store'
import { cmsContent } from '@/lib/data'
import Logo from '@/components/ui/Logo'

export default function Footer() {
  const { language } = useUIStore()
  const isAr = language === 'ar'

  const links = isAr ? [
    { href: '/', label: 'الرئيسية' },
    { href: '/menu', label: 'المنيو' },
    { href: '/offers', label: 'العروض' },
    { href: '/about', label: 'عن العلامة' },
    { href: '/contact', label: 'تواصل معنا' },
    { href: '/reviews', label: 'التقييمات' },
    { href: '/track-order', label: 'تتبع طلبك' },
    { href: '/admin', label: 'لوحة الإدارة' },
  ] : [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/offers', label: 'Offers' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/track-order', label: 'Track Order' },
    { href: '/admin', label: 'Admin' },
  ]

  return (
    <footer className="relative overflow-hidden bg-brand-espresso dark:bg-[#1C1410] text-brand-ivory/90">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-brand-cream dark:bg-[#1C1410]">
        <svg viewBox="0 0 1440 64" fill="none" className="absolute bottom-0 w-full h-full">
          <path d="M0 64L1440 64L1440 0C1200 48 720 64 0 0V64Z" fill="#4A342B" />
        </svg>
      </div>

      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <Logo size="md" href="/" textColor="light" />
              </div>
              <p className="text-sm text-brand-ivory/60 leading-relaxed">
                {isAr
                  ? 'تجربة باستا فاخرة في قلب جدة. نكهات إيطالية مصنوعة بعناية من أجود المكونات.'
                  : 'Premium pasta experience in the heart of Jeddah. Italian flavors crafted with the finest ingredients.'}
              </p>
              <div className="flex items-center gap-3 mt-4">
                <a
                  href="https://instagram.com/pastataram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-brand-ivory/10 hover:bg-brand-rose-gold transition-colors flex items-center justify-center"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${cmsContent.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-brand-ivory/10 hover:bg-[#25D366] transition-colors flex items-center justify-center"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold text-brand-champagne mb-4">
                {isAr ? 'روابط سريعة' : 'Quick Links'}
              </h4>
              <ul className="space-y-2">
                {links.slice(0, 4).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-ivory/60 hover:text-brand-champagne transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Links */}
            <div>
              <h4 className="font-bold text-brand-champagne mb-4">
                {isAr ? 'المزيد' : 'More'}
              </h4>
              <ul className="space-y-2">
                {links.slice(4).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-ivory/60 hover:text-brand-champagne transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-brand-champagne mb-4">
                {isAr ? 'معلومات التواصل' : 'Contact Info'}
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-sm text-brand-ivory/60">
                  <MapPin className="w-4 h-4 text-brand-rose-gold flex-shrink-0 mt-0.5" />
                  <span>{isAr ? cmsContent.addressAr : cmsContent.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-brand-ivory/60">
                  <Phone className="w-4 h-4 text-brand-rose-gold flex-shrink-0" />
                  <a href={`tel:${cmsContent.phone}`} className="hover:text-brand-champagne transition-colors" dir="ltr">
                    {cmsContent.phone}
                  </a>
                </div>
                <div className="flex items-start gap-2 text-sm text-brand-ivory/60">
                  <Clock className="w-4 h-4 text-brand-rose-gold flex-shrink-0 mt-0.5" />
                  <span>{isAr ? 'يومياً ١٢:٠٠ - ١٢:٠٠ م' : 'Daily 12:00 PM - 12:00 AM'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-brand-ivory/60">
                  <Instagram className="w-4 h-4 text-brand-rose-gold flex-shrink-0" />
                  <a href="https://instagram.com/pastataram" target="_blank" rel="noopener noreferrer" className="hover:text-brand-champagne transition-colors">
                    @pastataram
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-brand-ivory/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-ivory/40">
            <p>
              {isAr
                ? `© ${new Date().getFullYear()} باستاتا رام. جميع الحقوق محفوظة.`
                : `© ${new Date().getFullYear()} PASTATARAM. All rights reserved.`}
            </p>
            <p className="flex items-center gap-1">
              {isAr ? 'صُنع بـ' : 'Made with'} <Heart className="w-3 h-3 text-brand-rose-gold inline" /> {isAr ? 'في جدة' : 'in Jeddah'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
