import { addToast } from '@heroui/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '~/trpc/react'
import {
  updateRankingListSchema,
  type UpdateRankingListSchemaType
} from '~/utils/validators'

interface IUseUpdateRankingListOptions {
  ratingListId: string
  defaultTitle: string
  onClose?: () => void
}

export const useUpdateRankingList = ({
  ratingListId,
  defaultTitle,
  onClose
}: IUseUpdateRankingListOptions) => {
  const utils = api.useUtils()

  const { mutateAsync, isPending: isCreating } =
    api.review.updateRatingList.useMutation({
      onError: (error) => {
        console.error('Error creating ranking list:', error)

        addToast({
          title: 'Ошибка',
          description: 'Не удалось создать список рейтинга'
        })
      }
    })

  const { register, handleSubmit, reset, watch } =
    useForm<UpdateRankingListSchemaType>({
      defaultValues: {
        id: ratingListId,
        title: defaultTitle
      },
      resolver: zodResolver(updateRankingListSchema)
    })

  const title = watch('title')

  const onSubmit = handleSubmit(async (data) => {
    if (data.title.trim() === defaultTitle) {
      reset()
      onClose?.()
      return
    }

    try {
      await mutateAsync(data)
      await utils.review.getRatingList.invalidate()

      reset()
      onClose?.()
      addToast({
        title: 'Успешно',
        description: 'Список рейтинга создан'
      })
    } catch (error) {
      console.error('Create ranking list submit failed:', error)
    }
  })

  const handleClose = () => {
    reset()
    onClose?.()
  }

  return {
    register,
    onSubmit,
    isCreating,
    title,
    handleClose
  }
}
