interface IEmptyStateProps {
  message?: string
}

export const EmptyState = ({
  message = 'Пока нет оценок'
}: IEmptyStateProps) => {
  return (
    <div>
      <p className='text-center text-2xl font-bold'>{message}</p>
    </div>
  )
}
