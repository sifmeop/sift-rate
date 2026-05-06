'use client'

import { LoadingSpinner } from '~/components/ui/loading-spinner'
import { EmptyState, ErrorMessage } from '~/components/ui/query'
import { api } from '~/trpc/react'
import { CreateRankingListModal } from './components/CreateRankingListModal'
import { RankingListCard } from './components/RankingListCard'

export const RankingListPage = () => {
  const { data, isLoading, error, refetch } =
    api.review.getRatingList.useQuery()

  const list = data ?? []

  return (
    <section className='mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 lg:px-6'>
      {isLoading ? (
        <LoadingSpinner size={32} />
      ) : error ? (
        <ErrorMessage message={error.message} onRetry={refetch} />
      ) : list.length === 0 ? (
        <div className='flex flex-col items-center justify-center gap-3'>
          <EmptyState message='Пока нет списков рейтинга' />
          <CreateRankingListModal />
        </div>
      ) : (
        <div className='space-y-4'>
          <CreateRankingListModal />
          {list.map((list) => (
            <RankingListCard key={list.id} list={list} />
          ))}
        </div>
      )}
    </section>
  )
}
