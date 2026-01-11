import { User } from 'lucide-react'
import Image from 'next/image'
import type { IReviewDetail } from '~/components/features/rating'
import { Show } from '~/components/ui/show'
import { StarRating } from './StarRating'

type TReviewProps = IReviewDetail

export const ReviewItem = ({
  rating,
  review,
  createdAt,
  user
}: TReviewProps) => {
  return (
    <div className='bg-card-background border-border rounded-xl border p-4'>
      <div className='flex items-start gap-3'>
        <div className='bg-secondary flex size-10 shrink-0 items-center justify-center rounded-full'>
          {user.image ? (
            <Image
              width={40}
              height={40}
              src={user.image}
              alt={user.name ?? 'user'}
              className='size-full rounded-full object-cover'
            />
          ) : (
            <User className='text-muted-foreground h-5 w-5' />
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <h4 className='font-roboto-slab leading-[0.9] font-medium'>
            {user.name}
          </h4>
          <div className='flex items-center gap-2 max-sm:flex-col max-sm:items-start'>
            <StarRating rating={rating} />
            <span className='text-muted-foreground text-xs'>
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
          <Show when={!!review}>
            <p className='text-foreground/85 leading-whitespace-pre-wrap text-sm'>
              {review}
            </p>
          </Show>
          {/* <div className="mt-3 flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <ThumbsUp className="w-4 h-4 mr-1" />
              {helpful}
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  )
}
