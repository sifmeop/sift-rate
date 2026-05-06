import type { RouterOutputs } from '~/trpc/react'

export type RankingListWithItems =
  RouterOutputs['review']['getRatingList'][number]

export type ReviewWithItem = RouterOutputs['review']['getReviews'][number]
