import '~/styles/globals.css'

import { cn } from '@heroui/theme'
import dayjs from 'dayjs'
import { type Metadata } from 'next'
import { Manrope, Roboto_Slab } from 'next/font/google'
import { TRPCReactProvider } from '~/trpc/react'
import { Providers } from './providers'

import 'dayjs/locale/ru'

dayjs.locale('ru')

export const metadata: Metadata = {
  title: 'Sift Rate — отзывы пользователя о фильмах, играх, книгах и музыке',
  description:
    'Все отзывы и оценки пользователя на фильмы, сериалы, игры, книги, песни и альбомы. Личная история впечатлений в одном месте.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
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
      lang='en'
      className={cn(manrope.variable, robotoSlab.variable)}>
      <body>
        <TRPCReactProvider>
          <Providers>{children}</Providers>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
