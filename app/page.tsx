'use client'

import PageWrapper from '@/components/layout/PageWrapper'
import CinematicScene from '@/components/motion/CinematicScene'
import HeroSection from '@/components/home/HeroSection'
import SignatureSection from '@/components/home/SignatureSection'
import SelectionSection from '@/components/home/SelectionSection'
import MenuPreview from '@/components/home/MenuPreview'
import QROrderSection from '@/components/menu/QROrderSection'
import BuildTeaser from '@/components/home/BuildTeaser'
import ExperienceSection from '@/components/home/ExperienceSection'
import ReviewsSection from '@/components/home/ReviewsSection'
import BranchesSection from '@/components/home/BranchesSection'
import FinalCTA from '@/components/home/FinalCTA'

/**
 * The homepage as a sequence of shots.
 *
 * Each scene below is its own component under components/home; this file does
 * nothing but order them and decide how one gives way to the next.
 *
 * The order is the customer's journey: arrive → meet the signature dish →
 * browse a curated few → see the full menu → learn you can compose your own →
 * understand the restaurant → read other guests → find the nearest branch →
 * order.
 *
 * ── Why the wrappers ────────────────────────────────────────────────────
 * The sections used to stack: one ended at full strength and the next began
 * at full strength, which reads as a list of pages rather than a film.
 * `CinematicScene` gives each one an arrival and a departure, so the eye
 * reads a continuous camera move instead of a cut.
 *
 * The hero is deliberately NOT wrapped. It already owns four scroll-linked
 * layers of its own, and clipping the first thing a visitor sees would delay
 * the food by the length of a reveal — the opening frame has to be the dish,
 * immediately. Its own internal motion is the handoff into scene two.
 *
 * `recede` is tuned per scene rather than uniform. The scenes that carry a
 * photograph recede most, because a receding image reads as depth; the
 * utility scenes (QR, build teaser) barely move, because a control panel
 * sliding away reads as a glitch. FinalCTA does not recede at all — nothing
 * follows it, so there is nowhere for it to go.
 */
export default function HomePage() {
  return (
    <PageWrapper fullBleed>
      <HeroSection />

      <CinematicScene recede={1}>
        <SignatureSection />
      </CinematicScene>

      <CinematicScene recede={0.75}>
        <SelectionSection />
      </CinematicScene>

      <CinematicScene recede={0.6}>
        <MenuPreview />
      </CinematicScene>

      <CinematicScene recede={0.35} reveal={false}>
        <QROrderSection />
      </CinematicScene>

      <CinematicScene recede={0.35} reveal={false}>
        <BuildTeaser />
      </CinematicScene>

      <CinematicScene recede={1}>
        <ExperienceSection />
      </CinematicScene>

      <CinematicScene recede={0.7}>
        <ReviewsSection />
      </CinematicScene>

      <CinematicScene recede={0.8}>
        <BranchesSection />
      </CinematicScene>

      <CinematicScene recede={0} reveal>
        <FinalCTA />
      </CinematicScene>
    </PageWrapper>
  )
}
