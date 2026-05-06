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
import { ListPlusIcon } from 'lucide-react'
import { useCreateRankingList } from '../hooks/useCreateRankingList'

export const CreateRankingListModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const { register, onSubmit, isCreating, title, handleClose } =
    useCreateRankingList({
      onClose: onOpenChange
    })

  return (
    <>
      <Button
        fullWidth
        color='primary'
        className='font-semibold'
        startContent={<ListPlusIcon size={18} />}
        onPress={onOpen}>
        Создать список
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
                  {isCreating ? 'Создаем...' : 'Создать'}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
