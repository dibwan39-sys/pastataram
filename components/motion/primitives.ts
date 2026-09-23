'use client'

import { useEffect, useRef, useState } from 'react'
import {
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions,
} from 'framer-motion'

/**
 * ════════════════════════════════════════════════════════════════
 *  Motion primitives
 * ════════════════════════════════════════════════════════════════
 *
 *  Three rules hold everywhere in this folder, because breaking any one of
 *  them is how a "cinematic" site becomes a slow one:
 *
 *   1. Scroll never touches React state. Everything rides MotionValues, so a
 *      scroll frame mutates a style and nothing re-renders.
 *   2. Every effect has an off switch that is checked once, not per frame:
 *      `prefers-reduced-motion`, and a coarse pointer / small screen.
 *   3. Only `transform`, `opacity`, `filter` and `clip-path` are animated.
 *      Nothing here animates a property that forces layout.
 */

/** The spring every scene shares, so the whole page decelerates alike. */
export const SCENE_SPRING: SpringOptions = { stiffness: 70, damping: 26, mass: 0.6, restDelta: 0.001 }

/**
 * True on phones, tablets and any pointer that cannot hover.
 *
 * Read once on mount and on media-query change — never inside a scroll or
 * pointer handler, where it would cost a style recalculation per frame.
 */
export function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px), (pointer: coarse)')
    const sync = () => setCoarse(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return coarse
}

/**
 * Whether rich motion should run at all: the visitor has not asked for less
 * of it, and we are past hydration so server and client agree on first paint.
 */
export function useCinematicMotion() {
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted && !reduce
}

/**
 * A section's own progress through the viewport, spring-smoothed.
 *
 * `0` as its leading edge meets the bottom of the screen, `1` as its trailing
 * edge leaves the top. The spring is what separates a camera move from a
 * scrollbar readout: raw `scrollYProgress` tracks the wheel exactly, which
 * reads mechanical, while the spring keeps moving for a beat after the finger
 * stops and so behaves like something with mass.
 */
export function useScrollScene(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const smooth = useSpring(scrollYProgress, SCENE_SPRING)
  return { raw: scrollYProgress, progress: smooth }
}

/**
 * The variant a full-height opening shot needs: progress runs from the moment
 * the section is flush with the top of the viewport until it has left it, so
 * `0` is "you have arrived" rather than "it is about to appear".
 */
export function usePinnedScene(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const smooth = useSpring(scrollYProgress, SCENE_SPRING)
  return { raw: scrollYProgress, progress: smooth }
}

/**
 * Map a scene's progress onto a range, or onto a fixed value when motion is
 * off. Keeping the branch here means a component never writes `reduce ? … : …`
 * around every transform it owns.
 */
export function useSceneRange<T extends string | number>(
  progress: MotionValue<number>,
  input: number[],
  output: T[],
  active: boolean,
  restValue?: T,
): MotionValue<T> | T {
  const mapped = useTransform(progress, input, output)
  return active ? mapped : (restValue ?? output[Math.floor(output.length / 2)])
}

/**
 * `will-change` is a promise to the compositor that costs memory for as long
 * as it is set. This applies it while an element is on screen and drops it
 * the moment it is not, which is the only honest way to use it on a long page.
 */
export function useWillChange(active: boolean) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !active) return

    const io = new IntersectionObserver(
      ([entry]) => {
        el.style.willChange = entry.isIntersecting ? 'transform, opacity' : 'auto'
      },
      { rootMargin: '10% 0px' },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      el.style.willChange = 'auto'
    }
  }, [active])

  return ref
}
