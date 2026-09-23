'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useTransform } from 'framer-motion'
import { usePinnedScene } from '@/components/motion/primitives'
import { ArrowLeft, ArrowRight, MapPin, ChevronDown } from 'lucide-react'
import AmbientParticles from '@/components/ambient/AmbientParticles'
import { useUIStore } from '@/lib/store'
import { branches, cmsContent, menuItems, workingHours } from '@/lib/data'
import { getOpenStatus, type OpenStatus } from '@/lib/utils'

/**
 * The opening frame: a real plate of pasta, full bleed, with the brand
 * resolving over it and one obvious way to order.
 *
 * Depth comes from four layers moving at different rates as the page scrolls —
 * photograph, gradient scrim, ambient motes, content — which reads as a slow
 * camera push rather than a slideshow. Every layer collapses to static under
 * `prefers-reduced-motion`.
 *
 * The dish, its price and the trading hours are read from lib/data.ts, so the
 * hero can never advertise a price the menu no longer charges.
 */
export default function HeroSection() {
  const language = useUIStore((s) => s.language)
  const isAr = language === 'ar'
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement | null>(null)

  const signature = menuItems.find((m) => m.id === '1') ?? menuItems[0]

  /**
   * The opening shot, in four planes moving at four rates.
   *
   * Progress is spring-smoothed rather than read straight off the scrollbar.
   * Raw `scrollYProgress` tracks the wheel exactly, which is why linear
   * parallax reads mechanical — the image starts and stops with the finger.
   * The spring keeps moving for a beat after the input stops, so the frame
   * behaves like something with mass, which is what a camera move is.
   *
   * The rates are what create the depth, and they are ordered deliberately:
   *
   *   photograph   16%  — furthest away, so it moves least
   *   scrim        26%  — the air between the dish and the words
   *   content      38%  — nearest the viewer, so it leaves first
   *
   * The push (1.06 → 1.18) is the camera closing on the plate while the copy
   * withdraws, which hands the page to the next scene without a cut.
   */
  const { progress } = usePinnedScene(sectionRef)
  const imageY = useTransform(progress, [0, 1], ['0%', '16%'])
  const imageScale = useTransform(progress, [0, 1], [1.06, 1.18])
  const scrimY = useTransform(progress, [0, 1], ['0%', '26%'])
  const contentY = useTransform(progress, [0, 1], ['0%', '38%'])
  const contentOpacity = useTransform(progress, [0, 0.62], [1, 0])
  const glowScale = useTransform(progress, [0, 1], [1, 1.45])

  // Time-dependent, so it can only be computed after mount.
  const [status, setStatus] = useState<OpenStatus | null>(null)
  useEffect(() => {
    const tick = () => setStatus(getOpenStatus(language))
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [language])

  const Arrow = isAr ? ArrowLeft : ArrowRight

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
      style={{ background: 'var(--brand-ink)' }}
      aria-label={isAr ? 'باستاتا رام' : 'PASTATARAM'}
    >
      {/* ── Layer 1 · the food ───────────────────────────────── */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: imageY, scale: imageScale }}
      >
        <Image
          src={signature.image}
          alt={isAr ? signature.nameAr : signature.name}
          fill
          sizes="100vw"
          quality={82}
          className="object-cover object-center"
          priority
          fetchPriority="high"
        />
      </motion.div>

      {/*
        ── Layer 2 · light the dish, don't bury it ──────────────────────────
        Two full-frame scrims used to stack here — a 0.72→0.45→0.86 vertical
        wash plus a 0.55 radial — and together they took most of the light out
        of the photograph. The pasta read brown and flat, which is the one
        thing a restaurant hero cannot afford.

        The frame is now lit the way a plate is lit for a menu shoot: the
        centre, where the food is, stays open; the edges fall off into the
        brand's rose-black so the dish is framed rather than covered; and the
        bottom carries the weight, because that is where the page continues.
        Type legibility is bought locally, behind the words, not globally.
      */}
      <motion.div
        aria-hidden
        className="absolute inset-[-10%]"
        style={{
          y: reduce ? undefined : scrimY,
          background:
            'linear-gradient(180deg, rgba(30, 7, 19,0.58) 0%, rgba(30, 7, 19,0.10) 30%, rgba(30, 7, 19,0.22) 58%, rgba(30, 7, 19,0.90) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 78% 62% at 50% 46%, transparent 0%, transparent 42%, rgba(30, 7, 19,0.42) 100%)',
        }}
      />
      {/* A single rose bloom — the brand colour entering the frame */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] h-[46vh] w-[46vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
        style={{
          scale: reduce ? undefined : glowScale,
          background: 'radial-gradient(circle, rgba(253,101,125,0.30) 0%, transparent 68%)',
        }}
      />

      {/* ── Layer 3 · ambient motes ──────────────────────────── */}
      <AmbientParticles density={30} />

      {/* ── Layer 4 · content ────────────────────────────────── */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {/*
          The only place the photograph is darkened on purpose: a soft pool of
          shade sitting under the words, wide and blurred enough that it reads
          as light falling off rather than a panel behind the type.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[128%] w-[132%] -translate-x-1/2 -translate-y-1/2 blur-2xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(30, 7, 19,0.66) 0%, rgba(30, 7, 19,0.34) 52%, transparent 76%)',
          }}
        />
        <motion.div
          initial={reduce ? { opacity: 1, y: 0, x: 0, scale: 1, scaleX: 1 } : { opacity: 0, scale: 0.92, y: 18 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mb-5 h-28 w-28 md:h-36 md:w-36"
        >
          <Image
            src="/images/logo-icon.png"
            alt=""
            fill
            sizes="144px"
            className="object-contain drop-shadow-[0_8px_30px_rgba(253,101,125,0.4)]"
            priority
          />
        </motion.div>

        <motion.h1
          initial={reduce ? { opacity: 1, y: 0, x: 0, scale: 1, scaleX: 1 } : { opacity: 0, y: 24 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="logo-text display-xl font-black text-brand-cream"
        >
          PASTATARAM
        </motion.h1>

        <motion.p
          initial={reduce ? { opacity: 1, y: 0, x: 0, scale: 1, scaleX: 1 } : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-4 max-w-xl text-balance text-base leading-8 text-brand-cream-soft md:text-lg"
        >
          {isAr ? cmsContent.heroTitleAr : cmsContent.heroTitle}
        </motion.p>

        {/* Gold hairline */}
        <motion.div
          initial={reduce ? { opacity: 1, y: 0, x: 0, scale: 1, scaleX: 1 } : { scaleX: 0 }}
          animate={reduce ? undefined : { scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto my-7 h-px w-28"
          style={{ background: 'linear-gradient(90deg, transparent, #E7C6A4, transparent)' }}
          aria-hidden
        />

        {/* Featured dish — name and live price, never hardcoded */}
        <motion.div
          initial={reduce ? { opacity: 1, y: 0, x: 0, scale: 1, scaleX: 1 } : { opacity: 0, y: 18 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-8 inline-flex items-center gap-3 rounded-full py-2 ps-2 pe-5"
          style={{ background: 'rgba(82, 22, 47,0.72)', border: '1px solid rgba(253,101,125,0.32)', backdropFilter: 'blur(14px)' }}
        >
          <span className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={signature.image}
              alt=""
              fill
              sizes="40px"
              className="object-cover"
            />
          </span>
          <span className="text-start">
            <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-brand-rose">
              {isAr ? 'طبق التوقيع' : 'Signature'}
            </span>
            <span className="block text-sm font-bold text-brand-cream">
              {isAr ? signature.nameAr : signature.name}
              <span className="ms-2 text-brand-champagne">
                {signature.price} {isAr ? 'ر.س' : 'SAR'}
              </span>
            </span>
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={reduce ? { opacity: 1, y: 0, x: 0, scale: 1, scaleX: 1 } : { opacity: 0, y: 18 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/menu"
            className="btn-primary inline-flex w-full items-center justify-center gap-2 py-3.5 text-base sm:w-auto"
          >
            {isAr ? 'اطلب الآن' : 'Order Now'}
            <Arrow className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="#signature"
            className="btn-secondary inline-flex w-full items-center justify-center py-3.5 text-base sm:w-auto"
          >
            {isAr ? 'استكشف القائمة' : 'Explore the Menu'}
          </Link>
        </motion.div>

        {/* Location + hours + live open state */}
        <motion.div
          initial={reduce ? { opacity: 1, y: 0, x: 0, scale: 1, scaleX: 1 } : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-brand-cream-dim"
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-brand-rose" aria-hidden />
            {isAr
              ? `جدة · ${branches.map((b) => b.nameAr.replace('جدة - ', '')).join(' · ')}`
              : `Jeddah · ${branches.map((b) => b.nameEn.replace('Jeddah - ', '')).join(' · ')}`}
          </span>
          <span aria-hidden className="text-brand-line">|</span>
          <span>{isAr ? workingHours.ar : workingHours.en}</span>
          {status && (
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-bold"
              style={{
                background: status.open ? 'rgba(34,77,46,0.45)' : 'rgba(196,62,87,0.24)',
                color: status.open ? '#7FD89A' : '#FFB3BF',
              }}
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: status.open ? '#4FCB6F' : '#C0566A' }}
              />
              {status.label}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.a
        href="#signature"
        aria-label={isAr ? 'تابع إلى طبق التوقيع' : 'Continue to the signature dish'}
        initial={reduce ? { opacity: 1, y: 0, x: 0, scale: 1, scaleX: 1 } : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 rounded-full p-2 text-brand-cream-dim transition-colors hover:text-brand-rose"
      >
        <motion.span
          className="block"
          animate={reduce ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  )
}
