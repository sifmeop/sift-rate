'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'

interface ITimelineContext {
  selectedYear: number
  setSelectedYear: (year: number) => void
  selectedMonth: number
  setSelectedMonth: (month: number) => void
}

const TimelineContext = createContext<ITimelineContext | null>(null)

const now = new Date()

export const TimelineProvider = ({ children }: React.PropsWithChildren) => {
  const [{ selectedYear, selectedMonth }, setState] = useState({
    selectedYear: now.getFullYear(),
    selectedMonth: now.getMonth()
  })

  const setSelectedYear = useCallback(
    (year: number) => setState((prev) => ({ ...prev, selectedYear: year })),
    []
  )

  const setSelectedMonth = useCallback(
    (month: number) => setState((prev) => ({ ...prev, selectedMonth: month })),
    []
  )

  const value = useMemo(
    () => ({
      selectedYear,
      setSelectedYear,
      selectedMonth,
      setSelectedMonth
    }),
    [selectedMonth, selectedYear, setSelectedMonth, setSelectedYear]
  )

  return <TimelineContext value={value}>{children}</TimelineContext>
}

export const useTimeline = () => {
  const context = useContext(TimelineContext)

  if (!context) {
    throw new Error('useTimeline must be used within a TimelineProvider')
  }

  return context
}
