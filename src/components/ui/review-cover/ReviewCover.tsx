import { cn } from '@heroui/theme'
import { ContentType } from 'generated/prisma'
import Image from 'next/image'

interface IProps {
  coverUrl: string | null | undefined
  title: string
  type: ContentType
}

export const ReviewCover = ({ coverUrl, type, title }: IProps) => {
  const isMusic = type === ContentType.SONG || type === ContentType.ALBUM
  const cover = coverUrl ?? '/images/no-poster-available.webp'

  return (
    <div
      className={cn(
        'ring-border/20 relative shrink-0 overflow-hidden rounded-lg ring-1',
        isMusic ? 'size-28 md:size-35' : 'h-45.5 w-28 md:h-52.5 md:w-35'
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
