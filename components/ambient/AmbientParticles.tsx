'use client'

import { useEffect, useRef } from 'react'

interface AmbientParticlesProps {
  /** Particles at desktop width. Mobile automatically uses about a third. */
  density?: number
  className?: string
}

/**
 * A soft drift of warm rose motes behind the hero — the restaurant equivalent
 * of dust in a projector beam, not a starfield.
 *
 * Deliberately plain canvas 2D rather than WebGL: this is ambience worth a few
 * kilobytes, not a reason to add a 3D engine to a menu site. It is also
 * disciplined about when it runs at all —
 *
 *   · `prefers-reduced-motion` → never starts, and globals.css hides the layer
 *   · coarse pointer / narrow screen → a third of the particles
 *   · scrolled out of view → the animation loop stops entirely
 *   · hidden tab → the browser stops rAF for us
 *
 * It is `aria-hidden` and non-interactive, so it never reaches assistive tech
 * and never intercepts a tap meant for a button underneath.
 */
export default function AmbientParticles({ density = 34, className = '' }: AmbientParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (prefersReduced.matches) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const isCompact = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches
    const count = Math.max(8, Math.round(isCompact ? density / 3 : density))
    // Cap the backing store on high-DPI phones — 3× of a full-bleed hero is a
    // lot of pixels to repaint 60 times a second for a decorative layer.
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0
    let raf = 0
    let running = false

    type Mote = { x: number; y: number; r: number; vx: number; vy: number; a: number; tint: number }
    let motes: Mote[] = []

    const seed = () => {
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.6 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.05 - Math.random() * 0.16,
        a: 0.08 + Math.random() * 0.3,
        tint: Math.random(),
      }))
    }

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      width = rect?.width ?? window.innerWidth
      height = rect?.height ?? window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (const m of motes) {
        m.x += m.vx
        m.y += m.vy

        // Wrap rather than respawn, so density stays constant
        if (m.y < -10) { m.y = height + 10; m.x = Math.random() * width }
        if (m.x < -10) m.x = width + 10
        if (m.x > width + 10) m.x = -10

        // Rose motes with an occasional champagne one, matching the logo
        const [r, g, b] = m.tint > 0.78 ? [231, 198, 164] : [253, 101, 125]
        const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 4)
        glow.addColorStop(0, `rgba(${r},${g},${b},${m.a})`)
        glow.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.r * 4, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(draw)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    resize()

    // Only animate while the hero is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    )
    if (canvas.parentElement) io.observe(canvas.parentElement)

    const onResize = () => resize()
    window.addEventListener('resize', onResize, { passive: true })

    // If the visitor turns reduced-motion on mid-session, stop and clear.
    const onMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        stop()
        ctx.clearRect(0, 0, width, height)
      } else {
        start()
      }
    }
    prefersReduced.addEventListener('change', onMotionChange)

    return () => {
      stop()
      io.disconnect()
      window.removeEventListener('resize', onResize)
      prefersReduced.removeEventListener('change', onMotionChange)
    }
  }, [density])

  return <canvas ref={canvasRef} aria-hidden className={`ambient-layer ${className}`} />
}
