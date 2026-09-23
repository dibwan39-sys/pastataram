'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'
import { useCinematicMotion, useCoarsePointer } from './primitives'

interface AmbientGlowProps {
  className?: string
  /** Rose by default; pass a channel triplet to use another brand colour. */
  rgb?: string
  /** Peak opacity at the middle of the scene. */
  intensity?: number
  /** Scene progress — the light rises as the scene arrives and falls as it goes. */
  progress?: MotionValue<number>
  /** Seconds for one breath. Long on purpose. */
  breath?: number
  style?: React.CSSProperties
}

/**
 * A single source of rose light in a scene.
 *
 * Lighting is doing the work that a gradient panel would otherwise do badly:
 * it gives a dark section a centre and a falloff, so the eye knows where to
 * land without anything being outlined. Tied to scene progress, it also does
 * something a static gradient cannot — the room brightens as you walk into it
 * and dims as you leave, which is most of why the page reads as continuous.
 *
 * The breathing is 14 seconds by default and moves opacity by a few percent.
 * Anything faster stops reading as light and starts reading as a pulse, which
 * belongs to a different kind of website entirely.
 *
 * It is a blurred radial gradient on its own composited layer: no repaint, no
 * layout, and `pointer-events: none` so it never intercepts a tap.
 */
export default function AmbientGlow({
  className = '',
  rgb = 'var(--rose-rgb)',
  intensity = 0.3,
  progress,
  breath = 14,
  style,
}: AmbientGlowProps) {
  const cinematic = useCinematicMotion()
  const coarse = useCoarsePointer()

  const peak = intensity * (coarse ? 0.75 : 1)
  const fallback = useTransform(() => peak)
  const tied = useTransform(progress ?? fallback, [0, 0.5, 1], [peak * 0.35, peak, peak * 0.35])

  const background = `radial-gradient(circle, rgba(${rgb}, 1) 0%, rgba(${rgb}, 0.45) 38%, transparent 70%)`

  if (!cinematic) {
    return (
      <div
        aria-hidden
        className={`pointer-events-none absolute ${className}`}
        style={{ ...style, background, opacity: peak * 0.8 }}
      />
    )
  }

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{ ...style, background, opacity: progress ? tied : peak }}
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: breath, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
