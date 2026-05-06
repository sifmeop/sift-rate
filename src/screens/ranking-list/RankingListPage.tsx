'use client'

import { LoadingSpinner } from '~/components/ui/loading-spinner'
import { EmptyState, ErrorMessage } from '~/components/ui/query'
import { api } from '~/trpc/react'
import { CreateRankingListModal } from './components/CreateRankingListModal'
import { RankingListCard } from './components/RankingListCard'

export const RankingListPage = () => {
  const { data, isLoading, error, refetch } =
    api.review.getRatingList.useQuery()

  const lists = data ?? []

  if (error) {
    return <ErrorMessage message={error.message} onRetry={refetch} />
  }

  if (isLoading) {
    return <LoadingSpinner size={32} />
  }

  if (lists.length === 0) {
    return <EmptyState message='Пока нет списков рейтинга' />
  }

  return (
    <section className='mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 md:px-6'>
      <CreateRankingListModal />

      <div className='space-y-4'>
        {lists.map((list) => (
          <RankingListCard key={list.id} list={list} />
        ))}
      </div>
    </section>
  )
}
