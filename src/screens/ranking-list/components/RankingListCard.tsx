import { useDisclosure } from '@heroui/modal'
import { cn } from '@heroui/theme'
import { ChevronDownIcon } from 'lucide-react'
import type { RankingListWithItems } from '../types'
import { RankingListCardContent } from './RankingListCardContent'

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
      <button
        type='button'
        className='flex w-full items-center justify-between gap-4 p-5 text-left'
        onClick={onOpenChange}
        aria-expanded={isExpanded}>
        <div className='min-w-0 space-y-2'>
          <div className='flex items-center gap-2'>
            <span className='text-muted-foreground text-xs'>
              {formatDate(list.createdAt)}
            </span>
          </div>
          <h2 className='font-roboto-slab text-xl font-bold tracking-tight'>
            {list.title}
          </h2>
        </div>
        <div className='flex shrink-0 items-center gap-3'>
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
      </button>

      {isExpanded && (
        <div className='border-border bg-card-background-secondary/40 border-t px-5 py-4'>
          <RankingListCardContent list={list} />
        </div>
      )}
    </article>
  )
}
