import { Suspense } from 'react'
import { LoadingSpinner } from '~/components/ui/loading-spinner'
import { ReviewsPage } from '~/screens/reviews'

export default async function Reviews() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ReviewsPage />
    </Suspense>
  )
}
