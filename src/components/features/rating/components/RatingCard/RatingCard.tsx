'use client'

import { cn } from '@heroui/theme'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import { Calendar, Quote } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { ReviewCover } from '~/components/ui/review-cover'
import { Show } from '~/components/ui/show'
import { MAX_RATING } from '~/constants/review'
import type { IRatingCardData } from '../../types/rating.types'
import { DeleteReview } from './DeleteReview'
import { Rating } from './Rating'
import { UpdateReview } from './UpdateReview'

type IRatingCardProps = IRatingCardData

export const RatingCard = ({
  id,
  rating,
  review,
  type,
  createdAt,
  itemReview: { title, coverUrl }
}: IRatingCardProps) => {
  const isTopRated = rating === MAX_RATING
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(createdAt)
  const isToday = dayjs(createdAt).isSame(dayjs(), 'day')

  return (
    <motion.div
      key={id}
      className={cn(
        'group relative flex flex-col gap-4 rounded-xl border p-4 transition-all duration-300 hover:shadow-lg md:flex-row',
        isTopRated
          ? 'from-yellow/10 via-card to-card border-yellow/30 hover:border-yellow/50 hover:shadow-yellow/10 bg-linear-to-r'
          : 'bg-card-background hover:bg-card-background-secondary/80 border-border'
      )}>
      <div className='device-touch:opacity-100 absolute top-4 right-4 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <UpdateReview
          id={id}
          title={title}
          type={type}
          initReview={review}
          initRating={rating}
        />
        <DeleteReview id={id} title={title} type={type} />
      </div>
      <Show when={isTopRated}>
        <div className='from-yellow/10 pointer-events-none absolute -inset-px rounded-xl bg-linear-to-r to-transparent opacity-0 blur-xl transition-opacity group-hover:opacity-100' />
      </Show>
      <ReviewCover title={title} coverUrl={coverUrl} type={type} />
      <div className='flex w-full flex-col gap-2'>
        {/* <div className='flex items-center justify-between gap-2'> */}
        <div className='flex gap-2'>
          <Badge type={type} />
          <Show when={isTopRated}>
            <Badge type='BEST' />
          </Show>
        </div>
        <h3 className='font-roboto-slab line-clamp-2 text-xl font-bold'>
          {title}
        </h3>
        <div className='flex items-center gap-3'>
          <Rating rating={rating} />
          <div className='text-muted-foreground flex items-center gap-1.5'>
            <Calendar className='size-3.5' />
            <span
              className={cn('text-xs', {
                'text-white': isToday
              })}>
              {formattedDate}
            </span>
          </div>
        </div>
        {review && (
          <div className='bg-muted/40 border-yellow/50 relative mt-3 rounded-lg border-l-2 p-3 pl-4 backdrop-blur-sm'>
            <Quote className='text-yellow/50 absolute -top-2.5 left-2 size-5' />
            <p className='text-foreground/85 text-sm leading-relaxed whitespace-pre-wrap italic'>
              {review}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
