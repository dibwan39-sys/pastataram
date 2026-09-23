import { MetadataRoute } from 'next'
import { SITE_NAME } from '@/lib/site'

/**
 * The layout already shipped `apple-mobile-web-app-capable`, but no manifest
 * existed to back it, so adding the site to a home screen produced an unnamed,
 * unthemed icon. Served by Next at /manifest.webmanifest.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PASTATARAM — باستاتا رام',
    short_name: SITE_NAME,
    description: 'تجربة باستا إيطالية فاخرة في جدة · اطلب عبر واتساب',
    start_url: '/',
    display: 'standalone',
    background_color: 'var(--brand-noir)',
    theme_color: 'var(--brand-noir)',
    lang: 'ar',
    dir: 'rtl',
    orientation: 'portrait',
    icons: [
      { src: '/images/logo-icon.png', sizes: '256x256', type: 'image/png', purpose: 'any' },
    ],
  }
}
