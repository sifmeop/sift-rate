import { redirect } from 'next/navigation'
import { EmptyState } from '~/components/ui/query'
import { api } from '~/trpc/server'
import { validateYear } from '~/utils/validators'
import { TimelineContent } from './components/TimelineContent'

interface ITimelinePageProps {
  year: string
}

export const TimelinePage = async ({ year }: ITimelinePageProps) => {
  const yearValue = validateYear.parse({ year: +year }).year

  const timeline = await api.review.getTimelineStats()

  if (!timeline) {
    return <EmptyState />
  }

  const years = Object.keys(timeline).map(Number)

  if (!years.includes(yearValue)) {
    redirect(`/timeline?year=${years[years.length - 1]}`)
  }

  const items = await api.review.getReviewsByDate({
    from: new Date(yearValue, 0, 1).toISOString(),
    to: new Date(yearValue, 11, 31).toISOString()
  })

  return (
    <TimelineContent
      timeline={timeline}
      items={items}
      selectedYear={yearValue}
    />
  )
}
