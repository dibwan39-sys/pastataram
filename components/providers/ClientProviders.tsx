'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import { useUIStore } from '@/lib/store'
import { useEffect } from 'react'

function LanguageSync() {
  const { language } = useUIStore()
  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])
  return null
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
      <LanguageSync />
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#FCEEF4',
            color: '#3D1F2B',
            border: '1px solid rgba(196,134,154,0.4)',
            borderRadius: '16px',
            fontFamily: "'Cairo', 'Inter', sans-serif",
            fontWeight: '600',
            padding: '12px 20px',
            boxShadow: '0 8px 24px rgba(160,69,94,0.15)',
          },
        }}
      />
    </ThemeProvider>
  )
}
