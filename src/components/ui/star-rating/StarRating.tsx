import { cn } from '@heroui/theme'
import { StarIcon } from 'lucide-react'
import { MAX_RATING } from '~/constants/review'

interface IStarRatingProps {
  rating: number
  onChange: (value: number) => void
}

export const StarRating = ({ rating, onChange }: IStarRatingProps) => {
  return (
    <div className='flex items-center gap-1'>
      {Array.from({ length: MAX_RATING }, (_, index) => {
        const isFilled = index + 1 <= rating
        return (
          <button
            key={index}
            type='button'
            className='size-7 cursor-pointer transition-transform hover:scale-120'>
            <StarIcon
              className={cn(
                'size-full transition-colors',
                isFilled ? 'fill-yellow text-yellow' : 'fill-muted text-muted'
              )}
              onClick={() => onChange(index + 1)}
            />
          </button>
        )
      })}
      <span className='text-muted-foreground ml-2 text-base font-semibold'>
        / {rating}
      </span>
    </div>
  )
}
