'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ChefHat } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import { useUIStore } from '@/lib/store'

export default function NotFound() {
  const { language } = useUIStore()
  const isAr = language === 'ar'

  return (
    <PageWrapper>
      <section className="min-h-[80vh] flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-blush to-brand-nude flex items-center justify-center mx-auto mb-8">
            <ChefHat className="w-12 h-12 text-brand-rose-gold" />
          </div>
          <h1 className="text-8xl font-black gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-bold text-brand-espresso dark:text-brand-ivory mb-4">
            {isAr ? 'الصفحة غير موجودة' : 'Page Not Found'}
          </h2>
          <p className="text-brand-brown dark:text-brand-mocha mb-8 max-w-md mx-auto">
            {isAr
              ? 'يبدو أن هذه الصفحة طارت مع بخار الباستا! عد إلى الرئيسية.'
              : 'Looks like this page flew away with the pasta steam! Go back home.'}
          </p>
          <Link href="/" className="btn-primary inline-flex items-center gap-2 px-8 py-3">
            <Home className="w-4 h-4" />
            {isAr ? 'العودة للرئيسية' : 'Back to Home'}
          </Link>
        </motion.div>
      </section>
    </PageWrapper>
  )
}
