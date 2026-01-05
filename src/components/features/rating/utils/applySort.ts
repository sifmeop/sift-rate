import type { IRatingCardData, IRatingListSort } from '../types/rating.types'

export const applySort = (items: IRatingCardData[], sort: IRatingListSort) => {
  return [...items].sort((a, b) => {
    if (sort === 'review_desc') {
      const aDate = new Date(a.createdAt).getTime()
      const bDate = new Date(b.createdAt).getTime()

      return bDate - aDate
    } else if (sort === 'review_asc') {
      const aDate = new Date(a.createdAt).getTime()
      const bDate = new Date(b.createdAt).getTime()

      return aDate - bDate
    } else if (sort === 'rating_desc') {
      return b.rating - a.rating
    } else if (sort === 'rating_asc') {
      return a.rating - b.rating
    } else {
      return 0
    }
  })
}
