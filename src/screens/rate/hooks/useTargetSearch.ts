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

  const isLoading = typeof result === 'undefined'

  const searchTargets = async () => {
    if (isLoading) return

    if (searchTerm.trim().length === 0) {
      setResult(null)
      return
    }

    const searchService = new SearchService()

    setResult([])
    setResult(undefined)

    try {
      const response = await searchService.search(selectedType, searchTerm)
      setResult(response)
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

  return {
    searchTerm,
    setSearchTerm,
    result,
    isLoading,
    searchTargets,
    clearSearch,
    selectTarget
  }
}
