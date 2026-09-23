'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'
import { useCinematicMotion, useCoarsePointer } from './primitives'

interface ParallaxLayerProps {
  /** Scene progress, 0 → 1, from `useScrollScene`. */
  progress: MotionValue<number>
  children: React.ReactNode
  className?: string
  /**
   * Vertical travel across the whole scene, in percent of the layer's height.
   * Negative moves up. A background wants a small number, a foreground a
   * larger one — the gap between them is the depth.
   */
  travel?: number
  /** Scale across the scene, e.g. [1, 1.08] for a slow camera push. */
  scale?: [number, number]
  /** Opacity across the scene. */
  fade?: [number, number]
  style?: React.CSSProperties
}

/**
 * One plane of a scene, moving at its own rate as the section crosses the
 * viewport.
 *
 * Depth on a flat screen is only ever the difference between two rates: if
 * every layer travels the same distance the image is a sticker, and if they
 * travel different distances the eye reads the slower one as further away.
 * So the useful parameter is not how much a layer moves but how much less it
 * moves than the one in front of it.
 *
 * Phones get 45% of the desktop travel. The effect still reads, but the
 * compositor moves a fraction of the pixels, and a short viewport magnifies
 * any vertical drift into something that looks like a layout bug.
 */
export default function ParallaxLayer({
  progress,
  children,
  className = '',
  travel = 10,
  scale,
  fade,
  style,
}: ParallaxLayerProps) {
  const cinematic = useCinematicMotion()
  const coarse = useCoarsePointer()
  const factor = coarse ? 0.45 : 1

  const y = useTransform(progress, [0, 1], [`${-travel * factor}%`, `${travel * factor}%`])
  const s = useTransform(progress, [0, 1], scale ?? [1, 1])
  const o = useTransform(progress, [0, 0.5, 1], fade ? [fade[0], fade[1], fade[0]] : [1, 1, 1])

  if (!cinematic) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      style={{ ...style, y, scale: scale ? s : undefined, opacity: fade ? o : undefined }}
    >
      {children}
    </motion.div>
  )
}
