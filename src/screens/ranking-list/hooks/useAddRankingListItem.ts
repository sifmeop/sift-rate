import { addToast } from '@heroui/toast'
import { api } from '~/trpc/react'

export const useAddRankingListItem = () => {
  const utils = api.useUtils()
  const { mutateAsync, isPending: isAdding } =
    api.review.addItemToRatingList.useMutation({
      onError: (error) => {
        console.error('Error adding item to ranking list:', error)

        const isUniqueError =
          error instanceof Error && error.message.includes('Unique constraint')

        addToast({
          title: 'Ошибка',
          description: isUniqueError
            ? 'Этот объект уже есть в списке'
            : 'Не удалось добавить объект в список'
        })
      }
    })

  const handleAdd = async ({
    rankingListId,
    itemReviewId
  }: {
    rankingListId: string
    itemReviewId: string
  }) => {
    try {
      await mutateAsync({ rankingListId, itemReviewId })
      await utils.review.getRatingList.invalidate()

      addToast({
        title: 'Успешно',
        description: 'Объект добавлен в список'
      })
    } catch (error) {
      console.error('Add ranking list item submit failed:', error)
    }
  }

  return {
    isAdding,
    handleAdd
  }
}
