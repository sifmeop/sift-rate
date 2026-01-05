import { cn } from '@heroui/theme'
import { Star } from 'lucide-react'
import { MAX_RATING } from '~/constants/review'

interface IRatingProps {
  rating: number
}

export const Rating = ({ rating }: IRatingProps) => {
  const isTopRated = rating === MAX_RATING

  return (
    <div
      className={cn(
        'flex w-fit items-center gap-1 rounded-2xl px-2.5 py-1',
        isTopRated ? 'bg-yellow/15 ring-yellow/30 ring-1' : 'bg-muted/70'
      )}>
      <Star
        className={cn(
          'h-4 w-4',
          isTopRated ? 'fill-yellow text-yellow' : 'fill-yellow text-yellow'
        )}
      />
      <span
        className={cn('text-sm font-bold tabular-nums', {
          'text-yellow': isTopRated
        })}>
        {rating}
      </span>
    </div>
  )
}
