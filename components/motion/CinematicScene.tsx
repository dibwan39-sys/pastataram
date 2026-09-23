'use client'

import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import { useCinematicMotion, useCoarsePointer, useScrollScene } from './primitives'

interface CinematicSceneProps {
  children: React.ReactNode
  className?: string
  /** How strongly the outgoing scene recedes. 0 disables the exit entirely. */
  recede?: number
  /** Open the scene with a clip reveal from its leading edge. */
  reveal?: boolean
  style?: React.CSSProperties
  id?: string
}

/**
 * One shot in the film.
 *
 * Sections used to stack: each one simply ended and the next one started at
 * full strength, which reads as a list of pages. A cut in a film is not a
 * list — the outgoing frame gives way while the incoming one arrives, and the
 * eye reads the two as one continuous move.
 *
 * Two things happen here, and only two, because a transition that animates
 * everything at once reads as a slideshow effect rather than a camera:
 *
 *   entering — the scene opens from its leading edge via `clip-path`, and
 *              settles from 1.04 to 1. The clip is what makes it feel like a
 *              new shot arriving rather than a block fading in.
 *   leaving  — the scene recedes: it drops a little scale and light as it
 *              goes, so the section above it reads as further away rather
 *              than simply scrolled past.
 *
 * `clip-path` and `transform` are both composited, so this costs the GPU a
 * layer and the main thread nothing. On phones the reveal is dropped and only
 * the recede survives at half strength: a clip animation on a full-height
 * section is the single most expensive thing on this page, and on a short
 * viewport the effect is mostly off-screen anyway.
 */
export default function CinematicScene({
  children,
  className = '',
  recede = 1,
  reveal = true,
  style,
  id,
}: CinematicSceneProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { progress } = useScrollScene(ref)
  const cinematic = useCinematicMotion()
  const coarse = useCoarsePointer()

  const strength = recede * (coarse ? 0.5 : 1)

  // Entry occupies the first fifth of the scene, exit the last quarter.
  const scale = useTransform(progress, [0, 0.2, 0.75, 1], [1.04, 1, 1, 1 - 0.035 * strength])
  const opacity = useTransform(progress, [0, 0.12, 0.78, 1], [0.35, 1, 1, 1 - 0.45 * strength])
  const clip = useTransform(progress, [0, 0.22], [14, 0], { clamp: true })
  const clipPath = useTransform(clip, (v) => `inset(${v}% 0% 0% 0%)`)

  if (!cinematic) {
    return (
      <div id={id} ref={ref} className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      id={id}
      ref={ref}
      className={className}
      style={{
        ...style,
        scale,
        opacity,
        clipPath: reveal && !coarse ? clipPath : undefined,
        transformOrigin: 'center top',
      }}
    >
      {children}
    </motion.div>
  )
}
