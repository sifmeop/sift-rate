import { addToast } from '@heroui/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '~/trpc/react'
import {
  createRankingListSchema,
  type CreateRankingListSchemaType
} from '~/utils/validators'

interface IUseCreateRankingListOptions {
  onClose: () => void
}

export const useCreateRankingList = ({
  onClose
}: IUseCreateRankingListOptions) => {
  const utils = api.useUtils()

  const { mutateAsync, isPending: isCreating } =
    api.review.createRatingList.useMutation({
      onMutate: async (newData) => {
        await utils.review.getRatingList.cancel()

        const prevData = utils.review.getRatingList.getData()

        utils.review.getRatingList.setData(undefined, (oldData) => {
          const newItem = {
            id: crypto.randomUUID(),
            title: newData.title,
            userId: crypto.randomUUID(),
            createdAt: new Date(),
            items: []
          }

          if (!oldData) return [newItem]

          return [newItem, ...oldData]
        })

        reset()
        onClose()
        addToast({
          title: 'Успешно',
          description: 'Список рейтинга создан'
        })

        return { prevData }
      },
      onError: (_, __, ctx) => {
        utils.review.getRatingList.setData(undefined, ctx?.prevData)

        addToast({
          title: 'Ошибка',
          description: 'Не удалось создать список рейтинга'
        })
      },
      onSettled: () => {
        void utils.review.getRatingList.invalidate()
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
