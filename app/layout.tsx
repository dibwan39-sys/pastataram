import type { Metadata } from 'next'
import './globals.css'
import ClientProviders from '@/components/providers/ClientProviders'

export const metadata: Metadata = {
  title: 'PASTATARAM',
  applicationName: 'PASTATARAM',
  description: 'PASTATARAM - Premium fast-casual pasta in Jeddah. Italian-inspired pasta crafted with the finest ingredients. Daily 3:00 PM – 3:00 AM.',
  keywords: 'PASTATARAM, pasta, Jeddah, fast casual, Italian, باستاتا رام, جدة',
  themeColor: '#14110F',
  colorScheme: 'dark',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
    shortcut: '/images/logo.png',
  },
  openGraph: {
    title: 'PASTATARAM',
    siteName: 'PASTATARAM',
    description: 'Premium fast-casual pasta experience in Jeddah',
    type: 'website',
    images: [{ url: '/images/logo.png', width: 400, height: 400, alt: 'PASTATARAM' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PASTATARAM',
    description: 'Premium fast-casual pasta experience in Jeddah',
    images: ['/images/logo.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" className="dark" suppressHydrationWarning>
      <head>
        {/* Force dark, premium charcoal rendering on all browsers and devices */}
        <meta name="color-scheme" content="dark" />
        <meta name="supported-color-schemes" content="dark" />
        <meta name="theme-color" content="#14110F" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
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
