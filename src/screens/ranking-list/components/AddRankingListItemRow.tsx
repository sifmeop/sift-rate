import { Button } from '@heroui/button'
import { cn } from '@heroui/theme'
import { Badge } from '~/components/ui/badge'
import { ReviewCover } from '~/components/ui/review-cover'
import type { ReviewWithItem } from '../types'

interface IAddRankingListItemRowProps {
  review: ReviewWithItem
  isAlreadyAdded: boolean
  isLoading: boolean
  isLast: boolean
  onAdd: (itemReviewId: string) => void
}

export const AddRankingListItemRow = ({
  review,
  isAlreadyAdded,
  isLoading,
  isLast,
  onAdd
}: IAddRankingListItemRowProps) => {
  return (
    <div
      className={cn(
        'group bg-card-background hover:bg-card-background-secondary/80 border-border relative flex gap-4 rounded-xl border p-4 hover:shadow-lg md:flex-row',
        {
          'mb-3': !isLast
        }
      )}>
      <ReviewCover
        title={review.itemReview.title}
        coverUrl={review.itemReview.coverUrl}
        className='w-20'
      />
      <div className='min-w-0 flex-1 space-y-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <Badge type={review.itemReview.type} />
          <span className='text-muted-foreground text-sm'>
            Оценка: {review.rating}/10
          </span>
        </div>
        <p className='font-semibold'>{review.itemReview.title}</p>
        {review.review && (
          <p className='text-muted-foreground text-sm'>{review.review}</p>
        )}
      </div>
      <Button
        color='primary'
        variant={isAlreadyAdded ? 'flat' : 'solid'}
        isDisabled={isAlreadyAdded || isLoading}
        isLoading={isLoading}
        onPress={() => onAdd(review.itemReviewId)}>
        {isAlreadyAdded ? 'Уже в списке' : 'Добавить'}
      </Button>
    </div>
  )
}
