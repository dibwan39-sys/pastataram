'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn, ZoomOut, X, Maximize2, RotateCcw } from 'lucide-react'

interface MenuLightboxProps {
  src: string
  alt: string
  /** Optional caption shown beneath the preview image */
  caption?: string
  /** Extra classes for the preview wrapper */
  className?: string
  /** Hint label rendered over the preview (e.g. "اضغط للتكبير") */
  hint?: string
}

const MIN_ZOOM = 1
const MAX_ZOOM = 5

/**
 * Premium clickable menu image with a fullscreen, zoomable lightbox.
 * - Click / tap the preview to open the fullscreen modal.
 * - Desktop: scroll wheel to zoom, drag to pan, double-click to toggle zoom.
 * - Mobile: pinch to zoom, drag to pan, double-tap to toggle zoom.
 * - ESC or backdrop click to close. Body scroll locks while open.
 */
export default function MenuLightbox({ src, alt, caption, className = '', hint }: MenuLightboxProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  // pointer / gesture tracking
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

  // lock body scroll + ESC handler while open
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

  const clampOffset = useCallback((next: { x: number; y: number }, z: number) => {
    // keep pan within reasonable bounds relative to zoom
    const max = 400 * (z - 1)
    return {
      x: Math.max(-max, Math.min(max, next.x)),
      y: Math.max(-max, Math.min(max, next.y)),
    }
  }, [])

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
      // double-tap / double-click toggle
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

    // pinch zoom
    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = Array.from(pointers.current.values())
      const dist = Math.hypot(a.x - b.x, a.y - b.y)
      const ratio = dist / pinchStart.current.dist
      const nz = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, pinchStart.current.zoom * ratio))
      setZoom(nz)
      if (nz === 1) setOffset({ x: 0, y: 0 })
      return
    }

    // single-pointer pan (only when zoomed in)
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

  return (
    <>
      {/* ── Preview (clickable) ── */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.012 }}
        whileTap={{ scale: 0.99 }}
        className={`group relative block w-full overflow-hidden rounded-3xl cursor-zoom-in ${className}`}
        style={{
          border: '1px solid rgba(196,134,154,0.32)',
          boxShadow: '0 14px 50px rgba(160,69,94,0.18)',
          background: 'linear-gradient(145deg, rgba(252,238,244,0.6), rgba(248,215,226,0.4))',
        }}
        aria-label={alt}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        {/* soft top + bottom sheen */}
        <span
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(252,238,244,0.10) 0%, transparent 18%, transparent 82%, rgba(160,69,94,0.12) 100%)' }}
        />
        {/* zoom hint chip */}
        <span
          className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: 'rgba(252,220,235,0.92)',
            border: '1px solid rgba(196,134,154,0.4)',
            color: '#7A3050',
            boxShadow: '0 4px 16px rgba(160,69,94,0.22)',
          }}
        >
          <Maximize2 className="w-3.5 h-3.5" />
          {hint ?? 'اضغط للتكبير'}
        </span>
      </motion.button>

      {caption && (
        <p className="mt-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(92,47,61,0.55)' }}>
          {caption}
        </p>
      )}

      {/* ── Fullscreen lightbox ── */}
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
                style={{ background: 'rgba(43,31,48,0.92)', backdropFilter: 'blur(8px)' }}
                onClick={close}
              >
                {/* Toolbar */}
                <div
                  className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-2 rounded-full"
                  style={{ background: 'rgba(252,238,244,0.95)', border: '1px solid rgba(196,134,154,0.4)', boxShadow: '0 6px 24px rgba(0,0,0,0.3)' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ToolBtn label="تصغير" onClick={() => setZoom((z) => { const nz = Math.max(MIN_ZOOM, z - 0.5); if (nz === 1) setOffset({ x: 0, y: 0 }); return nz })}>
                    <ZoomOut className="w-5 h-5" />
                  </ToolBtn>
                  <span className="text-xs font-bold tabular-nums w-12 text-center" style={{ color: '#7A3050' }}>
                    {Math.round(zoom * 100)}%
                  </span>
                  <ToolBtn label="تكبير" onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + 0.5))}>
                    <ZoomIn className="w-5 h-5" />
                  </ToolBtn>
                  <ToolBtn label="إعادة" onClick={reset}>
                    <RotateCcw className="w-4 h-4" />
                  </ToolBtn>
                </div>

                {/* Close */}
                <button
                  onClick={close}
                  aria-label="إغلاق"
                  className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                  style={{ background: 'rgba(252,238,244,0.95)', border: '1px solid rgba(196,134,154,0.4)', color: '#7A3050', boxShadow: '0 6px 24px rgba(0,0,0,0.3)' }}
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
                    src={src}
                    alt={alt}
                    draggable={false}
                    className="max-w-[94vw] max-h-[88vh] object-contain rounded-lg"
                    style={{
                      transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                      transition: pointers.current.size ? 'none' : 'transform 0.18s ease-out',
                      cursor: zoom > 1 ? 'grab' : 'zoom-in',
                      boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
                    }}
                  />
                </motion.div>

                {/* Mobile hint */}
                <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-medium pointer-events-none" style={{ color: 'rgba(252,238,244,0.7)' }}>
                  قرّب بإصبعين أو اضغط مرتين للتكبير
                </p>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}

function ToolBtn({ children, onClick, label }: { children: React.ReactNode; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-[rgba(196,134,154,0.18)]"
      style={{ color: '#7A3050' }}
    >
      {children}
    </button>
  )
}
