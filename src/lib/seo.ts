import type { Metadata } from 'next'
import { env } from '~/env'

type SeoInput = {
  title: string
  description: string
  pathname?: string
  keywords?: string[]
  image?: string
  type?: 'website' | 'article'
  noIndex?: boolean
}

const DEFAULT_SITE_NAME = 'Sift-Rate'
const DEFAULT_IMAGE_PATH = '/images/screenshots/desktop.png'
const DEFAULT_SITE_URL = 'http://localhost:3000'

const normalizeSiteUrl = (value: string) => value.replace(/\/+$/, '')

const toAbsoluteUrl = (pathname: string) => {
  if (pathname.startsWith('http://') || pathname.startsWith('https://')) {
    return pathname
  }

  const normalizedPathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${getSiteUrl()}${normalizedPathname}`
}

export const getSiteUrl = () => {
  const siteUrl = env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL
  return normalizeSiteUrl(siteUrl)
}

export const getAbsoluteUrl = (pathname = '/') => toAbsoluteUrl(pathname)

export const getDefaultRobots = (noIndex?: boolean): Metadata['robots'] => {
  const isProduction = process.env.NODE_ENV === 'production'
  const index = noIndex ? false : isProduction
  const follow = noIndex ? false : isProduction

  return {
    index,
    follow,
    googleBot: {
      index,
      follow,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  }
}

export const buildSeoMetadata = ({
  title,
  description,
  pathname = '/',
  keywords = [],
  image = DEFAULT_IMAGE_PATH,
  type = 'website',
  noIndex = false
}: SeoInput): Metadata => {
  const canonical = getAbsoluteUrl(pathname)
  const imageUrl = getAbsoluteUrl(image)

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        'ru-RU': canonical
      }
    },
    openGraph: {
      type,
      locale: 'ru_RU',
      siteName: DEFAULT_SITE_NAME,
      title,
      description,
      url: canonical,
      images: [
        {
          url: imageUrl,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    },
    robots: getDefaultRobots(noIndex)
  }
}
