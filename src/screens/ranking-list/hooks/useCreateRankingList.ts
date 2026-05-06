import { addToast } from '@heroui/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '~/trpc/react'
import {
  createRankingListSchema,
  type CreateRankingListSchemaType
} from '~/utils/validators'

interface IUseCreateRankingListOptions {
  onClose?: () => void
}

export const useCreateRankingList = ({
  onClose
}: IUseCreateRankingListOptions) => {
  const utils = api.useUtils()

  const { mutateAsync, isPending: isCreating } =
    api.review.createRatingList.useMutation({
      onError: (error) => {
        console.error('Error creating ranking list:', error)

        addToast({
          title: 'Ошибка',
          description: 'Не удалось создать список рейтинга'
        })
      }
    })

  const { register, handleSubmit, reset, watch } =
    useForm<CreateRankingListSchemaType>({
      defaultValues: {
        title: ''
      },
      resolver: zodResolver(createRankingListSchema)
    })

  const title = watch('title')

  const onSubmit = handleSubmit(async (data) => {
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
