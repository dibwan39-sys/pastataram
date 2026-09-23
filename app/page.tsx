'use client'

import PageWrapper from '@/components/layout/PageWrapper'
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
 * The homepage as a sequence of scenes.
 *
 * It used to be one 714-line file holding six sections inline, which made any
 * change to one section a risk to the others. Each scene is now its own
 * component under components/home, and this file does nothing but order them.
 *
 * The order is the customer's journey: arrive → meet the signature dish →
 * browse a curated few → see the full menu → learn you can compose your own →
 * understand the restaurant → read other guests → find the nearest branch →
 * order.
 */
export default function HomePage() {
  return (
    <PageWrapper fullBleed>
      <HeroSection />
      <SignatureSection />
      <SelectionSection />
      <MenuPreview />
      <QROrderSection />
      <BuildTeaser />
      <ExperienceSection />
      <ReviewsSection />
      <BranchesSection />
      <FinalCTA />
    </PageWrapper>
  )
}
