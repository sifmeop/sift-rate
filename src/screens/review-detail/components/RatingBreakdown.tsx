import type { IReviewDetail } from '~/components/features/rating'
import { MAX_RATING } from '~/constants/review'
import { StarRating } from './StarRating'

interface IReviewsProps {
  reviewsData: IReviewDetail[]
}

export const RatingBreakdown = ({ reviewsData }: IReviewsProps) => {
  const totalRatings = reviewsData.length
  const ratings = reviewsData.reduce<Record<number, number>>((acc, review) => {
    acc[review.rating] = (acc[review.rating] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className='bg-card-background border-border flex flex-col gap-2 rounded-xl border p-4'>
      {Array.from({ length: MAX_RATING }, (_, index) => index + 1)
        .reverse()
        .map((rating) => {
          const count = ratings[rating] ?? 0
          const percentage = (count / totalRatings) * 100
          const formattedCount = new Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short'
          }).format(count)

          return (
            <div
              key={rating}
              className='text-muted-foreground flex items-center gap-3 text-sm'>
              <span className='w-3 font-semibold'>{rating}</span>
              <StarRating rating={+rating} />
              <div className='bg-muted/40 h-2 flex-1 overflow-hidden rounded-full'>
                <div
                  className='bg-secondary h-full rounded-full transition-all duration-500'
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className='w-7 text-right'>{formattedCount}</span>
            </div>
          )
        })}
    </div>
  )
}
