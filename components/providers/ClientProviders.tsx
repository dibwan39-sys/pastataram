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
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <LanguageSync />
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#FFF8F5',
            color: '#4A342B',
            border: '1px solid #E9B7C7',
            borderRadius: '16px',
            fontFamily: "'Cairo', 'Inter', sans-serif",
            fontWeight: '600',
            padding: '12px 20px',
          },
        }}
      />
    </ThemeProvider>
  )
}
