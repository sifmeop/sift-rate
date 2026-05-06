import dynamic from 'next/dynamic'
import { useState } from 'react'
import { EmptyState } from '~/components/ui/query'
import { useUpdateRankingListItemPosition } from '../hooks/useUpdateRankingListItemPosition'
import type { RankingListWithItems } from '../types'
import { DeleteRankingListButton } from './DeleteRankingListButton'
import { RankingListItemRow } from './RankingListItemRow'

const AddRankingListItemButton = dynamic(
  () => import('./AddRankingListItemButton')
)

interface IRankingListCardContentProps {
  list: RankingListWithItems
}

export const RankingListCardContent = ({
  list
}: IRankingListCardContentProps) => {
  const { items } = list
  const [activeMoveState, setActiveMoveState] = useState<{
    itemId: string
    action: 'up' | 'down' | 'modal'
  } | null>(null)
  const { handleMove, isUpdating } = useUpdateRankingListItemPosition()

  if (items.length === 0) {
    return (
      <div className='space-y-4'>
        <div className='flex justify-end gap-3 max-md:grid max-md:grid-cols-2'>
          <AddRankingListItemButton rankingList={list} />
          <DeleteRankingListButton id={list.id} title={list.title} />
        </div>
        <div className='rounded-xl border border-dashed border-white/10 bg-white/3 p-4'>
          <EmptyState message='Пока список пуст' />
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap justify-end gap-3 max-md:grid max-md:grid-cols-2'>
        <AddRankingListItemButton rankingList={list} />
        <DeleteRankingListButton id={list.id} title={list.title} />
      </div>

      {items.map((item) => (
        <RankingListItemRow
          key={item.id}
          item={item}
          maxPosition={items.length}
          isUpdating={isUpdating}
          loadingAction={
            activeMoveState?.itemId === item.id ? activeMoveState.action : null
          }
          onMove={async (targetPosition, action) => {
            setActiveMoveState({
              itemId: item.id,
              action
            })
            const isSuccess = await handleMove({
              rankingListItemId: item.id,
              targetPosition
            })
            setActiveMoveState(null)
            return isSuccess
          }}
        />
      ))}
    </div>
  )
}
