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
import { MoveVerticalIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

interface IMoveRankingListItemModalProps {
  title: string
  currentPosition: number
  maxPosition: number
  isUpdating: boolean
  onConfirm: (targetPosition: number) => Promise<boolean>
}

export const MoveRankingListItemModal = ({
  title,
  currentPosition,
  maxPosition,
  isUpdating,
  onConfirm
}: IMoveRankingListItemModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [targetPosition, setTargetPosition] = useState(String(currentPosition))

  useEffect(() => {
    setTargetPosition(String(currentPosition))
  }, [currentPosition, isOpen])

  const parsedTargetPosition = Number(targetPosition)
  const isInvalid =
    !Number.isInteger(parsedTargetPosition) ||
    parsedTargetPosition < 1 ||
    parsedTargetPosition > maxPosition ||
    parsedTargetPosition === currentPosition

  return (
    <>
      <Button
        color='default'
        variant='flat'
        className='md:hidden'
        startContent={<MoveVerticalIcon size={16} />}
        onPress={onOpen}>
        Переместить
      </Button>
      <Modal
        placement='center'
        isOpen={isOpen}
        onOpenChange={isUpdating ? undefined : onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                <span className='font-roboto-slab text-xl font-bold'>
                  Переместить объект
                </span>
                <span className='text-muted-foreground text-sm font-normal'>
                  {title}
                </span>
              </ModalHeader>
              <ModalBody>
                <p className='text-muted-foreground text-sm'>
                  Сейчас объект находится на позиции #{currentPosition}.
                </p>
                <Input
                  type='number'
                  label='Новая позиция'
                  min={1}
                  max={maxPosition}
                  value={targetPosition}
                  onValueChange={setTargetPosition}
                  description={`Введите число от 1 до ${maxPosition}`}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color='default'
                  variant='light'
                  onPress={onClose}
                  isDisabled={isUpdating}>
                  Отмена
                </Button>
                <Button
                  color='primary'
                  isLoading={isUpdating}
                  isDisabled={isInvalid}
                  onPress={async () => {
                    const isSuccess = await onConfirm(parsedTargetPosition)

                    if (isSuccess) {
                      onClose()
                    }
                  }}>
                  Переместить
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
