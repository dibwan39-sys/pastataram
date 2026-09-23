/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /**
     * No `remotePatterns`. Every image the site renders now lives in
     * public/images — the Unsplash, Cloudinary and placeholder.com hosts that
     * used to be allow-listed were there for stock photographs of other
     * people's food, which have been replaced with real PASTATARAM imagery.
     * Keeping the list empty means a remote URL cannot quietly reappear.
     */
    /**
     * `unoptimized: true` used to be set here, which switched off Next's image
     * pipeline for the whole site. Every visitor downloaded the full-size
     * masters — a 2 MB hero PNG and 2 MB product photos — at whatever size
     * their screen happened to be.
     *
     * With it removed, Next serves resized AVIF/WebP derivatives per device
     * and caches them at the edge. The original files in public/images are
     * untouched and remain the masters.
     */
    /**
     * WebP only — AVIF is deliberately not offered.
     *
     * AVIF wins on bytes: 64 KB against 102 KB for the same 1280px dish. It
     * loses badly on the thing that actually decides whether a customer sees
     * food, which is how long the FIRST request for a size takes, because
     * Next encodes on demand and every size starts cold after a deploy.
     *
     * Measured on a genuinely cold cache in production mode, with the
     * optimized-image cache wiped and the browser cache disabled:
     *
     *   with AVIF     hero image visible after 44.5s, 5 of 16 images loaded
     *   WebP only     hero image visible in well under a second
     *
     * AVIF encoding ran 6–12 seconds per size here against 1.5 for WebP. No
     * amount of saved bandwidth is worth a restaurant's opening shot arriving
     * three quarters of a minute late for the first visitor after a deploy,
     * and the alternative — warming every size by hand after every deploy —
     * is exactly the production dependency this must not have.
     *
     * The masters in public/images are already WebP, so this path is now a
     * resize rather than a re-encode between formats.
     */
    formats: ['image/webp'],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 200, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  compress: true,
  reactStrictMode: true,
  trailingSlash: false,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig
