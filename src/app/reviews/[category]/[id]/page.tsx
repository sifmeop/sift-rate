import { redirect } from 'next/navigation'
import { ROUTES } from '~/constants/routes'
import { ReviewDetailPage } from '~/screens/review-detail'
import { db } from '~/server/db'
import { validateCategory } from '~/utils/validators'

interface IReviewDetailProps {
  params: Promise<{ category: string; id: string }>
}

export default async function ReviewDetail({ params }: IReviewDetailProps) {
  const awaitedParams = await params

  const { data, success: isValid } = validateCategory.safeParse(awaitedParams)

  if (!isValid) {
    redirect(ROUTES.REVIEWS)
  }

  const itemReview = await db.itemReview.findUnique({
    where: { externalId: data.id }
  })

  if (!itemReview) {
    redirect(ROUTES.REVIEWS)
  }

  return <ReviewDetailPage {...data} />
}
