'use client'

import { PageTitle } from '~/components/ui/page-title'
import { ReviewsPage } from '~/screens/reviews'

export function ReviewsPageClient() {
  return (
    <>
      <PageTitle>История впечатлений</PageTitle>
      <ReviewsPage />
    </>
  )
}
