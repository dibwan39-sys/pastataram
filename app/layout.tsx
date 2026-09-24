import type { Metadata, Viewport } from 'next'
import { Cairo, Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import ClientProviders from '@/components/providers/ClientProviders'
import { SITE_NAME, SITE_URL, restaurantJsonLd } from '@/lib/site'

/**
 * Fonts are self-hosted and preloaded by next/font. They used to be requested
 * twice — once by a <link> here and again by an @import inside globals.css —
 * which cost an extra round trip and blocked the first paint on the CSS import.
 */
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'PASTATARAM — باستاتا رام | مطعم باستا إيطالية في جدة',
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  description:
    'باستاتا رام — تجربة باستا إيطالية فاخرة في جدة. فرعا القرنية والسنابل، مفتوح ٢٤ ساعة. تصفّح المنيو واطلب عبر واتساب.',
  keywords: [
    'PASTATARAM', 'باستاتا رام', 'باستا جدة', 'مطعم باستا', 'باستا إيطالية',
    'pasta Jeddah', 'Italian pasta', 'القرنية', 'السنابل',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    // A dedicated small icon. The full-size logo master is far too heavy
    // to serve as a favicon on every request.
    icon: '/images/logo-icon.png',
    apple: '/images/logo-icon.png',
    shortcut: '/images/logo-icon.png',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'PASTATARAM — باستاتا رام',
    siteName: SITE_NAME,
    description: 'تجربة باستا إيطالية فاخرة في جدة · فرعا القرنية والسنابل · مفتوح ٢٤ ساعة',
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
    url: SITE_URL,
    images: [{ url: '/images/f1.webp', width: 1200, height: 900, alt: 'PASTATARAM — باستاتا رام' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PASTATARAM — باستاتا رام',
    description: 'تجربة باستا إيطالية فاخرة في جدة',
    images: ['/images/f1.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: 'var(--brand-noir)',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /**
     * Arabic is the primary customer language, so `lang` and `dir` are set here
     * on the server. They used to be applied in a client effect after
     * hydration, which flashed an LTR layout on every first load. Switching to
     * English updates both attributes at runtime (see ClientProviders).
     */
    <html lang="ar" dir="rtl" className={`dark ${cairo.variable} ${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <script
          type="application/ld+json"
          // Derived entirely from lib/data.ts — no invented ratings or coordinates.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd()) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          تخطَّ إلى المحتوى
        </a>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
