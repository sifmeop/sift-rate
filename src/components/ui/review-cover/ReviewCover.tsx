import { ContentType } from 'generated/prisma'
import Image from 'next/image'

interface IProps {
  coverUrl: string | null | undefined
  title: string
  type: ContentType
}

const DEFAULT_COVER_WIDTH = 140
const DEFAULT_COVER_HEIGHT = 210

export const ReviewCover = ({ coverUrl, type, title }: IProps) => {
  const isMusic = type === ContentType.SONG || type === ContentType.ALBUM
  const cover = coverUrl ?? '/images/no-poster-available.webp'
  const aspectRatio = isMusic ? '1/1' : '2/3'
  const coverWidth = DEFAULT_COVER_WIDTH
  const coverHeight = isMusic ? DEFAULT_COVER_WIDTH : DEFAULT_COVER_HEIGHT

  return (
    <div
      style={{
        width: coverWidth,
        height: coverHeight,
        aspectRatio
      }}
      className='ring-border/20 relative shrink-0 overflow-hidden rounded-lg ring-1'>
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
