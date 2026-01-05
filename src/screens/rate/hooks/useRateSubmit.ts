import { addToast } from '@heroui/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createReviewAction } from '~/actions/reviews.actions'
import {
  createReviewSchema,
  type CreateReviewSchemaType
} from '~/utils/validators'
import type { ISelectedTargetItem } from '../types/target.types'

export const useRateSubmit = (
  selectedTargetItem: ISelectedTargetItem,
  reset: () => void
) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    setIsSubmitting(true)

    try {
      await createReviewAction(data)

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
    } finally {
      setIsSubmitting(false)
    }
  })

  return {
    register,
    setValue,
    isSubmitting,
    watch,
    onSubmit
  }
}
