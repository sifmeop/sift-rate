import { addToast } from '@heroui/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type {
  IRatingCardData,
  ISelectedTargetItem
} from '~/components/features/rating'
import { MAX_RATING } from '~/constants/review'
import { api } from '~/trpc/react'
import {
  createReviewSchema,
  type CreateReviewSchemaType
} from '~/utils/validators'

export const useRateSubmit = (
  selectedTargetItem: ISelectedTargetItem,
  reset: () => void
) => {
  const utils = api.useUtils()
  const { mutateAsync, isPending: isCreating } = api.review.create.useMutation({
    onSuccess: (data, variables) => {
      const transformedData: IRatingCardData = {
        createdAt: data.createdAt,
        id: data.id,
        itemReview: {
          title: variables.title,
          coverUrl: variables.coverUrl ?? null,
          type: variables.type,
          externalId: variables.externalId
        },
        itemReviewId: data.itemReviewId,
        rating: data.rating,
        review: data.review,
        userId: data.userId
      }

      utils.review.getReviews.setData(undefined, (oldData) => {
        if (!oldData) return
        return [transformedData, ...oldData]
      })

      const currentYear = new Date().getFullYear()
      const currentMonth = new Date().getMonth()

      utils.review.getTimelineStats.setData(undefined, (oldData) => {
        if (oldData?.[currentYear]?.months?.[currentMonth]) {
          const isBest = data.rating === MAX_RATING

          oldData[currentYear].total++
          oldData[currentYear].months[currentMonth].total++

          if (isBest) {
            oldData[currentYear].best++
            oldData[currentYear].months[currentMonth].best++
          }
        }

        return oldData
      })

      const from = new Date(currentYear, 0, 1).toISOString()
      const to = new Date(currentYear, 11, 31).toISOString()

      utils.review.getReviewsByDate.setData({ from, to }, (oldData) => {
        if (!oldData) return
        return [transformedData, ...oldData]
      })

      const itemReviewTransformedData = {
        ...transformedData,
        user: data.user
      }

      utils.review.getItemReviews.setData(
        { externalId: variables.externalId },
        (oldData) => {
          if (!oldData) return
          return [itemReviewTransformedData, ...oldData]
        }
      )
    }
  })

  const { register, setValue, handleSubmit, watch } =
    useForm<CreateReviewSchemaType>({
      defaultValues: {
        coverUrl: selectedTargetItem.coverUrl,
        externalId: selectedTargetItem.externalId,
        releaseDate: selectedTargetItem.releaseDate,
        title: selectedTargetItem.title,
        type: selectedTargetItem.type,
        rating: 0,
        review: ''
      },
      resolver: zodResolver(createReviewSchema)
    })

  const onSubmit = handleSubmit(async (data: CreateReviewSchemaType) => {
    try {
      await mutateAsync(data)

      reset()
      addToast({
        title: 'Успешно',
        description: 'Ваш отзыв успешно создан!'
      })
    } catch (error) {
      console.error('Error creating rating: ', error)

      const isUniqueError =
        error instanceof Error && error.message.includes('Unique constraint')

      addToast({
        title: 'Ошибка',
        description: isUniqueError
          ? 'Отзыв на этот объект уже создан'
          : 'При создании отзыва произошла ошибка'
      })
    }
  })

  return {
    register,
    setValue,
    isCreating,
    watch,
    onSubmit
  }
}
