import { Button } from '@heroui/button'
import { EyeIcon } from 'lucide-react'
import { useFetchWatchContent } from '../../hooks/useFetchWatchContent'

interface IWatchContentProps {
  title: string
}

export const WatchContent = ({ title }: IWatchContentProps) => {
  const { isFetching, fetchWatchContent } = useFetchWatchContent()

  return (
    <Button
      isIconOnly
      size='sm'
      variant='flat'
      color='primary'
      onPress={() => fetchWatchContent(title)}
      className='hover:scale-110'
      isLoading={isFetching}>
      <EyeIcon size={16} />
    </Button>
  )
}
