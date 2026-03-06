import type { Metadata } from 'next'
import { buildSeoMetadata } from '~/lib/seo'
import { ReviewsPageClient } from './ReviewsPageClient'

export const generateMetadata = (): Metadata =>
  buildSeoMetadata({
    title: 'Отзывы',
    description: 'Просматривайте полную историю сохраненных оценок и написанных отзывов.',
    pathname: '/reviews',
    keywords: ['история отзывов', 'история оценок', 'сохраненные отзывы']
  })

export default function Reviews() {
  return <ReviewsPageClient />
}
