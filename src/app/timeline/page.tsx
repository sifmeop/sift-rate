import type { Metadata } from 'next'
import { buildSeoMetadata } from '~/lib/seo'
import { TimelinePageClient } from './TimelinePageClient'

export const generateMetadata = (): Metadata =>
  buildSeoMetadata({
    title: 'Лента активности',
    description: 'Отслеживайте активность по отзывам и оценкам в хронологической ленте.',
    pathname: '/timeline',
    keywords: ['лента активности', 'лента отзывов', 'лента оценок']
  })

export default function Timeline() {
  return <TimelinePageClient />
}
