'use client'

import { useCallback, useRef } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useCinematicMotion, useCoarsePointer } from './primitives'

interface DepthCardProps {
  children: React.ReactNode
  className?: string
  /** Maximum tilt in degrees. Kept tiny on purpose — see the note below. */
  maxTilt?: number
  /** How far the content floats toward the viewer, in px. */
  lift?: number
  /** Perspective distance. Larger reads flatter and more expensive-looking. */
  perspective?: number
}

/**
 * A card that responds to the pointer as a physical object.
 *
 * The tilt is deliberately at the edge of perception: ±3° of rotation and a
 * 22px lift. The aim is that the customer feels the card has a surface and a
 * thickness, not that they notice it rotating — a card that visibly spins
 * under the cursor reads as a gaming UI, which is the one thing this must not
 * look like. What sells the depth is not the angle but the fact that the
 * photograph and the copy sit on different planes while it moves.
 *
 * It is off entirely on touch and coarse pointers: there is no hover on a
 * phone, a tilt that fires on tap is noise, and the transform would cost a
 * compositor layer for no benefit. It is off under `prefers-reduced-motion`.
 *
 * The pointer handler writes MotionValues directly and never sets state, so
 * moving the mouse across a twelve-card menu does not re-render anything.
 * `getBoundingClientRect` is read once per enter, not per move.
 */
export default function DepthCard({
  children,
  className = '',
  maxTilt = 3,
  lift = 22,
  perspective = 1200,
}: DepthCardProps) {
  const cinematic = useCinematicMotion()
  const coarse = useCoarsePointer()
  const enabled = cinematic && !coarse

  const box = useRef<DOMRect | null>(null)
  const px = useSpring(0, { stiffness: 220, damping: 24, mass: 0.4 })
  const py = useSpring(0, { stiffness: 220, damping: 24, mass: 0.4 })

  const rotateY = useTransform(px, [-0.5, 0.5], [-maxTilt, maxTilt])
  const rotateX = useTransform(py, [-0.5, 0.5], [maxTilt, -maxTilt])
  const z = useTransform(px, (v) => Math.abs(v) * lift)

  const onEnter = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    box.current = e.currentTarget.getBoundingClientRect()
  }, [])

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const r = box.current
      if (!r) return
      px.set((e.clientX - r.left) / r.width - 0.5)
      py.set((e.clientY - r.top) / r.height - 0.5)
    },
    [px, py],
  )

  const onLeave = useCallback(() => {
    px.set(0)
    py.set(0)
    box.current = null
  }, [px, py])

  if (!enabled) return <div className={className}>{children}</div>

  return (
    <div className={className} style={{ perspective }}>
      <motion.div
        onPointerEnter={onEnter}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, z, transformStyle: 'preserve-3d' }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
