import { Button } from '@heroui/button'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@heroui/modal'
import { Trash2Icon } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import type { ContentType } from '~/generated/prisma'
import { useDeleteWishlistItem } from '../hooks/useDeleteWishlistItem'

interface IDeleteWishlistItemButtonProps {
  id: string
  title: string
  type: ContentType
}

export const DeleteWishlistItemButton = ({
  id,
  title,
  type
}: IDeleteWishlistItemButtonProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { handleDelete, isDeleting } = useDeleteWishlistItem(onOpenChange)

  return (
    <>
      <Button
        isIconOnly
        variant='flat'
        color='danger'
        aria-label='Удалить из ожиданий'
        onPress={onOpen}
        className='hover:scale-110'>
        <Trash2Icon size={20} />
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
                  Удалить этот объект из списка ожиданий?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='default'
                  variant='light'
                  onPress={onClose}
                  isDisabled={isDeleting}>
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
