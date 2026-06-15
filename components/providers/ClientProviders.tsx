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
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
      <LanguageSync />
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#211C19',
            color: '#F2E8DA',
            border: '1px solid rgba(184,115,51,0.4)',
            borderRadius: '16px',
            fontFamily: "'Cairo', 'Inter', sans-serif",
            fontWeight: '600',
            padding: '12px 20px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
          },
        }}
      />
    </ThemeProvider>
  )
}
