import { cn } from '@heroui/theme'
import Image from 'next/image'
import { useRef, useState } from 'react'

const DEFAULT_COVER = '/images/no-poster-available.webp'

interface IProps {
  coverUrl: string | null | undefined
  title: string
  className?: string
}

export const ReviewCover = ({ coverUrl, title, className }: IProps) => {
  const cover = coverUrl ?? DEFAULT_COVER

  const imgSrcRef = useRef(cover)
  const [hasError, setHasError] = useState(false)

  return (
    <div
      className={cn(
        'ring-border/20 relative shrink-0 overflow-hidden rounded-lg ring-1',
        'h-fit w-40',
        className
      )}>
      <Image
        width={140}
        height={140}
        src={hasError ? DEFAULT_COVER : imgSrcRef.current}
        onError={() => setHasError(true)}
        alt={title}
        className='w-full object-contain transition-transform duration-300 group-hover:scale-110'
      />
    </div>
  )
}
