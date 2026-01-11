import type {
  IRatingCardData,
  TRatingListContentType
} from '../types/rating.types'

export const applyContentType = (
  items: IRatingCardData[],
  contentType: TRatingListContentType
) => {
  if (contentType === 'ALL') return items

  return items.filter((item) => item.type === contentType)
}
