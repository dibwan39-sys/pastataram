'use client'

import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import MobileBottomNav from './MobileBottomNav'

interface PageWrapperProps {
  children: React.ReactNode
  /**
   * Set on pages whose first section is a full-bleed hero that must sit under
   * the transparent navbar. Ordinary pages keep the top padding so their
   * content clears the fixed bar.
   */
  fullBleed?: boolean
}

export default function PageWrapper({ children, fullBleed = false }: PageWrapperProps) {
  return (
    <div className="flex min-h-screen flex-col bg-brand-noir">
      <Navbar />
      {/* `id="main"` is the skip link's target — the first tab stop on the page. */}
      <main id="main" className={`flex-1 pb-20 lg:pb-0 ${fullBleed ? '' : 'pt-20'}`}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileBottomNav />
    </div>
  )
}
