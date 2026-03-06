import type { Metadata } from 'next'
import { buildSeoMetadata } from '~/lib/seo'
import { RatePageClient } from './RatePageClient'

export const generateMetadata = (): Metadata =>
  buildSeoMetadata({
    title: 'Оценить',
    description:
      'Находите фильмы, сериалы, игры, книги и музыку, чтобы сохранять личные оценки и отзывы.',
    pathname: '/rate',
    keywords: ['оценить медиа', 'создать отзыв', 'поставить оценку', 'поиск медиа']
  })

export default function Rate() {
  return <RatePageClient />
}
