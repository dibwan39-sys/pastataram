import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pastataram.com'
  const routes = [
    '', '/menu', '/qr', '/build-your-pasta', '/offers', '/gallery',
    '/reviews', '/about', '/contact', '/account', '/track-order',
  ]
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
