import { Tab, Tabs } from '@heroui/tabs'
import type { Key } from 'react'
import { useRatingList } from '~/contexts/RatingListProvider'
import type { IRatingListTab } from '../../types/rating.types'

export const RatingListTabs = () => {
  const { state, setTab, setFilter } = useRatingList()

  const onSelectionChange = (key: Key) => {
    const tab = key.toString() as IRatingListTab
    const filter = state.filter

    setTab(tab)

    if (tab === 'all' && filter !== 'all') {
      setFilter('all')
    } else if (tab === 'best' && filter !== '10') {
      setFilter('10')
    }
  }

  return (
    <Tabs
      fullWidth
      aria-label='Tabs'
      selectedKey={state.tab}
      onSelectionChange={onSelectionChange}>
      <Tab key='all' title='Все' />
      <Tab key='best' title='Лучшие' />
    </Tabs>
  )
}
