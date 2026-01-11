import { cn } from '@heroui/theme'
import type { ContentType } from 'generated/prisma'
import { BADGE_META } from '~/constants/badge'

type ContentTypeModified = ContentType | 'BEST'

interface IBadgeProps {
  type: ContentTypeModified
  className?: string
}

export const Badge = ({ type, className }: IBadgeProps) => {
  const { title, icon: Icon, bg, text } = BADGE_META[type]

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
