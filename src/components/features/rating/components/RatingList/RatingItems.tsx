import { m, stagger, type Variants } from 'framer-motion'
import { EmptyState } from '~/components/ui/query'
import { useRatingList } from '~/contexts/RatingListProvider'
import type { IRatingCardData } from '../../types/rating.types'
import { selectVisibleRatings } from '../../utils/selectVisibleRatings'
import { RatingCard } from '../RatingCard/RatingCard'

const listVariants: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: stagger(0.08)
    }
  }
}

interface IRatingItemsProps {
  items: IRatingCardData[]
}

export const RatingItems = ({ items }: IRatingItemsProps) => {
  const { state } = useRatingList()
  const visibleItems = selectVisibleRatings(items, state)

  return (
    <>
      {visibleItems.length > 0 ? (
        <m.div
          variants={listVariants}
          initial='initial'
          animate='animate'
          className='flex flex-col gap-3'>
          {visibleItems.map((review) => (
            <RatingCard key={review.id} {...review} />
          ))}
        </m.div>
      ) : (
        <EmptyState />
      )}
    </>
  )
}
