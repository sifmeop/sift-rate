import { cn } from '@heroui/theme'
import { ContentType } from 'generated/prisma'
import Image from 'next/image'

type TSize = 'md' | 'lg'

interface IProps {
  coverUrl: string | null | undefined
  title: string
  type: ContentType
  size?: TSize
  className?: string
}

const SIZE_MAP: Record<TSize, string[]> = {
  md: ['size-28 md:size-35', 'h-45.5 w-28 md:h-52.5 md:w-35'],
  lg: ['size-60', 'h-90 w-60']
}

export const ReviewCover = ({
  coverUrl,
  type,
  title,
  size = 'md',
  className
}: IProps) => {
  const isMusic = type === ContentType.SONG || type === ContentType.ALBUM
  const cover = coverUrl ?? '/images/no-poster-available.webp'
  const sizeClass = SIZE_MAP[size][isMusic ? 0 : 1]

  return (
    <div
      className={cn(
        'ring-border/20 relative shrink-0 overflow-hidden rounded-lg ring-1',
        sizeClass,
        className
      )}>
      <Image
        fill
        src={cover}
        alt={title}
        sizes='525px'
        className='object-cover transition-transform duration-300 group-hover:scale-110'
      />
    </div>
  )
}
