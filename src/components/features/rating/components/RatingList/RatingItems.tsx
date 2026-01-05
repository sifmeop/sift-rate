import { AnimatePresence } from 'framer-motion'
import { EmptyState } from '~/components/ui/query'
import { useRatingList } from '~/contexts/RatingListProvider'
import type { IRatingCardData } from '../../types/rating.types'
import { selectVisibleRatings } from '../../utils/selectVisibleRatings'
import { RatingCard } from '../RatingCard/RatingCard'

interface IRatingItemsProps {
  items: IRatingCardData[]
}

export const RatingItems = ({ items }: IRatingItemsProps) => {
  const { state } = useRatingList()
  const visibleItems = selectVisibleRatings(items, state)

  return (
    <>
      {visibleItems.length > 0 ? (
        <div className='flex flex-col gap-3'>
          <AnimatePresence>
            {visibleItems.map((review) => (
              <RatingCard key={review.id} {...review} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  )
}
