interface IErrorMessageProps {
  message?: string
  onRetry?: () => void
}

export const ErrorMessage = ({ message, onRetry }: IErrorMessageProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-center text-2xl font-bold'>{message}</p>
      {onRetry && <button onClick={onRetry}>Повторить</button>}
    </div>
  )
}
