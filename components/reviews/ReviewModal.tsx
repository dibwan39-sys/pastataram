'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, MessageCircle, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { branches, cmsContent } from '@/lib/data'
import { getWhatsAppLink } from '@/lib/utils'
import { useUIStore } from '@/lib/store'
import { StarInput } from './StarRating'

/**
 * "شاركنا تجربتك" — the customer review form.
 *
 * ── Where a submitted review actually goes ──────────────────────────────
 * This project has no review backend: nothing stores a review, nothing
 * moderates one, and nothing publishes one. The previous form appended the
 * review to local component state and told the customer it would be reviewed
 * shortly — it was discarded on the next render and no one ever saw it.
 *
 * Rather than repeat that, the form sends the review to the restaurant over
 * WhatsApp, the same channel that already carries every order. That is a real
 * delivery the customer can see happen, so the confirmation can say what
 * genuinely occurred: the review was SENT. It never claims the review was
 * saved, approved or published, because none of those things happen yet.
 *
 * To publish reviews on the site, a store and a moderation step are required —
 * the implementation report lists what the backend needs to expose.
 */
export default function ReviewModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const language = useUIStore((s) => s.language)
  const isAr = language === 'ar'
  const reduce = useReducedMotion()
  const panelRef = useRef<HTMLDivElement | null>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const titleId = useId()

  const [name, setName] = useState('')
  const [branchId, setBranchId] = useState<number>(branches[0].id)
  const [overall, setOverall] = useState(0)
  const [food, setFood] = useState(0)
  const [service, setService] = useState(0)
  const [cleanliness, setCleanliness] = useState(0)
  const [atmosphere, setAtmosphere] = useState(0)
  const [comment, setComment] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => setMounted(true), [])

  const reset = useCallback(() => {
    setName(''); setBranchId(branches[0].id); setOverall(0)
    setFood(0); setService(0); setCleanliness(0); setAtmosphere(0)
    setComment(''); setSent(false)
  }, [])

  const close = useCallback(() => {
    onClose()
    // Let the exit animation finish before clearing the fields.
    window.setTimeout(reset, 300)
  }, [onClose, reset])

  // Dialog behaviour: scroll lock, focus trap, Escape, focus restore.
  useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement as HTMLElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([type="radio"]), input[type="radio"]:checked, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((el) => el.offsetParent !== null || el.tagName === 'INPUT')

    const t = window.setTimeout(() => focusables()[0]?.focus(), 60)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); return }
      if (e.key !== 'Tab') return
      const items = focusables()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(t)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      previouslyFocused.current?.focus?.()
    }
  }, [open, close])

  const buildMessage = () => {
    const branch = branches.find((b) => b.id === branchId)!
    const aspect = (labelAr: string, labelEn: string, v: number) =>
      v > 0 ? `${isAr ? labelAr : labelEn}: ${v}/5` : null

    return [
      isAr ? '⭐ تقييم عميل — PASTATARAM' : '⭐ Customer review — PASTATARAM',
      '',
      `${isAr ? 'الاسم' : 'Name'}: ${name}`,
      `${isAr ? 'الفرع' : 'Branch'}: ${isAr ? `${branch.nameAr} — ${branch.detailAr}` : `${branch.nameEn} — ${branch.detailEn}`}`,
      `${isAr ? 'التقييم العام' : 'Overall'}: ${overall}/5`,
      '',
      aspect('الطعام', 'Food', food),
      aspect('الخدمة', 'Service', service),
      aspect('النظافة', 'Cleanliness', cleanliness),
      aspect('الأجواء', 'Atmosphere', atmosphere),
      '',
      `${isAr ? 'التجربة' : 'Experience'}:`,
      comment,
    ].filter((l) => l !== null).join('\n')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error(isAr ? 'يرجى كتابة اسمك' : 'Please enter your name')
      return
    }
    if (overall === 0) {
      toast.error(isAr ? 'يرجى اختيار التقييم العام' : 'Please choose an overall rating')
      return
    }
    if (!comment.trim()) {
      toast.error(isAr ? 'يرجى كتابة تجربتك' : 'Please describe your experience')
      return
    }

    window.open(getWhatsAppLink(cmsContent.whatsappNumber, buildMessage()), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  if (!mounted) return null

  const inputCls =
    'w-full rounded-xl px-4 py-3 text-brand-cream placeholder-brand-muted transition-colors focus:outline-none focus:border-brand-rose'
  const inputStyle = { background: 'rgba(58, 27, 42,0.7)', border: '1px solid rgba(231,198,164,0.26)' }

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[90]"
            style={{ background: 'rgba(22, 7, 13,0.8)', backdropFilter: 'blur(6px)' }}
            aria-hidden
          />

          <div className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center sm:p-6">
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] p-6 sm:rounded-[2rem] sm:p-8"
              style={{
                background: 'linear-gradient(160deg, var(--brand-surface) 0%, var(--brand-noir) 100%)',
                border: '1px solid rgba(231,198,164,0.18)',
                boxShadow: '0 30px 90px rgba(0,0,0,0.65)',
              }}
            >
              <button
                type="button" onClick={close}
                aria-label={isAr ? 'إغلاق' : 'Close'}
                className="absolute end-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-brand-cream-dim transition-colors hover:bg-white/10 hover:text-brand-cream"
              >
                <X className="h-4.5 w-4.5" aria-hidden />
              </button>

              {sent ? (
                /* ── Confirmation — states only what actually happened ── */
                <div className="py-8 text-center">
                  <motion.span
                    initial={reduce ? undefined : { scale: 0 }}
                    animate={reduce ? undefined : { scale: 1 }}
                    transition={{ type: 'spring', damping: 18, delay: 0.1 }}
                    className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ background: 'linear-gradient(135deg, #C43E57, #FD657D)' }}
                  >
                    <Check className="h-8 w-8 text-white" aria-hidden />
                  </motion.span>
                  <h2 id={titleId} className="font-display text-2xl font-bold text-brand-cream">
                    {isAr ? 'شكرًا لمشاركتنا تجربتك.' : 'Thank you for sharing your experience.'}
                  </h2>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-brand-cream-dim">
                    {isAr
                      ? 'تم فتح واتساب لإرسال تجربتك إلى فريق باستاتا رام. سنقرأها بأنفسنا.'
                      : 'WhatsApp has opened so you can send your experience to the PASTATARAM team. We read every one ourselves.'}
                  </p>
                  {/* No claim of publication — nothing publishes reviews yet. */}
                  <button type="button" onClick={close} className="btn-primary mt-7 px-8 py-3 text-sm">
                    {isAr ? 'تم' : 'Done'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="eyebrow">{isAr ? 'تجربتك تهمنا' : 'Your experience matters'}</span>
                    <h2 id={titleId} className="mt-2 font-display text-2xl font-bold text-brand-cream">
                      {isAr ? 'شاركنا تجربتك' : 'Share your experience'}
                    </h2>
                  </div>

                  <div>
                    <label htmlFor="rv-name" className="mb-2 block text-sm font-semibold text-brand-cream-soft">
                      {isAr ? 'الاسم' : 'Name'} <span className="text-brand-rose">*</span>
                    </label>
                    <input
                      id="rv-name" required value={name} onChange={(e) => setName(e.target.value)}
                      placeholder={isAr ? 'اسمك الكريم' : 'Your name'}
                      className={inputCls} style={inputStyle}
                    />
                  </div>

                  <div>
                    <label htmlFor="rv-branch" className="mb-2 block text-sm font-semibold text-brand-cream-soft">
                      {isAr ? 'الفرع' : 'Branch'} <span className="text-brand-rose">*</span>
                    </label>
                    {/* Options come from lib/data.ts — the two operating branches. */}
                    <select
                      id="rv-branch" value={branchId} onChange={(e) => setBranchId(Number(e.target.value))}
                      className={inputCls} style={inputStyle}
                    >
                      {branches.map((b) => (
                        <option key={b.id} value={b.id} style={{ background: 'var(--brand-surface)' }}>
                          {isAr ? b.nameAr : b.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <StarInput
                    name="overall" value={overall} onChange={setOverall}
                    label={`${isAr ? 'التقييم العام' : 'Overall rating'} *`}
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <StarInput name="food" value={food} onChange={setFood} size={20} label={isAr ? 'الطعام' : 'Food'} />
                    <StarInput name="service" value={service} onChange={setService} size={20} label={isAr ? 'الخدمة' : 'Service'} />
                    <StarInput name="cleanliness" value={cleanliness} onChange={setCleanliness} size={20} label={isAr ? 'النظافة' : 'Cleanliness'} />
                    <StarInput name="atmosphere" value={atmosphere} onChange={setAtmosphere} size={20} label={isAr ? 'الأجواء' : 'Atmosphere'} />
                  </div>

                  <div>
                    <label htmlFor="rv-comment" className="mb-2 block text-sm font-semibold text-brand-cream-soft">
                      {isAr ? 'تجربتك' : 'Your experience'} <span className="text-brand-rose">*</span>
                    </label>
                    <textarea
                      id="rv-comment" required rows={4} value={comment} onChange={(e) => setComment(e.target.value)}
                      placeholder={isAr ? 'ما الذي أعجبك؟ وما الذي يمكننا تحسينه؟' : 'What did you enjoy? What could we do better?'}
                      className={`${inputCls} resize-none`} style={inputStyle}
                    />
                  </div>

                  <button type="submit" className="btn-primary flex w-full items-center justify-center gap-2 py-3.5 text-sm">
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    {isAr ? 'أرسل تجربتك عبر واتساب' : 'Send your review via WhatsApp'}
                  </button>

                  {/* Says plainly where it goes. No promise of publication. */}
                  <p className="text-center text-xs leading-6 text-brand-muted">
                    {isAr
                      ? 'تُرسل تجربتك مباشرة إلى فريق باستاتا رام عبر واتساب.'
                      : 'Your review is sent straight to the PASTATARAM team on WhatsApp.'}
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
