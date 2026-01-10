import type { ContentType } from 'generated/prisma'
import { useState } from 'react'
import { SearchService } from '../service/target.service'
import type { ISelectedTargetItem, ITargetItem } from '../types/target.types'

export const useTargetSearch = (
  selectedType: ContentType,
  setSelectedTargetItem: React.Dispatch<
    React.SetStateAction<ISelectedTargetItem | null>
  >
) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [result, setResult] = useState<ITargetItem[] | null | undefined>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const isLoading = typeof result === 'undefined'

  const searchTargets = async (page = 1) => {
    if (isLoading) return

    if (searchTerm.trim().length === 0) {
      setResult(null)
      return
    }

    const searchService = new SearchService()

    setResult([])
    setResult(undefined)

    try {
      const response = await searchService.search(
        selectedType,
        searchTerm,
        page
      )

      setResult(response.items)
      setTotalPages(response.totalPages)
      setTotalResults(response.totalResults)
    } catch (error) {
      console.error(
        `Error searching entity with selectedType ${selectedType}: `,
        error
      )
      setResult(null)
    }
  }

  const clearSearch = () => {
    setSearchTerm('')
    setResult(null)
    setCurrentPage(1)
    setTotalPages(1)
    setTotalResults(0)
  }

  const selectTarget = (result: ITargetItem) => {
    setSelectedTargetItem({
      externalId: result.id,
      title: result.title,
      description: result.description,
      coverUrl: result.cover,
      type: selectedType,
      releaseDate: result.releaseDate
        ? new Date(result.releaseDate).toISOString()
        : undefined
    })
  }

  const onChangePage = (page: number) => {
    setCurrentPage(page)
    void searchTargets(page)
  }

  return {
    searchTerm,
    setSearchTerm,
    result,
    isLoading,
    searchTargets,
    clearSearch,
    selectTarget,
    totalPages,
    totalResults,
    currentPage,
    onChangePage
  }
}
