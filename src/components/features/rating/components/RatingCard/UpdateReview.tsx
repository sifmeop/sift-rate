import { Button } from '@heroui/button'
import { Textarea } from '@heroui/input'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@heroui/modal'
import type { ContentType } from 'generated/prisma'
import { PencilIcon } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { StarRating } from '~/components/ui/star-rating'
import { MAX_REVIEW_LENGTH } from '~/constants/review'
import { useUpdateReview } from '../../hooks/useUpdateReview'

interface IUpdateReviewProps {
  id: string
  title: string
  initReview: string | null
  initRating: number
  type: ContentType
}

export const UpdateReview = ({
  id,
  title,
  initReview,
  initRating,
  type
}: IUpdateReviewProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const { register, onSubmit, isUpdating, watch, setValue } = useUpdateReview(
    {
      id,
      rating: initRating,
      review: initReview ?? ''
    },
    onOpenChange
  )

  const rating = watch('rating')
  const review = watch('review')

  return (
    <>
      <Button
        isIconOnly
        size='sm'
        variant='flat'
        color='warning'
        onPress={onOpen}>
        <PencilIcon size={16} />
      </Button>
      <Modal
        placement='center'
        isOpen={isOpen}
        onOpenChange={isUpdating ? undefined : onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={onSubmit}>
              <ModalHeader className='mr-4 flex gap-2'>
                <p className='truncate'>{title}</p>
                <Badge type={type} />
              </ModalHeader>
              <ModalBody>
                <Textarea
                  {...register('review')}
                  autoFocus
                  isClearable
                  label='Комментарий (опционально)'
                  placeholder='Поделитесь своими впечатлениями...'
                  variant='faded'
                  minRows={6}
                  maxLength={MAX_REVIEW_LENGTH}
                  description={`${review.length}/${MAX_REVIEW_LENGTH}`}
                />
                <div className='mb-6'>
                  <label className='text-foreground mb-3 block text-sm font-semibold'>
                    Рейтинг
                  </label>
                  <StarRating
                    rating={rating}
                    onChange={(value) => setValue('rating', value)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  type='button'
                  color='default'
                  variant='light'
                  onPress={onClose}
                  disabled={isUpdating}>
                  Отмена
                </Button>
                <Button color='danger' type='submit' isLoading={isUpdating}>
                  {isUpdating ? 'Обновляется...' : 'Обновить'}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
