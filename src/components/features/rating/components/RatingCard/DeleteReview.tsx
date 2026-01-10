import { Button } from '@heroui/button'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@heroui/modal'
import type { ContentType } from 'generated/prisma'
import { Trash2Icon } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { useDeleteReview } from '../../hooks/useDeleteReview'

interface IDeleteReviewProps {
  id: string
  title: string
  type: ContentType
}

export const DeleteReview = ({ id, title, type }: IDeleteReviewProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { handleDelete, isDeleting } = useDeleteReview(onOpenChange)

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
                  onPress={() => handleDelete(id)}
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
