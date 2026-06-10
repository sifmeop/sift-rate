import { Button } from '@heroui/button'
import { cn } from '@heroui/theme'
import { useRouter } from 'next/navigation'
import type { ITargetItem } from '~/components/features/rating'
import { useFetchWatchContent } from '~/components/features/rating/hooks/useFetchWatchContent'
import { ReviewCover } from '~/components/ui/review-cover'
import { Show } from '~/components/ui/show'
import { ContentType } from '~/generated/prisma'

interface ISearchTargetItemProps {
  data: ITargetItem
  category: ContentType
}

export const SearchTargetItem = ({
  data,
  category
}: ISearchTargetItemProps) => {
  const router = useRouter()

  const { isFetching, fetchWatchContent } = useFetchWatchContent()

  const rateHref = `/rate/${category.toLowerCase()}/${data.id}`
  const isVideoContent =
    category === ContentType.MOVIE || category === ContentType.TV

  return (
    <div className='bg-card-background border-border hover:border-secondary group flex w-full items-center gap-4 overflow-hidden rounded-xl border p-4 transition-all max-lg:flex-col'>
      <ReviewCover
        unoptimized
        category={category}
        title={data.title}
        coverUrl={data.cover}
      />
      <div className='mr-auto flex-1 overflow-hidden text-left max-lg:mr-0 max-lg:text-center'>
        <h3 className='group-hover:text-secondary line-clamp-2 text-base font-semibold transition-colors'>
          {data.title}
        </h3>
        <Show when={data.description.length > 0}>
          <p className='text-muted-foreground text-sm'>{data.description}</p>
        </Show>
      </div>
      <div
        className={cn('max-lg:w-full', {
          'grid grid-rows-2 gap-2 max-lg:grid-cols-2 max-lg:grid-rows-1':
            isVideoContent
        })}>
        <Show when={isVideoContent}>
          <Button
            color='primary'
            variant='flat'
            isLoading={isFetching}
            className='min-w-37.5 max-lg:min-w-auto'
            onPress={
              isVideoContent
                ? () => fetchWatchContent(data.title, data.releaseDate)
                : undefined
            }>
            {isFetching ? 'Загрузка...' : 'Смотреть'}
          </Button>
        </Show>
        <Button
          color='secondary'
          variant='flat'
          className='min-w-37.5 max-lg:min-w-auto'
          onPress={() => router.push(rateHref)}>
          Оценить
        </Button>
      </div>
    </div>
  )
}
