'use client'

import dayjs from 'dayjs'
import { RatingList } from '~/components/features/rating'
import { useTimeline } from '~/contexts/TimelineProvider'
import { api } from '~/trpc/react'
import { MonthSelector } from './components/MonthSelector'
import { MonthSelectorMobile } from './components/MonthSelectorMobile'
import { YearSelector } from './components/YearSelector'

export const TimelinePage = () => {
  const { selectedYear, selectedMonth } = useTimeline()

  const { data: timeline } = api.review.getTimelineStats.useQuery()

  const {
    data: items,
    isLoading: itemsLoading,
    error: itemsError
  } = api.review.getReviewsByDate.useQuery({
    from: new Date(selectedYear, 0, 1).toISOString(),
    to: new Date(selectedYear, 11, 31).toISOString()
  })

  const filteredItems = items?.filter(
    (item) => dayjs(item.createdAt).get('month') === selectedMonth
  )

  return (
    <div className='flex flex-col gap-3'>
      <YearSelector timeline={timeline} />
      <MonthSelector timeline={timeline} />
      <MonthSelectorMobile timeline={timeline} />
      <RatingList
        items={filteredItems}
        isLoading={itemsLoading}
        error={itemsError?.message}
      />
    </div>
  )
}
