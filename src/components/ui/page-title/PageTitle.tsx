import { cn } from '@heroui/theme'

interface IPageTitleProps extends React.PropsWithChildren {
  className?: string
}

export const PageTitle = ({ children, className }: IPageTitleProps) => {
  return (
    <h1
      className={cn(
        'mb-6 text-center text-2xl font-bold md:text-4xl',
        className
      )}>
      {children}
    </h1>
  )
}
