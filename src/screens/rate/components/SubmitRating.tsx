'use client'

import { Alert } from '@heroui/alert'
import { Button } from '@heroui/button'
import { Textarea } from '@heroui/input'
import { Controller } from 'react-hook-form'
import type { ISelectedTargetItem } from '~/components/features/rating'
import { Badge } from '~/components/ui/badge'
import { LoadingSpinner } from '~/components/ui/loading-spinner'
import { ReviewCover } from '~/components/ui/review-cover'
import { Show } from '~/components/ui/show'
import { StarRating } from '~/components/ui/star-rating'
import { MAX_REVIEW_LENGTH } from '~/constants/review'
import { api } from '~/trpc/react'
import { useRateSubmit } from '../hooks/useRateSubmit'

interface ISubmitRatingProps {
  targetItem: ISelectedTargetItem
}

export const SubmitRating = ({ targetItem }: ISubmitRatingProps) => {
  const { onSubmit, isCreating, control } = useRateSubmit(targetItem)

  const { data, isLoading } = api.review.getReviewByExternalId.useQuery({
    externalId: targetItem.externalId,
    type: targetItem.type
  })

  const hasReview = !!data

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-4'>
      <Show when={hasReview}>
        <Alert color='danger' title='Вы уже оставили отзыв' />
      </Show>
      <div className='lg:border-border bg-card-background relative rounded-xl p-3 lg:border lg:p-6'>
        <Badge type={targetItem.type} className='absolute top-6 right-6' />
        <div className='mb-6 flex items-center gap-4'>
          <ReviewCover
            unoptimized
            category={targetItem.type}
            title={targetItem.title}
            coverUrl={targetItem.coverUrl}
          />
          <div className='overflow-hidden'>
            <h2 className='line-clamp-2 font-semibold'>{targetItem.title}</h2>
            <p className='text-muted-foreground text-sm'>
              {targetItem.description}
            </p>
          </div>
        </div>
        <div className='mb-6'>
          <label className='text-foreground mb-3 block text-sm font-semibold'>
            Рейтинг
          </label>
          <Controller
            name='rating'
            control={control}
            render={({ field: { onChange, value } }) => (
              <StarRating rating={value} onChange={onChange} />
            )}
          />
        </div>
        <Controller
          name='review'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Textarea
              isClearable
              value={value}
              onChange={onChange}
              label='Комментарий (опционально)'
              placeholder='Поделитесь своими впечатлениями...'
              variant='faded'
              minRows={6}
              maxLength={MAX_REVIEW_LENGTH}
              description={`${value.length}/${MAX_REVIEW_LENGTH}`}
            />
          )}
        />
      </div>
      <Button fullWidth type='submit' color='secondary' isLoading={isCreating}>
        {isCreating
          ? 'Сохранение...'
          : hasReview
            ? 'Перезаписать оценку'
            : 'Сохранить оценку'}
      </Button>
    </form>
  )
}
