'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import type { IRatingListState } from '~/components/features/rating'

interface IRatingListContext {
  state: IRatingListState

  setTab: (tab: IRatingListState['tab']) => void
  setSearch: (search: IRatingListState['search']) => void
  setSort: (sort: IRatingListState['sort']) => void
  setFilter: (filter: IRatingListState['filter']) => void
}

const RatingListContext = createContext<IRatingListContext | null>(null)

export const RatingListProvider = ({ children }: React.PropsWithChildren) => {
  const [state, setState] = useState<IRatingListState>({
    tab: 'all',
    search: '',
    sort: 'review_desc',
    filter: 'all'
  })

  const setTab = useCallback(
    (tab: IRatingListState['tab']) => setState((prev) => ({ ...prev, tab })),
    []
  )

  const setSearch = useCallback(
    (search: IRatingListState['search']) =>
      setState((prev) => ({ ...prev, search })),
    []
  )

  const setSort = useCallback(
    (sort: IRatingListState['sort']) => setState((prev) => ({ ...prev, sort })),
    []
  )

  const setFilter = useCallback(
    (filter: IRatingListState['filter']) =>
      setState((prev) => ({ ...prev, filter })),
    []
  )

  const value = useMemo(
    () => ({
      state,
      setTab,
      setSearch,
      setSort,
      setFilter
    }),
    [setFilter, setSearch, setSort, setTab, state]
  )

  return <RatingListContext value={value}>{children}</RatingListContext>
}

export const useRatingList = () => {
  const context = useContext(RatingListContext)

  if (!context) {
    throw new Error('useRatingList must be used within a RatingListProvider')
  }

  return context
}
