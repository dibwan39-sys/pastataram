'use client'

import { motion } from 'framer-motion'
import { useUIStore } from '@/lib/store'

const socials = [
  {
    platform: 'Snapchat',
    platformAr: 'سناب شات',
    handle: '@pastataram',
    displayName: 'PASTATARAM',
    qr: '/images/snapchat-qr.jpg',
    href: '#',
    accentLight: 'rgba(247,197,33,0.12)',
    accentBorder: 'rgba(247,197,33,0.35)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#F7C521">
        <path d="M12.017 0C8.396 0 5.86 1.607 4.49 4.29c-.66 1.308-.792 2.8-.792 3.78v.487c-.608.283-1.303.417-1.882.417-.246 0-.476-.022-.682-.066l-.11-.022-.104.066c-.13.082-.197.208-.175.34.066.39.527.686 1.39.88.088.02.175.04.262.063.208.055.417.12.582.23.087.056.13.12.12.185-.01.07-.076.134-.197.185-.516.214-1.05.316-1.573.3-.267-.007-.527-.05-.778-.12l-.12-.033-.12.066c-.18.1-.273.27-.24.45.12.624 1.06 1.04 1.617 1.26.164.063.328.115.493.158.274.076.525.19.72.372.13.12.197.262.19.406-.005.1-.044.196-.12.28-.22.245-.526.373-.835.37-.22-.003-.43-.07-.606-.19l-.088-.06-.1.022c-.1.022-.2.044-.3.055-.17.022-.34.033-.505.033-.9 0-1.74-.356-2.37-.977-.27-.263-.51-.563-.693-.88-.18-.306-.31-.636-.377-.984-.066-.35.044-.69.285-.933.24-.24.573-.37.908-.37.143 0 .285.022.42.066l.11.033.105-.066c.46-.285 1.024-.44 1.6-.44.44 0 .878.087 1.28.25V8.07c0-3.882 2.69-7.05 6.19-7.05s6.19 3.168 6.19 7.05v.66c.4-.163.837-.25 1.277-.25.577 0 1.14.155 1.6.44l.104.066.11-.033c.136-.044.278-.066.42-.066.336 0 .67.13.91.37.24.243.35.584.284.933-.067.348-.196.678-.377.984-.183.317-.423.617-.693.88-.63.62-1.47.977-2.37.977-.164 0-.334-.01-.504-.033-.1-.01-.2-.033-.3-.055l-.1-.022-.088.06c-.176.12-.385.187-.606.19-.31.003-.616-.125-.835-.37-.076-.084-.115-.18-.12-.28-.007-.144.06-.286.19-.406.195-.183.446-.296.72-.372.165-.043.33-.095.493-.157.557-.22 1.497-.636 1.617-1.26.033-.18-.06-.35-.24-.45l-.12-.066-.12.033c-.25.07-.51.113-.778.12-.523.016-1.057-.086-1.573-.3-.12-.05-.186-.116-.196-.185-.01-.065.032-.13.12-.185.164-.11.373-.175.58-.23.088-.022.175-.043.263-.063.863-.194 1.324-.49 1.39-.88.022-.132-.044-.258-.175-.34l-.104-.066-.11.022c-.206.044-.436.066-.682.066-.58 0-1.274-.134-1.882-.417v-.487c0-.98-.13-2.472-.79-3.78C18.157 1.607 15.62 0 12 0z" />
      </svg>
    ),
  },
  {
    platform: 'Instagram',
    platformAr: 'إنستغرام',
    handle: '@PASTATARAM',
    displayName: '@PASTATARAM',
    qr: '/images/instagram-qr.jpg',
    href: 'https://instagram.com/pastataram',
    accentLight: 'rgba(225,48,108,0.1)',
    accentBorder: 'rgba(225,48,108,0.3)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="url(#igGradMenu)">
        <defs>
          <linearGradient id="igGradMenu" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F58529" />
            <stop offset="50%" stopColor="#DD2A7B" />
            <stop offset="100%" stopColor="#8134AF" />
          </linearGradient>
        </defs>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    platform: 'TikTok',
    platformAr: 'تيك توك',
    handle: '@pastataram',
    displayName: '@pastataram',
    qr: '/images/tiktok-qr.jpg',
    href: '#',
    accentLight: 'rgba(105,201,208,0.1)',
    accentBorder: 'rgba(105,201,208,0.35)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z" fill="#010101" />
      </svg>
    ),
  },
]

/** Social QR codes section, consistent with the home page design. */
export default function SocialQRSection() {
  const { language } = useUIStore()
  const isAr = language === 'ar'

  return (
    <section className="section" style={{ background: 'linear-gradient(180deg, #14110F 0%, #1A1614 50%, #211C19 100%)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-[0.28em] block mb-3" style={{ color: '#7B1E2B' }}>
            {isAr ? 'تابعونا' : 'Follow Us'}
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: '#F2E8DA' }}>
            {isAr ? 'باركود مواقع التواصل' : 'Social QR Codes'}
          </h2>
          <p className="text-sm mb-5" style={{ color: 'rgba(201,187,168,0.6)' }}>
            {isAr ? 'امسح الكود للمتابعة والاستمتاع بآخر العروض' : 'Scan to follow and enjoy exclusive offers'}
          </p>
          <div className="w-10 h-0.5 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #7B1E2B, #D8A24A)' }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socials.map((s, i) => (
            <motion.a
              key={s.platform}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.12 }}
              className="group flex flex-col items-center rounded-3xl overflow-hidden transition-all duration-300"
              style={{
                background: 'rgba(33,28,25,0.96)',
                border: '1px solid rgba(184,115,51,0.22)',
                boxShadow: '0 4px 24px rgba(123,30,43,0.1)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 16px 48px rgba(123,30,43,0.2), 0 0 0 1px ${s.accentBorder}`; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(123,30,43,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div
                className="w-full flex items-center justify-between px-6 py-4"
                style={{ background: `linear-gradient(135deg, ${s.accentLight}, rgba(20,17,15,0.6))`, borderBottom: '1px solid rgba(184,115,51,0.15)' }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(33,28,25,0.96)', boxShadow: `0 2px 12px ${s.accentLight}`, border: `1px solid ${s.accentBorder}` }}>
                    {s.icon}
                  </div>
                  <div className="text-start">
                    <p className="font-black text-sm leading-tight" style={{ color: '#F2E8DA' }}>{isAr ? s.platformAr : s.platform}</p>
                    <p className="text-xs font-semibold" style={{ color: '#7B1E2B' }}>{s.handle}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: s.accentLight, border: `1px solid ${s.accentBorder}`, color: '#C9BBA8' }}>
                  {isAr ? 'تابع' : 'Follow'}
                </span>
              </div>

              <div className="w-full px-8 py-6 flex flex-col items-center gap-4">
                <div className="w-40 h-40 rounded-2xl overflow-hidden flex-shrink-0" style={{ border: `2px solid ${s.accentBorder}`, boxShadow: `0 4px 20px ${s.accentLight}` }}>
                  <img src={s.qr} alt={`${s.platform} QR`} className="w-full h-full object-cover" />
                </div>
                <div className="text-center">
                  <p className="font-black text-base mb-0.5" style={{ color: '#F2E8DA' }}>{s.displayName}</p>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(201,187,168,0.5)' }}>{isAr ? 'امسح للمتابعة' : 'Scan to Follow'}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
