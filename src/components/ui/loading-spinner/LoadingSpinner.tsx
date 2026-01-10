import { LoaderIcon } from 'lucide-react'

interface ILoadingSpinnerProps {
  size?: number
}

export const LoadingSpinner = ({ size = 24 }: ILoadingSpinnerProps) => {
  return (
    <div className='text-secondary my-2 flex animate-spin justify-center'>
      <LoaderIcon size={size} strokeWidth={3} />
    </div>
  )
}
