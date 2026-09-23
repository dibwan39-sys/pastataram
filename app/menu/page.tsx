'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookOpen, UtensilsCrossed } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import MenuGrid from '@/components/menu/MenuGrid'
import CategoryNav from '@/components/menu/CategoryNav'
import MenuImageSection from '@/components/menu/MenuImageSection'
import SocialQRSection from '@/components/menu/SocialQRSection'
import SignatureSection from '@/components/home/SignatureSection'
import AmbientParticles from '@/components/ambient/AmbientParticles'
import { useUIStore } from '@/lib/store'
import { menuItems } from '@/lib/data'

/**
 * The menu experience, in the order a customer actually uses it:
 *
 *   intro → signature dish → category navigation → product collections
 *         → the official menu artwork → order
 *
 * The interactive products are the primary ordering path. The official menu
 * image stays authoritative as the complete visual reference, but nobody has
 * to zoom into artwork to discover what can be ordered — which is how this
 * page used to open.
 */
export default function MenuPage() {
  const language = useUIStore((s) => s.language)
  const isAr = language === 'ar'
  const reduce = useReducedMotion()
  const Arrow = isAr ? ArrowLeft : ArrowRight

  return (
    <PageWrapper>
      {/* ── 1 · Intro ─────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{ background: 'linear-gradient(180deg, #0B0709 0%, #120C10 60%, #181015 100%)' }}
        aria-labelledby="menu-heading"
      >
        <AmbientParticles density={22} />
        <div
          aria-hidden
          className="pointer-events-none absolute start-1/2 top-0 h-[40vh] w-[60vh] -translate-x-1/2 rounded-full blur-[110px]"
          style={{ background: 'radial-gradient(ellipse, rgba(253,101,125,0.2) 0%, transparent 70%)' }}
        />

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 26 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-3xl px-6 text-center"
        >
          <span className="eyebrow inline-flex items-center gap-2">
            <UtensilsCrossed className="h-3.5 w-3.5" aria-hidden />
            {isAr ? 'قائمة الطعام' : 'Our Menu'}
          </span>

          <h1 id="menu-heading" className="mt-4 font-display display-xl font-bold text-brand-cream">
            {isAr ? 'قائمة باستاتارام' : 'The PASTATARAM Menu'}
          </h1>

          <div className="rule-fade mx-auto my-7 max-w-[11rem]" aria-hidden />

          <p className="mx-auto max-w-xl text-[15px] leading-9 text-brand-cream-dim md:text-base">
            {isAr
              ? 'اختر طبقك، أضف لمستك، واستمتع بتجربة باستا مختلفة.'
              : 'Choose your plate, add your touch, and enjoy pasta done differently.'}
          </p>

          <p className="mt-6 text-xs font-semibold tracking-wide text-brand-muted">
            {isAr
              ? `${menuItems.length} صنفاً · الأسعار بالريال السعودي`
              : `${menuItems.length} items · Prices in Saudi Riyal`}
          </p>
        </motion.div>
      </section>

      {/* ── 2 · The signature dish ────────────────────────── */}
      <SignatureSection />

      {/* ── 3 · Category navigation + 4 · product collections ── */}
      <section className="relative" style={{ background: 'linear-gradient(180deg, #1F1419 0%, #120C10 18%, #120C10 100%)' }}>
        {/*
          Sticky category bar. It works because globals.css keeps `body` on
          `overflow-x: clip` rather than `hidden` — `hidden` would force
          `overflow-y: auto`, turn body into a scroll container and silently
          break every sticky descendant on the site.
        */}
        <div
          className="sticky top-[var(--nav-h)] z-30 border-b py-4 backdrop-blur-xl"
          style={{ background: 'rgba(18,12,16,0.9)', borderColor: 'rgba(231,198,164,0.14)' }}
        >
          <div className="mx-auto max-w-7xl px-6">
            <CategoryNav />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-14">
          <MenuGrid />
        </div>
      </section>

      {/* ── 5 · The official full menu ────────────────────── */}
      <section
        className="section relative"
        style={{ background: 'linear-gradient(180deg, #120C10 0%, #181015 100%)' }}
        aria-labelledby="official-menu-heading"
      >
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 22 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-9 text-center"
          >
            <span className="eyebrow inline-flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5" aria-hidden />
              {isAr ? 'المرجع الكامل' : 'Complete Reference'}
            </span>
            <h2 id="official-menu-heading" className="mt-3 font-display display-lg font-bold text-brand-cream">
              {isAr ? 'القائمة الكاملة' : 'The Full Menu'}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[15px] leading-8 text-brand-cream-dim">
              {isAr
                ? 'القائمة الرسمية كاملة — اضغط للتكبير أو العرض بملء الشاشة.'
                : 'Our official menu in full — tap to zoom or view fullscreen.'}
            </p>
          </motion.div>

          {/* The approved artwork, untouched and unscaled down. */}
          <MenuImageSection showHeading={false} />
        </div>
      </section>

      {/* ── 6 · Order CTA ─────────────────────────────────── */}
      <section
        className="relative py-16"
        style={{ background: 'linear-gradient(180deg, #181015 0%, #120C10 100%)' }}
      >
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl px-6 text-center"
        >
          <h2 className="font-display text-2xl font-bold text-brand-cream md:text-3xl">
            {isAr ? 'جاهز للطلب؟' : 'Ready to order?'}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-brand-cream-dim">
            {isAr
              ? 'أضِف أطباقك إلى السلة وأكمل الطلب عبر واتساب في دقيقة.'
              : 'Add your plates to the cart and finish on WhatsApp in under a minute.'}
          </p>
          <Link href="/checkout" className="btn-primary mt-7 inline-flex items-center gap-2 py-3.5 text-sm">
            {isAr ? 'إتمام الطلب' : 'Go to checkout'}
            <Arrow className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>
      </section>

      <SocialQRSection />
    </PageWrapper>
  )
}
