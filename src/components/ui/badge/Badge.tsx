import { cn } from '@heroui/theme'
import type { ContentType } from 'generated/prisma'
import {
  BookOpenIcon,
  CrownIcon,
  Disc3Icon,
  FilmIcon,
  Gamepad2Icon,
  MusicIcon,
  TvIcon,
  type LucideIcon
} from 'lucide-react'

type ContentTypeModified = ContentType | 'BEST'

const CONTENT_META: Record<
  ContentTypeModified,
  {
    title: string
    icon: LucideIcon
    bg: string
    text: string
  }
> = {
  MOVIE: {
    title: 'Фильм',
    icon: FilmIcon,
    bg: 'bg-red-500/10',
    text: 'text-red-500'
  },
  TV: {
    title: 'Сериал',
    icon: TvIcon,
    bg: 'bg-blue-500/10',
    text: 'text-blue-500'
  },
  SONG: {
    title: 'Песня',
    icon: MusicIcon,
    bg: 'bg-purple-500/10',
    text: 'text-purple-500'
  },
  ALBUM: {
    title: 'Альбом',
    icon: Disc3Icon,
    bg: 'bg-indigo-500/10',
    text: 'text-indigo-500'
  },
  GAME: {
    title: 'Игра',
    icon: Gamepad2Icon,
    bg: 'bg-green-500/10',
    text: 'text-green-500'
  },
  BOOK: {
    title: 'Книга',
    icon: BookOpenIcon,
    bg: 'bg-amber-500/10',
    text: 'text-amber-500'
  },
  BEST: {
    title: 'Лучший',
    icon: CrownIcon,
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-500'
  }
}

interface IBadgeProps {
  type: ContentTypeModified
  className?: string
}

export const Badge = ({ type, className }: IBadgeProps) => {
  const { title, icon: Icon, bg, text } = CONTENT_META[type]

  return (
    <div
      className={cn(
        'border-border/50 flex w-fit items-center gap-1 rounded-full border px-2.5 py-1.75',
        bg,
        text,
        className
      )}>
      <Icon className='size-4' />
      <span className='text-xs font-semibold'>{title}</span>
    </div>
  )
}
