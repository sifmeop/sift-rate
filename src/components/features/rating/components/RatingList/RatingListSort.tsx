import { Select, SelectItem } from '@heroui/select'
import type { SharedSelection } from '@heroui/system'
import { useRatingList } from '~/contexts/RatingListProvider'
import type { IRatingListSort } from '../../types/rating.types'

const labels: Record<IRatingListSort, string> = {
  review_desc: 'Новые оценки',
  review_asc: 'Старые оценки',
  rating_desc: 'Оценки по убыванию',
  rating_asc: 'Оценки по возрастанию'
}

export const RatingListSort = () => {
  const { state, setSort } = useRatingList()

  const selectedKeys = new Set([state.sort])

  const onSelectionChange = (keys: SharedSelection) => {
    if (keys.anchorKey) {
      setSort(keys.anchorKey as IRatingListSort)
    }
  }

  return (
    <Select
      fullWidth
      aria-label='Sort by'
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}>
      {Object.entries(labels).map(([key, label]) => (
        <SelectItem key={key}>{label}</SelectItem>
      ))}
    </Select>
  )
}
