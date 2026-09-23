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
    formats: ['image/avif', 'image/webp'],
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
