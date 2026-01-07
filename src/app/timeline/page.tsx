import type { Metadata } from 'next'
import { TimelinePage } from '~/screens/timeline'

export const metadata: Metadata = {
  title: 'Sift Rate — Таймлайн отзывов',
  description: 'Отзывы и оценки пользователя'
}

interface ITimelineProps {
  searchParams: Promise<{
    year: string
    month: string
  }>
}

export default async function Timeline({ searchParams }: ITimelineProps) {
  const { year = new Date().getFullYear() + '' } = await searchParams

  return (
    // <Suspense key={year} fallback={<LoadingSpinner />}>
    <TimelinePage year={year} />
    // </Suspense>
  )
}
