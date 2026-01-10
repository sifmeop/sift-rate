import { addToast } from '@heroui/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { MAX_RATING } from '~/constants/review'
import { api } from '~/trpc/react'
import {
  updateReviewSchema,
  type UpdateReviewSchemaType
} from '~/utils/validators'

export const useUpdateReview = (
  defaultValues: UpdateReviewSchemaType,
  onClose: () => void
) => {
  const utils = api.useUtils()
  const { mutateAsync, isPending: isUpdating } = api.review.update.useMutation({
    onSuccess: (data) => {
      utils.review.getReviews.setData(undefined, (oldData) => {
        if (!oldData) return
        return oldData.map((review) => {
          if (review.id === data.id) {
            return {
              ...review,
              rating: data.rating,
              review: data.review
            }
          }
          return review
        })
      })

      const reviewYear = new Date(data.createdAt).getFullYear()
      const reviewMonth = new Date(data.createdAt).getMonth()

      utils.review.getTimelineStats.setData(undefined, (oldData) => {
        if (
          oldData?.[reviewYear]?.months?.[reviewMonth] &&
          defaultValues.rating !== data.rating
        ) {
          const isBest = data.rating === MAX_RATING
          const delta = data.rating > defaultValues.rating ? 1 : -1

          oldData[reviewYear].total += delta
          oldData[reviewYear].months[reviewMonth].total += delta

          if (isBest) {
            oldData[reviewYear].best += delta
            oldData[reviewYear].months[reviewMonth].best += delta
          }
        }

        return oldData
      })

      const from = new Date(reviewYear, 0, 1).toISOString()
      const to = new Date(reviewYear, 11, 31).toISOString()

      utils.review.getReviewsByDate.setData({ from, to }, (oldData) => {
        if (!oldData) return
        return oldData.map((review) => {
          if (review.id === data.id) {
            return {
              ...review,
              rating: data.rating,
              review: data.review
            }
          }
          return review
        })
      })
    }
  })

  const { register, setValue, handleSubmit, watch } =
    useForm<UpdateReviewSchemaType>({
      defaultValues,
      resolver: zodResolver(updateReviewSchema)
    })

  const onSubmit = handleSubmit(async (data: UpdateReviewSchemaType) => {
    try {
      await mutateAsync(data)

      addToast({
        title: 'Успешно',
        description: 'Ваш отзыв успешно обновлен!'
      })
      onClose()
    } catch (error) {
      console.error('Error updating rating: ', error)

      addToast({
        title: 'Ошибка',
        description: 'Произошла ошибка при обновлении отзыва'
      })
    }
  })

  return {
    register,
    setValue,
    isUpdating,
    watch,
    onSubmit
  }
}
