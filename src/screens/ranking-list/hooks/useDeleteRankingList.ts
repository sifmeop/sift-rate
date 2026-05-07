import { addToast } from '@heroui/toast'
import { api } from '~/trpc/react'

interface IUseDeleteRankingListOptions {
  onClose: () => void
}

export const useDeleteRankingList = ({
  onClose
}: IUseDeleteRankingListOptions) => {
  const utils = api.useUtils()

  const { mutateAsync, isPending: isDeleting } =
    api.review.deleteRatingList.useMutation({
      onMutate: async (newData) => {
        await utils.review.getRankingList.cancel()

        const prevData = utils.review.getRankingList.getData()

        utils.review.getRankingList.setData(undefined, (oldData) => {
          if (!oldData) return

          const filteredData = oldData.filter((item) => item.id !== newData.id)

          return filteredData
        })

        onClose()
        addToast({
          title: 'Успешно',
          description: 'Список рейтинга удален'
        })

        return { prevData }
      },
      onError: (_, __, ctx) => {
        utils.review.getRankingList.setData(undefined, ctx?.prevData)

        addToast({
          title: 'Ошибка',
          description: 'Не удалось удалить список рейтинга'
        })
      },
      onSettled: () => {
        void utils.review.getRankingList.invalidate()
      }
    })

  const handleDelete = async (id: string) => {
    try {
      await mutateAsync({ id })
    } catch (error) {
      console.error('Delete ranking list submit failed:', error)
    }
  }

  return {
    isDeleting,
    handleDelete
  }
}
