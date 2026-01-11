import type { IRatingCardData, IRatingListState } from '../types/rating.types'
import { applyContentType } from './applyContentType'
import { applyFilters } from './applyFilters'
import { applySearch } from './applySearch'
import { applySort } from './applySort'
import { applyTab } from './applyTab'

export const selectVisibleItems = (
  items: IRatingCardData[],
  state: IRatingListState
) => {
  if (items.length === 0) return items

  const { tab, search, sort, filter, contentType } = state

  let result = items

  result = applyTab(result, tab)
  result = applySearch(result, search)
  result = applySort(result, sort)

  if (tab === 'all') {
    result = applyFilters(result, filter)
  }

  result = applyContentType(result, contentType)

  return result
}
