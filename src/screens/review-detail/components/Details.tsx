import { cn } from '@heroui/theme'
import type { Review } from 'generated/prisma'
import type { IDetailedItem } from '~/components/features/rating'
import { ReviewCover } from '~/components/ui/review-cover'
import { Show } from '~/components/ui/show'
import { StarRating } from './StarRating'

const getPluralRating = (total: number) => {
  if (total === 1) {
    return 'отзыв'
  } else if (total > 1 && total < 5) {
    return 'отзыва'
  } else {
    return 'отзывов'
  }
}

interface IDetailsProps {
  searchData: IDetailedItem
  reviewsData: Review[]
}

export const Details = ({ searchData, reviewsData }: IDetailsProps) => {
  const averageRating =
    reviewsData.reduce((acc, review) => acc + review.rating, 0) /
    reviewsData.length
  const totalRatings = reviewsData.length
  const cover = searchData.coverUrl ?? '/images/no-poster-available.webp'

  return (
    <div className='flex gap-4 max-md:flex-col'>
      <ReviewCover
        size='lg'
        coverUrl={cover}
        title={searchData.title}
        type={searchData.type}
        className='mx-auto md:mx-0'
      />
      <div>
        <div className='mb-2 flex flex-wrap gap-2'>
          {searchData.badges.map((badge) => (
            <div
              key={badge}
              className='border-border/50 bg-secondary/20 text-secondary flex w-fit items-center rounded-full border px-3 py-1'>
              <span className='text-xs font-semibold'>{badge}</span>
            </div>
          ))}
        </div>
        <h1 className='font-roboto-slab mb-4 text-3xl font-bold md:text-4xl'>
          {searchData.title}
        </h1>
        <div
          className={cn('flex items-center gap-3', {
            'mb-6': !!searchData.description
          })}>
          <StarRating rating={averageRating} />
          <span className='text-muted-foreground text-base font-medium'>
            {totalRatings} {getPluralRating(totalRatings)}
          </span>
        </div>
        <Show when={!!searchData.description}>
          <p className='text-foreground/90 text-base leading-relaxed'>
            {searchData.description}
          </p>
        </Show>
      </div>
    </div>
  )
}
