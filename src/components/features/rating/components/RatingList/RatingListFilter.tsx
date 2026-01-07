'use client'

import { Select, SelectItem } from '@heroui/select'
import type { SharedSelection } from '@heroui/system'
import { StarIcon } from 'lucide-react'
import { useRatingList } from '~/contexts/RatingListProvider'
import type {
  IRatingCardData,
  IRatingListFilter
} from '../../types/rating.types'

interface IRatingListFilterProps {
  items: IRatingCardData[]
}

export const RatingListFilter = ({ items }: IRatingListFilterProps) => {
  const { state, setFilter } = useRatingList()

  const ratings = items.reduce<Record<string, number>>(
    (acc, item) => {
      acc[item.rating] = (acc[item.rating] ?? 0) + 1
      return acc
    },
    {
      all: items.length
    }
  )

  const tab = state.tab
  const isDisabled = tab === 'best'
  const filter = isDisabled ? '10' : state.filter

  const selectedKeys = new Set([filter])
  const sortedRatings = [
    ['all', ratings.all],
    ...[...Object.entries(ratings).filter(([key]) => key !== 'all')].sort(
      (a, b) => +b[0] - +a[0]
    )
  ]

  const onSelectionChange = (keys: SharedSelection) => {
    if (keys.anchorKey) {
      setFilter(keys.anchorKey as IRatingListFilter)
    }
  }

  return (
    <Select
      fullWidth
      aria-label='Filter by rating'
      startContent={<StarIcon className='fill-yellow text-yellow size-5' />}
      endContent={
        <span className='text-secondary text-base font-semibold'>
          {ratings[filter]}
        </span>
      }
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
      isDisabled={isDisabled}>
      {sortedRatings.map(([rating, count]) => (
        <SelectItem
          key={rating}
          startContent={<StarIcon className='fill-yellow text-yellow size-5' />}
          endContent={
            <span className='text-secondary font-semibold'>{count}</span>
          }>
          {rating === 'all' ? 'Все' : rating}
        </SelectItem>
      ))}
    </Select>
  )
}
