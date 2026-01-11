'use client'

import { Button } from '@heroui/button'
import { useQuery } from '@tanstack/react-query'
import type { ContentType } from 'generated/prisma'
import { useRouter } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa'
import { SearchService } from '~/components/features/rating'
import { LoadingSpinner } from '~/components/ui/loading-spinner'
import { EmptyState, ErrorMessage } from '~/components/ui/query'
import { api } from '~/trpc/react'
import { Details } from './components/Details'
import { RatingBreakdown } from './components/RatingBreakdown'
import { Reviews } from './components/Reviews'

interface IReviewDetailPageProps {
  category: ContentType
  id: string
}

export const ReviewDetailPage = ({ category, id }: IReviewDetailPageProps) => {
  const router = useRouter()

  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError
  } = useQuery({
    queryKey: ['search', category, id],
    queryFn: () => new SearchService().searchById(category, id)
  })

  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    error: reviewsError
  } = api.review.getItemReviews.useQuery({ externalId: id })

  const handleBack = () => router.back()

  if (searchLoading || reviewsLoading) {
    return <LoadingSpinner />
  }

  if (searchError || reviewsError) {
    return (
      <ErrorMessage message={searchError?.message ?? reviewsError?.message} />
    )
  }

  if (!searchData || !reviewsData) {
    return <EmptyState message='Ничего не найдено' />
  }

  return (
    <div>
      <Button
        variant='light'
        startContent={<FaArrowLeft />}
        onPress={handleBack}
        className='mb-4 w-fit'>
        Назад
      </Button>
      <div className='flex flex-col gap-6'>
        <Details searchData={searchData} reviewsData={reviewsData} />
        <RatingBreakdown reviewsData={reviewsData} />
        <Reviews reviewsData={reviewsData} />
      </div>
    </div>
  )
}
