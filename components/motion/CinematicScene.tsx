'use client'

import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import { useCinematicMotion, useCoarsePointer, useEntryScene, useScrollScene } from './primitives'

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
 *   arriving — the scene opens from its leading edge via `clip-path`, which
 *              is what makes it read as a new shot arriving rather than a
 *              block fading in.
 *   leaving  — the scene recedes into shadow, so the section above reads as
 *              further away rather than simply scrolled past.
 *
 * Neither touches the layout box. That is the whole discipline of this file:
 * a scale would have been the obvious way to express both, and it is wrong in
 * both directions — shrinking on exit opens a seam between two scenes, and
 * growing on entry overflows the page. Arrive by clip, depart by light.
 *
 * `clip-path` and `opacity` are both composited, so this costs the GPU a layer
 * and the main thread nothing. On phones the clip is dropped and only the
 * recede survives at half strength: a clip animation on a full-height section
 * is the most expensive thing on this page, and on a short viewport the effect
 * is mostly off-screen anyway.
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

  /**
   * Two clocks, because arrival and departure happen in different places.
   *
   * `entry` runs while the scene's leading edge crosses the viewport, which is
   * the only span where a reveal can be seen at all. Mapping it onto the first
   * fifth of `progress` put the whole reveal one viewport BELOW the fold:
   * measured on the built site, the clip and the settle never once left their
   * resting values. `progress` spans the entire crossing and carries the exit.
   *
   * The exit deliberately does NOT scale, and that is a correctness decision
   * rather than a taste one. A transform does not change layout, so shrinking
   * a section lifts its bottom edge while the next section stays where it was
   * — measured in a real browser, that opened a 47px band of bare background
   * between consecutive scenes at 1440x900 and 22px at 390x844. A visible seam
   * between two shots is the opposite of continuity.
   *
   * Nor does the entry scale any more. Settling a full-width scene from 1.045
   * put every one of them wider than the viewport on the way in, and measured
   * at all five breakpoints that showed up as real horizontal overflow. The
   * clip is what reads as a new shot arriving; the scale was adding a few
   * percent of motion and a page-wide defect.
   *
   * So the grammar is: arrive by clip, depart by light. Neither touches the
   * box, so no seam can open between two scenes and nothing can overflow.
   */
  const entry = useEntryScene(ref)
  const opacity = useTransform(progress, [0, 0.12, 0.78, 1], [0.35, 1, 1, 1 - 0.45 * strength])
  const clip = useTransform(entry, [0.3, 0.92], [15, 0], { clamp: true })
  const clipPath = useTransform(clip, (v) => `inset(${v}% 0% 0% 0%)`)

  /**
   * One element, always.
   *
   * This used to return a plain <div> before hydration and a <motion.div>
   * after, which looked harmless and was not: Framer measures a scroll target
   * once, against the tree that existed when the hook first ran. Swapping the
   * element underneath it left every scene reporting a progress of exactly
   * 1.000 at every scroll position — geometry moving from top:1806 to
   * top:-1194 while the reveal and the settle never left their resting values.
   *
   * The element is now stable from the first render and only the styles are
   * conditional, so the measurement stays valid.
   */
  return (
    <motion.div
      id={id}
      ref={ref}
      className={className}
      style={
        cinematic
          ? {
              // `position: relative` is load-bearing: Framer resolves a scroll
              // target against its nearest positioned ancestor.
              position: 'relative',
              ...style,
              opacity,
              clipPath: reveal && !coarse ? clipPath : undefined,
              transformOrigin: 'center top',
            }
          : { position: 'relative', ...style }
      }
    >
      {children}
    </motion.div>
  )
}
