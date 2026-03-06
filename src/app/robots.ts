import type { MetadataRoute } from 'next'
import { getAbsoluteUrl } from '~/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NODE_ENV === 'production'

  return {
    rules: isProduction
      ? {
          userAgent: '*',
          allow: '/'
        }
      : {
          userAgent: '*',
          disallow: '/'
        },
    sitemap: getAbsoluteUrl('/sitemap.xml'),
    host: getAbsoluteUrl('/')
  }
}
