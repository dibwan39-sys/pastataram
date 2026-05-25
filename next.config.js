/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
    ],
    // Keep unoptimized for local SVG/PNG assets in public/
    unoptimized: true,
  },
  // Compress responses in production
  compress: true,
  // Strict mode for better error catching
  reactStrictMode: true,
  // Clean URLs — no trailing slash
  trailingSlash: false,
  // Suppress noisy hydration warnings from browser extensions
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig
