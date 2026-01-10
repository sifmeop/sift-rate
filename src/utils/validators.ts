import { ContentType } from 'generated/prisma'
import z from 'zod'
import { MAX_RATING, MAX_REVIEW_LENGTH } from '~/constants/review'

export const createReviewSchema = z.object({
  externalId: z.string(),
  title: z.string(),
  coverUrl: z.string().optional(),
  type: z.nativeEnum(ContentType),
  releaseDate: z.string().optional(),
  rating: z.number().min(1).max(MAX_RATING),
  review: z.string().max(MAX_REVIEW_LENGTH)
})

export type CreateReviewSchemaType = z.infer<typeof createReviewSchema>

export const updateReviewSchema = z.object({
  id: z.string(),
  rating: z.number().min(1).max(MAX_RATING),
  review: z.string().max(MAX_REVIEW_LENGTH)
})

export type UpdateReviewSchemaType = z.infer<typeof updateReviewSchema>

export const deleteReviewSchema = z.object({
  id: z.string()
})

export type DeleteReviewSchemaType = z.infer<typeof deleteReviewSchema>

export const validateDates = z
  .object({
    from: z.string().optional(),
    to: z.string().optional()
  })
  .refine(({ from, to }) => {
    if (from && to) {
      return new Date(from).getTime() < new Date(to).getTime()
    }

    return true
  })
  .optional()
