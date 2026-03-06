import type { MetadataRoute } from 'next'
import { getAbsoluteUrl } from '~/lib/seo'

const PUBLIC_ROUTES = ['/', '/rate', '/reviews', '/timeline'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return PUBLIC_ROUTES.map((route) => ({
    url: getAbsoluteUrl(route),
    lastModified,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : 0.8
  }))
}
