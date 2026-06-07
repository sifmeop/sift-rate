'use client'

import { Button } from '@heroui/button'
import { MoveLeftIcon, MoveRightIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { LoadingSpinner } from '~/components/ui/loading-spinner'
import { Show } from '~/components/ui/show'
import { ROUTES } from '~/constants/routes'
import { ContentType } from '~/generated/prisma'
import { usePlayers } from './hooks/usePlayers'
import { useVideoData } from './hooks/useVideoData'

interface IWatchPageProps {
  id: string
}

export const WatchPage = ({ id }: IWatchPageProps) => {
  const [isLoadedIframe, setIsLoadedIframe] = useState(false)

  const { isFetching, players, selectedPlayer, changePlayer, error } =
    usePlayers(id)

  const { data: videoData } = useVideoData(id, selectedPlayer, isLoadedIframe)

  if (error) {
    return (
      <div className='flex flex-col items-center gap-3'>
        <p className='text-center text-2xl font-bold'>
          Не удалось загрузить видео
        </p>
        <Button
          as={Link}
          href={ROUTES.REVIEWS}
          color='primary'
          variant='flat'
          className='w-full max-w-62.5 max-sm:max-w-full'
          startContent={<MoveLeftIcon />}>
          Назад
        </Button>
      </div>
    )
  }

  return (
    <div className='relative flex flex-1 flex-col gap-4'>
      <Show when={isFetching}>
        <LoadingSpinner />
      </Show>
      {videoData && (
        <div className='grid grid-cols-[auto_1fr_auto] items-center gap-2 max-sm:grid-cols-2'>
          <h1 className='col-start-2 row-start-1 line-clamp-2 text-center text-4xl font-bold max-sm:col-span-2 max-sm:col-start-1'>
            {videoData.title}
          </h1>

          <Button
            as={Link}
            href={ROUTES.REVIEWS}
            color='primary'
            variant='flat'
            className='col-start-1 row-start-1 w-full max-w-62.5 max-sm:col-span-1 max-sm:row-start-2 max-sm:max-w-full'
            startContent={<MoveLeftIcon />}>
            Назад
          </Button>

          <Button
            as={Link}
            href={`/rate/${(videoData.isTv ? ContentType.TV : ContentType.MOVIE).toLowerCase()}/${videoData.tmdbId}`}
            color='success'
            variant='flat'
            className='col-start-3 row-start-1 w-full max-w-62.5 max-sm:col-span-1 max-sm:row-start-2 max-sm:max-w-full'
            endContent={<MoveRightIcon />}>
            Оценить
          </Button>
        </div>
      )}
      {players && (
        <div className='absolute top-1/2 right-0 flex -translate-y-1/2 flex-col gap-2'>
          {players.map((player) => (
            <Button
              key={player.type}
              color='primary'
              variant={selectedPlayer?.type === player.type ? 'solid' : 'faded'}
              className='rounded-r-none'
              onPress={() => changePlayer(player)}>
              {player.type}
            </Button>
          ))}
        </div>
      )}
      {selectedPlayer && (
        <iframe
          allowFullScreen
          className='size-full rounded-xl'
          onLoad={() => setIsLoadedIframe(true)}
          src={selectedPlayer.iframeUrl}
        />
      )}
    </div>
  )
}
