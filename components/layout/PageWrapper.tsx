'use client'

import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import MobileBottomNav from './MobileBottomNav'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream dark:bg-[#14110F]">
      <Navbar />
      <main className="flex-1 pt-20 pb-20 lg:pb-0">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileBottomNav />
    </div>
  )
}
