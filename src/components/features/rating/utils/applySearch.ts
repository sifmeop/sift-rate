import type { IRatingCardData } from '../types/rating.types'

export const applySearch = (items: IRatingCardData[], search: string) => {
  return items.filter((item) =>
    item.itemReview.title.toLowerCase().includes(search.toLowerCase())
  )
}
