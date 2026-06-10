import { useQuery } from '@tanstack/react-query'
import { SearchService } from '~/components/features/rating'
import type { ContentType } from '~/generated/prisma'

export const useGetTargetItemById = (category: ContentType, id: string) => {
  return useQuery({
    queryKey: [category.toLowerCase(), id],
    queryFn: async () => {
      const searchService = new SearchService()
      return searchService.searchById(category, id)
    }
  })
}
