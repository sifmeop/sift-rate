import { Button } from '@heroui/button'
import { PlusIcon } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { ReviewCover } from '~/components/ui/review-cover'
import type { ContentType } from '~/generated/prisma'
import type { ITargetItem } from '../../rating'
import type { WishlistSearchStatus } from '../types/wishlist.types'

const STATUS_LABEL: Record<WishlistSearchStatus, string> = {
  available: 'Добавить',
  added: 'В ожиданиях',
  reviewed: 'Уже оценено'
}

interface IWishlistSearchResultCardProps {
  item: ITargetItem
  type: ContentType
  status: WishlistSearchStatus
  isLoading: boolean
  onAdd: (item: ITargetItem) => void
}

export const WishlistSearchResultCard = ({
  item,
  type,
  status,
  isLoading,
  onAdd
}: IWishlistSearchResultCardProps) => {
  const isDisabled = status !== 'available' || isLoading

  return (
    <article className='group bg-card-background border-border hover:border-secondary/50 flex items-center gap-4 rounded-2xl border p-3 transition-colors max-lg:flex-col'>
      <ReviewCover
        category={type}
        title={item.title}
        coverUrl={item.cover}
        className='w-24'
      />
      <div className='min-w-0 flex-1 space-y-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <Badge type={type} size='sm' />
          {item.description && (
            <span className='text-muted-foreground line-clamp-1 text-xs'>
              {item.description}
            </span>
          )}
        </div>
        <h3 className='line-clamp-2 text-sm font-semibold sm:text-base'>
          {item.title}
        </h3>
      </div>
      <Button
        color={status === 'available' ? 'secondary' : 'default'}
        variant={status === 'available' ? 'solid' : 'flat'}
        isDisabled={isDisabled}
        isLoading={isLoading}
        startContent={
          status === 'available' && !isLoading ? (
            <PlusIcon className='size-4' />
          ) : null
        }
        onPress={() => onAdd(item)}
        className='max-lg:w-full'>
        {STATUS_LABEL[status]}
      </Button>
    </article>
  )
}
