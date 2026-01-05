'use client'

import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  RatingList,
  type IRatingCardData,
  type ITimeline
} from '~/components/features/rating'
import { MonthSelector } from './MonthSelector'
import { MonthSelectorMobile } from './MonthSelectorMobile'
import { YearSelector } from './YearSelector'

interface ITimelineContentProps {
  timeline: ITimeline
  items: IRatingCardData[]
  selectedYear: number
}

const getFirstMonth = (items: IRatingCardData[]) =>
  dayjs(items[0]?.createdAt).get('month') + 1

export const TimelineContent = ({
  timeline,
  items,
  selectedYear
}: ITimelineContentProps) => {
  const [selectedMonth, setSelectedMonth] = useState(getFirstMonth(items))
  const router = useRouter()

  useEffect(() => {
    const availableYears = Object.keys(timeline).map(Number)
    const currentIndex = availableYears.indexOf(selectedYear)

    const yearsToPreload = [
      availableYears[currentIndex - 1],
      availableYears[currentIndex + 1]
    ].filter(Boolean)

    for (const year of yearsToPreload) {
      router.prefetch(`?year=${year}`)
    }
  }, [router, selectedYear, timeline])

  useEffect(() => {
    setSelectedMonth(getFirstMonth(items))
  }, [items])

  const filteredItems = items.filter(
    (item) => dayjs(item.createdAt).get('month') + 1 === selectedMonth
  )

  return (
    <div className='flex flex-col gap-3'>
      <YearSelector timeline={timeline} selectedYear={selectedYear} />
      <MonthSelector
        timeline={timeline}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <MonthSelectorMobile
        timeline={timeline}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <RatingList items={filteredItems} />
    </div>
  )
}
