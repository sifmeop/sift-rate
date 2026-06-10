'use client'

import { LoadingSpinner } from '~/components/ui/loading-spinner'
import { ErrorMessage } from '~/components/ui/query'
import type { ContentType } from '~/generated/prisma'
import { SubmitRating } from './components/SubmitRating'
import { useGetTargetItemById } from './hooks/useGetTargetItemById'

interface IRateTargetItemPageProps {
  category: ContentType
  id: string
}

export const RateTargetItemPage = ({
  category,
  id
}: IRateTargetItemPageProps) => {
  const { data, isLoading, isError } = useGetTargetItemById(category, id)

  if (isError) {
    return <ErrorMessage message='Не удалось получить данные' />
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!data) {
    return <ErrorMessage message='Не удалось получить данные' />
  }

  return <SubmitRating targetItem={data} />
}
