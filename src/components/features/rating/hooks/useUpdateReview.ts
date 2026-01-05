import { addToast } from '@heroui/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateReview } from '~/actions/reviews.actions'
import {
  updateReviewSchema,
  type UpdateReviewSchemaType
} from '~/utils/validators'

export const useUpdateReview = (
  defaultValues: UpdateReviewSchemaType,
  onClose: () => void
) => {
  const [isUpdating, setIsUpdating] = useState(false)

  const { register, setValue, handleSubmit, watch } =
    useForm<UpdateReviewSchemaType>({
      defaultValues,
      resolver: zodResolver(updateReviewSchema)
    })

  const onSubmit = handleSubmit(async (data: UpdateReviewSchemaType) => {
    setIsUpdating(true)

    try {
      await updateReview(data)

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
    } finally {
      setIsUpdating(false)
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
