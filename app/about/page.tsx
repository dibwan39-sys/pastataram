'use client'

import { motion } from 'framer-motion'
import { Leaf, Award, Heart, Zap, ChefHat, Globe, Clock, MapPin } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import { useUIStore } from '@/lib/store'
import { branches, workingHours } from '@/lib/data'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  const { language } = useUIStore()
  const isAr = language === 'ar'

  const values = [
    {
      icon: Leaf,
      titleAr: 'مكونات طازجة',
      titleEn: 'Fresh Ingredients',
      descAr: 'نختار فقط أجود المكونات الطازجة والإيطالية المستوردة',
      descEn: 'We select only the finest fresh and imported Italian ingredients',
    },
    {
      icon: Zap,
      titleAr: 'سرعة الخدمة',
      titleEn: 'Fast Service',
      descAr: 'طلبك جاهز في دقائق دون المساس بالجودة',
      descEn: 'Your order ready in minutes without compromising quality',
    },
    {
      icon: Heart,
      titleAr: 'صنع بشغف',
      titleEn: 'Made with Passion',
      descAr: 'كل طبق يُعدّ باهتمام واعتزاز بالتفاصيل الصغيرة',
      descEn: 'Every dish prepared with care and pride in the small details',
    },
    {
      icon: Award,
      titleAr: 'جودة فاخرة',
      titleEn: 'Premium Quality',
      descAr: 'معايير صارمة لضمان تجربة استثنائية في كل زيارة',
      descEn: 'Strict standards to ensure an exceptional experience every visit',
    },
  ]

  /**
   * The milestone "تخطي 500 طلب يومياً" / "Exceeded 500 daily orders" has been
   * removed. No order volume is recorded anywhere in this project, so the
   * figure was invented — and a fabricated number is the kind of claim a
   * customer can reasonably feel misled by.
   *
   * The remaining entries describe the brand's own history and the branches
   * that lib/data.ts lists, with no quantities attached.
   */
  const milestones = isAr ? [
    { year: '2023', event: 'تأسيس باستاتا رام في جدة' },
    { year: '2024', event: 'افتتاح فرع القرنية' },
    { year: '2024', event: 'افتتاح فرع السنابل' },
    { year: '2025', event: 'التوسع والنمو المستمر' },
  ] : [
    { year: '2023', event: 'PASTATARAM founded in Jeddah' },
    { year: '2024', event: 'Al Qurainiyah branch opened' },
    { year: '2024', event: 'Al Sanabel branch opened' },
    { year: '2025', event: 'Continued expansion and growth' },
  ]

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-espresso via-[var(--brand-surface)] to-brand-espresso" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #E7C6A4 0%, transparent 50%), radial-gradient(circle at 80% 50%, #F6E0C4 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-rose-gold to-brand-champagne flex items-center justify-center mx-auto mb-8 shadow-glow">
              <ChefHat className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              {isAr ? 'قصتنا' : 'Our Story'}
            </h1>
            <p className="text-brand-ivory/70 text-xl max-w-2xl mx-auto leading-relaxed">
              {isAr
                ? 'رحلة شغف بدأت من حب الطعام الإيطالي الأصيل وحلم بتقديمه بأسلوب عصري يليق بجدة'
                : 'A passion journey that started with a love for authentic Italian food and a dream to present it in a modern style worthy of Jeddah'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-brand-cream dark:bg-[var(--brand-noir)]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: isAr ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-brand-rose-gold text-sm font-bold uppercase tracking-widest block mb-4">
                {isAr ? 'عن باستاتا رام' : 'About PASTATARAM'}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-brand-espresso dark:text-brand-ivory mb-6 leading-tight">
                {isAr ? 'حيث تلتقي الأناقة بالطعم الاستثنائي' : 'Where Elegance Meets Exceptional Taste'}
              </h2>
              <div className="space-y-4 text-brand-brown dark:text-brand-mocha leading-relaxed">
                <p>
                  {isAr
                    ? 'باستاتا رام هي علامة تجارية فاخرة للباستا غير الرسمية، ولدت من شغف عميق بفن الطهي الإيطالي وإيمان راسخ بأن الطعام اللذيذ يجب أن يكون متاحاً للجميع.'
                    : 'PASTATARAM is a premium fast-casual pasta brand, born from a deep passion for Italian culinary arts and a firm belief that delicious food should be accessible to everyone.'}
                </p>
                <p>
                  {isAr
                    ? 'في قلب جدة، في حي القرنية المميز، أنشأنا تجربة فريدة تجمع بين سرعة الخدمة العصرية وجودة المطاعم الفاخرة. كل طبق نقدمه هو قصة من المكونات المختارة بعناية والوصفات المطورة بشغف.'
                    : 'In the heart of Jeddah, in the distinguished Al Qurainiyah neighborhood, we created a unique experience that combines modern service speed with premium restaurant quality. Every dish we serve is a story of carefully selected ingredients and passionately developed recipes.'}
                </p>
                <p>
                  {isAr
                    ? 'نؤمن أن الباستا ليست مجرد وجبة، بل هي تجربة كاملة من البداية حتى آخر لقمة. لهذا، نهتم بكل تفصيلة، من جودة المكونات إلى طريقة التقديم إلى الجو المحيط.'
                    : 'We believe pasta is not just a meal, but a complete experience from the first bite to the last. That\'s why we care about every detail, from ingredient quality to presentation style to the surrounding atmosphere.'}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isAr ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* A real PASTATARAM plate. This used to be a stock Unsplash
                  photograph of someone else's pasta, served from a third-party
                  host, on the page that tells the brand's story. */}
              <div className="relative rounded-4xl overflow-hidden h-96 shadow-brand-lg">
                <Image
                  src="/images/f1.webp"
                  alt={isAr ? 'باستاتا رام' : 'Pastata Ram'}
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/50 to-transparent" />
              </div>
              {/*
                A "4.9★ تقييم العملاء" badge used to sit here. Nothing in this
                project measures customer ratings — there is no review store and
                no aggregated score — so the number was invented, and presenting
                an invented rating as a trust signal is exactly what must not
                happen on a restaurant site.

                What replaces it is something the project can actually stand
                behind: the trading hours, from lib/data.ts.
              */}
              <div className="absolute -bottom-6 -start-6 glass-card p-5 rounded-2xl shadow-brand">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C43E57, #FD657D)' }}>
                    <Clock className="w-6 h-6 text-white" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-black text-brand-cream">
                      {isAr ? workingHours.ar : workingHours.en}
                    </p>
                    <p className="text-xs text-brand-brown dark:text-brand-mocha font-medium">
                      {isAr ? 'مفتوح كل يوم' : 'Open every day'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-brand-pearl dark:bg-[var(--brand-noir-2)]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-black text-brand-espresso dark:text-brand-ivory mb-4">
              {isAr ? 'قيمنا ومبادئنا' : 'Our Values & Principles'}
            </h2>
            <p className="text-brand-brown dark:text-brand-mocha max-w-lg mx-auto">
              {isAr ? 'ما يميزنا ويجعل تجربتك معنا استثنائية' : 'What sets us apart and makes your experience exceptional'}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.titleEn}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="premium-card p-6 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blush to-brand-nude flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-brand-rose-gold" />
                  </div>
                  <h3 className="font-bold text-brand-espresso dark:text-brand-ivory mb-2">
                    {isAr ? v.titleAr : v.titleEn}
                  </h3>
                  <p className="text-sm text-brand-brown dark:text-brand-mocha leading-relaxed">
                    {isAr ? v.descAr : v.descEn}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-brand-cream dark:bg-[var(--brand-noir)]">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-black text-brand-espresso dark:text-brand-ivory mb-4">
              {isAr ? 'رحلتنا' : 'Our Journey'}
            </h2>
          </motion.div>
          <div className="relative">
            <div className="absolute start-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-rose-gold to-brand-champagne" />
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isAr ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex items-center gap-6 mb-8"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-rose-gold to-brand-champagne flex items-center justify-center flex-shrink-0 shadow-brand z-10">
                  <span className="text-white font-black text-xs">{m.year}</span>
                </div>
                <div className="premium-card p-4 flex-1">
                  <p className="font-semibold text-brand-espresso dark:text-brand-ivory">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location section */}
      <section className="section bg-brand-pearl dark:bg-[var(--brand-noir-2)]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="premium-card p-12"
          >
            <MapPin className="w-10 h-10 text-brand-rose-gold mx-auto mb-4" />
            <h2 className="text-2xl font-black text-brand-espresso dark:text-brand-ivory mb-3">
              {isAr ? 'زورونا' : 'Visit Us'}
            </h2>
            {/* Branch count and names come from lib/data.ts — they used to be
                written out by hand here and still advertised a third branch
                (الواحة) long after it stopped being listed. */}
            <p className="text-brand-brown dark:text-brand-mocha mb-2 text-lg font-medium">
              {isAr
                ? `جدة · ${branches.length === 2 ? 'فرعان' : `${branches.length} فروع`} في خدمتكم`
                : `Jeddah · ${branches.length} branches at your service`}
            </p>
            <p className="text-brand-latte mb-8">
              {branches.map((b) => (isAr ? b.nameAr.replace('جدة - ', '') : b.nameEn.replace('Jeddah - ', ''))).join(' · ')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary px-8 py-3">
                {isAr ? 'الموقع والتواصل' : 'Location & Contact'}
              </Link>
              <Link href="/menu" className="btn-secondary px-8 py-3">
                {isAr ? 'استكشف المنيو' : 'Explore Menu'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
