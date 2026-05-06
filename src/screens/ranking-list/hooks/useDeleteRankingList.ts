import { addToast } from '@heroui/toast'
import { api } from '~/trpc/react'

export const useDeleteRankingList = (onClose: () => void) => {
  const utils = api.useUtils()
  const { mutateAsync, isPending: isDeleting } =
    api.review.deleteRatingList.useMutation({
      onError: (error) => {
        console.error('Error deleting ranking list:', error)

        addToast({
          title: 'Ошибка',
          description: 'Не удалось удалить список рейтинга'
        })
      }
    })

  const handleDelete = async (id: string) => {
    try {
      await mutateAsync({ id })
      await utils.review.getRatingList.invalidate()

      addToast({
        title: 'Успешно',
        description: 'Список рейтинга удален'
      })
      onClose()
    } catch (error) {
      console.error('Delete ranking list submit failed:', error)
    }
  }

  return {
    isDeleting,
    handleDelete
  }
}
