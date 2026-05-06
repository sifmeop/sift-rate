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
import { useDeleteRankingList } from '../hooks/useDeleteRankingList'

interface IDeleteRankingListButtonProps {
  id: string
  title: string
}

export const DeleteRankingListButton = ({
  id,
  title
}: IDeleteRankingListButtonProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { handleDelete, isDeleting } = useDeleteRankingList(onOpenChange)

  return (
    <>
      <Button
        color='danger'
        variant='flat'
        startContent={<Trash2Icon size={16} />}
        onPress={onOpen}>
        Удалить список
      </Button>
      <Modal
        placement='center'
        isOpen={isOpen}
        onOpenChange={isDeleting ? undefined : onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='font-roboto-slab text-xl font-bold'>
                {title}
              </ModalHeader>
              <ModalBody>
                <p className='text-base'>
                  Вы уверены, что хотите удалить этот список рейтинга?
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
                  onPress={() => void handleDelete(id)}
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
