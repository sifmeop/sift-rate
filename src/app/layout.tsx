import '~/styles/globals.css'

import { cn } from '@heroui/theme'
import dayjs from 'dayjs'
import { type Metadata, type Viewport } from 'next'
import { Manrope, Roboto_Slab } from 'next/font/google'
import { getDefaultRobots, getSiteUrl } from '~/lib/seo'
import { TRPCReactProvider } from '~/trpc/react'
import { Providers } from './providers'

import 'dayjs/locale/ru'

dayjs.locale('ru')

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'Sift-Rate - личные оценки и отзывы',
    template: '%s | Sift-Rate'
  },
  description:
    'Личная коллекция оценок и отзывов о фильмах, сериалах, играх, книгах, песнях и альбомах.',
  keywords: [
    'личные отзывы',
    'личные оценки',
    'оценки фильмов',
    'отзывы о сериалах',
    'оценки игр',
    'отзывы о книгах',
    'оценки музыки',
    'отзывы о медиа',
    'трекер оценок',
    'дневник впечатлений'
  ],
  alternates: {
    canonical: '/',
    languages: {
      'ru-RU': '/'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    title: 'Sift-Rate - личные оценки и отзывы',
    description:
      'Личная коллекция оценок и отзывов о фильмах, сериалах, играх, книгах, песнях и альбомах.',
    url: '/',
    siteName: 'Sift-Rate',
    images: [
      {
        url: '/images/screenshots/desktop.png',
        alt: 'Превью Sift-Rate'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sift-Rate - личные оценки и отзывы',
    description:
      'Личная коллекция оценок и отзывов о фильмах, сериалах, играх, книгах, песнях и альбомах.',
    images: ['/images/screenshots/desktop.png']
  },
  robots: getDefaultRobots(),
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      url: '/favicon-96x96.png',
      sizes: '96x96'
    },
    { rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' },
    { rel: 'shortcut icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png', sizes: '180x180' }
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Sift-Rate'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover'
}

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope'
})

const robotoSlab = Roboto_Slab({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-roboto-slab'
})

export default function RootLayout({
  children
}: Readonly<React.PropsWithChildren>) {
  return (
    <html
      suppressHydrationWarning
      lang='ru'
      className={cn(manrope.variable, robotoSlab.variable)}>
      <body>
        <TRPCReactProvider>
          <Providers>{children}</Providers>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
