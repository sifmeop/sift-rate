import { Button } from '@heroui/button'

interface IErrorMessageProps {
  message?: string
  onRetry?: () => void
}

export const ErrorMessage = ({ message, onRetry }: IErrorMessageProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-center text-2xl font-bold'>{message}</p>
      {onRetry && (
        <Button
          className='mx-auto w-fit'
          color='primary'
          variant='flat'
          onPress={onRetry}>
          Повторить
        </Button>
      )}
    </div>
  )
}
