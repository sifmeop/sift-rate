import type { IReviewDetail } from '~/components/features/rating'
import { EmptyState } from '~/components/ui/query'
import { ReviewItem } from './ReviewItem'

interface IReviewsProps {
  reviewsData: IReviewDetail[]
}

export const Reviews = ({ reviewsData }: IReviewsProps) => {
  return (
    <div>
      <h2 className='font-roboto-slab mb-6 text-2xl font-bold'>
        Отзывы ({reviewsData.length})
      </h2>
      <div className='flex flex-col gap-4'>
        {reviewsData.length > 0 ? (
          reviewsData.map((review) => (
            <ReviewItem key={review.id} {...review} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}
