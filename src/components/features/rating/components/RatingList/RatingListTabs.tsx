import { Tab, Tabs } from '@heroui/tabs'
import type { Key } from 'react'
import { MAX_RATING } from '~/constants/review'
import { useRatingList } from '~/contexts/RatingListProvider'
import type { IRatingCardData, IRatingListTab } from '../../types/rating.types'

interface IRatingListTabsProps {
  items: IRatingCardData[]
}

export const RatingListTabs = ({ items }: IRatingListTabsProps) => {
  const { state, setTab, setFilter } = useRatingList()
  const bestItems = items.filter((item) => item.rating === MAX_RATING)

  const onSelectionChange = (key: Key) => {
    const tab = key.toString() as IRatingListTab
    const { filter } = state

    setTab(tab)

    if (tab === 'all' && filter !== 'all' && items) {
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
      <Tab key='best' title='Лучшие' isDisabled={bestItems.length === 0} />
    </Tabs>
  )
}
