import { Button } from '@heroui/button'
import { Tooltip } from '@heroui/tooltip'
import { EyeIcon, StarIcon } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '~/components/ui/badge'
import { ReviewCover } from '~/components/ui/review-cover'
import { Show } from '~/components/ui/show'
import { ContentType } from '~/generated/prisma'
import { useFetchWatchContent } from '../../rating/hooks/useFetchWatchContent'
import type { WishlistItemData } from '../types/wishlist.types'
import { formatWishlistDate } from '../utils/formatWishlistDate'
import { DeleteWishlistItemButton } from './DeleteWishlistItemButton'

interface IWishlistItemCardProps {
  item: WishlistItemData
}

export const WishlistItemCard = ({ item }: IWishlistItemCardProps) => {
  const { isFetching, fetchWatchContent } = useFetchWatchContent()

  const rateHref = `/rate/${item.itemReview.type.toLowerCase()}/${item.itemReview.externalId}`

  const isVideoContent =
    item.itemReview.type === ContentType.MOVIE ||
    item.itemReview.type === ContentType.TV

  return (
    <article className='bg-card-background border-border hover:border-secondary/50 flex flex-col gap-4 rounded-2xl border p-4 transition-colors sm:flex-row sm:items-center'>
      <ReviewCover
        category={item.itemReview.type}
        title={item.itemReview.title}
        coverUrl={item.itemReview.coverUrl}
        className='w-24'
      />
      <div className='min-w-0 flex-1 space-y-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <Badge type={item.itemReview.type} size='sm' />
          <span className='text-muted-foreground text-xs'>
            Добавлено {formatWishlistDate(item.createdAt)}
          </span>
        </div>
        <h2 className='line-clamp-2 text-lg font-semibold'>
          {item.itemReview.title}
        </h2>
      </div>
      <div className='flex shrink-0 items-center gap-2 self-center max-lg:self-end'>
        <Show when={isVideoContent}>
          <Tooltip content='Смотреть'>
            <Button
              isIconOnly
              color='primary'
              variant='flat'
              isLoading={isFetching}
              onPress={
                isVideoContent
                  ? () => fetchWatchContent(item.itemReview.title)
                  : undefined
              }
              className='hover:scale-110'>
              <EyeIcon size={20} />
            </Button>
          </Tooltip>
        </Show>
        <Tooltip content='Оценить'>
          <Button
            isIconOnly
            as={Link}
            href={rateHref}
            color='secondary'
            variant='flat'
            className='hover:scale-110'>
            <StarIcon size={20} />
          </Button>
        </Tooltip>
        <DeleteWishlistItemButton
          id={item.id}
          title={item.itemReview.title}
          type={item.itemReview.type}
        />
      </div>
    </article>
  )
}
