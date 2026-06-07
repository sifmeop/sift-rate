import { Button } from '@heroui/button'
import { cn } from '@heroui/theme'
import axios from 'axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { ITargetItem } from '~/components/features/rating'
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

  const [isFetching, setIsFetching] = useState(false)

  const rateHref = `/rate/${category.toLowerCase()}/${data.id}`
  const isVideoContent =
    category === ContentType.MOVIE || category === ContentType.TV

  const handleClick = async () => {
    setIsFetching(true)

    try {
      const response = await axios.get<{
        url: string | null
      }>('/api/watch', {
        params: {
          title: data.title,
          year: dayjs(data.releaseDate).format('YYYY')
        }
      })

      const watchUrl = response.data?.url

      if (watchUrl) {
        window.open(watchUrl, '_blank', 'noopener,noreferrer')
      }
    } catch (error) {
      console.debug(
        `Error fetching watch link for ${data.title}: ${JSON.stringify(error)}`
      )
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <div className='bg-card-background border-border hover:border-secondary group flex w-full items-center gap-4 overflow-hidden rounded-xl border p-4 transition-all max-lg:flex-col'>
      <ReviewCover title={data.title} coverUrl={data.cover} />
      <div className='mr-auto shrink-0 overflow-hidden text-left max-lg:mr-0 max-lg:text-center'>
        <h3 className='group-hover:text-secondary line-clamp-2 text-base font-semibold transition-colors'>
          {data.title}
        </h3>
        <p className='text-muted-foreground text-sm'>{data.description}</p>
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
            onPress={isVideoContent ? handleClick : undefined}>
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
