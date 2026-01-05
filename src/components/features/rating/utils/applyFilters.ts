import type { IRatingCardData, IRatingListFilter } from '../types/rating.types'

export const applyFilters = (
  items: IRatingCardData[],
  filter: IRatingListFilter
) => {
  if (filter === 'all') return items

  return items.filter((item) => item.rating === +filter)
}
