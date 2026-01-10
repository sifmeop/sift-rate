import { RatingList } from '~/components/features/rating'
import { api } from '~/trpc/react'

export const ReviewsPage = () => {
  const { data, isLoading, error } = api.review.getReviews.useQuery()

  return (
    <RatingList items={data} isLoading={isLoading} error={error?.message} />
  )
}
