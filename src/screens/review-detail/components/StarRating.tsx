import { cn } from '@heroui/theme'
import { StarIcon } from 'lucide-react'
import { MAX_RATING } from '~/constants/review'

interface IStarRatingProps {
  rating: number
}

export const StarRating = ({ rating }: IStarRatingProps) => {
  return (
    <div className='flex items-center gap-1'>
      {Array.from({ length: MAX_RATING }).map((_, idx) => {
        const isFilled = idx + 1 <= rating
        return (
          <StarIcon
            key={idx}
            className={cn(
              'size-5 transition-colors',
              isFilled ? 'fill-yellow text-yellow' : 'fill-muted text-muted'
            )}
          />
        )
      })}
    </div>
  )
}
