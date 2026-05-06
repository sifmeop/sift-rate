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
  onClose: () => void
}

export const useUpdateRankingList = ({
  ratingListId,
  defaultTitle,
  onClose
}: IUseUpdateRankingListOptions) => {
  const utils = api.useUtils()

  const { mutateAsync, isPending: isUpdating } =
    api.review.updateRatingList.useMutation({
      onMutate: async (newData) => {
        await utils.review.getRatingList.cancel()

        const prevData = utils.review.getRatingList.getData()

        utils.review.getRatingList.setData(undefined, (oldData) => {
          if (!oldData) return

          const updatedData = oldData.map((item) => {
            if (item.id === newData.id) {
              return {
                ...item,
                title: newData.title
              }
            }

            return item
          })

          return updatedData
        })

        reset({
          title: newData.title
        })
        onClose()
        addToast({
          title: 'Успешно',
          description: 'Название обновлено'
        })

        return { prevData }
      },
      onError: (_, __, ctx) => {
        utils.review.getRatingList.setData(undefined, ctx?.prevData)

        addToast({
          title: 'Ошибка',
          description: 'Не удалось обновить название'
        })
      },
      onSettled: () => {
        void utils.review.getRatingList.invalidate()
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
    } catch (error) {
      console.error('Update ranking list submit failed:', error)
    }
  })

  const handleClose = () => {
    reset()
    onClose?.()
  }

  return {
    register,
    reset,
    onSubmit,
    isUpdating,
    title,
    handleClose
  }
}
