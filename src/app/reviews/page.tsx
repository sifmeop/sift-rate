'use client'

import { PageTitle } from '~/components/ui/page-title'
import { ReviewsPage } from '~/screens/reviews'

export default function Reviews() {
  return (
    <>
      <PageTitle>История впечатлений</PageTitle>
      <ReviewsPage />
    </>
  )
}
