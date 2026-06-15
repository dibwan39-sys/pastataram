'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn, ZoomOut, X, Maximize2, RotateCcw, Download, Share2, BookOpen } from 'lucide-react'
import toast from 'react-hot-toast'
import { useUIStore } from '@/lib/store'

const MENU_IMAGE = '/images/menu.png'
const MIN_ZOOM = 1
const MAX_ZOOM = 5

interface MenuImageSectionProps {
  /** Show the "المنيو الكاملة" heading block above the image (default true). */
  showHeading?: boolean
  /** Compact spacing for top-of-page placement (default false). */
  compact?: boolean
}

/**
 * Full official menu image in a premium glassmorphism card with click-to-zoom
 * (pinch / wheel / double-tap), plus download & share actions.
 * Purely additive — does not affect the interactive ordering system.
 */
export default function MenuImageSection({ showHeading = true, compact = false }: MenuImageSectionProps) {
  const { language } = useUIStore()
  const isAr = language === 'ar'

  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map())
  const lastPan = useRef<{ x: number; y: number } | null>(null)
  const pinchStart = useRef<{ dist: number; zoom: number } | null>(null)
  const lastTap = useRef(0)

  useEffect(() => setMounted(true), [])

  const reset = useCallback(() => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    reset()
  }, [reset])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(MAX_ZOOM, z + 0.5))
      if (e.key === '-') setZoom((z) => Math.max(MIN_ZOOM, z - 0.5))
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  const clampOffset = (next: { x: number; y: number }, z: number) => {
    const max = 400 * (z - 1)
    return { x: Math.max(-max, Math.min(max, next.x)), y: Math.max(-max, Math.min(max, next.y)) }
  }

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY < 0 ? 0.3 : -0.3
    setZoom((z) => {
      const nz = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z + delta))
      if (nz === 1) setOffset({ x: 0, y: 0 })
      return nz
    })
  }

  const onPointerDown = (e: React.PointerEvent) => {
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values())
      pinchStart.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), zoom }
    } else {
      lastPan.current = { x: e.clientX, y: e.clientY }
      const now = Date.now()
      if (now - lastTap.current < 300) {
        setZoom((z) => {
          const nz = z > 1 ? 1 : 2.5
          if (nz === 1) setOffset({ x: 0, y: 0 })
          return nz
        })
      }
      lastTap.current = now
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = Array.from(pointers.current.values())
      const dist = Math.hypot(a.x - b.x, a.y - b.y)
      const nz = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, pinchStart.current.zoom * (dist / pinchStart.current.dist)))
      setZoom(nz)
      if (nz === 1) setOffset({ x: 0, y: 0 })
      return
    }
    if (pointers.current.size === 1 && zoom > 1 && lastPan.current) {
      const dx = e.clientX - lastPan.current.x
      const dy = e.clientY - lastPan.current.y
      lastPan.current = { x: e.clientX, y: e.clientY }
      setOffset((o) => clampOffset({ x: o.x + dx, y: o.y + dy }, zoom))
    }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinchStart.current = null
    if (pointers.current.size === 0) lastPan.current = null
  }

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}${MENU_IMAGE}` : MENU_IMAGE
    const shareData = {
      title: isAr ? 'منيو باستاتا رام' : 'PASTATARAM Menu',
      text: isAr ? 'تصفح منيو باستاتا رام الكامل' : 'Check out the full PASTATARAM menu',
      url,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url)
        toast.success(isAr ? 'تم نسخ رابط المنيو' : 'Menu link copied')
      }
    } catch {
      /* user cancelled share — no-op */
    }
  }

  return (
    <section
      className={compact ? 'pt-6 pb-12' : 'section'}
      style={{ background: 'linear-gradient(180deg, #211C19 0%, #14110F 100%)' }}
    >
      <div className={`${compact ? 'max-w-3xl' : 'max-w-4xl'} mx-auto px-4 sm:px-6`}>
        {/* Heading */}
        {showHeading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.22em] mb-3" style={{ color: '#7B1E2B' }}>
              <BookOpen className="w-3.5 h-3.5" />
              {isAr ? 'المنيو الكاملة' : 'Full Menu'}
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: '#F2E8DA' }}>
              {isAr ? 'المنيو الكاملة' : 'The Complete Menu'}
            </h2>
            <p className="text-sm md:text-base mb-4" style={{ color: 'rgba(201,187,168,0.7)' }}>
              {isAr ? 'منيو باستاتا رام الرسمي بالكامل والأسعار' : 'The official PASTATARAM menu & prices'}
            </p>
            <div className="w-10 h-0.5 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #7B1E2B, #D8A24A)' }} />
          </motion.div>
        )}

        {/* Glassmorphism image card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl p-3 sm:p-5"
          style={{
            background: 'linear-gradient(145deg, rgba(33,28,25,0.96) 0%, rgba(33,28,25,0.35) 100%)',
            border: '1px solid rgba(184,115,51,0.32)',
            boxShadow: '0 18px 60px rgba(123,30,43,0.2)',
          }}
        >
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.008 }}
            whileTap={{ scale: 0.992 }}
            className="group relative block w-full overflow-hidden rounded-2xl cursor-zoom-in"
            style={{ border: '1px solid rgba(184,115,51,0.25)', boxShadow: '0 8px 30px rgba(123,30,43,0.14)' }}
            aria-label={isAr ? 'تكبير المنيو' : 'Zoom menu'}
          >
            <img
              src={MENU_IMAGE}
              alt={isAr ? 'منيو باستاتا رام الكامل' : 'PASTATARAM full menu'}
              className="w-full h-auto object-contain bg-[#1A1614] transition-transform duration-500 group-hover:scale-[1.015]"
            />
            <span
              className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold"
              style={{ background: 'rgba(252,220,235,0.92)', border: '1px solid rgba(184,115,51,0.4)', color: '#C9BBA8', boxShadow: '0 4px 16px rgba(123,30,43,0.22)' }}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              {isAr ? 'اضغط للتكبير' : 'Tap to zoom'}
            </span>
          </motion.button>
        </motion.div>

        {/* Download + Share */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
        >
          <motion.a
            href={MENU_IMAGE}
            download="PASTATARAM-Menu.png"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white text-sm"
            style={{ background: 'linear-gradient(135deg, #7B1E2B 0%, #B87333 60%, #D8A24A 100%)', boxShadow: '0 8px 28px rgba(123,30,43,0.4)' }}
          >
            <Download className="w-4 h-4" />
            {isAr ? 'تحميل المنيو' : 'Download Menu'}
          </motion.a>
          <motion.button
            type="button"
            onClick={handleShare}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm"
            style={{ background: 'rgba(33,28,25,0.7)', border: '1.5px solid rgba(184,115,51,0.5)', color: '#C9BBA8' }}
          >
            <Share2 className="w-4 h-4" />
            {isAr ? 'مشاركة المنيو' : 'Share Menu'}
          </motion.button>
        </motion.div>
      </div>

      {/* Fullscreen zoom modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[200] flex items-center justify-center"
                style={{ background: 'rgba(15,13,11,0.92)', backdropFilter: 'blur(8px)' }}
                onClick={close}
              >
                {/* Toolbar */}
                <div
                  className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-2 rounded-full"
                  style={{ background: 'rgba(20,17,15,0.95)', border: '1px solid rgba(184,115,51,0.4)', boxShadow: '0 6px 24px rgba(0,0,0,0.3)' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button aria-label="zoom out" onClick={() => setZoom((z) => { const nz = Math.max(MIN_ZOOM, z - 0.5); if (nz === 1) setOffset({ x: 0, y: 0 }); return nz })} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[rgba(184,115,51,0.18)]" style={{ color: '#C9BBA8' }}>
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <span className="text-xs font-bold tabular-nums w-12 text-center" style={{ color: '#C9BBA8' }}>{Math.round(zoom * 100)}%</span>
                  <button aria-label="zoom in" onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + 0.5))} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[rgba(184,115,51,0.18)]" style={{ color: '#C9BBA8' }}>
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <button aria-label="reset" onClick={reset} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[rgba(184,115,51,0.18)]" style={{ color: '#C9BBA8' }}>
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Close */}
                <button
                  onClick={close}
                  aria-label={isAr ? 'إغلاق' : 'Close'}
                  className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                  style={{ background: 'rgba(20,17,15,0.95)', border: '1px solid rgba(184,115,51,0.4)', color: '#C9BBA8', boxShadow: '0 6px 24px rgba(0,0,0,0.3)' }}
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Zoom stage */}
                <motion.div
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full flex items-center justify-center overflow-hidden select-none"
                  style={{ touchAction: 'none' }}
                  onClick={(e) => e.stopPropagation()}
                  onWheel={onWheel}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                >
                  <img
                    src={MENU_IMAGE}
                    alt={isAr ? 'منيو باستاتا رام الكامل' : 'PASTATARAM full menu'}
                    draggable={false}
                    className="max-w-[94vw] max-h-[88vh] object-contain rounded-lg bg-[#1A1614]"
                    style={{
                      transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                      transition: pointers.current.size ? 'none' : 'transform 0.18s ease-out',
                      cursor: zoom > 1 ? 'grab' : 'zoom-in',
                      boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
                    }}
                  />
                </motion.div>

                <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-medium pointer-events-none" style={{ color: 'rgba(20,17,15,0.7)' }}>
                  {isAr ? 'قرّب بإصبعين أو اضغط مرتين للتكبير' : 'Pinch or double-tap to zoom'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  )
}
