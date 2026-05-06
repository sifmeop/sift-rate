import { useDisclosure } from '@heroui/modal'
import { cn } from '@heroui/theme'
import { ChevronDownIcon } from 'lucide-react'
import type { RankingListWithItems } from '../types'
import { RankingListCardContent } from './RankingListCardContent'
import { UpdateRatingListTitleModal } from './UpdateRatingListTitleModal'

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)

interface IRankingListCardProps {
  list: RankingListWithItems
}

export const RankingListCard = ({ list }: IRankingListCardProps) => {
  const { isOpen: isExpanded, onOpenChange } = useDisclosure()

  return (
    <article className='bg-card-background border-border overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md'>
      <div
        role='button'
        className='flex w-full items-center justify-between gap-4 p-5 text-left max-lg:flex-col'
        onClick={onOpenChange}
        aria-expanded={isExpanded}>
        <div className='space-y-2 max-lg:w-full'>
          <div className='flex items-center gap-2'>
            <span className='text-muted-foreground text-xs'>
              {formatDate(list.createdAt)}
            </span>
          </div>
          <div className='flex items-center gap-2.5 overflow-hidden'>
            <h2 className='font-roboto-slab line-clamp-2 text-xl font-bold tracking-tight'>
              {list.title}
            </h2>
            <UpdateRatingListTitleModal
              ratingListId={list.id}
              defaultTitle={list.title}
            />
          </div>
        </div>
        <div className='flex shrink-0 items-center gap-3 max-lg:w-full max-lg:justify-end'>
          <div className='bg-card-background-secondary rounded-full px-3 py-1 text-sm font-medium'>
            {list.items.length}{' '}
            {list.items.length === 1 ? 'объект' : 'объектов'}
          </div>
          <ChevronDownIcon
            className={cn(
              'text-muted-foreground size-5 transition-transform duration-200',
              {
                'rotate-180': isExpanded
              }
            )}
          />
        </div>
      </div>

      {isExpanded && (
        <div className='border-border bg-card-background-secondary/40 border-t px-5 py-4'>
          <RankingListCardContent list={list} />
        </div>
      )}
    </article>
  )
}
