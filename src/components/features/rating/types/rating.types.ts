import type { ItemReview, Review } from 'generated/prisma'
import z from 'zod'

export interface IRatingCardData extends Review {
  itemReview: Pick<ItemReview, 'title' | 'coverUrl'>
}

export type IRatingListTab = 'all' | 'best'
export type IRatingListSort =
  | 'review_desc'
  | 'review_asc'
  | 'rating_desc'
  | 'rating_asc'
export type IRatingListFilter = 'all' | `${number}`

export const RatingListStateSchema = z.object({
  tab: z.enum(['all', 'best']).optional(),
  search: z.string().optional(),
  sort: z
    .enum(['review_desc', 'review_asc', 'rating_desc', 'rating_asc'])
    .optional(),
  filter: z
    .enum(['all', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])
    .optional()
})

export type TRatingListState = z.infer<typeof RatingListStateSchema>

export interface IRatingListState {
  tab: IRatingListTab
  search: string
  sort: IRatingListSort
  filter: IRatingListFilter
}

export type ITimeline = Record<
  number,
  {
    total: number
    best: number
    months: Record<number, { total: number; best: number }>
  }
>
