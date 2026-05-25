'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Star, MapPin, Clock, Phone, Zap, Leaf, Award, Heart, Sparkles } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import { useUIStore, useCartStore } from '@/lib/store'
import { menuItems, reviews } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'
import Image from 'next/image'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
}

// Luxury pink palette
// Base surfaces:   #FCEEF4 (pearl pink), #F8D7E2 (blush), #F2D0DF (deeper blush)
// Cream accents:   #FFF4F8 (cream pink), #FEF0F5 (soft pearl)
// Rose-gold:       #C4869A (primary), #D4A0B5 (mid), #E6B7C8 (light)
// Dark text:       #3D1F2B, #5C2F3D, #8A5A6A

export default function HomePage() {
  const { language } = useUIStore()
  const { addItem } = useCartStore()
  const isAr = language === 'ar'

  const featuredItems = menuItems.filter((m) => m.featured)
  const featuredReviews = reviews.filter((r) => r.featured).slice(0, 3)

  const features = isAr ? [
    { icon: Zap, title: 'سريع وطازج', desc: 'طلبك جاهز في دقائق بأجود المكونات' },
    { icon: Leaf, title: 'مكونات فاخرة', desc: 'أفضل المكونات الإيطالية المستوردة' },
    { icon: Award, title: 'نكهة استثنائية', desc: 'وصفات تجمع الأصالة والعصرية' },
    { icon: Heart, title: 'صنع بشغف', desc: 'كل طبق يُعدّ بحب واهتمام بالغ' },
  ] : [
    { icon: Zap, title: 'Fast & Fresh', desc: 'Your order ready in minutes with the finest ingredients' },
    { icon: Leaf, title: 'Premium Quality', desc: 'The finest imported Italian ingredients' },
    { icon: Award, title: 'Exceptional Taste', desc: 'Recipes blending tradition with modernity' },
    { icon: Heart, title: 'Made with Love', desc: 'Every dish crafted with passion and care' },
  ]

  return (
    <PageWrapper>

      {/* ══════════════════════════════════════════
          HERO  — rich blush pink atmosphere
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#F5DAEA' }}>

        {/* Deep layered pink background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5DAEA] via-[#FCEEF4] to-[#F8D7E2]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_30%,rgba(240,185,210,0.3)_0%,transparent_52%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_70%,rgba(225,170,195,0.28)_0%,transparent_48%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(245,205,222,0.32)_0%,transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(242,215,228,0.25)_0%,transparent_40%)]" />

        {/* Static ambient orbs */}
        <div className="absolute top-10 right-[6%] w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(240,160,195,0.3)' }} />
        <div className="absolute bottom-10 left-[3%] w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(248,175,210,0.35)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(252,238,244,0.2)' }} />

        {/* Content grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[calc(100vh-160px)]">

            {/* ── Text side ── */}
            <motion.div
              initial={{ opacity: 0, x: isAr ? 24 : -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center lg:items-start text-center lg:text-start order-2 lg:order-1"
            >
              {/* Location badge */}
              <motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold mb-7 backdrop-blur-sm"
                style={{
                  background: 'rgba(248,215,226,0.75)',
                  border: '1px solid rgba(196,134,154,0.35)',
                  color: '#8A3A56',
                  boxShadow: '0 2px 16px rgba(196,134,154,0.2)',
                }}
              >
                <MapPin className="w-3 h-3" />
                {isAr ? 'جدة · القرنية · شارع 80' : 'Jeddah · Al Qurainiyah · Street 80'}
              </motion.span>

              {/* Headline */}
              <h1 className="font-black leading-[1.08] tracking-tight mb-5" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
                {isAr ? (
                  <>
                    <span style={{ color: '#3D1F2B' }}>تجربة باستا عصرية</span>
                    <br />
                    <span style={{ color: '#3D1F2B' }}>تجمع بين الأناقة</span>
                    <br />
                    <span style={{
                      background: 'linear-gradient(135deg, #A0455E 0%, #C4869A 50%, #D4A0B5 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>والطعم الاستثنائي</span>
                  </>
                ) : (
                  <>
                    <span style={{ color: '#3D1F2B' }}>A Modern Pasta</span>
                    <br />
                    <span style={{ color: '#3D1F2B' }}>Experience of</span>
                    <br />
                    <span style={{
                      background: 'linear-gradient(135deg, #A0455E 0%, #C4869A 50%, #D4A0B5 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>Elegance & Taste</span>
                  </>
                )}
              </h1>

              <p className="text-sm md:text-base leading-relaxed mb-9 max-w-sm" style={{ color: 'rgba(92,47,61,0.8)' }}>
                {isAr
                  ? 'نكهات إيطالية مصممة بعناية لتمنحكم تجربة لا تُنسى'
                  : 'Italian flavors carefully crafted to give you an unforgettable experience'}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-10">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    href="/menu"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white text-sm"
                    style={{
                      background: 'linear-gradient(135deg, #A0455E 0%, #C4869A 60%, #D4A0B5 100%)',
                      boxShadow: '0 8px 28px rgba(160,69,94,0.4)',
                    }}
                  >
                    {isAr ? 'استكشف المنيو' : 'Explore Menu'}
                    {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    href="/order"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm backdrop-blur-sm"
                    style={{
                      background: 'rgba(248,215,226,0.65)',
                      border: '1.5px solid rgba(196,134,154,0.5)',
                      color: '#8A3A56',
                      boxShadow: '0 4px 16px rgba(196,134,154,0.2)',
                    }}
                  >
                    {isAr ? 'اطلب الآن' : 'Order Now'}
                  </Link>
                </motion.div>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-7">
                {[
                  { num: '500+', label: isAr ? 'طلب يومي' : 'Daily Orders' },
                  { num: '4.9★', label: isAr ? 'التقييم' : 'Rating' },
                  { num: '100%', label: isAr ? 'طازج' : 'Fresh' },
                ].map((s, i) => (
                  <div key={s.num} className="relative text-center">
                    {i > 0 && (
                      <div className="absolute -start-3.5 top-1 h-6 w-px" style={{ background: 'rgba(196,134,154,0.4)' }} />
                    )}
                    <p className="text-xl font-black" style={{ color: '#A0455E' }}>{s.num}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-wide mt-0.5" style={{ color: 'rgba(92,47,61,0.55)' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Visual side ── */}
            <motion.div
              initial={{ opacity: 0, x: isAr ? -24 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="flex items-center justify-center relative order-1 lg:order-2"
            >
              {/* Glow clouds */}
              <div className="absolute w-[460px] h-[460px] rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(240,160,195,0.5) 0%, transparent 65%)' }} />
              <div className="absolute w-[320px] h-[320px] rounded-full blur-2xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(252,220,235,0.7) 0%, transparent 65%)' }} />

              {/* Static rings */}
              {[{ inset: '-14%', op: 0.3 }, { inset: '-26%', op: 0.22 }, { inset: '-38%', op: 0.14 }].map((r, i) => (
                <div
                  key={i}
                  className="absolute rounded-full pointer-events-none"
                  style={{ inset: r.inset, border: `1px solid rgba(196,134,154,${r.op})` }}
                />
              ))}

              {/* Logo — ambient light integration */}
              <div className="relative z-10" style={{ width: 'clamp(280px, 38vw, 400px)', height: 'clamp(280px, 38vw, 400px)' }}>
                {/* Outermost warm halo */}
                <div className="absolute inset-[-40%] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(248,175,210,0.4) 0%, rgba(245,165,200,0.2) 35%, transparent 65%)' }} />
                {/* Mid blush glow */}
                <div className="absolute inset-[-20%] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(252,220,238,0.55) 0%, rgba(248,200,225,0.3) 45%, transparent 70%)' }} />
                {/* Inner cream-pink light */}
                <div className="absolute inset-[-8%] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,242,250,0.6) 0%, rgba(252,230,242,0.35) 50%, transparent 75%)' }} />

                {/* Logo — transparent SVG, no blend needed */}
                <div className="relative w-full h-full">
                  <Image
                    src="/images/logo.png"
                    alt="PASTATARAM"
                    fill
                    className="object-contain"
                    priority
                    unoptimized
                  />
                </div>
              </div>

              {/* Floating chips */}
              {[
                { label: isAr ? '🍝 باستا فريش' : '🍝 Fresh Pasta', pos: 'top-6 -start-2 lg:-start-8', delay: 1.2 },
                { label: isAr ? '⭐ 4.9 تقييم' : '⭐ 4.9 Rated', pos: 'bottom-10 -start-2 lg:-start-6', delay: 1.5 },
                { label: isAr ? '🔥 الأكثر طلباً' : '🔥 Best Seller', pos: 'top-10 -end-2 lg:-end-8', delay: 1.8 },
              ].map((chip) => (
                <motion.div
                  key={chip.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: chip.delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute ${chip.pos} px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap backdrop-blur-md`}
                  style={{
                    background: 'rgba(252,220,235,0.92)',
                    border: '1px solid rgba(196,134,154,0.4)',
                    color: '#7A3050',
                    boxShadow: '0 4px 16px rgba(196,134,154,0.2)',
                  }}
                >
                  {chip.label}
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="w-5 h-8 rounded-full flex items-start justify-center p-1.5" style={{ border: '1.5px solid rgba(160,69,94,0.4)' }}>
            <div className="w-1 h-1.5 rounded-full" style={{ background: '#A0455E' }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BEST SELLERS  — warm blush surface
      ══════════════════════════════════════════ */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #FCEEF4 0%, #F8D7E2 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">

          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.22em] block mb-3" style={{ color: '#A0455E' }}>
              {isAr ? 'الأكثر طلباً' : 'Most Ordered'}
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: '#3D1F2B' }}>
              {isAr ? 'أبرز أطباقنا' : 'Our Best Sellers'}
            </h2>
            <div className="w-10 h-0.5 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #A0455E, #D4A0B5)' }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.1 }}
                className="group rounded-3xl overflow-hidden transition-shadow duration-300"
                style={{
                  background: 'linear-gradient(145deg, rgba(252,238,244,0.9) 0%, rgba(248,215,226,0.7) 100%)',
                  border: '1px solid rgba(196,134,154,0.3)',
                  boxShadow: '0 6px 28px rgba(160,69,94,0.12)',
                  backdropFilter: 'blur(12px)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 18px 50px rgba(160,69,94,0.22)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 6px 28px rgba(160,69,94,0.12)' }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={isAr ? item.nameAr : item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F2B]/50 to-transparent" />
                  {item.bestseller && (
                    <span
                      className="absolute top-3 start-3 px-3 py-1 rounded-full text-white text-xs font-bold"
                      style={{ background: 'linear-gradient(135deg, #A0455E, #C4869A)' }}
                    >
                      {isAr ? '🔥 الأكثر مبيعاً' : '🔥 Bestseller'}
                    </span>
                  )}
                  <p className="absolute bottom-3 start-4 font-black text-white text-base drop-shadow-sm">
                    {isAr ? item.nameAr : item.name}
                  </p>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: 'rgba(92,47,61,0.75)' }}>
                    {isAr ? item.descriptionAr : item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xl font-black"
                      style={{
                        background: 'linear-gradient(135deg, #A0455E, #C4869A)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {formatPrice(item.price, language)}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        addItem(item)
                        toast.success(isAr ? `تمت إضافة ${item.nameAr} للسلة` : `${item.name} added to cart`)
                      }}
                      className="px-5 py-2 rounded-full text-sm font-bold text-white"
                      style={{
                        background: 'linear-gradient(135deg, #A0455E, #C4869A)',
                        boxShadow: '0 4px 14px rgba(160,69,94,0.35)',
                      }}
                    >
                      {isAr ? 'أضف للسلة' : 'Add to Cart'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-10">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold backdrop-blur-sm transition-colors duration-200"
              style={{
                background: 'rgba(248,215,226,0.6)',
                border: '1px solid rgba(196,134,154,0.4)',
                color: '#A0455E',
              }}
            >
              {isAr ? 'عرض كامل المنيو' : 'View Full Menu'}
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY CHOOSE US  — pearl pink surface
      ══════════════════════════════════════════ */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #F8D7E2 0%, #FCEEF4 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">

          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.22em] block mb-3" style={{ color: '#A0455E' }}>
              {isAr ? 'مميزاتنا' : 'Our Promise'}
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: '#3D1F2B' }}>
              {isAr ? 'لماذا باستاتا رام؟' : 'Why PASTATARAM?'}
            </h2>
            <div className="w-10 h-0.5 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #A0455E, #D4A0B5)' }} />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group text-center p-6 rounded-3xl transition-all duration-300"
                  style={{
                    background: 'linear-gradient(145deg, rgba(252,238,244,0.85) 0%, rgba(248,215,226,0.55) 100%)',
                    border: '1px solid rgba(196,134,154,0.3)',
                    boxShadow: '0 4px 20px rgba(160,69,94,0.1)',
                    backdropFilter: 'blur(8px)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 36px rgba(160,69,94,0.18)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(160,69,94,0.1)' }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, #F2C4D8, #E6A0BA)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: '#7A3050' }} />
                  </div>
                  <h3 className="font-bold text-sm mb-1.5" style={{ color: '#3D1F2B' }}>{f.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(92,47,61,0.7)' }}>{f.desc}</p>
                </motion.div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          BUILD YOUR PASTA  — deep rose dark
      ══════════════════════════════════════════ */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #2B1F30 0%, #3D2645 50%, #2B1F30 100%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 15% 50%, rgba(220,170,210,0.12) 0%, transparent 50%), radial-gradient(ellipse at 85% 50%, rgba(200,150,190,0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% -10%, rgba(230,190,220,0.1) 0%, transparent 40%)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <motion.div {...fadeUp}>
              <span className="text-xs font-bold uppercase tracking-[0.22em] block mb-4" style={{ color: '#E6B7C8' }}>
                {isAr ? 'تجربة فريدة' : 'Unique Experience'}
              </span>
              <h2 className="font-black text-white leading-tight mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                {isAr ? 'صمّم باستاتك الخاصة' : 'Build Your Own Pasta'}
              </h2>
              <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: 'rgba(240,200,215,0.65)' }}>
                {isAr
                  ? 'اختر نوع الباستا والصوص والإضافات التي تحبها وانشئ تجربتك الخاصة'
                  : 'Choose your pasta, sauce, proteins, and toppings to create your perfect bowl'}
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Link
                  href="/build-your-pasta"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #F2C4D8, #E6A0BA)',
                    color: '#3D1F2B',
                    boxShadow: '0 8px 28px rgba(242,196,216,0.35)',
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  {isAr ? 'ابدأ التصميم' : 'Start Building'}
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isAr ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-3"
            >
              {(isAr ? [
                { emoji: '🍝', title: 'نوع الباستا', options: 'سباغيتي · فيتوتشيني · بيني' },
                { emoji: '🥫', title: 'الصوص', options: 'أراباياتا · كريمة · بيستو' },
                { emoji: '🥩', title: 'البروتين', options: 'دجاج · مأكولات بحرية · خضار' },
                { emoji: '🧀', title: 'الجبن', options: 'بارميزان · موتزاريلا' },
              ] : [
                { emoji: '🍝', title: 'Pasta Type', options: 'Spaghetti · Fettuccine · Penne' },
                { emoji: '🥫', title: 'Sauce', options: 'Arrabiata · Cream · Pesto' },
                { emoji: '🥩', title: 'Protein', options: 'Chicken · Seafood · Veggie' },
                { emoji: '🧀', title: 'Cheese', options: 'Parmesan · Mozzarella' },
              ]).map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="p-4 rounded-2xl"
                  style={{
                    background: 'rgba(248,175,210,0.1)',
                    border: '1px solid rgba(230,183,200,0.2)',
                  }}
                >
                  <span className="text-2xl block mb-2">{card.emoji}</span>
                  <p className="font-bold text-white text-sm mb-1">{card.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,200,215,0.5)' }}>{card.options}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          REVIEWS  — soft blush pink
      ══════════════════════════════════════════ */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #FCEEF4 0%, #F8D7E2 50%, #FCEEF4 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">

          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.22em] block mb-3" style={{ color: '#A0455E' }}>
              {isAr ? 'آراء عملاؤنا' : 'Customer Reviews'}
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: '#3D1F2B' }}>
              {isAr ? 'ماذا يقولون عنا' : 'What They Say'}
            </h2>
            <div className="flex items-center justify-center gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4" style={{ fill: '#C4869A', color: '#C4869A' }} />)}
              <span className="text-sm font-semibold ms-2" style={{ color: 'rgba(92,47,61,0.7)' }}>4.9 / 5</span>
            </div>
            <div className="w-10 h-0.5 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #A0455E, #D4A0B5)' }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredReviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.12 }}
                className="p-6 rounded-3xl"
                style={{
                  background: 'linear-gradient(145deg, rgba(252,238,244,0.9) 0%, rgba(248,215,226,0.6) 100%)',
                  border: '1px solid rgba(196,134,154,0.3)',
                  boxShadow: '0 4px 24px rgba(160,69,94,0.12)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5" style={{ fill: '#C4869A', color: '#C4869A' }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5 italic" style={{ color: 'rgba(92,47,61,0.8)' }}>
                  "{review.comment}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #A0455E, #C4869A)' }}
                  >
                    {review.customerName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#3D1F2B' }}>{review.customerName}</p>
                    {review.verified && (
                      <p className="text-xs font-medium" style={{ color: '#A0455E' }}>✓ {isAr ? 'عميل موثق' : 'Verified Customer'}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-10">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition-colors duration-200"
              style={{
                background: 'rgba(248,215,226,0.6)',
                border: '1px solid rgba(196,134,154,0.4)',
                color: '#A0455E',
              }}
            >
              {isAr ? 'عرض كل التقييمات' : 'View All Reviews'}
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          SOCIAL MEDIA  — premium QR cards
      ══════════════════════════════════════════ */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #F8D7E2 0%, #FEF0F5 50%, #FCEEF4 100%)' }}>
        <div className="max-w-5xl mx-auto px-6">

          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.28em] block mb-3" style={{ color: '#A0455E' }}>
              {isAr ? 'تابعونا' : 'Follow Us'}
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: '#3D1F2B' }}>
              {isAr ? 'تواصل معنا' : 'Stay Connected'}
            </h2>
            <p className="text-sm mb-5" style={{ color: 'rgba(92,47,61,0.6)' }}>
              {isAr ? 'امسح الكود للمتابعة والاستمتاع بآخر العروض' : 'Scan to follow and enjoy exclusive offers'}
            </p>
            <div className="w-10 h-0.5 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #A0455E, #D4A0B5)' }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                platform: 'Snapchat',
                platformAr: 'سناب شات',
                handle: '@pastataram',
                displayName: 'PASTATA RAM',
                qr: '/images/snapchat-qr.jpg',
                href: '#',
                accent: '#F7C521',
                accentLight: 'rgba(247,197,33,0.12)',
                accentBorder: 'rgba(247,197,33,0.35)',
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#F7C521">
                    <path d="M12.017 0C8.396 0 5.86 1.607 4.49 4.29c-.66 1.308-.792 2.8-.792 3.78v.487c-.608.283-1.303.417-1.882.417-.246 0-.476-.022-.682-.066l-.11-.022-.104.066c-.13.082-.197.208-.175.34.066.39.527.686 1.39.88.088.02.175.04.262.063.208.055.417.12.582.23.087.056.13.12.12.185-.01.07-.076.134-.197.185-.516.214-1.05.316-1.573.3-.267-.007-.527-.05-.778-.12l-.12-.033-.12.066c-.18.1-.273.27-.24.45.12.624 1.06 1.04 1.617 1.26.164.063.328.115.493.158.274.076.525.19.72.372.13.12.197.262.19.406-.005.1-.044.196-.12.28-.22.245-.526.373-.835.37-.22-.003-.43-.07-.606-.19l-.088-.06-.1.022c-.1.022-.2.044-.3.055-.17.022-.34.033-.505.033-.9 0-1.74-.356-2.37-.977-.27-.263-.51-.563-.693-.88-.18-.306-.31-.636-.377-.984-.066-.35.044-.69.285-.933.24-.24.573-.37.908-.37.143 0 .285.022.42.066l.11.033.105-.066c.46-.285 1.024-.44 1.6-.44.44 0 .878.087 1.28.25V8.07c0-3.882 2.69-7.05 6.19-7.05s6.19 3.168 6.19 7.05v.66c.4-.163.837-.25 1.277-.25.577 0 1.14.155 1.6.44l.104.066.11-.033c.136-.044.278-.066.42-.066.336 0 .67.13.91.37.24.243.35.584.284.933-.067.348-.196.678-.377.984-.183.317-.423.617-.693.88-.63.62-1.47.977-2.37.977-.164 0-.334-.01-.504-.033-.1-.01-.2-.033-.3-.055l-.1-.022-.088.06c-.176.12-.385.187-.606.19-.31.003-.616-.125-.835-.37-.076-.084-.115-.18-.12-.28-.007-.144.06-.286.19-.406.195-.183.446-.296.72-.372.165-.043.33-.095.493-.157.557-.22 1.497-.636 1.617-1.26.033-.18-.06-.35-.24-.45l-.12-.066-.12.033c-.25.07-.51.113-.778.12-.523.016-1.057-.086-1.573-.3-.12-.05-.186-.116-.196-.185-.01-.065.032-.13.12-.185.164-.11.373-.175.58-.23.088-.022.175-.043.263-.063.863-.194 1.324-.49 1.39-.88.022-.132-.044-.258-.175-.34l-.104-.066-.11.022c-.206.044-.436.066-.682.066-.58 0-1.274-.134-1.882-.417v-.487c0-.98-.13-2.472-.79-3.78C18.157 1.607 15.62 0 12 0z"/>
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
                accent: '#E1306C',
                accentLight: 'rgba(225,48,108,0.1)',
                accentBorder: 'rgba(225,48,108,0.3)',
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="url(#igGrad)">
                    <defs>
                      <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F58529"/>
                        <stop offset="50%" stopColor="#DD2A7B"/>
                        <stop offset="100%" stopColor="#8134AF"/>
                      </linearGradient>
                    </defs>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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
                accent: '#010101',
                accentLight: 'rgba(105,201,208,0.1)',
                accentBorder: 'rgba(105,201,208,0.35)',
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z" fill="#010101"/>
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z" fill="url(#ttGrad)" opacity="0.8"/>
                    <defs>
                      <linearGradient id="ttGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#69C9D0"/>
                        <stop offset="100%" stopColor="#EE1D52"/>
                      </linearGradient>
                    </defs>
                  </svg>
                ),
              },
            ].map((s, i) => (
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
                  background: 'rgba(255,255,255,0.82)',
                  border: '1px solid rgba(196,134,154,0.22)',
                  boxShadow: '0 4px 24px rgba(160,69,94,0.1)',
                  backdropFilter: 'blur(16px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 16px 48px rgba(160,69,94,0.2), 0 0 0 1px ${s.accentBorder}`
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(160,69,94,0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Card header */}
                <div
                  className="w-full flex items-center justify-between px-6 py-4"
                  style={{
                    background: `linear-gradient(135deg, ${s.accentLight}, rgba(252,238,244,0.6))`,
                    borderBottom: `1px solid rgba(196,134,154,0.15)`,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(255,255,255,0.9)',
                        boxShadow: `0 2px 12px ${s.accentLight}`,
                        border: `1px solid ${s.accentBorder}`,
                      }}
                    >
                      {s.icon}
                    </div>
                    <div className="text-start">
                      <p className="font-black text-sm leading-tight" style={{ color: '#3D1F2B' }}>
                        {isAr ? s.platformAr : s.platform}
                      </p>
                      <p className="text-xs font-semibold" style={{ color: '#A0455E' }}>{s.handle}</p>
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{
                      background: s.accentLight,
                      border: `1px solid ${s.accentBorder}`,
                      color: '#8A3A56',
                    }}
                  >
                    {isAr ? 'تابع' : 'Follow'}
                  </span>
                </div>

                {/* QR code */}
                <div className="w-full px-8 py-6 flex flex-col items-center gap-4">
                  <div
                    className="w-40 h-40 rounded-2xl overflow-hidden flex-shrink-0"
                    style={{
                      border: `2px solid ${s.accentBorder}`,
                      boxShadow: `0 4px 20px ${s.accentLight}`,
                    }}
                  >
                    <img
                      src={s.qr}
                      alt={`${s.platform} QR`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="text-center">
                    <p className="font-black text-base mb-0.5" style={{ color: '#3D1F2B' }}>{s.displayName}</p>
                    <p
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: 'rgba(92,47,61,0.5)' }}
                    >
                      {isAr ? 'امسح للمتابعة' : 'Scan to Follow'}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          LOCATION  — premium map + info card
      ══════════════════════════════════════════ */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #FCEEF4 0%, #F8D7E2 100%)' }}>
        <div className="max-w-4xl mx-auto px-6">

          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.28em] block mb-3" style={{ color: '#A0455E' }}>
              {isAr ? 'موقعنا' : 'Find Us'}
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-2" style={{ color: '#3D1F2B' }}>
              {isAr ? 'زورونا اليوم' : 'Visit Us Today'}
            </h2>
            <p className="text-sm" style={{ color: 'rgba(92,47,61,0.6)' }}>
              {isAr ? 'جدة · القرنية · شارع ٨٠' : 'Jeddah · Al Qurainiyah · Street 80'}
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="rounded-3xl overflow-hidden"
            style={{
              border: '1px solid rgba(196,134,154,0.28)',
              boxShadow: '0 12px 52px rgba(160,69,94,0.16)',
            }}
          >
            {/* Google Maps embed */}
            <div className="relative w-full" style={{ height: '340px' }}>
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(to bottom, rgba(252,238,244,0.18) 0%, transparent 20%, transparent 80%, rgba(248,215,226,0.25) 100%)',
                }}
              />
              <iframe
                src="https://maps.google.com/maps?q=القرنية+شارع+80+جدة+السعودية&output=embed&hl=ar&z=16"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="PASTATARAM Location"
              />
            </div>

            {/* Info row */}
            <div
              className="p-7 md:p-8"
              style={{
                background: 'linear-gradient(145deg, rgba(252,238,244,0.92) 0%, rgba(248,215,226,0.75) 100%)',
                backdropFilter: 'blur(12px)',
                borderTop: '1px solid rgba(196,134,154,0.2)',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-7">
                {[
                  {
                    icon: MapPin,
                    title: isAr ? 'العنوان' : 'Address',
                    value: isAr ? 'جدة - القرنية - شارع 80\nبجوار الهيبة الاقتصادية' : 'Jeddah – Al Qurainiyah\nStreet 80, Near Al Hayba Economic',
                  },
                  {
                    icon: Clock,
                    title: isAr ? 'أوقات العمل' : 'Hours',
                    value: isAr ? 'يومياً\nمن ٣ عصراً حتى ٣ فجراً' : 'Daily\nFrom 3 PM to 3 AM',
                  },
                  {
                    icon: Phone,
                    title: isAr ? 'للتواصل' : 'Contact',
                    value: '050 193 8696',
                    isPhone: true,
                  },
                ].map((info) => {
                  const Icon = info.icon
                  return (
                    <div key={info.title} className="flex flex-col items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #F2C4D8, #E6A0BA)' }}
                      >
                        <Icon className="w-5 h-5" style={{ color: '#7A3050' }} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'rgba(92,47,61,0.5)' }}>{info.title}</p>
                        {info.isPhone ? (
                          <a href="tel:0501938696" className="font-bold text-base hover:opacity-75 transition-opacity" style={{ color: '#3D1F2B' }} dir="ltr">
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-semibold text-sm whitespace-pre-line leading-relaxed" style={{ color: '#3D1F2B' }}>
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <a
                    href="https://maps.app.goo.gl/rDzENzTP2bMWEgJ99"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white text-sm"
                    style={{
                      background: 'linear-gradient(135deg, #A0455E, #C4869A)',
                      boxShadow: '0 6px 20px rgba(160,69,94,0.35)',
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                    {isAr ? 'افتح في خرائط جوجل' : 'Open in Google Maps'}
                  </a>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <a
                    href="tel:0501938696"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm"
                    style={{
                      background: 'rgba(248,215,226,0.7)',
                      border: '1.5px solid rgba(196,134,154,0.45)',
                      color: '#7A3050',
                    }}
                  >
                    <Phone className="w-4 h-4" />
                    050 193 8696
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

    </PageWrapper>
  )
}
