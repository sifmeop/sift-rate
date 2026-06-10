'use client'

import { cn } from '@heroui/theme'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

interface IPageTitleProps extends React.PropsWithChildren {
  className?: string
  hrefOnBack?: string
}

export const PageTitle = ({
  children,
  hrefOnBack,
  className
}: IPageTitleProps) => {
  return (
    <div
      className={cn('flex items-center gap-2', {
        'mb-6': !!hrefOnBack
      })}>
      {hrefOnBack && (
        <Link
          href={hrefOnBack}
          className='bg-secondary/15 text-secondary flex items-center gap-2 rounded-xl px-4 py-2 text-base'>
          <ArrowLeftIcon size={16} />
          Назад
        </Link>
      )}
      <h1
        className={cn(
          'text-center text-2xl font-bold lg:text-4xl',
          hrefOnBack ? 'ml-auto' : 'mb-6',
          className
        )}>
        {children}
      </h1>
    </div>
  )
}
