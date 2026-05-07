import type { RouterOutputs } from '~/trpc/react'

export type RankingListWithItems =
  RouterOutputs['review']['getRankingList'][number]

export type ReviewWithItem = RouterOutputs['review']['getReviews'][number]
