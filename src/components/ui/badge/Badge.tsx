import { cn } from '@heroui/theme'
import type { ContentType } from 'generated/prisma'
import { BADGE_META } from '~/constants/badge'

type ContentTypeModified = ContentType | 'BEST'

interface IBadgeProps {
  type: ContentTypeModified
  className?: string
  size?: 'sm' | 'md'
}

export const Badge = ({ type, className, size = 'md' }: IBadgeProps) => {
  const { title, icon: Icon, bg, text } = BADGE_META[type]

  return (
    <div
      className={cn(
        'border-border/50 flex w-fit items-center gap-1 rounded-full border px-2.5 py-1.75',
        bg,
        text,
        className,
        {
          'px-1.5 py-1': size === 'sm'
        }
      )}>
      <Icon className={size === 'sm' ? 'size-3' : 'size-4'} />
      <span className='text-xs font-semibold'>{title}</span>
    </div>
  )
}
