import { MAX_RATING } from '~/constants/review'
import type { IRatingCardData, IRatingListTab } from '../types/rating.types'

export const applyTab = (items: IRatingCardData[], tab: IRatingListTab) => {
  if (tab === 'all') return items

  return items.filter((item) => item.rating === MAX_RATING)
}
