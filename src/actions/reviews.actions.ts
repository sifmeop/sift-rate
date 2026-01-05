'use server'

import { revalidatePath } from 'next/cache'
import { ROUTES } from '~/constants/routes'
import { api } from '~/trpc/server'
import type {
  CreateReviewSchemaType,
  DeleteReviewSchemaType,
  UpdateReviewSchemaType
} from '~/utils/validators'

export const createReviewAction = async (data: CreateReviewSchemaType) => {
  await api.review.create(data)
  revalidatePath(ROUTES.REVIEWS)
  revalidatePath(ROUTES.TIMELINE)
}

export const deleteReview = async (data: DeleteReviewSchemaType) => {
  await api.review.delete(data)
  revalidatePath(ROUTES.REVIEWS)
  revalidatePath(ROUTES.TIMELINE)
}

export const updateReview = async (data: UpdateReviewSchemaType) => {
  await api.review.update(data)
  revalidatePath(ROUTES.REVIEWS)
  revalidatePath(ROUTES.TIMELINE)
}
