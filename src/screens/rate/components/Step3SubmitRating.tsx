import { Button } from '@heroui/button'
import { Textarea } from '@heroui/input'
import type { ISelectedTargetItem } from '~/components/features/rating'
import { Badge } from '~/components/ui/badge'
import { ReviewCover } from '~/components/ui/review-cover'
import { StarRating } from '~/components/ui/star-rating'
import { MAX_REVIEW_LENGTH } from '~/constants/review'
import { useRateSubmit } from '../hooks/useRateSubmit'

interface IStep3SubmitRatingProps {
  selectedTargetItem: ISelectedTargetItem
  reset: () => void
}

export const Step3SubmitRating = ({
  selectedTargetItem,
  reset
}: IStep3SubmitRatingProps) => {
  const { register, onSubmit, isCreating, watch, setValue } = useRateSubmit(
    selectedTargetItem,
    reset
  )

  const rating = watch('rating')
  const review = watch('review')

  return (
    <form onSubmit={onSubmit}>
      <div className='md:border-border bg-card-background relative mb-4 rounded-xl p-3 md:mb-8 md:border md:p-6'>
        <Badge
          type={selectedTargetItem.type}
          className='absolute top-6 right-6'
        />
        <div className='mb-6 flex items-center gap-4'>
          <ReviewCover
            title={selectedTargetItem.title}
            coverUrl={selectedTargetItem.coverUrl}
            type={selectedTargetItem.type}
          />
          <div className='overflow-hidden'>
            <h2 className='line-clamp-2 font-semibold'>
              {selectedTargetItem.title}
            </h2>
            <p className='text-muted-foreground text-sm'>
              {selectedTargetItem.description}
            </p>
          </div>
        </div>
        <div className='mb-6'>
          <label className='text-foreground mb-3 block text-sm font-semibold'>
            Рейтинг
          </label>
          <StarRating
            rating={rating}
            onChange={(value) => setValue('rating', value)}
          />
        </div>
        <Textarea
          {...register('review')}
          isClearable
          label='Комментарий (опционально)'
          placeholder='Поделитесь своими впечатлениями...'
          variant='faded'
          minRows={6}
          maxLength={MAX_REVIEW_LENGTH}
          description={`${review.length}/${MAX_REVIEW_LENGTH}`}
        />
      </div>
      <Button
        type='submit'
        fullWidth
        color='secondary'
        isDisabled={rating === 0}
        isLoading={isCreating}>
        {isCreating ? 'Сохранение...' : 'Сохранить оценку'}
      </Button>
    </form>
  )
}
