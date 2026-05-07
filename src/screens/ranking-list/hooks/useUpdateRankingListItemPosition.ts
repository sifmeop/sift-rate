import { addToast } from '@heroui/toast'
import { api } from '~/trpc/react'

export const useUpdateRankingListItemPosition = () => {
  const utils = api.useUtils()

  const { mutateAsync, isPending: isUpdating } =
    api.review.updateRankingListItemPosition.useMutation({
      onError: (error) => {
        console.error('Error updating ranking list item position:', error)

        addToast({
          title: 'Ошибка',
          description: 'Не удалось изменить позицию в списке'
        })
      }
    })

  const handleMove = async ({
    rankingListItemId,
    targetPosition
  }: {
    rankingListItemId: string
    targetPosition: number
  }) => {
    try {
      await mutateAsync({ rankingListItemId, targetPosition })
      await utils.review.getRankingList.invalidate()

      addToast({
        title: 'Успешно',
        description: 'Позиция в списке обновлена'
      })
      return true
    } catch (error) {
      console.error('Update ranking list item position submit failed:', error)
      return false
    }
  }

  return {
    isUpdating,
    handleMove
  }
}
