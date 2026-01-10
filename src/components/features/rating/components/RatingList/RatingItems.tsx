import { WindowVirtualizer } from 'virtua'
import { EmptyState } from '~/components/ui/query'
import { useRatingList } from '~/contexts/RatingListProvider'
import type { IRatingCardData } from '../../types/rating.types'
import { selectVisibleItems } from '../../utils/selectVisibleItems'
import { RatingCard } from '../RatingCard/RatingCard'

interface IRatingItemsProps {
  items: IRatingCardData[]
}

export const RatingItems = ({ items }: IRatingItemsProps) => {
  const { state } = useRatingList()
  const visibleItems = selectVisibleItems(items, state)

  return (
    <>
      {visibleItems.length > 0 ? (
        <WindowVirtualizer data={visibleItems} itemSize={visibleItems.length}>
          {(item) => <RatingCard key={item.id} {...item} />}
        </WindowVirtualizer>
      ) : (
        <EmptyState />
      )}
    </>
  )
}
