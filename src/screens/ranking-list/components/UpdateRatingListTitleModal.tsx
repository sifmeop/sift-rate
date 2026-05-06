import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@heroui/modal'
import { PencilIcon } from 'lucide-react'
import { useUpdateRankingList } from '../hooks/useUpdateRankingList'

interface UpdateRatingListTitleModalProps {
  ratingListId: string
  defaultTitle: string
}

export const UpdateRatingListTitleModal = ({
  ratingListId,
  defaultTitle
}: UpdateRatingListTitleModalProps) => {
  const { isOpen, onOpenChange } = useDisclosure()

  const { register, onSubmit, isCreating, title, handleClose } =
    useUpdateRankingList({
      ratingListId,
      defaultTitle,
      onClose: onOpenChange
    })

  return (
    <>
      <Button
        isIconOnly
        size='sm'
        variant='flat'
        color='primary'
        onPress={onOpenChange}>
        <PencilIcon size={16} />
      </Button>
      <Modal placement='center' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <form onSubmit={onSubmit}>
              <ModalHeader className='flex flex-col gap-1'>
                <span className='font-roboto-slab text-xl font-bold'>
                  Название списка
                </span>
              </ModalHeader>
              <ModalBody>
                <Input
                  {...register('title')}
                  autoFocus
                  placeholder={`Например, «Лучшие фильмы ${new Date().getFullYear()}»`}
                  maxLength={80}
                  description={`${title.trim().length}/80`}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  type='button'
                  color='default'
                  variant='light'
                  onPress={handleClose}
                  isDisabled={isCreating}>
                  Отмена
                </Button>
                <Button
                  color='primary'
                  type='submit'
                  isLoading={isCreating}
                  isDisabled={title.trim().length === 0}>
                  {isCreating ? 'Обновляется...' : 'Обновить'}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
