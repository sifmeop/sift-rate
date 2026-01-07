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
      style={{
        width: 120,
        height: isMusic ? 120 : 'fit-content'
      }}
      className='relative h-fit shrink-0'>
      <div className='absolute inset-0 translate-y-3 scale-80 overflow-hidden rounded-lg opacity-50 blur-xl transition-opacity group-hover:opacity-70'>
        <Image
          width={120}
          height={isMusic ? 120 : 160}
          src={cover}
          alt={title}
          className='size-full object-cover'
        />
      </div>
      <div className='ring-border/20 relative overflow-hidden rounded-lg ring-1'>
        <Image
          width={120}
          height={isMusic ? 120 : 160}
          src={cover}
          alt={title}
          className='size-full object-cover transition-transform duration-300 group-hover:scale-110'
        />
        <div className='from-background/40 absolute inset-0 bg-linear-to-t via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100' />
      </div>
    </div>
  )
}
