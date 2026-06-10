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

export const useRateSubmit = (targetItem: ISelectedTargetItem) => {
  const utils = api.useUtils()

  const { mutateAsync, isPending: isCreating } = api.review.create.useMutation({
    onSuccess: (data) => {
      const transformedData: IRatingCardData = {
        createdAt: data.createdAt,
        id: data.id,
        itemReview: {
          title: data.itemReview.title,
          coverUrl: data.itemReview.coverUrl,
          type: data.itemReview.type,
          externalId: data.itemReview.externalId
        },
        itemReviewId: data.itemReviewId,
        rating: data.rating,
        review: data.review,
        userId: data.userId
      }

      const hasReview = utils.review.getReviewByExternalId.getData({
        externalId: data.itemReview.externalId,
        type: data.itemReview.type
      })

      utils.review.getReviewByExternalId.setData(
        {
          externalId: data.itemReview.externalId,
          type: data.itemReview.type
        },
        () => ({
          rating: data.rating,
          review: data.review
        })
      )

      utils.review.getReviews.setData(undefined, (oldData) => {
        if (!oldData) return

        if (hasReview) {
          return oldData.map((item) => {
            if (item.itemReview.externalId === data.itemReview.externalId) {
              return transformedData
            }

            return item
          })
        }

        return [transformedData, ...oldData]
      })

      const currentYear = new Date().getFullYear()
      const currentMonth = new Date().getMonth()

      if (!hasReview) {
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
      }

      const from = new Date(currentYear, 0, 1).toISOString()
      const to = new Date(currentYear, 11, 31).toISOString()

      utils.review.getReviewsByDate.setData({ from, to }, (oldData) => {
        if (!oldData) return

        if (hasReview) {
          return oldData.map((item) => {
            if (item.itemReview.externalId === data.itemReview.externalId) {
              return transformedData
            }

            return item
          })
        }

        return [transformedData, ...oldData]
      })

      utils.wishlist.getAll.setData(undefined, (oldData) => {
        if (!oldData) return
        return oldData.filter(
          (item) => item.itemReview.externalId !== data.itemReview.externalId
        )
      })
    }
  })

  const { control, handleSubmit } = useForm<CreateReviewSchemaType>({
    defaultValues: {
      coverUrl: targetItem.coverUrl,
      externalId: targetItem.externalId,
      title: targetItem.title,
      type: targetItem.type,
      rating: 0,
      review: ''
    },
    resolver: zodResolver(createReviewSchema)
  })

  const onSubmit = handleSubmit(async (data: CreateReviewSchemaType) => {
    try {
      const hasReview = utils.review.getReviewByExternalId.getData({
        externalId: data.externalId,
        type: data.type
      })

      if (
        hasReview?.rating === data.rating &&
        hasReview.review === data.review
      ) {
        addToast({
          title: 'Ошибка',
          description: 'Отзыв не изменился',
          color: 'danger'
        })
        return
      }

      await mutateAsync(data)

      addToast({
        title: 'Успешно',
        description: hasReview
          ? 'Ваш отзыв успешно обновлен!'
          : 'Ваш отзыв успешно создан!'
      })
    } catch (error) {
      console.error('Error creating rating: ', error)

      const isUniqueError =
        error instanceof Error && error.message.includes('Unique constraint')

      addToast({
        title: 'Ошибка',
        description: isUniqueError
          ? 'Отзыв на этот объект уже создан'
          : 'При создании отзыва произошла ошибка',
        color: 'danger'
      })
    }
  })

  return {
    control,
    isCreating,
    onSubmit
  }
}
