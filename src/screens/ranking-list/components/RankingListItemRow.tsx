import { Button } from '@heroui/button'
import { cn } from '@heroui/theme'
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { ReviewCover } from '~/components/ui/review-cover'
import type { RankingListWithItems } from '../types'
import { MoveRankingListItemModal } from './MoveRankingListItemModal'

const getPositionStyles = (position: number) => {
  if (position === 1) {
    return 'border-yellow/40 bg-linear-to-br from-yellow/35 via-yellow/20 to-amber-500/25 text-yellow shadow-[0_0_24px_rgba(234,179,8,0.24)]'
  }

  if (position === 2) {
    return 'border-slate-300/35 bg-linear-to-br from-slate-200/30 via-slate-300/20 to-slate-400/20 text-slate-100 shadow-[0_0_20px_rgba(203,213,225,0.2)]'
  }

  if (position === 3) {
    return 'border-amber-700/40 bg-linear-to-br from-amber-700/35 via-orange-700/20 to-amber-900/25 text-amber-200 shadow-[0_0_20px_rgba(180,83,9,0.22)]'
  }

  return 'border-border bg-card-background-secondary text-foreground shadow-none'
}

interface IRankingListItemRowProps {
  item: RankingListWithItems['items'][number]
  maxPosition: number
  isUpdating: boolean
  loadingAction: 'up' | 'down' | 'modal' | null
  onMove: (
    targetPosition: number,
    action: 'up' | 'down' | 'modal'
  ) => Promise<boolean>
}

export const RankingListItemRow = ({
  item,
  maxPosition,
  isUpdating,
  loadingAction,
  onMove
}: IRankingListItemRowProps) => {
  const canMoveUp = item.position > 1
  const canMoveDown = item.position < maxPosition
  const badgeClassName = getPositionStyles(item.position)

  return (
    <div className='bg-card-background border-border flex items-center gap-5 rounded-xl border p-3 pl-5'>
      <div
        className={cn(
          'flex size-12 shrink-0 items-center justify-center rounded-full border text-base font-black',
          badgeClassName
        )}>
        {item.position}
      </div>

      <ReviewCover
        title={item.itemReview.title}
        coverUrl={item.itemReview.coverUrl}
        className='w-24'
      />

      <div className='min-w-0 flex-1 space-y-2'>
        <Badge type={item.itemReview.type} />
        <p className='font-semibold'>{item.itemReview.title}</p>
      </div>

      <div className='flex flex-col gap-2'>
        <Button
          isIconOnly
          size='sm'
          variant='flat'
          isDisabled={!canMoveUp || isUpdating}
          isLoading={loadingAction === 'up' && isUpdating && canMoveUp}
          onPress={() => onMove(item.position - 1, 'up')}>
          <ArrowUpIcon size={16} />
        </Button>
        <Button
          isIconOnly
          size='sm'
          variant='flat'
          isDisabled={!canMoveDown || isUpdating}
          isLoading={loadingAction === 'down' && isUpdating && canMoveDown}
          onPress={() => onMove(item.position + 1, 'down')}>
          <ArrowDownIcon size={16} />
        </Button>
      </div>

      <MoveRankingListItemModal
        title={item.itemReview.title}
        currentPosition={item.position}
        maxPosition={maxPosition}
        isUpdating={loadingAction === 'modal' && isUpdating}
        onConfirm={(targetPosition) => onMove(targetPosition, 'modal')}
      />
    </div>
  )
}
