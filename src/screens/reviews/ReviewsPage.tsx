import { RatingList } from '~/components/features/rating'
import { EmptyState } from '~/components/ui/query'
import { api } from '~/trpc/server'

export const ReviewsPage = async () => {
  const items = await api.review.getReviews()

  if (items.length === 0) {
    return <EmptyState />
  }

  return <RatingList items={items} />
}
