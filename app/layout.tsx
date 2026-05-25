import type { Metadata } from 'next'
import './globals.css'
import ClientProviders from '@/components/providers/ClientProviders'

export const metadata: Metadata = {
  title: 'PASTATARAM | باستاتا رام - Premium Pasta Kiosk Jeddah',
  description: 'PASTATARAM - Premium fast-casual pasta kiosk in Jeddah. Experience Italian-inspired pasta crafted with the finest ingredients.',
  keywords: 'PASTATARAM, pasta, Jeddah, fast casual, Italian, باستاتا رام, جدة',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
    shortcut: '/images/logo.png',
  },
  openGraph: {
    title: 'PASTATARAM | Premium Pasta Kiosk',
    description: 'Premium fast-casual pasta experience in Jeddah',
    type: 'website',
    images: [{ url: '/images/logo.png', width: 400, height: 400, alt: 'PASTATARAM' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
