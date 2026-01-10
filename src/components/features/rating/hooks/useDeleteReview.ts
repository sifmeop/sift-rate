import { addToast } from '@heroui/toast'
import { MAX_RATING } from '~/constants/review'
import { api } from '~/trpc/react'

export const useDeleteReview = (onClose: () => void) => {
  const utils = api.useUtils()
  const { mutateAsync, isPending: isDeleting } = api.review.delete.useMutation({
    onSuccess: (data, variables) => {
      utils.review.getReviews.setData(undefined, (oldData) => {
        if (!oldData) return
        return oldData.filter((item) => item.id !== variables.id)
      })

      const reviewYear = new Date(data.createdAt).getFullYear()
      const reviewMonth = new Date(data.createdAt).getMonth()

      utils.review.getTimelineStats.setData(undefined, (oldData) => {
        if (oldData?.[reviewYear]?.months?.[reviewMonth]) {
          const isBest = data.rating === MAX_RATING

          oldData[reviewYear].total--
          oldData[reviewYear].months[reviewMonth].total--

          if (isBest) {
            oldData[reviewYear].best--
            oldData[reviewYear].months[reviewMonth].best--
          }
        }

        return oldData
      })

      const from = new Date(reviewYear, 0, 1).toISOString()
      const to = new Date(reviewYear, 11, 31).toISOString()

      utils.review.getReviewsByDate.setData({ from, to }, (oldData) => {
        if (!oldData) return
        return oldData.filter((item) => item.id !== variables.id)
      })
    }
  })

  const handleDelete = async (id: string) => {
    try {
      await mutateAsync({ id })

      addToast({
        title: 'Успешно',
        description: 'Ваш отзыв успешно удален!'
      })
      onClose()
    } catch (error) {
      console.error('Error deleting rating: ', error)

      addToast({
        title: 'Ошибка',
        description: 'Произошла ошибка при удалении отзыва'
      })
    }
  }

  return {
    isDeleting,
    handleDelete
  }
}
