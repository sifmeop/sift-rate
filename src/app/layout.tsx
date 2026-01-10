import '~/styles/globals.css'

import { cn } from '@heroui/theme'
import dayjs from 'dayjs'
import { type Metadata } from 'next'
import { Manrope, Roboto_Slab } from 'next/font/google'
import { TRPCReactProvider } from '~/trpc/react'
import { Providers } from './providers'

import 'dayjs/locale/ru'
import Head from 'next/head'

dayjs.locale('ru')

export const metadata: Metadata = {
  title: 'Sift-Rate — отзывы пользователя о фильмах, играх, книгах и музыке',
  description:
    'Все отзывы и оценки пользователя на фильмы, сериалы, игры, книги, песни и альбомы. Личная история впечатлений в одном месте.',
  keywords: [
    'отзывы',
    'рейтинг',
    'фильмы',
    'сериалы',
    'игры',
    'книги',
    'музыка',
    'альбомы',
    'оценки',
    'личные впечатления',
    'обзоры',
    'Sift-Rate',
    'user reviews',
    'media reviews'
  ],
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
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        />
      </Head>
      <body>
        <TRPCReactProvider>
          <Providers>{children}</Providers>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
