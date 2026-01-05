import { Button } from '@heroui/button'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@heroui/modal'
import { addToast } from '@heroui/toast'
import type { ContentType } from 'generated/prisma'
import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { deleteReview } from '~/actions/reviews.actions'
import { Badge } from '~/components/ui/badge'

interface IDeleteReviewProps {
  id: string
  title: string
  type: ContentType
}

export const DeleteReview = ({ id, title, type }: IDeleteReviewProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)

      await deleteReview({ id })

      addToast({
        title: 'Успешно',
        description: 'Ваш отзыв успешно удален!'
      })
      onOpenChange()
    } catch (error) {
      console.error('Error deleting rating: ', error)

      addToast({
        title: 'Ошибка',
        description: 'Произошла ошибка при удалении отзыва'
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Button
        isIconOnly
        size='sm'
        variant='flat'
        color='danger'
        onPress={onOpen}>
        <Trash2Icon size={16} />
      </Button>
      <Modal
        placement='center'
        isOpen={isOpen}
        onOpenChange={isDeleting ? undefined : onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='mr-4 flex gap-2'>
                <p className='truncate'>{title}</p>
                <Badge type={type} />
              </ModalHeader>
              <ModalBody>
                <p className='text-base'>
                  Вы уверены, что хотите удалить этот отзыв?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='default'
                  variant='light'
                  onPress={onClose}
                  disabled={isDeleting}>
                  Отмена
                </Button>
                <Button
                  color='danger'
                  onPress={handleDelete}
                  isLoading={isDeleting}>
                  {isDeleting ? 'Удаление...' : 'Удалить'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
