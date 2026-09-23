'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Award, Heart, Leaf, Zap } from 'lucide-react'
import { cmsContent, menuItems } from '@/lib/data'
import { useUIStore } from '@/lib/store'

/**
 * What the restaurant is like, told with a photograph and four plain claims.
 *
 * Each claim is about how PASTATARAM cooks and serves — nothing here asserts a
 * number, an award or a ranking, because the project holds no evidence for any
 * of those. The previous homepage carried no fabricated statistics either and
 * that restraint is kept.
 */
export default function ExperienceSection() {
  const language = useUIStore((s) => s.language)
  const isAr = language === 'ar'
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  // A plated dish that is not the signature, so the page does not repeat itself.
  const backdrop = menuItems.find((m) => m.id === '15') ?? menuItems[0]

  const pillars = isAr
    ? [
        { icon: Zap, title: 'سريع وطازج', desc: 'يُحضَّر عند الطلب ويصل إليك في دقائق.' },
        { icon: Leaf, title: 'مكونات مختارة', desc: 'مكوّنات نختارها بعناية لكل طبق.' },
        { icon: Award, title: 'نكهة مختلفة', desc: 'وصفات تجمع الأصالة الإيطالية بلمستنا.' },
        { icon: Heart, title: 'صُنع باهتمام', desc: 'كل طبق يخرج من مطبخنا كما نحب أن نأكله.' },
      ]
    : [
        { icon: Zap, title: 'Fast & fresh', desc: 'Cooked to order and with you in minutes.' },
        { icon: Leaf, title: 'Chosen ingredients', desc: 'Ingredients picked with care for every plate.' },
        { icon: Award, title: 'A different flavour', desc: 'Italian roots with a PASTATARAM touch.' },
        { icon: Heart, title: 'Made with attention', desc: 'Every plate leaves our kitchen the way we would want it.' },
      ]

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      aria-labelledby="experience-heading"
    >
      {/* Full-bleed photograph with a slow parallax drift */}
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y: imageY }}>
        <Image
          src={backdrop.image}
          alt=""
          fill
          sizes="100vw"
          quality={78}
          className="object-cover"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, var(--brand-noir) 0%, rgba(30, 7, 19,0.9) 22%, rgba(30, 7, 19,0.88) 78%, var(--brand-noir) 100%)' }}
      />

      <div className="section relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="eyebrow">{isAr ? 'التجربة' : 'The Experience'}</span>
          <h2 id="experience-heading" className="mt-3 font-display display-lg font-bold text-brand-cream">
            {isAr ? 'باستا تُصنع لتُعاش' : 'Pasta worth sitting down for'}
          </h2>
          <p className="mt-5 text-[15px] leading-9 text-brand-cream-dim">
            {isAr ? cmsContent.aboutTextAr : cmsContent.aboutText}
          </p>
        </motion.div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.li
                key={p.title}
                initial={reduce ? undefined : { opacity: 0, y: 26 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[1.5rem] p-6 text-center"
                style={{
                  background: 'rgba(82, 22, 47,0.7)',
                  border: '1px solid rgba(231,198,164,0.16)',
                  backdropFilter: 'blur(14px)',
                }}
              >
                <span
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: 'linear-gradient(135deg, rgba(196,62,87,0.9), rgba(253,101,125,0.9))' }}
                >
                  <Icon className="h-5 w-5 text-white" aria-hidden />
                </span>
                <h3 className="font-display text-lg font-bold text-brand-cream">{p.title}</h3>
                <p className="mt-2 text-[13px] leading-7 text-brand-cream-dim">{p.desc}</p>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
